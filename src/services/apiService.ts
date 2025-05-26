// src/services/apiService.ts
import { OptionType } from '../components/AsyncSelect/AsyncSelect';
import { localStorageService } from './localStorageService';

// Initialize localStorage with mock data
localStorageService.init();

// Get users from mock data
export const getUsers = async (): Promise<OptionType[]> => {
  try {
    const users = await localStorageService.getUsers();
    return users;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};