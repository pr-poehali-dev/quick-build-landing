-- Пересобираем реестр форм UIS: категория делится на 3 формы
-- (Обратный звонок, Квиз, Контактная форма), нумерация с Главной = 300.

ALTER TABLE uis_form_registry ADD COLUMN IF NOT EXISTS form_type TEXT;

ALTER TABLE uis_form_registry DROP CONSTRAINT IF EXISTS uis_form_registry_category_key;
ALTER TABLE uis_form_registry DROP CONSTRAINT IF EXISTS uis_form_registry_form_id_key;

-- Переиспользуем существующие 5 строк под новую схему
UPDATE uis_form_registry SET category = 'Главная', form_type = 'Обратный звонок', form_id = 300 WHERE id = 1;
UPDATE uis_form_registry SET category = 'Главная', form_type = 'Квиз', form_id = 301 WHERE id = 2;
UPDATE uis_form_registry SET category = 'Главная', form_type = 'Контактная форма', form_id = 302 WHERE id = 3;
UPDATE uis_form_registry SET category = 'Склады', form_type = 'Обратный звонок', form_id = 303 WHERE id = 4;
UPDATE uis_form_registry SET category = 'Склады', form_type = 'Квиз', form_id = 304 WHERE id = 5;

INSERT INTO uis_form_registry (category, form_type, form_id) VALUES
    ('Склады', 'Контактная форма', 305),
    ('Производственные здания', 'Обратный звонок', 306),
    ('Производственные здания', 'Квиз', 307),
    ('Производственные здания', 'Контактная форма', 308),
    ('Здания для транспорта', 'Обратный звонок', 309),
    ('Здания для транспорта', 'Квиз', 310),
    ('Здания для транспорта', 'Контактная форма', 311),
    ('Торговые здания', 'Обратный звонок', 312),
    ('Торговые здания', 'Квиз', 313),
    ('Торговые здания', 'Контактная форма', 314);

ALTER TABLE uis_form_registry ADD CONSTRAINT uis_form_registry_category_type_key UNIQUE (category, form_type);
ALTER TABLE uis_form_registry ADD CONSTRAINT uis_form_registry_form_id_key UNIQUE (form_id);
