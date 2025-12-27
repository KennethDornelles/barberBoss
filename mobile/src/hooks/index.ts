// src/hooks/index.ts

/**
 * Hooks Barrel Export
 *
 * Centralized export for all custom hooks
 */

export * from './useDebounce';
export * from './usePermission';
// useAuth is exported from AuthContext
export { useAuth } from '../context/AuthContext';