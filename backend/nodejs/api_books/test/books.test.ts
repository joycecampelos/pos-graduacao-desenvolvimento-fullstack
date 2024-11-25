import { it, expect, describe, beforeAll, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import { execSync } from 'node:child_process';
import { app } from '../src/app';

describe('Books routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync('npx knex migrate:rollback --all');
    execSync('npx knex migrate:latest');
  });

  it('should be able to create a new book', async () => {
    const response = await request(app.server).post('/books').send({
      title: 'Test Book',
      author: 'Test Author',
      genrer: 'Test Genre',
    });

    expect(response.status).toBe(201);
  });

  describe('GET/books', () => {
    it('should be able to list all books', async () => {
      const book = {
        title: 'Test Book 2',
        author: 'Test Author 2',
        genrer: 'Test Genre 2',
      };

      const createBookResponse = await request(app.server)
        .post('/books')
        .send(book);

      const cookies = createBookResponse.get('Set-Cookie') ?? [];

      const listBooksResponse = await request(app.server)
        .get('/books')
        .set('Cookie', cookies)
        .expect(200);

      expect(listBooksResponse.body.books).toEqual([
        expect.objectContaining(book),
      ]);
    });

    it('should retur status 401 when there is not cookies', async () => {
      const listBooksResponse = await request(app.server).get('/books');

      expect(listBooksResponse.status).toBe(401);
    });

    it('should be able to get a specific book', async () => {
      const book = {
        title: 'Test Book 2',
        author: 'Test Author 2',
        genrer: 'Test Genre 2',
      };

      const createBookResponse = await request(app.server)
        .post('/books')
        .send(book);

      const cookies = createBookResponse.get('Set-Cookie') ?? [];

      const listBooksResponse = await request(app.server)
        .get('/books')
        .set('Cookie', cookies)
        .expect(200);

      const bookId = listBooksResponse.body.books[0].id;

      const getBookResponse = await request(app.server)
        .get(`/books/${bookId}`)
        .set('Cookie', cookies)
        .expect(200);

      expect(getBookResponse.body.book).toEqual(expect.objectContaining(book));
    });
  });

  describe('PUT /books/:id', () => {
    it('should be able to edit a specific book', async () => {
      const book = {
        title: 'Original Book Title',
        genrer: 'Original Genre',
        author: 'Original Author'

      };

      const createBookResponse = await request(app.server)
        .post('/books')
        .send(book);

      const cookies = createBookResponse.get('Set-Cookie') ?? [];

      const updatedBook = {
        title: 'Updated Book Title',
        genrer: 'Updated Genre',
        author: 'Updated Author'
      };

      const listBooksResponse = await request(app.server)
        .get('/books')
        .set('Cookie', cookies)
        .expect(200);

      const bookId = listBooksResponse.body.books[0].id;

      const updateBookResponse = await request(app.server)
        .put(`/books/${bookId}`)
        .set('Cookie', cookies)
        .send(updatedBook);

      expect(updateBookResponse.status).toBe(200);
      const getUpdatedBookResponse = await request(app.server)
        .get(`/books/${bookId}`)
        .set('Cookie', cookies)
        .expect(200);

      expect(getUpdatedBookResponse.body.book).toEqual(
        expect.objectContaining(updatedBook)
      );
    });

    it('should return 404 when trying to edit a non-existing book', async () => {
      const nonExistingBookId = '64587d4d-fcbe-430b-9c82-e51efd993fc9';
      const updatedBook = {
        title: 'Updated Book Title',
        genrer: 'Updated Genre',
        author: 'Updated Author'
      };

      const updateBookResponse = await request(app.server)
        .put(`/books/${nonExistingBookId}`)
        .send(updatedBook);

      expect(updateBookResponse.status).toBe(404);
    });

    it('should return 403 when trying to edit a book not added by the user', async () => {
      const book = {
        title: 'Test Book',
        genrer: 'Test Genre',
        author: 'Test Author'
      };

      const createBookResponse = await request(app.server)
        .post('/books')
        .send(book);

      const user1Cookies = createBookResponse.get('Set-Cookie') ?? [];
      const listBooksResponse = await request(app.server)
        .get('/books')
        .set('Cookie', user1Cookies)
        .expect(200);

      const bookId = listBooksResponse.body.books[0].id;

      const updatedBook = {
        title: 'Updated Book Title',
        genrer: 'Updated Genre',
        author: 'Updated Author'
      };

      const createAnotherUserBookResponse = await request(app.server)
        .post('/books')
        .send({
          title: 'Another Book',
          genrer: 'Another Genre',
          author: 'Another Author'
        });

      const user2Cookies = createAnotherUserBookResponse.get('Set-Cookie') ?? [];

      const updateBookResponse = await request(app.server)
        .put(`/books/${bookId}`)
        .set('Cookie', user2Cookies)
        .send(updatedBook);

      expect(updateBookResponse.status).toBe(403);
    });
  });

  describe('DELETE /books/:id', () => {
    it('should be able to delete a specific book', async () => {
      const book = {
        title: 'Book to be Deleted',
        author: 'Author to be Deleted',
        genrer: 'Genre to be Deleted',
      };

      const createBookResponse = await request(app.server)
        .post('/books')
        .send(book);

      const cookies = createBookResponse.get('Set-Cookie') ?? [];

      const listBooksResponse = await request(app.server)
        .get('/books')
        .set('Cookie', cookies)
        .expect(200);

      const bookId = listBooksResponse.body.books[0].id;

      const deleteBookResponse = await request(app.server)
        .delete(`/books/${bookId}`)
        .set('Cookie', cookies);

      expect(deleteBookResponse.status).toBe(204);
    });

    it('should return 404 when trying to delete a non-existing book', async () => {
      const nonExistingBookId = '64587d4d-fcbe-430b-9c82-e51efd993fc5';

      const deleteBookResponse = await request(app.server).delete(
        `/books/${nonExistingBookId}`
      );

      expect(deleteBookResponse.status).toBe(404);
    });

    it('should return 403 when trying to delete a book not added by the user', async () => {
      const book = {
        title: 'Test Book to Delete',
        author: 'Test Author',
        genrer: 'Test Genre',
      };

      const createBookResponse = await request(app.server)
        .post('/books')
        .send(book);

      const user1Cookies = createBookResponse.get('Set-Cookie') ?? [];
      const listBooksResponse = await request(app.server)
        .get('/books')
        .set('Cookie', user1Cookies)
        .expect(200);

      const bookId = listBooksResponse.body.books[0].id;

      const createAnotherUserBookResponse = await request(app.server)
        .post('/books')
        .send({
          title: 'Another Book',
          author: 'Another Author',
          genrer: 'Another Genre',
        });

      const user2Cookies = createAnotherUserBookResponse.get('Set-Cookie') ?? [];

      const deleteBookResponse = await request(app.server)
        .delete(`/books/${bookId}`)
        .set('Cookie', user2Cookies);

      expect(deleteBookResponse.status).toBe(403);
    });
  });
});
