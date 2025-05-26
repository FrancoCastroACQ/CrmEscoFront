export interface Stage {
  id: string;
  name: string;
  order: number;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StageAction {
  id: string;
  stage_id: string;
  type: string;
  description: string;
  mandatory: boolean;
  required_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProspectStage {
  id: string;
  prospect_id: string;
  stage_id: string;
  start_date: string;
  completion_date: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  stage?: Stage;
}

export interface ProspectAction {
  id: string;
  prospect_id: string;
  action_id: string;
  assigned_to: string;
  scheduled_date: string;
  completed: boolean;
  approved: boolean;
  created_at: string;
  updated_at: string;
  action?: StageAction;
}

export interface CRMEmail {
  id: string;
  prospect_id: string;
  subject: string;
  content: string;
  sent_at: string | null;
  sent_by: string;
  created_at: string;
  updated_at: string;
}