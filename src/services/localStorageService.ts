import { 
  Stage, 
  StageAction, 
  ProspectStage, 
  ProspectAction, 
  CRMEmail 
} from '../types/Stage';
import {
  mockStages,
  mockStageActions,
  mockProspectStages,
  mockProspectActions,
  mockEmails
} from '../data/mockData';

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem('stages')) {
    localStorage.setItem('stages', JSON.stringify(mockStages));
    localStorage.setItem('stageActions', JSON.stringify(mockStageActions));
    localStorage.setItem('prospectStages', JSON.stringify(mockProspectStages));
    localStorage.setItem('prospectActions', JSON.stringify(mockProspectActions));
    localStorage.setItem('emails', JSON.stringify(mockEmails));
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

export const localStorageService = {
  // Initialize storage
  init() {
    initializeStorage();
  },

  // Stage Management
  async getStages(): Promise<Stage[]> {
    return getStorageItem<Stage>('stages');
  },

  async createStage(stage: Partial<Stage>): Promise<Stage> {
    const stages = getStorageItem<Stage>('stages');
    const newStage: Stage = {
      id: Date.now().toString(),
      name: stage.name || '',
      order: stage.order || stages.length + 1,
      description: stage.description || null,
      active: stage.active ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    stages.push(newStage);
    setStorageItem('stages', stages);
    return newStage;
  },

  async updateStage(id: string, stage: Partial<Stage>): Promise<Stage> {
    const stages = getStorageItem<Stage>('stages');
    const index = stages.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Stage not found');
    
    stages[index] = {
      ...stages[index],
      ...stage,
      updated_at: new Date().toISOString()
    };
    setStorageItem('stages', stages);
    return stages[index];
  },

  // Stage Actions
  async getStageActions(stageId: string): Promise<StageAction[]> {
    const actions = getStorageItem<StageAction>('stageActions');
    return actions.filter(action => action.stage_id === stageId);
  },

  async createStageAction(action: Partial<StageAction>): Promise<StageAction> {
    const actions = getStorageItem<StageAction>('stageActions');
    const newAction: StageAction = {
      id: Date.now().toString(),
      stage_id: action.stage_id || '',
      type: action.type || '',
      description: action.description || '',
      mandatory: action.mandatory ?? false,
      required_count: action.required_count || 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    actions.push(newAction);
    setStorageItem('stageActions', actions);
    return newAction;
  },

  // Prospect Stages
  async getProspectStages(prospectId: string): Promise<ProspectStage[]> {
    const stages = getStorageItem<ProspectStage>('prospectStages');
    return stages.filter(stage => stage.prospect_id === prospectId);
  },

  async createProspectStage(prospectStage: Partial<ProspectStage>): Promise<ProspectStage> {
    const stages = getStorageItem<ProspectStage>('prospectStages');
    const newStage: ProspectStage = {
      id: Date.now().toString(),
      prospect_id: prospectStage.prospect_id || '',
      stage_id: prospectStage.stage_id || '',
      start_date: new Date().toISOString(),
      completion_date: null,
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    stages.push(newStage);
    setStorageItem('prospectStages', stages);
    return newStage;
  },

  // Prospect Actions
  async getProspectActions(prospectId: string): Promise<ProspectAction[]> {
    const actions = getStorageItem<ProspectAction>('prospectActions');
    return actions.filter(action => action.prospect_id === prospectId);
  },

  async createProspectAction(action: Partial<ProspectAction>): Promise<ProspectAction> {
    const actions = getStorageItem<ProspectAction>('prospectActions');
    const newAction: ProspectAction = {
      id: Date.now().toString(),
      prospect_id: action.prospect_id || '',
      action_id: action.action_id || '',
      assigned_to: action.assigned_to || '',
      scheduled_date: action.scheduled_date || new Date().toISOString(),
      completed: false,
      approved: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    actions.push(newAction);
    setStorageItem('prospectActions', actions);
    return newAction;
  },

  async completeProspectAction(id: string): Promise<ProspectAction> {
    const actions = getStorageItem<ProspectAction>('prospectActions');
    const index = actions.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Action not found');
    
    actions[index].completed = true;
    actions[index].updated_at = new Date().toISOString();
    setStorageItem('prospectActions', actions);
    return actions[index];
  },

  // Email Management
  async sendEmail(email: Partial<CRMEmail>): Promise<CRMEmail> {
    const emails = getStorageItem<CRMEmail>('emails');
    const newEmail: CRMEmail = {
      id: Date.now().toString(),
      prospect_id: email.prospect_id || '',
      subject: email.subject || '',
      content: email.content || '',
      sent_at: new Date().toISOString(),
      sent_by: email.sent_by || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    emails.push(newEmail);
    setStorageItem('emails', emails);
    return newEmail;
  },

  async getProspectEmails(prospectId: string): Promise<CRMEmail[]> {
    const emails = getStorageItem<CRMEmail>('emails');
    return emails
      .filter(email => email.prospect_id === prospectId)
      .sort((a, b) => new Date(b.sent_at || '').getTime() - new Date(a.sent_at || '').getTime());
  }
};

export default localStorageService;