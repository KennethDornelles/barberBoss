// src/types/navigation.types.ts
import { NavigatorScreenParams } from "@react-navigation/native";

/**
 * Root Stack Navigator
 */
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

/**
 * Auth Stack Navigator
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

/**
 * Main Tab Navigator
 */
export type MainTabParamList = {
  HomeTab: undefined;
  AppointmentsTab: undefined;
  ServicesTab: undefined;
  ProfileTab: undefined;
};

/**
 * Appointments Stack Navigator
 */
export type AppointmentsStackParamList = {
  AppointmentsList: undefined;
  CreateAppointment: { appointmentId?: string } | undefined;
  AppointmentDetail?: { appointmentId: string };
  EditAppointment?: { appointmentId: string };
};

/**
 * Services Stack Navigator
 */
export type ServicesStackParamList = {
  ServiceList: undefined;
  ServiceDetail: { serviceId: string };
  CreateService: undefined;
  EditService: { serviceId: string };
};

/**
 * Profile Stack Navigator
 */
export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  Settings: undefined;
  TimeBlocks: undefined;
};

/**
 * Navigation Props Helper Types
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
