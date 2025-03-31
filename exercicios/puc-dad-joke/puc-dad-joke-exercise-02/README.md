# PUC DAD JOKES

PUC DAD JOKES é uma aplicação onde é possível adicionar piadas, gerar piadas aleatórias e buscar por piadas cadastradas. O projeto é dividido em duas partes: WEB desenvolvida com React e uma API construída com Node.js.

O código inicial está disponível neste [repositório](https://github.com/CampossCaio/puc-dad-joke/tree/exercise-02).

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

Praticar os conceitos aprendidos em aula sobre gerenciamento de estado com Context API e Redux, aplicando-os na refatoração da funcionalidade de autenticação da aplicação:

### 1. Refatorando a Autenticação

A aplicação atual utiliza uma funcionalidade de autenticação onde o usuário precisa estar autenticado para poder submeter piadas. Atualmente, há um usuário hardcoded no `AuthService`, sendo:

- **E-mail:** `puc@gmail.com`
- **Senha:** `123456`

O usuário precisa estar disponível em várias partes da aplicação, como:

- Header
- Página de Sign In
- Componente de rotas protegidas (`RequireAuth`)

Atualmente, esse usuário está armazenado em um estado no arquivo `App.tsx` e é repassado via propriedade para os componentes que precisam dele. No entanto, isso é uma má prática chamada **prop drilling** no React.

#### Objetivo da Refatoração

Refatorar a aplicação para que o usuário e as funções referentes a ele sejam armazenadas em um **estado global**, permitindo que qualquer componente possa acessá-lo sem precisar recebê-lo via props.

Vocês deverão implementar **ambos** os métodos de gerenciamento de estado:

- **Context API**
- **Redux**

Deverão ser disponibilizados dois **hooks** para que possamos escolher qual método de gerenciamento utilizar, conforme foi demonstrado em aula.

### 2. Implementação do Estado Global

A aplicação já possui um contexto de autenticação pré-criado em `context/auth`. Vocês deverão completá-lo. Há também dois hooks pré-criados na pasta `hooks`: `useAuthWithContext` e `useAuthWithRedux`. Vocês também deverão completá-los. Além disso, será necessário completar o slice de usuário na pasta `slices/user`.

Depois de ajustar essas partes, refatore a aplicação para utilizá-las ao invés de repassar o usuário via propriedade.