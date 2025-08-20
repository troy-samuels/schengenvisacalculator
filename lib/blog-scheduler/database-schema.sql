-- Blog Scheduling System Database Schema

-- Blog Schedules Table
CREATE TABLE blog_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status VARCHAR(20) DEFAULT 'active',
  target_count INTEGER NOT NULL DEFAULT 1000,
  current_count INTEGER DEFAULT 0,
  posts_per_week INTEGER DEFAULT 3,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estimated_end_date TIMESTAMP WITH TIME ZONE,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scheduled Posts Table
CREATE TABLE scheduled_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID REFERENCES blog_schedules(id) ON DELETE CASCADE,
  page_id UUID REFERENCES generated_pages(id) ON DELETE SET NULL,
  template_id VARCHAR(100) NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  publish_attempts INTEGER DEFAULT 0,
  last_error TEXT,
  content_variables JSONB DEFAULT '{}',
  generated_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Publishing Jobs Table
CREATE TABLE publishing_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES scheduled_posts(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'queued',
  progress INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error TEXT,
  logs JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Queue Table
CREATE TABLE content_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id VARCHAR(100) NOT NULL,
  priority INTEGER DEFAULT 50,
  variables JSONB NOT NULL DEFAULT '{}',
  estimated_generation_time INTEGER DEFAULT 30, -- seconds
  dependencies JSONB DEFAULT '[]',
  tags JSONB DEFAULT '[]',
  status VARCHAR(20) DEFAULT 'pending',
  assigned_to_post_id UUID REFERENCES scheduled_posts(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Scheduling Analytics Table
CREATE TABLE scheduling_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID REFERENCES blog_schedules(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  posts_published INTEGER DEFAULT 0,
  posts_failed INTEGER DEFAULT 0,
  avg_generation_time INTEGER, -- seconds
  avg_publish_time INTEGER, -- seconds
  content_type_distribution JSONB DEFAULT '{}',
  peak_publishing_hours JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Holidays and Special Dates Table
CREATE TABLE special_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  country_code VARCHAR(3), -- NULL for global holidays
  type VARCHAR(50) DEFAULT 'holiday', -- holiday, event, blackout
  adjust_publishing BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_scheduled_posts_scheduled_for ON scheduled_posts(scheduled_for);
CREATE INDEX idx_scheduled_posts_status ON scheduled_posts(status);
CREATE INDEX idx_scheduled_posts_schedule_id ON scheduled_posts(schedule_id);
CREATE INDEX idx_publishing_jobs_status ON publishing_jobs(status);
CREATE INDEX idx_content_queue_priority ON content_queue(priority DESC);
CREATE INDEX idx_content_queue_status ON content_queue(status);
CREATE INDEX idx_scheduling_analytics_date ON scheduling_analytics(date);
CREATE INDEX idx_special_dates_date ON special_dates(date);

-- Update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_schedules_updated_at 
  BEFORE UPDATE ON blog_schedules 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scheduled_posts_updated_at 
  BEFORE UPDATE ON scheduled_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update current count when posts are published
CREATE OR REPLACE FUNCTION update_schedule_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' THEN
        UPDATE blog_schedules 
        SET current_count = current_count + 1,
            updated_at = NOW()
        WHERE id = NEW.schedule_id;
        
        -- Check if target reached
        UPDATE blog_schedules 
        SET status = 'completed'
        WHERE id = NEW.schedule_id 
          AND current_count >= target_count 
          AND status = 'active';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_schedule_count_trigger
  AFTER UPDATE ON scheduled_posts
  FOR EACH ROW EXECUTE FUNCTION update_schedule_count();

-- RLS Policies
ALTER TABLE blog_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE publishing_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduling_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_dates ENABLE ROW LEVEL SECURITY;

-- Admin-only access for blog scheduling
CREATE POLICY "Admin can manage blog schedules" ON blog_schedules
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can manage scheduled posts" ON scheduled_posts
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can manage publishing jobs" ON publishing_jobs
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can manage content queue" ON content_queue
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Public read access for published content analytics
CREATE POLICY "Public can read scheduling analytics" ON scheduling_analytics
  FOR SELECT USING (true);

CREATE POLICY "Public can read special dates" ON special_dates
  FOR SELECT USING (true);

-- Insert default schedule
INSERT INTO blog_schedules (
  status,
  target_count,
  posts_per_week,
  settings
) VALUES (
  'active',
  1000,
  3,
  jsonb_build_object(
    'timeZone', 'UTC',
    'publishingHours', jsonb_build_object('start', 9, 'end', 17),
    'excludedDays', jsonb_build_array(),
    'minHoursBetweenPosts', 24,
    'randomizePublishTime', true,
    'contentTypes', jsonb_build_array('country-to-schengen', 'digital-nomad-guide', 'visa-comparison', 'faq-page'),
    'priorityOrder', jsonb_build_array(
      jsonb_build_object('templateId', 'country-to-schengen', 'weight', 40),
      jsonb_build_object('templateId', 'digital-nomad-guide', 'weight', 30),
      jsonb_build_object('templateId', 'visa-comparison', 'weight', 20),
      jsonb_build_object('templateId', 'faq-page', 'weight', 10)
    )
  )
);

-- Insert common holidays (sample data)
INSERT INTO special_dates (name, date, type) VALUES
  ('New Year''s Day', '2024-01-01', 'holiday'),
  ('Christmas Day', '2024-12-25', 'holiday'),
  ('Thanksgiving', '2024-11-28', 'holiday'),
  ('Independence Day', '2024-07-04', 'holiday'),
  ('Labor Day', '2024-09-02', 'holiday'),
  ('Memorial Day', '2024-05-27', 'holiday');