"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
require("./config/dayjs.config");
const filters_1 = require("./common/filters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (process.env.NODE_ENV === 'production') {
        app.use((0, helmet_1.default)({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'"],
                    styleSrc: ["'self'"],
                    imgSrc: ["'self'", 'data:', 'https:'],
                    connectSrc: ["'self'"],
                    fontSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    mediaSrc: ["'self'"],
                    frameSrc: ["'none'"],
                    baseUri: ["'self'"],
                    formAction: ["'self'"],
                    upgradeInsecureRequests: [],
                },
            },
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true,
            },
            noSniff: true,
            referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
            crossOriginEmbedderPolicy: false,
        }));
    }
    else {
        console.log('⚠️  Helmet desabilitado em desenvolvimento');
    }
    const getAllowedOrigins = () => {
        if (process.env.NODE_ENV === 'production') {
            if (!process.env.ALLOWED_ORIGINS) {
                throw new Error('ALLOWED_ORIGINS deve ser configurado em produção');
            }
            return process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim());
        }
        return [
            'http://localhost:8100',
            'http://localhost:4200',
            'http://localhost:3000',
            'http://127.0.0.1:4200',
            'http://127.0.0.1:8100',
            'http://192.168.0.8:8100',
            'http://192.168.0.8:4200',
            'http://192.168.0.9:8100',
            'capacitor://localhost',
            'ionic://localhost',
            'http://localhost',
            'https://edacious-closer-catrice.ngrok-free.dev',
        ];
    };
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = getAllowedOrigins();
            if (!origin) {
                return callback(null, true);
            }
            const isAllowed = allowedOrigins.some((allowed) => {
                return origin === allowed || origin.startsWith(allowed);
            });
            if (isAllowed) {
                callback(null, true);
            }
            else {
                console.warn(`❌ CORS bloqueou origin: ${origin}`);
                console.warn(`✅ Origins permitidas: ${allowedOrigins.join(', ')}`);
                if (process.env.NODE_ENV !== 'production') {
                    callback(null, true);
                }
                else {
                    callback(new Error(`Origin ${origin} não permitida pelo CORS`));
                }
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'X-Requested-With',
            'ngrok-skip-browser-warning',
            'Origin',
        ],
        exposedHeaders: ['Authorization'],
        credentials: true,
        maxAge: 86400,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        stopAtFirstError: false,
        disableErrorMessages: process.env.NODE_ENV === 'production',
    }));
    app.useGlobalFilters(new filters_1.AllExceptionsFilter(), new filters_1.PrismaExceptionFilter(), new filters_1.HttpExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Barber Boss API')
        .setDescription('API para gerenciamento de barbearia')
        .setVersion('1.0')
        .addTag('auth', 'Autenticação e autorização')
        .addTag('users', 'Operações relacionadas aos usuários')
        .addTag('services', 'Operações relacionadas aos serviços')
        .addTag('appointments', 'Operações relacionadas aos agendamentos')
        .addTag('settings', 'Configurações da barbearia')
        .addTag('time-blocks', 'Bloqueio de horários')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT obtido no /auth/login',
        in: 'header',
    }, 'JWT-auth')
        .setContact('Equipe BarberBoss', 'https://barberboss.com', 'contato@barberboss.com')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    if (process.env.NODE_ENV !== 'production') {
        swagger_1.SwaggerModule.setup('api', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
            },
        });
    }
    else {
        console.warn('⚠️  Swagger UI desabilitado em produção por segurança');
    }
    const port = process.env.PORT ?? 3000;
    await app.listen(port, '0.0.0.0');
    console.log('');
    console.log('🚀 Aplicação rodando em:');
    console.log(`   Local:  http://localhost:${port}`);
    console.log(`   Docker: http://0.0.0.0:${port}`);
    if (process.env.NGROK_DOMAIN) {
        console.log(`   Ngrok:  https://${process.env.NGROK_DOMAIN}`);
    }
    console.log('');
    console.log(`📚 Swagger UI: http://localhost:${port}/api`);
    console.log(`🔒 Ambiente: ${process.env.NODE_ENV}`);
    console.log(`🌐 CORS Origins: ${getAllowedOrigins().length} configuradas`);
    console.log('');
}
void bootstrap();
//# sourceMappingURL=main.js.map