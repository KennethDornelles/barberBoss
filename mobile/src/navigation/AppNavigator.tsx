// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS } from "../constants/colors";

// Auth Screens
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";

// Dashboard Screens
import AppointmentsListScreen from "../screens/Dashboard/AppointmentsListScreen";
import CreateAppointmentScreen from "../screens/Dashboard/CreateAppointmentScreen";
import FinanceSummaryScreen from "../screens/Dashboard/FinanceSummaryScreen";
// CORREÇÃO: Importando a tela unificada do caminho correto (Dashboard)
import ClientsManagementScreen from "../screens/Clients/ClientsManagementScreen"; 

// ============================================================================
// TYPES
// ============================================================================
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  AppointmentsList: undefined;
  CreateAppointment: { appointmentId?: string } | undefined;
  FinanceSummary: undefined;
  ClientsManagement: undefined; // Única rota necessária para clientes agora
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

// ============================================================================
// AUTH NAVIGATOR
// ============================================================================
const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

// ============================================================================
// MAIN NAVIGATOR
// ============================================================================
const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      initialRouteName="AppointmentsList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen
        name="AppointmentsList"
        component={AppointmentsListScreen}
      />
      <MainStack.Screen
        name="CreateAppointment"
        component={CreateAppointmentScreen}
      />
      <MainStack.Screen
        name="FinanceSummary"
        component={FinanceSummaryScreen}
      />
      
      {/* CORREÇÃO: Apenas esta rota é necessária. Os modais estão dentro dela. */}
      <MainStack.Screen
        name="ClientsManagement"
        component={ClientsManagementScreen}
      />
      
    </MainStack.Navigator>
  );
};

// ============================================================================
// ROOT NAVIGATOR
// ============================================================================
const RootNavigator: React.FC = () => {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.royal_blue} />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      {isSignedIn ? (
        <RootStack.Screen name="Main" component={MainNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

// ============================================================================
// APP NAVIGATOR (Main Export)
// ============================================================================
export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.midnight_navy,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.grey_steel,
  },
});