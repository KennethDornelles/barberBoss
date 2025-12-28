// src/types/models.ts
import { Role, AppointmentStatus, BlockType } from "./enums";
import {
  formatDate,
  formatTime,
  formatDateTime,
  formatDuration,
  formatCurrency,
} from "../utils/formatters";

/**
 * User Model
 *
 * Client-side model with helper methods
 */
export class UserModel {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.role = data.role as Role;
    this.createdAt =
      data.createdAt instanceof Date
        ? data.createdAt
        : new Date(data.createdAt);
    this.updatedAt =
      data.updatedAt instanceof Date
        ? data.updatedAt
        : new Date(data.updatedAt);
  }

  isAdmin(): boolean {
    return this.role === Role.ADMIN;
  }

  isBarber(): boolean {
    return this.role === Role.BARBER;
  }

  isClient(): boolean {
    return this.role === Role.CLIENT;
  }

  getInitials(): string {
    return this.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  }
}

/**
 * Service Model
 */
export class ServiceModel {
  id: string;
  name: string;
  description?: string;
  price: number;
  durationMin: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price =
      typeof data.price === "string" ? parseFloat(data.price) : data.price;
    this.durationMin = data.durationMin;
    this.active = data.active ?? true;
    this.createdAt =
      data.createdAt instanceof Date
        ? data.createdAt
        : new Date(data.createdAt);
    this.updatedAt =
      data.updatedAt instanceof Date
        ? data.updatedAt
        : new Date(data.updatedAt);
  }

  getFormattedPrice(): string {
    return formatCurrency(this.price);
  }

  getFormattedDuration(): string {
    return formatDuration(this.durationMin);
  }

  calculateEndTime(startTime: Date): Date {
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + this.durationMin);
    return endTime;
  }

  isAvailable(): boolean {
    return this.active;
  }
}

/**
 * Appointment Model
 */
export class AppointmentModel {
  id: string;
  startsAt: Date;
  endsAt: Date;
  status: AppointmentStatus;
  barberId?: string;
  barber?: UserModel;
  userId?: string;
  user?: UserModel;
  clientName?: string;
  serviceId: string;
  service?: ServiceModel;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.startsAt =
      data.startsAt instanceof Date ? data.startsAt : new Date(data.startsAt);
    this.endsAt =
      data.endsAt instanceof Date ? data.endsAt : new Date(data.endsAt);
    this.status = data.status as AppointmentStatus;
    this.barberId = data.barberId;
    this.barber = data.barber ? new UserModel(data.barber) : undefined;
    this.userId = data.userId;
    this.user = data.user ? new UserModel(data.user) : undefined;
    this.clientName = data.clientName;
    this.serviceId = data.serviceId;
    this.service = data.service ? new ServiceModel(data.service) : undefined;
    this.createdAt =
      data.createdAt instanceof Date
        ? data.createdAt
        : new Date(data.createdAt);
    this.updatedAt =
      data.updatedAt instanceof Date
        ? data.updatedAt
        : new Date(data.updatedAt);
  }

  getClientName(): string {
    return this.user?.name || this.clientName || "Cliente sem nome";
  }

  getBarberName(): string {
    return this.barber?.name || "Barbeiro não definido";
  }

  getFormattedDate(): string {
    return formatDate(this.startsAt);
  }

  getFormattedTime(): string {
    return formatTime(this.startsAt);
  }

  getFormattedTimeRange(): string {
    const startTime = formatTime(this.startsAt);
    const endTime = formatTime(this.endsAt);
    return `${startTime} - ${endTime}`;
  }

  getDurationMinutes(): number {
    return Math.round(
      (this.endsAt.getTime() - this.startsAt.getTime()) / 60000,
    );
  }

  isPast(): boolean {
    return this.endsAt < new Date();
  }

  isToday(): boolean {
    const today = new Date();
    return this.startsAt.toDateString() === today.toDateString();
  }

  canBeCanceled(): boolean {
    return (
      !this.isPast() &&
      (this.status === AppointmentStatus.PENDING ||
        this.status === AppointmentStatus.CONFIRMED)
    );
  }

  canBeEdited(): boolean {
    return (
      !this.isPast() &&
      (this.status === AppointmentStatus.PENDING ||
        this.status === AppointmentStatus.CONFIRMED)
    );
  }
}

/**
 * Settings Model
 */
export class SettingsModel {
  id: string;
  businessName: string;
  openTime: string;
  closeTime: string;
  workingDays: number[];
  slotIntervalMin: number;
  maxAdvanceDays: number;
  minAdvanceHours: number;
  enableReminders: boolean;
  reminderHoursBefore: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.businessName = data.businessName || "Barber Boss";
    this.openTime = data.openTime || "08:00";
    this.closeTime = data.closeTime || "18:00";
    this.workingDays = data.workingDays || [1, 2, 3, 4, 5, 6];
    this.slotIntervalMin = data.slotIntervalMin || 15;
    this.maxAdvanceDays = data.maxAdvanceDays || 30;
    this.minAdvanceHours = data.minAdvanceHours || 2;
    this.enableReminders = data.enableReminders ?? false;
    this.reminderHoursBefore = data.reminderHoursBefore || 24;
    this.createdAt =
      data.createdAt instanceof Date
        ? data.createdAt
        : new Date(data.createdAt);
    this.updatedAt =
      data.updatedAt instanceof Date
        ? data.updatedAt
        : new Date(data.updatedAt);
  }

  getBusinessHours(): string {
    return `${this.openTime} - ${this.closeTime}`;
  }

  isWorkingDay(dayOfWeek: number): boolean {
    return this.workingDays.includes(dayOfWeek);
  }

  getOpeningTime(date: Date = new Date()): Date {
    const [hours, minutes] = this.openTime.split(":").map(Number);
    const openingTime = new Date(date);
    openingTime.setHours(hours, minutes, 0, 0);
    return openingTime;
  }

  getClosingTime(date: Date = new Date()): Date {
    const [hours, minutes] = this.closeTime.split(":").map(Number);
    const closingTime = new Date(date);
    closingTime.setHours(hours, minutes, 0, 0);
    return closingTime;
  }

  isWithinBusinessHours(time: Date): boolean {
    const dayOfWeek = time.getDay();
    if (!this.isWorkingDay(dayOfWeek)) {
      return false;
    }

    const openingTime = this.getOpeningTime(time);
    const closingTime = this.getClosingTime(time);

    return time >= openingTime && time <= closingTime;
  }

  getMaxBookingDate(): Date {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + this.maxAdvanceDays);
    return maxDate;
  }

  getMinBookingDateTime(): Date {
    const minDate = new Date();
    minDate.setHours(minDate.getHours() + this.minAdvanceHours);
    return minDate;
  }

  isDateBookable(date: Date): boolean {
    const minBooking = this.getMinBookingDateTime();
    const maxBooking = this.getMaxBookingDate();
    return date >= minBooking && date <= maxBooking;
  }
}

/**
 * Time Block Model
 */
export class TimeBlockModel {
  id: string;
  type: BlockType;
  reason?: string;
  startsAt: Date;
  endsAt: Date;
  isRecurring: boolean;
  recurringDays: number[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.type = data.type as BlockType;
    this.reason = data.reason;
    this.startsAt =
      data.startsAt instanceof Date ? data.startsAt : new Date(data.startsAt);
    this.endsAt =
      data.endsAt instanceof Date ? data.endsAt : new Date(data.endsAt);
    this.isRecurring = data.isRecurring ?? false;
    this.recurringDays = data.recurringDays || [];
    this.active = data.active ?? true;
    this.createdAt =
      data.createdAt instanceof Date
        ? data.createdAt
        : new Date(data.createdAt);
    this.updatedAt =
      data.updatedAt instanceof Date
        ? data.updatedAt
        : new Date(data.updatedAt);
  }

  getFormattedDateRange(): string {
    const startDate = formatDate(this.startsAt);
    const endDate = formatDate(this.endsAt);

    if (startDate === endDate) {
      return startDate;
    }
    return `${startDate} - ${endDate}`;
  }

  getFormattedTimeRange(): string {
    const startTime = formatTime(this.startsAt);
    const endTime = formatTime(this.endsAt);
    return `${startTime} - ${endTime}`;
  }

  isActiveOnDate(date: Date): boolean {
    if (!this.active) return false;

    if (this.isRecurring) {
      const dayOfWeek = date.getDay();
      return this.recurringDays.includes(dayOfWeek);
    }

    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    const startDate = new Date(this.startsAt);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(this.endsAt);
    endDate.setHours(0, 0, 0, 0);

    return dateOnly >= startDate && dateOnly <= endDate;
  }

  overlapsWithTimeRange(start: Date, end: Date): boolean {
    if (!this.active) return false;
    return this.startsAt < end && this.endsAt > start;
  }

  isPast(): boolean {
    return this.endsAt < new Date();
  }

  isCurrentlyActive(): boolean {
    const now = new Date();
    return this.active && this.startsAt <= now && this.endsAt >= now;
  }

  getDurationMinutes(): number {
    return Math.round(
      (this.endsAt.getTime() - this.startsAt.getTime()) / 60000,
    );
  }
}
