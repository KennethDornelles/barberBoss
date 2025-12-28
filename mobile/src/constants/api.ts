// src/constants/api.ts

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/api/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    ME: "/api/auth/me",
    PROFILE: "/auth/profile",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  // Users
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },

  // Appointments
  APPOINTMENTS: {
    BASE: "/appointments",
    BY_ID: (id: string) => `/appointments/${id}`,
    AVAILABLE_SLOTS: "/appointments/available-slots",
    CANCEL: (id: string) => `/appointments/${id}/cancel`,
    CONFIRM: (id: string) => `/appointments/${id}/confirm`,
    COMPLETE: (id: string) => `/appointments/${id}/complete`,
  },

  // Services
  SERVICES: {
    BASE: "/services",
    BY_ID: (id: string) => `/services/${id}`,
  },

  // Settings
  SETTINGS: {
    BASE: "/settings",
    BUSINESS_HOURS: "/settings/business-hours",
    TIME_BLOCKS: "/settings/time-blocks",
  },

  // Time Blocks
  TIME_BLOCKS: {
    BASE: "/time-blocks",
    BY_ID: (id: string) => `/time-blocks/${id}`,
  },
} as const;

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  TOKEN: "@BarberBoss:token",
  USER: "@BarberBoss:user",
  REFRESH_TOKEN: "@BarberBoss:refresh_token",
  LANGUAGE: "@BarberBoss:language",
  THEME: "@BarberBoss:theme",
  LAST_SYNC: "@BarberBoss:last_sync",
} as const;

/**
 * Date and Time Formats
 */
export const DATE_FORMATS = {
  // Display formats
  DATE_SHORT: "DD/MM/YYYY",
  DATE_LONG: "DD [de] MMMM [de] YYYY",
  TIME: "HH:mm",
  TIME_SECONDS: "HH:mm:ss",
  DATETIME: "DD/MM/YYYY HH:mm",
  DATETIME_LONG: "DD [de] MMMM [de] YYYY [às] HH:mm",

  // API formats
  API_DATE: "YYYY-MM-DD",
  API_TIME: "HH:mm:ss",
  API_DATETIME: "YYYY-MM-DD HH:mm:ss",
  API_ISO: "YYYY-MM-DDTHH:mm:ss.SSSZ",
} as const;

/**
 * Days of Week
 */
export const DAYS_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

/**
 * Days of Week Labels (Portuguese)
 */
export const DAYS_OF_WEEK_LABELS: Record<number, string> = {
  [DAYS_OF_WEEK.SUNDAY]: "Domingo",
  [DAYS_OF_WEEK.MONDAY]: "Segunda-feira",
  [DAYS_OF_WEEK.TUESDAY]: "Terça-feira",
  [DAYS_OF_WEEK.WEDNESDAY]: "Quarta-feira",
  [DAYS_OF_WEEK.THURSDAY]: "Quinta-feira",
  [DAYS_OF_WEEK.FRIDAY]: "Sexta-feira",
  [DAYS_OF_WEEK.SATURDAY]: "Sábado",
};

/**
 * Days of Week Short Labels (Portuguese)
 */
export const DAYS_OF_WEEK_SHORT: Record<number, string> = {
  [DAYS_OF_WEEK.SUNDAY]: "Dom",
  [DAYS_OF_WEEK.MONDAY]: "Seg",
  [DAYS_OF_WEEK.TUESDAY]: "Ter",
  [DAYS_OF_WEEK.WEDNESDAY]: "Qua",
  [DAYS_OF_WEEK.THURSDAY]: "Qui",
  [DAYS_OF_WEEK.FRIDAY]: "Sex",
  [DAYS_OF_WEEK.SATURDAY]: "Sáb",
};

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

/**
 * Debounce Times (in milliseconds)
 */
export const DEBOUNCE_TIME = {
  SEARCH: 300,
  AUTO_SAVE: 1000,
  RESIZE: 150,
  INPUT: 500,
} as const;

/**
 * Animation Durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;
