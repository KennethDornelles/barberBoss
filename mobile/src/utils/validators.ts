// src/utils/validators.ts
import { REGEX_PATTERNS, VALIDATION } from '../constants/validation';
import { ERROR_MESSAGES } from '../constants/messages';

/**
 * Validate Email
 */
export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (!REGEX_PATTERNS.EMAIL.test(email)) {
    return ERROR_MESSAGES.INVALID_EMAIL;
  }

  if (email.length > VALIDATION.EMAIL_MAX_LENGTH) {
    return `E-mail não pode ter mais de ${VALIDATION.EMAIL_MAX_LENGTH} caracteres.`;
  }

  return undefined;
};

/**
 * Validate Password
 */
export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }

  if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
    return `Senha não pode ter mais de ${VALIDATION.PASSWORD_MAX_LENGTH} caracteres.`;
  }

  if (!REGEX_PATTERNS.PASSWORD.test(password)) {
    return ERROR_MESSAGES.PASSWORD_TOO_WEAK;
  }

  return undefined;
};

/**
 * Validate Name
 */
export const validateName = (name: string): string | undefined => {
  if (!name) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
    return `Nome deve ter no mínimo ${VALIDATION.NAME_MIN_LENGTH} caracteres.`;
  }

  if (name.length > VALIDATION.NAME_MAX_LENGTH) {
    return `Nome não pode ter mais de ${VALIDATION.NAME_MAX_LENGTH} caracteres.`;
  }

  if (!REGEX_PATTERNS.NAME.test(name)) {
    return 'Nome contém caracteres inválidos.';
  }

  return undefined;
};

/**
 * Validate Phone (Brazilian format)
 */
export const validatePhone = (phone: string): string | undefined => {
  if (!phone) {
    return undefined; // Phone is optional
  }

  // Remove formatting
  const digitsOnly = phone.replace(/\D/g, '');

  if (!REGEX_PATTERNS.PHONE_DIGITS_ONLY.test(digitsOnly)) {
    return ERROR_MESSAGES.INVALID_PHONE;
  }

  return undefined;
};

/**
 * Validate CPF (Brazilian document)
 */
export const validateCPF = (cpf: string): string | undefined => {
  if (!cpf) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  // Remove formatting
  const digitsOnly = cpf.replace(/\D/g, '');

  if (digitsOnly.length !== VALIDATION.CPF_LENGTH) {
    return ERROR_MESSAGES.INVALID_CPF;
  }

  // Check for known invalid CPFs (all digits the same)
  if (/^(\d)\1{10}$/.test(digitsOnly)) {
    return ERROR_MESSAGES.INVALID_CPF;
  }

  // Validate CPF algorithm
  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(digitsOnly.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digitsOnly.substring(9, 10))) {
    return ERROR_MESSAGES.INVALID_CPF;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(digitsOnly.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digitsOnly.substring(10, 11))) {
    return ERROR_MESSAGES.INVALID_CPF;
  }

  return undefined;
};

/**
 * Validate Required Field
 */
export const validateRequired = (value: any): string | undefined => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  return undefined;
};

/**
 * Validate Min Length
 */
export const validateMinLength = (
  value: string,
  minLength: number
): string | undefined => {
  if (!value) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (value.length < minLength) {
    return `Deve ter no mínimo ${minLength} caracteres.`;
  }

  return undefined;
};

/**
 * Validate Max Length
 */
export const validateMaxLength = (
  value: string,
  maxLength: number
): string | undefined => {
  if (value && value.length > maxLength) {
    return `Não pode ter mais de ${maxLength} caracteres.`;
  }
  return undefined;
};

/**
 * Validate Price
 */
export const validatePrice = (price: number): string | undefined => {
  if (price === undefined || price === null) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (price < VALIDATION.SERVICE_PRICE_MIN) {
    return `Preço não pode ser menor que R$ ${VALIDATION.SERVICE_PRICE_MIN}.`;
  }

  if (price > VALIDATION.SERVICE_PRICE_MAX) {
    return `Preço não pode ser maior que R$ ${VALIDATION.SERVICE_PRICE_MAX}.`;
  }

  return undefined;
};

/**
 * Validate Duration (in minutes)
 */
export const validateDuration = (duration: number): string | undefined => {
  if (duration === undefined || duration === null) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (duration < VALIDATION.SERVICE_DURATION_MIN) {
    return `Duração não pode ser menor que ${VALIDATION.SERVICE_DURATION_MIN} minutos.`;
  }

  if (duration > VALIDATION.SERVICE_DURATION_MAX) {
    return `Duração não pode ser maior que ${VALIDATION.SERVICE_DURATION_MAX} minutos.`;
  }

  return undefined;
};

/**
 * Validate Time Format (HH:mm)
 */
export const validateTime = (time: string): string | undefined => {
  if (!time) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (!REGEX_PATTERNS.TIME.test(time)) {
    return 'Formato de horário inválido. Use HH:mm.';
  }

  return undefined;
};

/**
 * Validate Date Format (DD/MM/YYYY)
 */
export const validateDate = (date: string): string | undefined => {
  if (!date) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (!REGEX_PATTERNS.DATE.test(date)) {
    return 'Formato de data inválido. Use DD/MM/YYYY.';
  }

  return undefined;
};