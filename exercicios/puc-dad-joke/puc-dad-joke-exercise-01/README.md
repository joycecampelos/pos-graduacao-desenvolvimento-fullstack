# PUC DAD JOKES

PUC DAD JOKES é uma aplicação onde é possível adicionar piadas, gerar piadas aleatórias e buscar por piadas cadastradas. O projeto é dividido em duas partes: web desenvolvida com React e uma api construído com Node.js.

## Tecnologias Utilizadas

- **Frontend:** React
- **Backend:** Node.js com Fastify
- **Banco de Dados:** SQLite
- **Querybuilder:** Knex.js

## Como Rodar o Projeto

### 1. Executando o Backend

1. Acesse a pasta da API:
   ```sh
   cd api
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Gere as migrations para criar as tabelas no banco de dados:
   ```sh
   npm run knex
   ```
4. Popule o banco de dados com dados iniciais (seeds):
   ```sh
   npx knex seed:run
   ```
5. Inicie o servidor:
   ```sh
   npm run dev
   ```
   O backend estará rodando em: `http://localhost:3333`

### 2. Executando o Frontend

1. Acesse a pasta do frontend:
   ```sh
   cd web
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o ambiente de desenvolvimento:
   ```sh
   npm run dev
   ```
   O frontend estará rodando em: `http://localhost:3000`

Agora, a aplicação estará rodando e pronta para uso!

## Objetivo do Exercício

Praticar os conceitos aprendidos em aula, sobre comunicação entre componentes, roteamento e conexão com apis externas no React, seguindo os seguintes passos de implementação:

### 1. Configuração de Rotas

1. Instalar o React Router:
   ```sh
   npm install react-router
   ```
2. Configurar as rotas da aplicação para que funcionem corretamente. As rotas principais são:
   - Home
   - Search
   - Submit
3. Criar um layout para manter o header fixo em todas as rotas.

### 2. Integração com API

1. Instalar o Axios:
   ```sh
   npm install axios
   ```
2. Criar um arquivo `services/JokerService.ts` e implementar as seguintes funções:
   - Gerar uma piada aleatória
   - Criar uma nova piada
   - Buscar todas as piadas, com opção de filtro por query

### 3. Endpoints da API

- Buscar piadas:
  ```sh
  GET http://localhost:3333/joke
  ```
  Pode receber o query param `query`, por exemplo:
  ```sh
  GET http://localhost:3333/joke?query=dad
  ```
- Buscar piada aleatória:
  ```sh
  GET http://localhost:3333/joke/random
  ```
- Criar uma nova piada:
  ```sh
  POST http://localhost:3333/joke
  ```

### 4. Implementação das Páginas

Cada funcionalidade deverá ser implementada em `src/pages`:

- **Home:** Exibir uma piada aleatória.
- **Search Joke:** Listar todas as piadas e permitir a busca por piadas específicas.
- **Submit:** Criar uma nova piada.

### 5. Extras (Opcional)

- Implementar feedbacks com toast.
- Adicionar tratamentos de erros para aprimorar a experiência do usuário.

## Funcionalidades esperadas

Ao fim do exercício, espera-se que as seguintes funcionalidades estejam implementadas:

- Navegação entre as rotas.
- Geração de piada aleatória na Home.
- Listagem de piadas na Search Joke, com opção de busca.
- Criação de novas piadas na página Submit.
- Funcionalidade de copiar as piadas para a área de transferência.
