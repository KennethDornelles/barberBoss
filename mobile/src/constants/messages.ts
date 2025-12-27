// src/constants/messages.ts

/**
 * Error Messages (Portuguese)
 */
export const ERROR_MESSAGES = {
  // Network
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  TIMEOUT: 'Tempo de resposta excedido. Tente novamente.',

  // Auth
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para esta ação.',
  INVALID_CREDENTIALS: 'E-mail ou senha inválidos.',
  USER_NOT_FOUND: 'Usuário não encontrado.',
  EMAIL_ALREADY_EXISTS: 'Este e-mail já está cadastrado.',
  
  // Generic
  NOT_FOUND: 'Recurso não encontrado.',
  INTERNAL_SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique os campos.',
  UNKNOWN_ERROR: 'Erro desconhecido. Tente novamente.',

  // Validation
  REQUIRED_FIELD: 'Este campo é obrigatório.',
  INVALID_EMAIL: 'E-mail inválido.',
  INVALID_PHONE: 'Telefone inválido.',
  INVALID_CPF: 'CPF inválido.',
  PASSWORD_TOO_SHORT: 'A senha deve ter no mínimo 8 caracteres.',
  PASSWORD_TOO_WEAK: 'A senha deve conter letras maiúsculas, minúsculas e números.',
  PASSWORDS_DONT_MATCH: 'As senhas não coincidem.',

  // Appointments
  APPOINTMENT_NOT_FOUND: 'Agendamento não encontrado.',
  APPOINTMENT_CONFLICT: 'Já existe um agendamento neste horário.',
  APPOINTMENT_PAST: 'Não é possível agendar em horários passados.',
  APPOINTMENT_TOO_EARLY: 'Agendamento deve ser feito com antecedência mínima.',
  APPOINTMENT_TOO_FAR: 'Agendamento não pode ser tão distante.',

  // Services
  SERVICE_NOT_FOUND: 'Serviço não encontrado.',
  SERVICE_INACTIVE: 'Este serviço não está mais disponível.',

  // Time Blocks
  TIME_BLOCK_CONFLICT: 'Já existe um bloqueio neste horário.',
} as const;

/**
 * Success Messages (Portuguese)
 */
export const SUCCESS_MESSAGES = {
  // Auth
  LOGIN: 'Login realizado com sucesso!',
  LOGOUT: 'Logout realizado com sucesso!',
  REGISTER: 'Cadastro realizado com sucesso!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  PASSWORD_CHANGED: 'Senha alterada com sucesso!',

  // Appointments
  APPOINTMENT_CREATED: 'Agendamento criado com sucesso!',
  APPOINTMENT_UPDATED: 'Agendamento atualizado com sucesso!',
  APPOINTMENT_CANCELLED: 'Agendamento cancelado com sucesso!',
  APPOINTMENT_CONFIRMED: 'Agendamento confirmado com sucesso!',
  APPOINTMENT_COMPLETED: 'Agendamento concluído com sucesso!',

  // Services
  SERVICE_CREATED: 'Serviço criado com sucesso!',
  SERVICE_UPDATED: 'Serviço atualizado com sucesso!',
  SERVICE_DELETED: 'Serviço removido com sucesso!',

  // Settings
  SETTINGS_UPDATED: 'Configurações atualizadas com sucesso!',

  // Time Blocks
  TIME_BLOCK_CREATED: 'Bloqueio criado com sucesso!',
  TIME_BLOCK_UPDATED: 'Bloqueio atualizado com sucesso!',
  TIME_BLOCK_DELETED: 'Bloqueio removido com sucesso!',
} as const;

/**
 * Confirmation Messages (Portuguese)
 */
export const CONFIRMATION_MESSAGES = {
  // Appointments
  CANCEL_APPOINTMENT: 'Tem certeza que deseja cancelar este agendamento?',
  DELETE_APPOINTMENT: 'Tem certeza que deseja excluir este agendamento?',

  // Services
  DELETE_SERVICE: 'Tem certeza que deseja excluir este serviço?',
  DEACTIVATE_SERVICE: 'Tem certeza que deseja desativar este serviço?',

  // Time Blocks
  DELETE_TIME_BLOCK: 'Tem certeza que deseja remover este bloqueio?',

  // Account
  LOGOUT: 'Tem certeza que deseja sair?',
  DELETE_ACCOUNT: 'Tem certeza que deseja excluir sua conta? Esta ação é irreversível.',
} as const;

/**
 * Info Messages (Portuguese)
 */
export const INFO_MESSAGES = {
  NO_APPOINTMENTS: 'Você não tem agendamentos.',
  NO_SERVICES: 'Nenhum serviço cadastrado.',
  NO_TIME_BLOCKS: 'Nenhum bloqueio de horário.',
  NO_AVAILABLE_SLOTS: 'Não há horários disponíveis para este dia.',
  LOADING: 'Carregando...',
  SAVING: 'Salvando...',
  DELETING: 'Excluindo...',
  PROCESSING: 'Processando...',
} as const;

/**
 * Placeholder Messages (Portuguese)
 */
export const PLACEHOLDER_MESSAGES = {
  EMAIL: 'seu@email.com',
  PASSWORD: '••••••••',
  NAME: 'Nome completo',
  PHONE: '(XX) XXXXX-XXXX',
  SEARCH: 'Pesquisar...',
  DESCRIPTION: 'Descrição (opcional)',
  NOTES: 'Observações (opcional)',
} as const;