import { Router } from 'express';
import { statusCode } from '../utils/statusCode';
import * as userController from '../controllers/userController';

const router = Router();
router.get('/', (req, res) => {
    return res.status(statusCode.BadRequest).json({ "Mensagem": "Esta é a rota padrão, utilize as rotas /users para fazer as requisições." });
});

// Cadastrar usuários
router.post('/users', userController.createUser);

// Listar todos os usuários
router.get('/users', userController.getAllUsers);

// Retornar dados de um usuário em específico
router.get('/users/:id', userController.getUserById);

// Atualizar um usuário pelo ID
router.put('/users/:id', userController.updateUser);

// Deleta um usuário pelo ID
router.delete('/users/:id', userController.deleteUserById);
   
export default router;
