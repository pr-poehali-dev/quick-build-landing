ALTER TABLE uis_leads ADD COLUMN IF NOT EXISTS category TEXT;

CREATE TABLE IF NOT EXISTS uis_form_registry (
    id SERIAL PRIMARY KEY,
    category TEXT UNIQUE NOT NULL,
    form_id INTEGER UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO uis_form_registry (category, form_id) VALUES
    ('Склады', 300),
    ('Производственные здания', 301),
    ('Здания для транспорта', 302),
    ('Торговые здания', 303),
    ('Главная', 304)
ON CONFLICT (category) DO NOTHING;

UPDATE uis_leads SET category = 'Склады' WHERE category IS NULL;
