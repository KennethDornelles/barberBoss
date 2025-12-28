// src/types/enums.ts

/**
 * User Role Enum
 */
export enum Role {
  ADMIN = "ADMIN",
  BARBER = "BARBER",
  CLIENT = "CLIENT",
}

/**
 * Appointment Status Enum
 */
export enum AppointmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
  NO_SHOW = "NO_SHOW",
}

/**
 * Block Type Enum
 */
export enum BlockType {
  LUNCH = "LUNCH",
  BREAK = "BREAK",
  DAY_OFF = "DAY_OFF",
  VACATION = "VACATION",
  CUSTOM = "CUSTOM",
}

/**
 * Role Labels (Portuguese)
 */
export const ROLE_LABELS: Record<Role, string> = {
  [Role.ADMIN]: "Administrador",
  [Role.BARBER]: "Barbeiro",
  [Role.CLIENT]: "Cliente",
};

/**
 * Appointment Status Labels (Portuguese)
 */
export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PENDING]: "Pendente",
  [AppointmentStatus.CONFIRMED]: "Confirmado",
  [AppointmentStatus.CANCELED]: "Cancelado",
  [AppointmentStatus.COMPLETED]: "Concluído",
  [AppointmentStatus.NO_SHOW]: "Não Compareceu",
};

/**
 * Appointment Status Colors
 */
export const APPOINTMENT_STATUS_COLORS: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PENDING]: "#FF9500", // warning
  [AppointmentStatus.CONFIRMED]: "#34C759", // success
  [AppointmentStatus.CANCELED]: "#FF3B30", // danger
  [AppointmentStatus.COMPLETED]: "#8E8E93", // medium
  [AppointmentStatus.NO_SHOW]: "#000000", // dark
};

/**
 * Block Type Labels (Portuguese)
 */
export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  [BlockType.LUNCH]: "Almoço",
  [BlockType.BREAK]: "Intervalo",
  [BlockType.DAY_OFF]: "Folga",
  [BlockType.VACATION]: "Férias",
  [BlockType.CUSTOM]: "Personalizado",
};

/**
 * Block Type Icons
 */
export const BLOCK_TYPE_ICONS: Record<BlockType, string> = {
  [BlockType.LUNCH]: "🍽️",
  [BlockType.BREAK]: "☕",
  [BlockType.DAY_OFF]: "🏖️",
  [BlockType.VACATION]: "✈️",
  [BlockType.CUSTOM]: "📝",
};
