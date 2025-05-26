// src/services/prospectoService.ts

import { Prospecto, AccionType } from '../types/Prospecto';
import { localStorageService } from './localStorageService';

// Initialize localStorage with mock data
localStorageService.init();

export const prospectoService = {
  getProspectos: localStorageService.getProspectos,
  getProspectoById: localStorageService.getProspectoById,
  createProspecto: localStorageService.createProspecto,
  updateProspecto: localStorageService.updateProspecto,
  deleteProspecto: localStorageService.deleteProspecto,
  createAction: localStorageService.createAction,
  updateAction: localStorageService.updateAction
};

export async function getContacts() {
  const result = await localStorageService.getClients(1, 'activos');
  return result.data;
}

export default prospectoService;