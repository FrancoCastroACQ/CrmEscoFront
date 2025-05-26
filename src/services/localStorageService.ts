// src/services/localStorageService.ts

import { Prospecto, AccionType } from '../types/Prospecto';
import { Client, ClientAction } from '../types/Client';
import { Risk, Instrument } from '../types/Instrument';

// Initial mock data
const mockProspectos: Prospecto[] = [
  {
    id: '1',
    nombreCliente: 'Juan Pérez',
    contacto: 'juan@email.com',
    cargo_contacto: 'Gerente',
    oficial: '1',
    referente: '2',
    ultimoContacto: '2024-01-15',
    fechaVencimiento: '2024-02-15',
    tipoAccion: 'Llamada pendiente',
    numComitente: 'COM001',
    yaEsCliente: false,
    tipoClienteAccion: '',
    activo: 'activo',
    notas: 'Cliente potencial interesado en inversiones',
    sector_industria: 'Tecnología',
    actions: [
      {
        id: '1',
        prospect_id: '1',
        action_date: '2024-01-15',
        description: 'Primera llamada de contacto',
        next_contact: '2024-02-15',
        user_id: '1',
        status: 'abierto'
      }
    ]
  }
];

const mockClients: Client[] = [
  {
    id: '1',
    numcomitente: 'COM001',
    nombre: 'Empresa ABC',
    sector: 'Tecnología',
    mail: 'contacto@abc.com',
    cuit: '30-12345678-9',
    oficial: '1',
    referente: '2',
    activo: true,
    actions: [
      {
        id: '1',
        client_id: '1',
        action_date: '2024-01-10',
        description: 'Reunión de seguimiento',
        next_contact: '2024-02-10',
        user_id: '1',
        status: 'abierto'
      }
    ]
  }
];

const mockUsers = [
  { id: '1', label: 'Juan Oficial' },
  { id: '2', label: 'María Referente' },
  { id: '3', label: 'Pedro Analista' }
];

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem('prospectos')) {
    localStorage.setItem('prospectos', JSON.stringify(mockProspectos));
  }
  if (!localStorage.getItem('clients')) {
    localStorage.setItem('clients', JSON.stringify(mockClients));
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }
};

// Helper functions
const getStorageItem = <T>(key: string): T[] => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
};

const setStorageItem = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Service functions
export const localStorageService = {
  // Initialize storage
  init: () => {
    initializeStorage();
  },

  // Prospecto functions
  getProspectos: async (
    page = 1,
    filterStatus = 'todos',
    sortField: string | null = null,
    sortDirection: 'ascending' | 'descending' | null = null,
    filters: any = {}
  ) => {
    const prospectos = getStorageItem<Prospecto>('prospectos');
    const itemsPerPage = 10;

    let filteredProspectos = [...prospectos];

    // Apply filters
    if (filterStatus !== 'todos') {
      filteredProspectos = filteredProspectos.filter(p => 
        filterStatus === 'activos' ? p.activo === 'activo' : p.activo !== 'activo'
      );
    }

    // Apply sorting
    if (sortField && sortDirection) {
      filteredProspectos.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const modifier = sortDirection === 'ascending' ? 1 : -1;
        return aValue > bValue ? modifier : -modifier;
      });
    }

    // Calculate pagination
    const totalItems = filteredProspectos.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedProspectos = filteredProspectos.slice(startIndex, startIndex + itemsPerPage);

    return {
      data: paginatedProspectos,
      pagination: {
        currentPage: page,
        lastPage: totalPages,
        total: totalItems
      }
    };
  },

  getProspectoById: async (id: string): Promise<Prospecto | null> => {
    const prospectos = getStorageItem<Prospecto>('prospectos');
    return prospectos.find(p => p.id === id) || null;
  },

  createProspecto: async (data: Omit<Prospecto, 'id'>): Promise<Prospecto | null> => {
    const prospectos = getStorageItem<Prospecto>('prospectos');
    const newProspecto: Prospecto = {
      ...data,
      id: (prospectos.length + 1).toString(),
      actions: []
    };
    prospectos.push(newProspecto);
    setStorageItem('prospectos', prospectos);
    return newProspecto;
  },

  updateProspecto: async (id: string, data: Partial<Prospecto>): Promise<Prospecto | null> => {
    const prospectos = getStorageItem<Prospecto>('prospectos');
    const index = prospectos.findIndex(p => p.id === id);
    if (index === -1) return null;

    prospectos[index] = { ...prospectos[index], ...data };
    setStorageItem('prospectos', prospectos);
    return prospectos[index];
  },

  deleteProspecto: async (id: string): Promise<boolean> => {
    const prospectos = getStorageItem<Prospecto>('prospectos');
    const filtered = prospectos.filter(p => p.id !== id);
    setStorageItem('prospectos', filtered);
    return true;
  },

  // Client functions
  getClients: async (
    page = 1,
    statusFilter = 'todos',
    sortField: string | null = null,
    sortDirection: 'ascending' | 'descending' | null = null,
    filters: any = {}
  ) => {
    const clients = getStorageItem<Client>('clients');
    const itemsPerPage = 10;

    let filteredClients = [...clients];

    // Apply filters
    if (statusFilter !== 'todos') {
      filteredClients = filteredClients.filter(c => 
        statusFilter === 'activos' ? c.activo : !c.activo
      );
    }

    // Apply sorting
    if (sortField && sortDirection) {
      filteredClients.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const modifier = sortDirection === 'ascending' ? 1 : -1;
        return aValue > bValue ? modifier : -modifier;
      });
    }

    // Calculate pagination
    const totalItems = filteredClients.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

    return {
      data: paginatedClients,
      pagination: {
        currentPage: page,
        lastPage: totalPages,
        total: totalItems
      }
    };
  },

  // User functions
  getUsers: async () => {
    return getStorageItem('users');
  },

  // Action functions
  createAction: async (entityId: string, action: AccionType | ClientAction): Promise<any> => {
    const prospectos = getStorageItem<Prospecto>('prospectos');
    const prospecto = prospectos.find(p => p.id === entityId);
    
    if (prospecto) {
      const newAction = {
        ...action,
        id: Date.now().toString(),
        prospect_id: entityId
      };
      
      prospecto.actions = [...(prospecto.actions || []), newAction];
      setStorageItem('prospectos', prospectos);
      return newAction;
    }
    return null;
  },

  updateAction: async (actionId: string, action: AccionType | ClientAction): Promise<any> => {
    const prospectos = getStorageItem<Prospecto>('prospectos');
    
    for (let prospecto of prospectos) {
      if (!prospecto.actions) continue;
      
      const actionIndex = prospecto.actions.findIndex(a => a.id === actionId);
      if (actionIndex !== -1) {
        prospecto.actions[actionIndex] = { ...prospecto.actions[actionIndex], ...action };
        setStorageItem('prospectos', prospectos);
        return prospecto.actions[actionIndex];
      }
    }
    return null;
  }
};

export default localStorageService;