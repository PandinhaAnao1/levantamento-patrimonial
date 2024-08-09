import messages from "./messages.js";

class CommonResponse {
    constructor(error, code, message, data = []) {
        this.error = error;
        this.code = code;
        this.message = message;
        this.data = data;
    }


    static success(data) {
        return new CommonResponse(false, 200, messages.httpCodes[200], data);
    }

    static created(data) {
        return new CommonResponse(false, 201, message = messages.httpCodes[201], data);
    }

    static accepted(data) {
        return new CommonResponse(false, 202, messages.httpCodes[202], data);
    }

    static noContent() {
        return new CommonResponse(false, 204, message = messages.httpCodes[204]);
    }

    static resetContent(message = messages.httpCodes[205]) {
        return new CommonResponse(false, 205, message);
    }

    static partialContent(data, message = messages.httpCodes[206]) {
        return new CommonResponse(false, 206, message, data);
    }

    static multiStatus(data, message = messages.httpCodes[207]) {
        return new CommonResponse(false, 207, message, data);
    }

    static alreadyReported(data, message = messages.httpCodes[208]) {
        return new CommonResponse(false, 208, message, data);
    }

    static multipleChoices(data, message = messages.httpCodes[300]) {
        return new CommonResponse(false, 300, message, data);
    }

    static movedPermanently(message = messages.httpCodes[301]) {
        return new CommonResponse(false, 301, message);
    }

    static found(message = messages.httpCodes[302]) {
        return new CommonResponse(false, 302, message);
    }

    static seeOther(message = messages.httpCodes[303]) {
        return new CommonResponse(false, 303, message);
    }

    static notModified(message = messages.httpCodes[304]) {
        return new CommonResponse(false, 304, message);
    }

    static useProxy(message = messages.httpCodes[305]) {
        return new CommonResponse(false, 305, message);
    }

    static temporaryRedirect(message = messages.httpCodes[307]) {
        return new CommonResponse(false, 307, message);
    }

    static permanentRedirect(message = messages.httpCodes[308]) {
        return new CommonResponse(false, 308, message);
    }

    static badRequest(message = messages.error.invalidRequest) {
        return new CommonResponse(true, 400, message);
    }

    static unauthorized(message = messages.error.unauthorizedAccess) {
        return new CommonResponse(true, 401, message);
    }

    static forbidden(message = messages.error.invalidPermission) {
        return new CommonResponse(true, 403, message);
    }

    static notFound(message = messages.error.resourceNotFound('Recurso')) {
        return new CommonResponse(true, 404, message);
    }

    static methodNotAllowed(message = messages.httpCodes[405]) {
        return new CommonResponse(true, 405, message);
    }

    static requestTimeout(message = messages.httpCodes[408]) {
        return new CommonResponse(true, 408, message);
    }

    static conflict(message = messages.httpCodes[409]) {
        return new CommonResponse(true, 409, message);
    }

    static gone(message = messages.httpCodes[410]) {
        return new CommonResponse(true, 410, message);
    }

    static payloadTooLarge(message = messages.httpCodes[413]) {
        return new CommonResponse(true, 413, message);
    }

    static teapot(message = messages.httpCodes[418]) {
        return new CommonResponse(true, 418, message);
    }

    static unprocessableEntity(message = messages.httpCodes[422]) {
        return new CommonResponse(true, 422, message);
    }

    static locked(message = messages.httpCodes[423]) {
        return new CommonResponse(true, 423, message);
    }

    static requestHeaderFieldsTooLarge(message = messages.httpCodes[431]) {
        return new CommonResponse(true, 431, message);
    }

    static unavailableForLegalReasons(message = messages.httpCodes[451]) {
        return new CommonResponse(true, 451, message);
    }

    static invalidToken(message = messages.httpCodes[498]) {
        return new CommonResponse(true, 498, message);
    }

    static serverError(message = messages.error.serverError) {
        return new CommonResponse(true, 500, message);
    }

    static notImplemented(message = messages.httpCodes[501]) {
        return new CommonResponse(true, 501, message);
    }

    static badGateway(message = messages.httpCodes[502]) {
        return new CommonResponse(true, 502, message);
    }

    static serviceUnavailable() {
        return new CommonResponse(true, 503, messages.httpCodes[503]);
    }
}

export default CommonResponse;
