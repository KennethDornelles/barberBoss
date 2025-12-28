// src/utils/formatters.ts
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { DATE_FORMATS } from "../constants/api";

// Configure dayjs locale
dayjs.locale("pt-br");

/**
 * Format Currency (Brazilian Real)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/**
 * Format Phone (Brazilian format)
 * Input: 11999999999
 * Output: (11) 99999-9999
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return "";

  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length === 11) {
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
  }

  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6)}`;
  }

  return phone;
};

/**
 * Format CPF (Brazilian document)
 * Input: 12345678900
 * Output: 123.456.789-00
 */
export const formatCPF = (cpf: string): string => {
  if (!cpf) return "";

  const digitsOnly = cpf.replace(/\D/g, "");

  if (digitsOnly.length !== 11) return cpf;

  return `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3, 6)}.${digitsOnly.slice(6, 9)}-${digitsOnly.slice(9)}`;
};

/**
 * Remove Formatting (keep only digits)
 */
export const removeFormatting = (value: string): string => {
  return value.replace(/\D/g, "");
};

/**
 * Format Date (Short)
 * Input: 2025-12-27T10:30:00.000Z
 * Output: 27/12/2025
 */
export const formatDate = (date: string | Date): string => {
  return dayjs(date).format(DATE_FORMATS.DATE_SHORT);
};

/**
 * Format Date (Long)
 * Input: 2025-12-27T10:30:00.000Z
 * Output: 27 de dezembro de 2025
 */
export const formatDateLong = (date: string | Date): string => {
  return dayjs(date).format(DATE_FORMATS.DATE_LONG);
};

/**
 * Format Time
 * Input: 2025-12-27T10:30:00.000Z
 * Output: 10:30
 */
export const formatTime = (date: string | Date): string => {
  return dayjs(date).format(DATE_FORMATS.TIME);
};

/**
 * Format DateTime
 * Input: 2025-12-27T10:30:00.000Z
 * Output: 27/12/2025 10:30
 */
export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format(DATE_FORMATS.DATETIME);
};

/**
 * Format DateTime (Long)
 * Input: 2025-12-27T10:30:00.000Z
 * Output: 27 de dezembro de 2025 às 10:30
 */
export const formatDateTimeLong = (date: string | Date): string => {
  return dayjs(date).format(DATE_FORMATS.DATETIME_LONG);
};

/**
 * Format Relative Time
 * Input: 2025-12-27T10:30:00.000Z
 * Output: "há 2 horas", "em 3 dias", etc.
 */
export const formatRelativeTime = (date: string | Date): string => {
  const now = dayjs();
  const target = dayjs(date);
  const diffInMinutes = target.diff(now, "minute");

  if (Math.abs(diffInMinutes) < 1) {
    return "agora";
  }

  if (Math.abs(diffInMinutes) < 60) {
    const minutes = Math.abs(diffInMinutes);
    return diffInMinutes < 0
      ? `há ${minutes} minuto${minutes > 1 ? "s" : ""}`
      : `em ${minutes} minuto${minutes > 1 ? "s" : ""}`;
  }

  if (Math.abs(diffInMinutes) < 1440) {
    // Less than 24 hours
    const hours = Math.floor(Math.abs(diffInMinutes) / 60);
    return diffInMinutes < 0
      ? `há ${hours} hora${hours > 1 ? "s" : ""}`
      : `em ${hours} hora${hours > 1 ? "s" : ""}`;
  }

  const days = Math.floor(Math.abs(diffInMinutes) / 1440);
  if (days < 7) {
    return diffInMinutes < 0
      ? `há ${days} dia${days > 1 ? "s" : ""}`
      : `em ${days} dia${days > 1 ? "s" : ""}`;
  }

  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return diffInMinutes < 0
      ? `há ${weeks} semana${weeks > 1 ? "s" : ""}`
      : `em ${weeks} semana${weeks > 1 ? "s" : ""}`;
  }

  const months = Math.floor(days / 30);
  return diffInMinutes < 0
    ? `há ${months} ${months > 1 ? "meses" : "mês"}`
    : `em ${months} ${months > 1 ? "meses" : "mês"}`;
};

/**
 * Format Duration (in minutes to hours and minutes)
 * Input: 90
 * Output: "1h 30min"
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
};

/**
 * Format First Name
 * Input: "João da Silva Santos"
 * Output: "João"
 */
export const formatFirstName = (fullName: string): string => {
  if (!fullName) return "";
  return fullName.split(" ")[0];
};

/**
 * Format Initials
 * Input: "João da Silva"
 * Output: "JS"
 */
export const formatInitials = (fullName: string): string => {
  if (!fullName) return "";

  const names = fullName.trim().split(" ");

  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  const firstName = names[0];
  const lastName = names[names.length - 1];

  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

/**
 * Capitalize First Letter
 * Input: "joão da silva"
 * Output: "João da silva"
 */
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Capitalize Words
 * Input: "joão da silva"
 * Output: "João Da Silva"
 */
export const capitalizeWords = (text: string): string => {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};
