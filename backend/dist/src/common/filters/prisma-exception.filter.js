"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaExceptionFilter = PrismaExceptionFilter_1 = class PrismaExceptionFilter {
    logger = new common_1.Logger(PrismaExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Erro no banco de dados';
        let error = 'Database Error';
        switch (exception.code) {
            case 'P2002': {
                status = common_1.HttpStatus.CONFLICT;
                const target = exception.meta?.target || [];
                message = `Já existe um registro com este(s) valor(es): ${target.join(', ')}`;
                error = 'Unique Constraint Violation';
                break;
            }
            case 'P2025':
                status = common_1.HttpStatus.NOT_FOUND;
                message = 'Registro não encontrado';
                error = 'Record Not Found';
                break;
            case 'P2003':
                status = common_1.HttpStatus.BAD_REQUEST;
                message =
                    'Violação de chave estrangeira - registro relacionado não existe';
                error = 'Foreign Key Constraint Violation';
                break;
            case 'P2014':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'A operação viola uma relação obrigatória';
                error = 'Required Relation Violation';
                break;
            case 'P2021':
                status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                message = 'Erro de configuração do banco de dados';
                error = 'Table Not Found';
                break;
            case 'P2022':
                status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                message = 'Erro de configuração do banco de dados';
                error = 'Column Not Found';
                break;
            case 'P2000':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Valor muito longo para o campo';
                error = 'Value Too Long';
                break;
            case 'P2001':
                status = common_1.HttpStatus.NOT_FOUND;
                message = 'Registro não encontrado para a condição especificada';
                error = 'Record Not Found';
                break;
            case 'P2011':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Campo obrigatório não pode ser nulo';
                error = 'Null Constraint Violation';
                break;
            case 'P2012':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Valor obrigatório ausente';
                error = 'Missing Required Value';
                break;
            case 'P2015':
                status = common_1.HttpStatus.NOT_FOUND;
                message = 'Registro relacionado não encontrado';
                error = 'Related Record Not Found';
                break;
            default:
                this.logger.error(`Unhandled Prisma Error Code: ${exception.code}`, JSON.stringify(exception));
                break;
        }
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message,
            error,
            code: exception.code,
        };
        this.logger.error(`Prisma Exception: ${exception.code} - ${request.method} ${request.url}`, JSON.stringify({
            ...errorResponse,
            meta: exception.meta,
            user: request.user?.id,
        }));
        response.status(status).json(errorResponse);
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = PrismaExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
//# sourceMappingURL=prisma-exception.filter.js.map