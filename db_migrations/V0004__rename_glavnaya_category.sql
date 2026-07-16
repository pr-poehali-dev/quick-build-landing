-- Переименовываем категорию "Главная" в "Быстровозводимые здания" для реестра форм и старых заявок
UPDATE uis_form_registry SET category = 'Быстровозводимые здания' WHERE category = 'Главная';
UPDATE uis_leads SET category = 'Быстровозводимые здания' WHERE category = 'Главная';
