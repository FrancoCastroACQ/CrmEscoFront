/*
  # CRM 2.0 Stage Management System

  1. New Tables
    - `stages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `order` (integer)
      - `description` (text)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `stage_actions`
      - `id` (uuid, primary key) 
      - `stage_id` (uuid, foreign key)
      - `type` (text)
      - `description` (text)
      - `mandatory` (boolean)
      - `required_count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `prospect_stages`
      - `id` (uuid, primary key)
      - `prospect_id` (uuid, foreign key)
      - `stage_id` (uuid, foreign key)
      - `start_date` (timestamp)
      - `completion_date` (timestamp)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `prospect_actions`
      - `id` (uuid, primary key)
      - `prospect_id` (uuid, foreign key)
      - `action_id` (uuid, foreign key)
      - `assigned_to` (uuid, foreign key)
      - `scheduled_date` (timestamp)
      - `completed` (boolean)
      - `approved` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `crm_emails`
      - `id` (uuid, primary key)
      - `prospect_id` (uuid, foreign key)
      - `subject` (text)
      - `content` (text)
      - `sent_at` (timestamp)
      - `sent_by` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users

  3. Indexes
    - Index on stages(order)
    - Index on prospect_stages(prospect_id, active)
    - Index on prospect_actions(prospect_id, completed)
    - Index on crm_emails(prospect_id, sent_at)
*/

-- Create stages table
CREATE TABLE IF NOT EXISTS stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  "order" integer NOT NULL,
  description text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create stage_actions table
CREATE TABLE IF NOT EXISTS stage_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id uuid REFERENCES stages(id) ON DELETE CASCADE,
  type text NOT NULL,
  description text NOT NULL,
  mandatory boolean DEFAULT false,
  required_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prospect_stages table
CREATE TABLE IF NOT EXISTS prospect_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid NOT NULL,
  stage_id uuid REFERENCES stages(id) ON DELETE CASCADE,
  start_date timestamptz DEFAULT now(),
  completion_date timestamptz,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prospect_actions table
CREATE TABLE IF NOT EXISTS prospect_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid NOT NULL,
  action_id uuid REFERENCES stage_actions(id) ON DELETE CASCADE,
  assigned_to uuid NOT NULL,
  scheduled_date timestamptz NOT NULL,
  completed boolean DEFAULT false,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create crm_emails table
CREATE TABLE IF NOT EXISTS crm_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  sent_at timestamptz,
  sent_by uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_stages_order ON stages("order");
CREATE INDEX IF NOT EXISTS idx_prospect_stages_prospect ON prospect_stages(prospect_id, active);
CREATE INDEX IF NOT EXISTS idx_prospect_actions_prospect ON prospect_actions(prospect_id, completed);
CREATE INDEX IF NOT EXISTS idx_crm_emails_prospect ON crm_emails(prospect_id, sent_at);

-- Enable RLS
ALTER TABLE stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_emails ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Authenticated users can read stages"
  ON stages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read stage actions"
  ON stage_actions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read prospect stages"
  ON prospect_stages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read prospect actions"
  ON prospect_actions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read emails"
  ON crm_emails FOR SELECT
  TO authenticated
  USING (true);

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_stages_updated_at
  BEFORE UPDATE ON stages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stage_actions_updated_at
  BEFORE UPDATE ON stage_actions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prospect_stages_updated_at
  BEFORE UPDATE ON prospect_stages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prospect_actions_updated_at
  BEFORE UPDATE ON prospect_actions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_emails_updated_at
  BEFORE UPDATE ON crm_emails
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();