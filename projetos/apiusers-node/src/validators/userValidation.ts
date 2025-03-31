import { z } from 'zod';

// Definindo o schema para validação de usuário
export const userSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório!" }),
    email: z.string().email({ message: "Email inválido!" }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});
