# API de Gerenciamento de Livros

## Tarefa: Implementar endpoints de edição e deleção de livros

## Descrição
Este projeto tem como objetivo implementar dois endpoints em uma API para gerenciar livros, permitindo a edição e exclusão de livros cadastrados por usuários. A tarefa também inclui a criação de testes automatizados para garantir a funcionalidade correta desses endpoints. O código inicial está disponível neste [repositório](https://github.com/CampossCaio/puc-minas/tree/main/nodejs/classes/api-rest-nodejs).

## Objetivo
1. **Endpoint PUT /books/:id**:
    - Permitir a edição de um livro existente.
    - Restringir a edição a livros cadastrados pelo próprio usuário.
    - Retornar uma resposta adequada em caso de erro, como `404 Not Found` para livros não encontrados.

2. **Endpoint DELETE /books/:id**:
    - Permitir a exclusão de um livro existente.
    - Restringir a exclusão a livros cadastrados pelo próprio usuário.
    - Retornar uma resposta adequada em caso de erro (`404 Not Found`) e uma confirmação de sucesso (`200 OK` ou `204 No Content`).

3. **Testes Automatizados**:
    - Garantir o funcionamento correto dos endpoints `PUT` e `DELETE` através de testes.

## Requisitos do Projeto
### **Endpoint PUT /books/:id**
- Editar um livro específico com base no `id`.
- Aceitar dados atualizados no corpo da requisição, como:
  ```json
  {
      "title": "Novo Título",
      "author": "Novo Autor",
      "genrer": "Ficção Científica"
  }
  ```
- Validar a existência do livro antes da edição.
- Restringir a edição a livros cadastrados pelo usuário autenticado.

### **Endpoint DELETE /books/:id**
- Excluir um livro com base no `id`.
- Validar a existência do livro antes da exclusão.
- Restringir a exclusão a livros cadastrados pelo usuário autenticado.
- Retornar uma resposta apropriada após a exclusão.

## Como Executar
### 1. **Clonar o Repositório**
```
git clone https://github.com/joycecampelos/pos_graduacao-desenvolvimento_fullstack.git
```
pos_graduacao-desenvolvimento_fullstack/backend/nodejs/api_books

### 2. **Navegar até o Diretório do Projeto**
```
cd pos_graduacao-desenvolvimento_fullstack/backend/nodejs/api_books
```

### 3. **Instalar as Dependências**
```
npm install
```

### 4. **Configurar Variáveis de Ambiente**
Crie os arquivos `.env` e `.env.test`, baseando-se nos exemplos fornecidos (`.env.example` e `.env.test.example`), e preencha as variáveis com os valores necessários:
```
NODE_ENV=development
DATABASE_URL='./db/db.sqlite'
DATABASE_CLIENT=sqlite
```

### 5. **Rodar as Migrations**
As migrações são necessárias para criar as tabelas no banco de dados.
```
npx knex migrate:latest
```

### 6. **Executar o Servidor**
```
npm run dev
```

## Testes
Testes automatizados foram desenvolvidos para os endpoints `PUT` e `DELETE`. Eles garantem que as seguintes funcionalidades estejam funcionando corretamente:

1. Respostas adequadas para livros não encontrados (`404 Not Found`).
2. Validação de permissões do usuário.
3. Respostas de sucesso para edição e exclusão bem-sucedidas.

Para executar os testes:
```
npm run test
```

## Ferramentas Utilizadas
- **Node.js** com o Framework **Fastify**.
- **NPM**: Gerenciamento das dependências.
- **Knex.js**: Gerenciamento de migrations e query builder.
- **SQLite**: Banco de dados para persistência.
- **Vitest** e **Supertest**: Ferramentas de testes.
