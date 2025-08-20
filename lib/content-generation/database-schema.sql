-- Content Generation System Database Schema

-- Content Templates Table
CREATE TABLE content_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  template TEXT NOT NULL,
  variables JSONB NOT NULL DEFAULT '[]',
  seo_config JSONB NOT NULL,
  schema_markup JSONB,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated Pages Table
CREATE TABLE generated_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES content_templates(id) ON DELETE CASCADE,
  slug VARCHAR(500) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  meta_description VARCHAR(500),
  variables JSONB NOT NULL DEFAULT '{}',
  internal_links JSONB DEFAULT '[]',
  schema_markup JSONB,
  seo_score INTEGER,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_regenerated TIMESTAMP WITH TIME ZONE
);

-- Visa Requirements Table
CREATE TABLE visa_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_country_code VARCHAR(3) NOT NULL,
  to_country_code VARCHAR(3) NOT NULL,
  visa_required BOOLEAN NOT NULL DEFAULT true,
  visa_type VARCHAR(20) DEFAULT 'tourist',
  max_stay_days INTEGER,
  processing_time VARCHAR(100),
  cost INTEGER,
  requirements JSONB DEFAULT '[]',
  notes TEXT,
  digital_nomad_info JSONB,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_country_code, to_country_code, visa_type)
);

-- Content Generation Jobs Table
CREATE TABLE content_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  template_id UUID REFERENCES content_templates(id),
  parameters JSONB NOT NULL DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  results JSONB DEFAULT '[]',
  errors JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Content Metrics Table
CREATE TABLE content_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES generated_pages(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2),
  avg_time_on_page INTEGER,
  conversions INTEGER DEFAULT 0,
  seo_ranking INTEGER,
  date_recorded DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sitemap Entries Table
CREATE TABLE sitemap_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url VARCHAR(500) UNIQUE NOT NULL,
  page_id UUID REFERENCES generated_pages(id) ON DELETE CASCADE,
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  change_frequency VARCHAR(20) DEFAULT 'monthly',
  priority DECIMAL(2,1) DEFAULT 0.5,
  included BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Internal Links Table
CREATE TABLE internal_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_page_id UUID REFERENCES generated_pages(id) ON DELETE CASCADE,
  to_page_id UUID REFERENCES generated_pages(id) ON DELETE CASCADE,
  anchor_text VARCHAR(255) NOT NULL,
  context_relevance DECIMAL(3,2) DEFAULT 0.0,
  position_in_content INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_page_id, to_page_id, anchor_text)
);

-- AI Content Variations Table
CREATE TABLE ai_content_variations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES generated_pages(id) ON DELETE CASCADE,
  variation_type VARCHAR(50) NOT NULL,
  original_content TEXT NOT NULL,
  generated_content TEXT NOT NULL,
  quality_score DECIMAL(3,2),
  model_used VARCHAR(50),
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_generated_pages_slug ON generated_pages(slug);
CREATE INDEX idx_generated_pages_template_id ON generated_pages(template_id);
CREATE INDEX idx_generated_pages_status ON generated_pages(status);
CREATE INDEX idx_visa_requirements_countries ON visa_requirements(from_country_code, to_country_code);
CREATE INDEX idx_content_metrics_page_id ON content_metrics(page_id);
CREATE INDEX idx_content_metrics_date ON content_metrics(date_recorded);
CREATE INDEX idx_sitemap_entries_url ON sitemap_entries(url);
CREATE INDEX idx_internal_links_from_page ON internal_links(from_page_id);
CREATE INDEX idx_internal_links_to_page ON internal_links(to_page_id);

-- Update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_content_templates_updated_at 
  BEFORE UPDATE ON content_templates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generated_pages_updated_at 
  BEFORE UPDATE ON generated_pages 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies (if using Supabase)
ALTER TABLE content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE sitemap_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_content_variations ENABLE ROW LEVEL SECURITY;

-- Admin-only access for content management
CREATE POLICY "Admin can manage content templates" ON content_templates
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can manage generated pages" ON generated_pages
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can manage visa requirements" ON visa_requirements
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Public read access for published pages
CREATE POLICY "Public can read published pages" ON generated_pages
  FOR SELECT USING (status = 'published');

-- Public read access for visa requirements
CREATE POLICY "Public can read visa requirements" ON visa_requirements
  FOR SELECT USING (true);

-- Insert default content templates
INSERT INTO content_templates (name, type, slug, template, variables, seo_config) VALUES
('Country to Schengen Template', 'country-to-schengen', 'country-to-schengen-visa-rules', 
'# {{fromCountry}} to Schengen Area Visa Requirements

Planning to travel from {{fromCountry}} to the Schengen Area? This comprehensive guide covers everything you need to know about visa requirements, application processes, and travel tips.

## Visa Requirements for {{fromCountry}} Citizens

{{#if visaRequired}}
Citizens of {{fromCountry}} **require a visa** to enter the Schengen Area. Here are the key details:

- **Visa Type**: {{visaType}}
- **Maximum Stay**: {{maxStayDays}} days
- **Processing Time**: {{processingTime}}
- **Cost**: €{{cost}}

### Required Documents
{{#each requirements}}
- {{this}}
{{/each}}

{{else}}
Great news! Citizens of {{fromCountry}} can enter the Schengen Area **visa-free** for tourism or business purposes.

- **Maximum Stay**: {{maxStayDays}} days within a 180-day period
- **Permitted Activities**: Tourism, business meetings, conferences
{{/if}}

## Popular Schengen Destinations from {{fromCountry}}

{{#each popularDestinations}}
### {{name}}
{{description}}

**Why Visit**: {{highlights}}
{{/each}}

## Travel Tips for {{fromCountry}} Citizens

1. **Passport Validity**: Ensure your passport is valid for at least 3 months beyond your planned departure
2. **Travel Insurance**: {{travelInsuranceRequirements}}
3. **Entry Requirements**: {{entryRequirements}}

## Frequently Asked Questions

{{#each faqs}}
### {{question}}
{{answer}}
{{/each}}

{{digitalNomadSection}}

*Last updated: {{lastUpdated}}*',
JSONB_BUILD_ARRAY(
  JSONB_BUILD_OBJECT('name', 'fromCountry', 'type', 'string', 'required', true, 'description', 'Origin country name'),
  JSONB_BUILD_OBJECT('name', 'visaRequired', 'type', 'boolean', 'required', true, 'description', 'Whether visa is required'),
  JSONB_BUILD_OBJECT('name', 'visaType', 'type', 'string', 'required', false, 'description', 'Type of visa required'),
  JSONB_BUILD_OBJECT('name', 'maxStayDays', 'type', 'number', 'required', true, 'description', 'Maximum stay duration'),
  JSONB_BUILD_OBJECT('name', 'processingTime', 'type', 'string', 'required', false, 'description', 'Visa processing time'),
  JSONB_BUILD_OBJECT('name', 'cost', 'type', 'number', 'required', false, 'description', 'Visa cost in EUR'),
  JSONB_BUILD_OBJECT('name', 'requirements', 'type', 'array', 'required', true, 'description', 'List of required documents'),
  JSONB_BUILD_OBJECT('name', 'popularDestinations', 'type', 'array', 'required', true, 'description', 'Popular Schengen destinations'),
  JSONB_BUILD_OBJECT('name', 'faqs', 'type', 'array', 'required', true, 'description', 'Frequently asked questions')
),
JSONB_BUILD_OBJECT(
  'titleTemplate', '{{fromCountry}} to Schengen Visa Requirements & Travel Guide 2024',
  'descriptionTemplate', 'Complete visa guide for {{fromCountry}} citizens traveling to Schengen Area. Requirements, costs, processing times & expert tips.',
  'keywords', ARRAY['{{fromCountry}} schengen visa', 'schengen visa requirements', '{{fromCountry}} travel europe', 'schengen area visa'],
  'structuredData', true
)),

('Digital Nomad Guide Template', 'digital-nomad-guide', 'digital-nomad-visa-guide-country',
'# Digital Nomad Guide: {{countryName}} 

{{countryName}} is becoming increasingly popular among digital nomads. This comprehensive guide covers visa options, costs, internet connectivity, and the best cities for remote work.

## Digital Nomad Visas in {{countryName}}

{{#each digitalNomadVisas}}
### {{name}}
- **Duration**: {{duration}}
- **Cost**: {{cost}}
- **Min Income**: {{minIncome}}
- **Application**: {{applicationProcess}}

**Requirements:**
{{#each requirements}}
- {{this}}
{{/each}}
{{/each}}

## Cost of Living

{{#if costOfLiving}}
{{countryName}} offers a {{costOfLiving}} cost of living for digital nomads:

- **Monthly Budget**: {{monthlyBudgetRange}}
- **Accommodation**: {{accommodationCosts}}
- **Food & Dining**: {{foodCosts}}
- **Transportation**: {{transportCosts}}
- **Internet**: {{internetCosts}}
{{/if}}

## Best Cities for Digital Nomads

{{#each nomadCities}}
### {{name}}
{{description}}

**Key Features:**
- Internet Speed: {{internetSpeed}}
- Coworking Spaces: {{coworkingSpaces}}
- Nomad Community: {{communitySize}}
- Safety Rating: {{safetyRating}}/10

{{/each}}

## Tax Implications

{{taxInformation}}

## Getting Started Checklist

{{#each checklist}}
- [ ] {{this}}
{{/each}}

*Information updated: {{lastUpdated}}*',
JSONB_BUILD_ARRAY(
  JSONB_BUILD_OBJECT('name', 'countryName', 'type', 'string', 'required', true, 'description', 'Target country name'),
  JSONB_BUILD_OBJECT('name', 'digitalNomadVisas', 'type', 'array', 'required', true, 'description', 'Available digital nomad visas'),
  JSONB_BUILD_OBJECT('name', 'costOfLiving', 'type', 'string', 'required', true, 'description', 'Cost of living level'),
  JSONB_BUILD_OBJECT('name', 'nomadCities', 'type', 'array', 'required', true, 'description', 'Best cities for nomads')
),
JSONB_BUILD_OBJECT(
  'titleTemplate', 'Digital Nomad Guide: {{countryName}} Visa, Costs & Best Cities 2024',
  'descriptionTemplate', 'Complete digital nomad guide for {{countryName}}. Visa options, cost of living, best cities, and practical tips for remote workers.',
  'keywords', ARRAY['{{countryName}} digital nomad', 'digital nomad visa {{countryName}}', 'remote work {{countryName}}', 'nomad guide {{countryName}}'],
  'structuredData', true
));