import { createClient } from '@supabase/supabase-js';
import { Stage, StageAction, ProspectStage, ProspectAction, CRMEmail } from '../types/Stage';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

export const stageService = {
  // Stage Management
  async getStages(): Promise<Stage[]> {
    const { data, error } = await supabase
      .from('stages')
      .select('*')
      .order('order');

    if (error) throw error;
    return data || [];
  },

  async createStage(stage: Partial<Stage>): Promise<Stage> {
    const { data, error } = await supabase
      .from('stages')
      .insert([stage])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateStage(id: string, stage: Partial<Stage>): Promise<Stage> {
    const { data, error } = await supabase
      .from('stages')
      .update(stage)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Stage Actions
  async getStageActions(stageId: string): Promise<StageAction[]> {
    const { data, error } = await supabase
      .from('stage_actions')
      .select('*')
      .eq('stage_id', stageId);

    if (error) throw error;
    return data || [];
  },

  async createStageAction(action: Partial<StageAction>): Promise<StageAction> {
    const { data, error } = await supabase
      .from('stage_actions')
      .insert([action])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Prospect Stages
  async getProspectStages(prospectId: string): Promise<ProspectStage[]> {
    const { data, error } = await supabase
      .from('prospect_stages')
      .select(`
        *,
        stage:stages(*)
      `)
      .eq('prospect_id', prospectId);

    if (error) throw error;
    return data || [];
  },

  async createProspectStage(prospectStage: Partial<ProspectStage>): Promise<ProspectStage> {
    const { data, error } = await supabase
      .from('prospect_stages')
      .insert([prospectStage])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async completeProspectStage(id: string): Promise<ProspectStage> {
    const { data, error } = await supabase
      .from('prospect_stages')
      .update({
        completion_date: new Date().toISOString(),
        active: false
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Prospect Actions
  async getProspectActions(prospectId: string): Promise<ProspectAction[]> {
    const { data, error } = await supabase
      .from('prospect_actions')
      .select(`
        *,
        action:stage_actions(*)
      `)
      .eq('prospect_id', prospectId);

    if (error) throw error;
    return data || [];
  },

  async createProspectAction(action: Partial<ProspectAction>): Promise<ProspectAction> {
    const { data, error } = await supabase
      .from('prospect_actions')
      .insert([action])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async completeProspectAction(id: string): Promise<ProspectAction> {
    const { data, error } = await supabase
      .from('prospect_actions')
      .update({ completed: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async approveProspectAction(id: string): Promise<ProspectAction> {
    const { data, error } = await supabase
      .from('prospect_actions')
      .update({ approved: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Email Management
  async sendEmail(email: Partial<CRMEmail>): Promise<CRMEmail> {
    const { data, error } = await supabase
      .from('crm_emails')
      .insert([{
        ...email,
        sent_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getProspectEmails(prospectId: string): Promise<CRMEmail[]> {
    const { data, error } = await supabase
      .from('crm_emails')
      .select('*')
      .eq('prospect_id', prospectId)
      .order('sent_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};

export default stageService;