// Mock data for CRM stages and related entities
import { Stage, StageAction, ProspectStage, ProspectAction, CRMEmail } from '../types/Stage';

// Initial mock data
export const mockStages: Stage[] = [
  {
    id: '1',
    name: 'Contacto Inicial',
    order: 1,
    description: 'Primer contacto con el prospecto',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Evaluación',
    order: 2,
    description: 'Evaluación de necesidades y perfil',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Propuesta',
    order: 3,
    description: 'Presentación de propuesta comercial',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockStageActions: StageAction[] = [
  {
    id: '1',
    stage_id: '1',
    type: 'Llamada',
    description: 'Llamada inicial de contacto',
    mandatory: true,
    required_count: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    stage_id: '1',
    type: 'Email',
    description: 'Email de seguimiento',
    mandatory: true,
    required_count: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockProspectStages: ProspectStage[] = [
  {
    id: '1',
    prospect_id: '1',
    stage_id: '1',
    start_date: new Date().toISOString(),
    completion_date: null,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    stage: mockStages[0]
  }
];

export const mockProspectActions: ProspectAction[] = [
  {
    id: '1',
    prospect_id: '1',
    action_id: '1',
    assigned_to: 'user1',
    scheduled_date: new Date().toISOString(),
    completed: false,
    approved: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    action: mockStageActions[0]
  }
];

export const mockEmails: CRMEmail[] = [
  {
    id: '1',
    prospect_id: '1',
    subject: 'Bienvenida',
    content: 'Bienvenido a nuestro CRM',
    sent_at: new Date().toISOString(),
    sent_by: 'user1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];