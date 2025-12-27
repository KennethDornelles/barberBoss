// src/constants/validation.ts

/**
 * Validation Rules
 */
export const VALIDATION = {
  // Password
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 100,

  // Name
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,

  // Phone
  PHONE_LENGTH: 11, // Format: (XX) XXXXX-XXXX without formatting

  // CPF
  CPF_LENGTH: 11, // Without formatting

  // Email
  EMAIL_MAX_LENGTH: 255,

  // Service
  SERVICE_NAME_MIN_LENGTH: 3,
  SERVICE_NAME_MAX_LENGTH: 100,
  SERVICE_PRICE_MIN: 0,
  SERVICE_PRICE_MAX: 10000,
  SERVICE_DURATION_MIN: 15,
  SERVICE_DURATION_MAX: 480, // 8 hours

  // Appointment
  APPOINTMENT_MIN_ADVANCE_HOURS: 2,
  APPOINTMENT_MAX_ADVANCE_DAYS: 30,
} as const;

/**
 * Regex Patterns
 */
export const REGEX_PATTERNS = {
  // Email
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Phone (Brazilian format)
  PHONE: /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/,
  PHONE_DIGITS_ONLY: /^\d{10,11}$/,

  // CPF (Brazilian document)
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CPF_DIGITS_ONLY: /^\d{11}$/,

  // Password (at least 8 chars, 1 uppercase, 1 lowercase, 1 number)
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,

  // Name (letters, spaces, and some special chars)
  NAME: /^[a-zA-ZÀ-ÿ\s'-]+$/,

  // Time (HH:mm)
  TIME: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,

  // Date (DD/MM/YYYY)
  DATE: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,

  // Numbers only
  NUMBERS_ONLY: /^\d+$/,
} as const;