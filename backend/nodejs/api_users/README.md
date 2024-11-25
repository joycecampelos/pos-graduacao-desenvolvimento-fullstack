# API Simples com Node.js (Módulos Nativos)

## Descrição

Este projeto consiste em uma API simples desenvolvida utilizando **apenas os módulos nativos do Node.js**, sem frameworks externos como Express. O objetivo principal é praticar conceitos fundamentais de Node.js, como manipulação de requisições HTTP, rotas e gerenciamento de dados em memória.

## Funcionalidades

A API implementa as seguintes rotas básicas:

### 1. **Adicionar Usuários**
- **Método**: `POST`
- **Rota**: `/users`
- **Descrição**: Adiciona um novo usuário ao sistema.
- **Exemplo de Corpo da Requisição**:
  ```json
  {
      "name": "João Silva",
      "email": "joao.silva@example.com",
      "senha": "123456"
  }
  ```
- **Resposta:**
  - **Sucesso**: Retorna uma mensagem de sucesso.

### 2. **Listar Usuários**
- **Método**: `GET`
- **Rota**: `/users`
- **Descrição**: Retorna a lista de todos os usuários cadastrados no sistema.
- **Resposta**:
  - Uma lista contendo todos os usuários em formato JSON.
  - **Exemplo**:
  ```json
  [
    {
      "id": "fa7043f8-5a6b-4de8-971e-a1fad99ab2f5",
      "name": "João Silva",
      "email": "joao.silva@example.com",
      "senha": "12345"
    },
    {
      "id": "0833bb29-e4fb-4ada-8415-d6235aa340dj",
      "name": "Maria Oliveira",
      "email": "maria.oliveira@example.com",
      "senha": "12345"
    }
  ]
  ```

#### Observações
- Os dados dos usuários são armazenados em um array em memória e não em um banco de dados.

## Como Executar
### 1. **Clonar o Repositório**
```
git clone https://github.com/joycecampelos/pos_graduacao-desenvolvimento_fullstack.git
```

### 2. **Navegar até o Diretório do Projeto**
```
cd pos_graduacao-desenvolvimento_fullstack/backend/nodejs/api_users
```

### 3. **Executar o Projeto**
```
node server.js
```

### 4. **Testar as Rotas**
- Você pode usar ferramentas como **Postman**, **Insomnia** ou a extensão **Thunder Client** do VS Code para testar as rotas da API.

## Tecnologias Utilizadas
- **Node.js**: Módulos nativos (`http`, `url`, etc.)
