// src/api/appointmentsService.ts
import apiClient from './apiClient';
import { AxiosResponse } from 'axios';

export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELED'
  | 'COMPLETED'
  | 'NO_SHOW';

export interface Service {
  id: string;
  name: string;
  duration?: number;
  price?: number;
}

export interface Barber {
  id: string;
  name: string;
  email?: string;
}

export interface Appointment {
  id: string;
  userId?: string;
  clientName?: string;
  serviceId: string;
  barberId?: string;
  startsAt: string;
  endsAt?: string;
  status: AppointmentStatus;
  timezone?: string;
  service?: Service;
  barber?: Barber;
  
  // ✅ CORREÇÃO: Campo adicionado
  price?: number;
}

// ... restante do arquivo (CreateAppointmentDTO, etc) permanece igual ...

export interface CreateAppointmentDTO {
  userId?: string;
  clientName?: string;
  serviceId: string;
  barberId: string;
  startsAt: string;
}

export interface UpdateAppointmentDTO {
  userId?: string;
  clientName?: string;
  serviceId?: string;
  barberId?: string;
  startsAt?: string;
  status?: AppointmentStatus;
}

export interface AppointmentsResponse {
  data: Appointment[];
  total: number;
}

const resource = '/appointments';

export const appointmentsService = {
  async getAll(params?: Record<string, any>): Promise<AppointmentsResponse> {
    const res: AxiosResponse<AppointmentsResponse> = await apiClient.get(resource, { params });
    return res.data;
  },

  async getById(id: string): Promise<Appointment> {
    const res: AxiosResponse<Appointment> = await apiClient.get(`${resource}/${id}`);
    return res.data;
  },

  async create(payload: CreateAppointmentDTO): Promise<Appointment> {
    const res: AxiosResponse<Appointment> = await apiClient.post(resource, payload);
    return res.data;
  },

  async update(id: string, payload: UpdateAppointmentDTO): Promise<Appointment> {
    const res: AxiosResponse<Appointment> = await apiClient.put(`${resource}/${id}`, payload);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${resource}/${id}`);
  },
};