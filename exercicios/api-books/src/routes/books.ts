import { FastifyInstance } from 'fastify';
import { knex } from '../db';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { checkSessionId } from '../middlewares/check-session-id';

export async function booksRouter(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionId],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const books = await knex('books').where('session_id', sessionId).select();

      return { books };
    },
  );

  app.get(
    '/:id',
    {
      preHandler: [checkSessionId],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const getBookParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getBookParamsSchema.parse(request.params);

      const book = await knex('books')
        .where({
          id,
          session_id: sessionId,
        })
        .first();

      return { book };
    },
  );

  app.post('/', async (request, reply) => {
    const createBookBodySchema = z.object({
      title: z.string(),
      genrer: z.string(),
      author: z.string(),
    });

    const { title, author, genrer } = createBookBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex('books').insert({
      id: randomUUID(),
      title,
      author,
      genrer,
      session_id: sessionId as string,
    });

    return reply.status(201).send();
  });

  app.put('/:id', async (request, reply) => {
    const updateBookBodySchema = z.object({
      title: z.string().optional(),
      genrer: z.string().optional(),
      author: z.string().optional(),
    });
  
    const { title, author, genrer } = updateBookBodySchema.parse(request.body);

    const getBookParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getBookParamsSchema.parse(request.params);
  
    let sessionId = request.cookies.sessionId;
  
    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });
    }
  
    const existingBook = await knex('books').where({ id }).first();
  
    if (!existingBook) {
      return reply.status(404).send({ error: 'Book not found.' });
    }
  
    if (existingBook.session_id !== sessionId) {
      return reply.status(403).send({ error: 'You cannot edit a book from another user.' });
    }
  
    const updatedData = {
      title: title ?? existingBook.title,
      author: author ?? existingBook.author,
      genrer: genrer ?? existingBook.genrer,
      session_id: sessionId as string,
    };
  
    await knex('books').where({ id }).update(updatedData);
  
    return reply.status(200).send({ message: 'Book updated successfully.' });
  });

  app.delete('/:id', async (request, reply) => {
    const getBookParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getBookParamsSchema.parse(request.params);
  
    let sessionId = request.cookies.sessionId;
  
    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });
    }
  
    const existingBook = await knex('books').where({ id }).first();
  
    if (!existingBook) {
      return reply.status(404).send({ error: 'Book not found.' });
    }
  
    if (existingBook.session_id !== sessionId) {
      return reply.status(403).send({ error: 'You cannot delete a book from another user.' });
    }
  
    await knex('books').where({ id }).del();
  
    return reply.status(204).send();
  });
}
