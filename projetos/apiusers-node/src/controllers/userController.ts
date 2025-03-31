import { Request, Response } from 'express';
import { z } from 'zod';
import * as userService from '../services/userService';
import { statusCode } from '../utils/statusCode';

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(statusCode.Created).json(newUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(statusCode.BadRequest).json({ errors: error.errors });
        }
        console.error('Erro ao criar usuário:', error);
        res.status(statusCode.BadRequest).json({ error });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        if (!users.length) {
            return res.status(statusCode.NotFound).json({ message: 'Nenhum usuário encontrado.' });
        }
        res.status(statusCode.OK).json(users);
    } catch (error) {
        res.status(statusCode.InternalServerError).json({ error: 'Erro ao buscar os usuários.' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(statusCode.NotFound).json({ message: 'Usuário não encontrado!' });
        }
        res.status(statusCode.OK).json(user);
    } catch (error) {
        console.error('Erro ao buscar o usuário:', error);
        res.status(statusCode.InternalServerError).json({ error: 'Erro interno do servidor.' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(statusCode.NotFound).json({ message: 'Usuário não encontrado.' });
        }
        res.status(statusCode.OK).json({ message: 'Usuário atualizado com sucesso!', data: updatedUser });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(statusCode.BadRequest).json({ errors: error.errors });
        }
        console.error('Erro ao atualizar o usuário:', error);
        res.status(statusCode.InternalServerError).json({ error: 'Erro interno do servidor.' });
    }
};

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userDeleted = await userService.deleteUserById(req.params.id);
        if (!userDeleted) {
            return res.status(statusCode.NotFound).json({ message: 'Usuário não encontrado.' });
        }
        res.status(statusCode.OK).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar o usuário:', error);
        res.status(statusCode.InternalServerError).json({ error: 'Erro interno do servidor.' });
    }
};
