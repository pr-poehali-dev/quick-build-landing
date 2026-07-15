CREATE TABLE IF NOT EXISTS uis_leads (
    id SERIAL PRIMARY KEY,
    form_id INTEGER NOT NULL,
    form_name TEXT,
    source TEXT,
    name TEXT,
    phone TEXT,
    email TEXT,
    message TEXT,
    quiz_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_uis_leads_form_id ON uis_leads(form_id);
CREATE INDEX IF NOT EXISTS idx_uis_leads_created_at ON uis_leads(created_at);
