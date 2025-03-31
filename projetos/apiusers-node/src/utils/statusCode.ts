export enum statusCode {
    // 2xx: Success
    OK = 200,                  // A requisição foi bem-sucedida
    Created = 201,             // Recurso criado com sucesso
    Accepted = 202,            // A requisição foi recebida, mas ainda não processada
    NoContent = 204,           // A requisição foi bem-sucedida, mas não há conteúdo para retornar

    // 4xx: Client Errors
    BadRequest = 400,          // A requisição é inválida ou malformada
    Unauthorized = 401,        // O usuário não está autenticado
    Forbidden = 403,           // O usuário não tem permissão para acessar o recurso
    NotFound = 404,            // O recurso solicitado não foi encontrado
    MethodNotAllowed = 405,    // O método HTTP não é permitido para o recurso
    Conflict = 409,            // Conflito com o estado atual do recurso (geralmente em operações de criação ou atualização)

    // 5xx: Server Errors
    InternalServerError = 500, // Erro interno no servidor, algo deu errado
    ServiceUnavailable = 503,  // O servidor não está disponível, geralmente devido a manutenção ou sobrecarga
    GatewayTimeout = 504       // O servidor atuando como gateway ou proxy não recebeu uma resposta a tempo de um servidor upstream
}
