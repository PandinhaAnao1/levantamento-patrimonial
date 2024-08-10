const messages = {

    httpCodes: {
        200: "Requisição bem sucedida.",
        201: "Requisição bem sucedida, recurso foi criado",
        202: "Requisição aceita para processamento em andamento",
        204: "Requisição bem sucedida, sem conteúdo para retornar",
        205: "Requisição precisa de mais dados para ser processada",
        206: "Requisição bem sucedida, porém apenas parte do recurso foi retornada",
        207: "Requisição bem sucedida, mas a resposta possui mais de um recurso associado",
        208: "Requisição bem sucedida, mas o conteúdo retornado não é mais válido",

        300: "Requisição bem sucedida, mas requisição tem múltiplas respostas possíveis, cliente deve escolher uma",
        301: "O recurso solicitado foi movido permanentemente para um novo endereço",
        302: "O recurso solicitado foi encontrado, mas foi movido temporariamente para um novo endereço.",
        303: "Recurso encontrado, mas atenção a referência mais adequada a seguir.",
        304: "A requisição foi bem sucedida, cliente possui a versão mais atualizada.",
        305: "Recurso solicitado só está disponível por meio do proxy",
        307: "O recurso solicitado foi temporariamente movido para um novo endereço.",
        308: "O recurso solicitado foi permanentemente movido para um novo endereço.",

        400: "Requisição com sintaxe incorreta ou outros problemas.",
        401: "Cliente sem credenciais para acessar o recurso solicitado.",
        403: "Sem permissão para atender a requisição.",
        404: "O recurso solicitado não foi encontrado no servidor.",
        405: "O método HTTP não é suportado para o recurso solicitado.",
        408: "O servidor terminou a conexão, requisição levou muito tempo.",
        409: "A requisição do cliente em conflito com o estado atual do servidor.",
        410: "O recurso solicitado não está mais disponível no servidor.",
        413: "O servidor recusou a requisição porque o corpo da requisição é muito grande.",
        418: "Eu sou um bule de chá.",
        422: "A requisição foi mal sucedida, falha na validação.",
        423: "Recurso bloqueado.",
        431: "Cabeçalhos da requisição são muito grandes.",
        451: "Acesso negado por motivos legais.",
        498: "Acesso negado devido o token ser inválido.",
        500: "Servidor encontrou um erro interno.",
        501: "Funcionalidade não suportada.",
        502: "O servidor atuando como gateway ou proxy recebeu uma resposta inválida.",
        503: "O servidor está temporariamente indisponível, em manutenção ou em sobrecarga."
    },

};

export const sendResponse = (res, code, data = [], errors = []) => {
    return res.status(code).json({
        data: data,
        error: false,
        code: code,
        message: messages.httpCodes[code],
        errors: errors
    });
};

export default messages;
