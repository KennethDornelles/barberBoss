"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando seed do BarberBoss...');
    await prisma.appointment.deleteMany();
    await prisma.service.deleteMany();
    await prisma.user.deleteMany();
    console.log('🗑️  Dados anteriores limpos');
    const hashedPassword = await bcrypt.hash('Olupa98@', 10);
    const admin = await prisma.user.create({
        data: {
            name: 'Admin Master',
            email: 'admin@barberboss.com',
            password: hashedPassword,
            phone: '83999887766',
            role: client_1.Role.ADMIN,
        },
    });
    console.log('✅ Admin criado:', admin.email);
    const barbeiro1 = await prisma.user.create({
        data: {
            name: 'Carlos Silva',
            email: 'carlos@barberboss.com',
            password: hashedPassword,
            phone: '83988776655',
            role: client_1.Role.BARBER,
        },
    });
    const barbeiro2 = await prisma.user.create({
        data: {
            name: 'Ricardo Mendes',
            email: 'ricardo@barberboss.com',
            password: hashedPassword,
            phone: '83977665544',
            role: client_1.Role.BARBER,
        },
    });
    console.log('✅ Barbeiros criados:', barbeiro1.name, barbeiro2.name);
    const cliente1 = await prisma.user.create({
        data: {
            name: 'João Pedro Santos',
            email: 'joao@email.com',
            password: hashedPassword,
            phone: '83966554433',
            role: client_1.Role.CLIENT,
        },
    });
    const cliente2 = await prisma.user.create({
        data: {
            name: 'Maria Oliveira',
            email: 'maria@email.com',
            password: hashedPassword,
            phone: '83955443322',
            role: client_1.Role.CLIENT,
        },
    });
    const cliente3 = await prisma.user.create({
        data: {
            name: 'Pedro Almeida',
            email: 'pedro@email.com',
            password: hashedPassword,
            phone: '83944332211',
            role: client_1.Role.CLIENT,
        },
    });
    console.log('✅ Clientes criados:', cliente1.name, cliente2.name, cliente3.name);
    const servicoCorte = await prisma.service.create({
        data: {
            name: 'Corte Tradicional',
            description: 'Corte clássico com máquina e tesoura',
            price: 35.0,
            durationMin: 30,
        },
    });
    const servicoBarba = await prisma.service.create({
        data: {
            name: 'Barba Completa',
            description: 'Aparar e modelar barba com navalha',
            price: 25.0,
            durationMin: 20,
        },
    });
    const servicoCorteBarba = await prisma.service.create({
        data: {
            name: 'Corte + Barba',
            description: 'Pacote completo: corte e barba',
            price: 55.0,
            durationMin: 45,
        },
    });
    const servicoPezinho = await prisma.service.create({
        data: {
            name: 'Pezinho',
            description: 'Acabamento na nuca',
            price: 15.0,
            durationMin: 15,
        },
    });
    const servicoSobrancelha = await prisma.service.create({
        data: {
            name: 'Sobrancelha',
            description: 'Design de sobrancelha',
            price: 20.0,
            durationMin: 15,
        },
    });
    console.log('✅ Serviços criados:', servicoCorte.name, servicoBarba.name, servicoCorteBarba.name);
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    const depoisDeAmanha = new Date(hoje);
    depoisDeAmanha.setDate(hoje.getDate() + 2);
    await prisma.appointment.create({
        data: {
            userId: cliente1.id,
            barberId: barbeiro1.id,
            serviceId: servicoCorte.id,
            startsAt: new Date(hoje.setHours(9, 0, 0, 0)),
            endsAt: new Date(hoje.setHours(9, 30, 0, 0)),
            status: client_1.AppointmentStatus.CONFIRMED,
        },
    });
    await prisma.appointment.create({
        data: {
            userId: cliente2.id,
            barberId: barbeiro1.id,
            serviceId: servicoBarba.id,
            startsAt: new Date(hoje.setHours(10, 0, 0, 0)),
            endsAt: new Date(hoje.setHours(10, 20, 0, 0)),
            status: client_1.AppointmentStatus.CONFIRMED,
        },
    });
    await prisma.appointment.create({
        data: {
            userId: cliente3.id,
            barberId: barbeiro2.id,
            serviceId: servicoCorteBarba.id,
            startsAt: new Date(hoje.setHours(14, 0, 0, 0)),
            endsAt: new Date(hoje.setHours(14, 45, 0, 0)),
            status: client_1.AppointmentStatus.CONFIRMED,
        },
    });
    await prisma.appointment.create({
        data: {
            userId: cliente1.id,
            barberId: barbeiro2.id,
            serviceId: servicoCorteBarba.id,
            startsAt: new Date(amanha.setHours(9, 30, 0, 0)),
            endsAt: new Date(amanha.setHours(10, 15, 0, 0)),
            status: client_1.AppointmentStatus.PENDING,
        },
    });
    await prisma.appointment.create({
        data: {
            userId: cliente2.id,
            barberId: barbeiro1.id,
            serviceId: servicoPezinho.id,
            startsAt: new Date(amanha.setHours(11, 0, 0, 0)),
            endsAt: new Date(amanha.setHours(11, 15, 0, 0)),
            status: client_1.AppointmentStatus.PENDING,
        },
    });
    await prisma.appointment.create({
        data: {
            userId: cliente3.id,
            barberId: barbeiro1.id,
            serviceId: servicoSobrancelha.id,
            startsAt: new Date(depoisDeAmanha.setHours(15, 30, 0, 0)),
            endsAt: new Date(depoisDeAmanha.setHours(15, 45, 0, 0)),
            status: client_1.AppointmentStatus.PENDING,
        },
    });
    await prisma.appointment.create({
        data: {
            userId: cliente2.id,
            barberId: barbeiro2.id,
            serviceId: servicoCorte.id,
            startsAt: new Date(hoje.setHours(16, 0, 0, 0)),
            endsAt: new Date(hoje.setHours(16, 30, 0, 0)),
            status: client_1.AppointmentStatus.CANCELED,
        },
    });
    console.log('✅ Agendamentos criados');
    const totalUsers = await prisma.user.count();
    const totalServices = await prisma.service.count();
    const totalAppointments = await prisma.appointment.count();
    console.log('\n📊 Resumo do Seed:');
    console.log(`   - Usuários: ${totalUsers}`);
    console.log(`   - Serviços: ${totalServices}`);
    console.log(`   - Agendamentos: ${totalAppointments}`);
    console.log('\n🎉 Seed concluído com sucesso!');
    console.log('\n🔑 Credenciais de acesso:');
    console.log('   Admin: admin@barberboss.com / Olupa98@');
    console.log('   Barbeiro 1: carlos@barberboss.com / Olupa98@');
    console.log('   Barbeiro 2: ricardo@barberboss.com / Olupa98@');
    console.log('   Cliente: joao@email.com / Olupa98@');
}
main()
    .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map