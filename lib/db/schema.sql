-- Supabase SQL Schema for Legal Updates
-- Run this in Supabase SQL Editor to create the table

CREATE TABLE IF NOT EXISTS legal_updates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  published_at TIMESTAMPTZ NOT NULL,
  jurisdiction TEXT NOT NULL CHECK (jurisdiction IN ('US-Federal', 'US-IRS', 'US-Congress', 'TR', 'General')),
  tags TEXT[] DEFAULT '{}',
  summary TEXT NOT NULL,
  summary_tr TEXT,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL UNIQUE,
  source_urls TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_legal_updates_status ON legal_updates(status);
CREATE INDEX IF NOT EXISTS idx_legal_updates_jurisdiction ON legal_updates(jurisdiction);
CREATE INDEX IF NOT EXISTS idx_legal_updates_published_at ON legal_updates(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_legal_updates_tags ON legal_updates USING GIN(tags);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_legal_updates_search ON legal_updates
  USING GIN(to_tsvector('english', title || ' ' || summary));

-- Row Level Security (optional - enable if needed)
-- ALTER TABLE legal_updates ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to published updates
-- CREATE POLICY "Public can view published updates" ON legal_updates
--   FOR SELECT USING (status = 'published');

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_legal_updates_updated_at ON legal_updates;
CREATE TRIGGER update_legal_updates_updated_at
  BEFORE UPDATE ON legal_updates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
