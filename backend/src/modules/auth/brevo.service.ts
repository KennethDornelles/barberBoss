import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BrevoService {
  private readonly logger = new Logger(BrevoService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    // Configuração CORRETA para Gmail
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true para 465, false para outras portas
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'), // Precisa ser senha de app
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verifica se a configuração está correta (sem bloquear o construtor)
    void this.verifyConnection();
  }

  /**
   * Verifica a conexão com o servidor SMTP
   */
  private async verifyConnection() {
    try {
      await this.transporter.verify();
      this.logger.log('✅ Servidor SMTP conectado e pronto para enviar emails');
    } catch (error) {
      this.logger.error('❌ Erro na configuração SMTP:', error.message);
      this.logger.error(
        'Verifique suas credenciais SMTP_USER e SMTP_PASS no .env',
      );
    }
  }

  /**
   * Envia código de recuperação de senha por e-mail
   */
  async sendRecoveryCodeEmail(email: string, name: string, code: string) {
    const html = this.getRecoveryEmailTemplate(name, code);

    try {
      this.logger.log(`📧 Enviando código de recuperação para: ${email}`);

      const info = await this.transporter.sendMail({
        from: `"BarberBoss" <${this.configService.get<string>('SMTP_USER')}>`,
        to: email,
        subject: 'Seu código de recuperação - BarberBoss',
        html: html,
        text: `Olá ${name}, seu código de recuperação é: ${code}. Ele expira em 15 minutos.`,
      });

      this.logger.log('✅ Email enviado com sucesso!');
      this.logger.log(`Message ID: ${info.messageId}`);
      this.logger.log(`Response: ${info.response}`);

      if (info.accepted && info.accepted.length > 0) {
        this.logger.log(`✅ Aceito por: ${info.accepted.join(', ')}`);
      }

      if (info.rejected && info.rejected.length > 0) {
        this.logger.warn(`⚠️ Rejeitado por: ${info.rejected.join(', ')}`);
      }

      return info;
    } catch (error) {
      this.logger.error('❌ Erro ao enviar código:', {
        message: error.message,
        code: error.code,
        command: error.command,
        response: error.response,
      });
      throw error;
    }
  }

  /**
   * Método obsoleto: envio de link de redefinição removido. Use sendRecoveryCodeEmail.
   */
  async sendForgotPasswordEmail(email: string, token: string) {
    this.logger.warn(
      'Método obsoleto. Use sendRecoveryCodeEmail para envio de código de recuperação.',
    );
    // Opcional: pode lançar erro ou apenas logar
    return;
  }

  /**
   * Template HTML para email de recuperação
   */
  private getRecoveryEmailTemplate(name: string, code: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: #3b82f6; padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">🔒 BarberBoss</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="font-size: 16px; color: #374151; margin: 0 0 20px;">
        Olá <strong>${name}</strong>,
      </p>
      
      <p style="font-size: 16px; color: #374151; margin: 0 0 30px;">
        Seu código de recuperação de senha é:
      </p>
      
      <!-- Code Box -->
      <div style="background: #f9fafb; border: 2px dashed #3b82f6; border-radius: 8px; padding: 30px; text-align: center; margin: 0 0 30px;">
        <div style="font-size: 48px; font-weight: bold; color: #3b82f6; letter-spacing: 12px; font-family: 'Courier New', monospace;">
          ${code}
        </div>
      </div>
      
      <p style="font-size: 14px; color: #6b7280; margin: 0 0 20px;">
        ⏰ Este código expira em <strong>15 minutos</strong>.
      </p>
      
      <p style="font-size: 14px; color: #6b7280; margin: 0;">
        Se você não solicitou este código, ignore este email. Sua senha permanecerá segura.
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 12px; color: #9ca3af; margin: 0;">
        © 2025 BarberBoss - Gestão de Barbearias
      </p>
    </div>
    
  </div>
</body>
</html>
    `.trim();
  }
}
