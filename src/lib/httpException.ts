export enum Errors {
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    FORBIDDEN_ERROR = 'FORBIDDEN_ERROR',
    INVALID_TOKEN = 'INVALID_TOKEN',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    TOKEN_REVOKED = 'TOKEN_REVOKED',
    UNAUTHORIZED = 'UNAUTHORIZED',
    UPLOAD_ERROR = 'UPLOAD_ERROR',
};

export class HttpException {
    status: number;
    message: string;
    error: Errors;
    
    constructor(status: number, message: string, error: Errors) {
        this.status = status;
        this.message = message || '';
        this.error = error;
    }
}