import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ── Images ───────────────────────────────────────────────────────────────────
const HERO_BG  = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/e04968b8-999e-4c94-812a-66bd0ded90d1.jpg";
const LOGO_URL = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/528f5996-8edc-44d4-8206-5de1a1c38adf.png";
const QUIZ_IMG = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/b804bc76-6c00-4b45-a412-fd6862c13609.png";
const P1_A = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/67305f47-00a1-4a07-983d-4f915afe13fd.png";
const P1_B = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/16bd85b5-ba1b-4bcf-818e-20d141de7209.png";
const P1_C = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/b804bc76-6c00-4b45-a412-fd6862c13609.png";
const P2_A = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/ea209454-b909-4daa-af92-c0da34240618.jpg";
const P2_B = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/b804bc76-6c00-4b45-a412-fd6862c13609.png";
const P2_C = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/67305f47-00a1-4a07-983d-4f915afe13fd.png";
const P3_A = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/8e5eb3d6-5c31-48ea-8143-dc4a7452062f.jpg";
const P3_B = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/16bd85b5-ba1b-4bcf-818e-20d141de7209.png";
const P3_C = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/b804bc76-6c00-4b45-a412-fd6862c13609.png";
const P4_A = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/ac8a4f07-7780-4883-83be-5083ef582f7b.jpg";
const P4_B = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/67305f47-00a1-4a07-983d-4f915afe13fd.png";
const P4_C = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/16bd85b5-ba1b-4bcf-818e-20d141de7209.png";

const ROTATING_WORDS = ["здания","склады","ангары","цеха","офисы","медицинские здания","магазины","кафе и рестораны","торговые здания","административные здания","автомойки","здания для транспорта","автосервисы","автосалоны","сельхоз здания","фермы","спортивные сооружения"];

const STATS = [
  { num:300, suffix:"+", title:"Реализованных проектов", desc:"Промышленных и коммерческих зданий по всей России" },
  { num:40, suffix:" дней", title:"Срок поставки и монтажа", desc:"Всего за 40 дней мы обеспечиваем поставку и монтаж быстровозводимых зданий SMALL BOX для малого и среднего бизнеса" },
  { num:500, suffix:"+ тыс. м²", title:"Запроектировано", desc:"Запроектированных объектов в нашем портфеле и более 300 тыс. м² построенных объектов BIG BOX" },
  { num:60, suffix:"+", title:"Многоуровневых паркингов", desc:"Запроектировали паркингов на 50 000 машиномест и построили более 20 паркингов на 9 000 машиномест" },
];

interface Project { id:number; photos:string[]; title:string; dims:string; area:string; locationShort:string; locationFull:string; purpose:string; series:string; roof:string; walls:string; length:string; width:string; height:string; category:string; }
const projects: Project[] = [
  { id:1, photos:[P1_C,P1_A,P1_B], title:"Склад для хранения металлоизделий", dims:"18×30×6 м", area:"540 м²", locationShort:"Ярославская обл., г. Рыбинск", locationFull:"Россия, Ярославская обл., г. Рыбинск", purpose:"Склад и ангар", series:"Здание по серии Р4-1", roof:"Сэндвич-панели — 200 мм", walls:"Сэндвич-панели — 150 мм", length:"30 м", width:"18 м", height:"6 м", category:"Склады и ангары" },
  { id:2, photos:[P2_A,P2_B,P2_C], title:"Производственный цех", dims:"24×48×8 м", area:"1152 м²", locationShort:"Московская обл., г. Подольск", locationFull:"Россия, Московская обл., г. Подольск", purpose:"Производственное здание", series:"Здание по серии П3-2", roof:"Профлист — 150 мм", walls:"Профлист — 120 мм", length:"48 м", width:"24 м", height:"8 м", category:"Производственные здания" },
  { id:3, photos:[P3_A,P3_B,P3_C], title:"Торговый центр", dims:"30×60×6 м", area:"1800 м²", locationShort:"Краснодарский край, г. Сочи", locationFull:"Россия, Краснодарский край, г. Сочи", purpose:"Торговое здание", series:"Здание по серии Т2-1", roof:"Сэндвич-панели — 200 мм", walls:"Сэндвич-панели — 150 мм", length:"60 м", width:"30 м", height:"6 м", category:"Магазины и торговые здания" },
  { id:4, photos:[P4_A,P4_B,P4_C], title:"Автосервис с автомойкой", dims:"12×24×4.8 м", area:"288 м²", locationShort:"Свердловская обл., г. Екатеринбург", locationFull:"Россия, Свердловская обл., г. Екатеринбург", purpose:"Автосервис", series:"Здание по серии А1-1", roof:"Профлист — 120 мм", walls:"Профлист — 100 мм", length:"24 м", width:"12 м", height:"4.8 м", category:"Здания для транспорта" },
];

// ── Snow/Wind zones by city — ветровые районы по таблице заказчика ───────────
const CITY_ZONES: Record<string, { snow: string; wind: string }> = {
  "Майкоп":{ snow:"II", wind:"IV" },
  "Адыгейск":{ snow:"II", wind:"IV" },
  "Барнаул":{ snow:"III", wind:"III" },
  "Бийск":{ snow:"IV", wind:"III" },
  "Горно-Алтайск":{ snow:"IV", wind:"III" },
  "Рубцовск":{ snow:"II", wind:"III" },
  "Благовещенск":{ snow:"I", wind:"III" },
  "Белогорск":{ snow:"I", wind:"II" },
  "Свободный":{ snow:"I", wind:"II" },
  "Тында":{ snow:"II", wind:"I" },
  "Архангельск":{ snow:"IV", wind:"II" },
  "Северодвинск":{ snow:"V", wind:"II" },
  "Котлас":{ snow:"IV", wind:"I" },
  "Коряжма":{ snow:"IV", wind:"I" },
  "Новодвинск":{ snow:"IV", wind:"II" },
  "Астрахань":{ snow:"I", wind:"III" },
  "Ахтубинск":{ snow:"II", wind:"III" },
  "Знаменск":{ snow:"II", wind:"III" },
  "Нефтекамск":{ snow:"IV", wind:"II" },
  "Октябрьский":{ snow:"IV", wind:"II" },
  "Салават":{ snow:"V", wind:"III" },
  "Стерлитамак":{ snow:"V", wind:"III" },
  "Уфа":{ snow:"V", wind:"II" },
  "Белгород":{ snow:"III", wind:"II" },
  "Старый Оскол":{ snow:"III", wind:"II" },
  "Губкин":{ snow:"III", wind:"II" },
  "Шебекино":{ snow:"III", wind:"II" },
  "Алексеевка":{ snow:"III", wind:"II" },
  "Брянск":{ snow:"III", wind:"I" },
  "Клинцы":{ snow:"III", wind:"I" },
  "Новозыбков":{ snow:"III", wind:"I" },
  "Дятьково":{ snow:"III", wind:"I" },
  "Унеча":{ snow:"III", wind:"I" },
  "Улан-Удэ":{ snow:"I", wind:"III" },
  "Гусиноозёрск":{ snow:"II", wind:"III" },
  "Северобайкальск":{ snow:"IV", wind:"II" },
  "Владимир":{ snow:"IV", wind:"I" },
  "Ковров":{ snow:"III", wind:"I" },
  "Муром":{ snow:"III", wind:"I" },
  "Александров":{ snow:"IV", wind:"I" },
  "Гусь-Хрустальный":{ snow:"III", wind:"I" },
  "Волгоград":{ snow:"II", wind:"III" },
  "Волжский":{ snow:"II", wind:"III" },
  "Камышин":{ snow:"III", wind:"III" },
  "Михайловка":{ snow:"III", wind:"III" },
  "Урюпинск":{ snow:"III", wind:"II" },
  "Вологда":{ snow:"IV", wind:"I" },
  "Череповец":{ snow:"IV", wind:"I" },
  "Сокол":{ snow:"IV", wind:"I" },
  "Великий Устюг":{ snow:"IV", wind:"I" },
  "Воронеж":{ snow:"III", wind:"II" },
  "Россошь":{ snow:"III", wind:"II" },
  "Борисоглебск":{ snow:"III", wind:"II" },
  "Лиски":{ snow:"III", wind:"II" },
  "Острогожск":{ snow:"III", wind:"II" },
  "Каспийск":{ snow:"II", wind:"V" },
  "Махачкала":{ snow:"II", wind:"V" },
  "Хасавюрт":{ snow:"II", wind:"IV" },
  "Биробиджан":{ snow:"II", wind:"III" },
  "Облучье":{ snow:"II", wind:"II" },
  "Чита":{ snow:"I", wind:"II" },
  "Краснокаменск":{ snow:"I", wind:"III" },
  "Борзя":{ snow:"I", wind:"III" },
  "Иваново":{ snow:"IV", wind:"I" },
  "Кинешма":{ snow:"IV", wind:"I" },
  "Шуя":{ snow:"IV", wind:"I" },
  "Тейково":{ snow:"IV", wind:"I" },
  "Кохма":{ snow:"IV", wind:"I" },
  "Назрань":{ snow:"II", wind:"IV" },
  "Сунжа":{ snow:"I", wind:"IV" },
  "Карабулак":{ snow:"I", wind:"IV" },
  "Малгобек":{ snow:"I", wind:"IV" },
  "Магас":{ snow:"I", wind:"IV" },
  "Ангарск":{ snow:"II", wind:"III" },
  "Братск":{ snow:"IV", wind:"II" },
  "Иркутск":{ snow:"II", wind:"III" },
  "Усть-Илимск":{ snow:"IV", wind:"II" },
  "Нальчик":{ snow:"I", wind:"IV" },
  "Прохладный":{ snow:"II", wind:"IV" },
  "Баксан":{ snow:"II", wind:"IV" },
  "Нарткала":{ snow:"II", wind:"IV" },
  "Майский":{ snow:"II", wind:"IV" },
  "Калининград":{ snow:"II", wind:"II" },
  "Советск":{ snow:"II", wind:"I" },
  "Черняховск":{ snow:"II", wind:"II" },
  "Гусев":{ snow:"II", wind:"I" },
  "Балтийск":{ snow:"II", wind:"III" },
  "Элиста":{ snow:"II", wind:"III" },
  "Лагань":{ snow:"I", wind:"III" },
  "Городовиковск":{ snow:"II", wind:"III" },
  "Калуга":{ snow:"III", wind:"I" },
  "Обнинск":{ snow:"III", wind:"I" },
  "Малоярославец":{ snow:"III", wind:"I" },
  "Людиново":{ snow:"III", wind:"I" },
  "Балабаново":{ snow:"III", wind:"I" },
  "Козельск":{ snow:"III", wind:"I" },
  "Петропавловск-Камчатский":{ snow:"VIII", wind:"VII" },
  "Черкесск":{ snow:"II", wind:"IV" },
  "Петрозаводск":{ snow:"IV", wind:"II" },
  "Костомукша":{ snow:"V", wind:"I" },
  "Кондопога":{ snow:"IV", wind:"II" },
  "Сегежа":{ snow:"V", wind:"I" },
  "Сортавала":{ snow:"IV", wind:"II" },
  "Кемерово":{ snow:"IV", wind:"III" },
  "Киселёвск":{ snow:"III", wind:"III" },
  "Междуреченск":{ snow:"V", wind:"III" },
  "Новокузнецк":{ snow:"IV", wind:"III" },
  "Прокопьевск":{ snow:"III", wind:"III" },
  "Ленинск-Кузнецкий":{ snow:"IV", wind:"III" },
  "Юрга":{ snow:"IV", wind:"III" },
  "Белово":{ snow:"IV", wind:"III" },
  "Анжеро-Судженск":{ snow:"IV", wind:"III" },
  "Киров":{ snow:"IV", wind:"I" },
  "Кирово-Чепецк":{ snow:"V", wind:"I" },
  "Вятские Поляны":{ snow:"V", wind:"II" },
  "Слободской":{ snow:"V", wind:"I" },
  "Котельнич":{ snow:"IV", wind:"I" },
  "Сыктывкар":{ snow:"IV", wind:"I" },
  "Ухта":{ snow:"V", wind:"II" },
  "Воркута":{ snow:"VI", wind:"IV" },
  "Печора":{ snow:"VI", wind:"II" },
  "Усинск":{ snow:"V", wind:"II" },
  "Кострома":{ snow:"IV", wind:"I" },
  "Буй":{ snow:"IV", wind:"I" },
  "Шарья":{ snow:"IV", wind:"I" },
  "Нерехта":{ snow:"IV", wind:"I" },
  "Волгореченск":{ snow:"IV", wind:"I" },
  "Армавир":{ snow:"II", wind:"IV" },
  "Краснодар":{ snow:"II", wind:"IV" },
  "Кропоткин":{ snow:"II", wind:"IV" },
  "Сочи":{ snow:"I", wind:"III" },
  "Новороссийск":{ snow:"I", wind:"VI" },
  "Ейск":{ snow:"I", wind:"IV" },
  "Анапа":{ snow:"I", wind:"V" },
  "Геленджик":{ snow:"I", wind:"V" },
  "Славянск-на-Кубани":{ snow:"I", wind:"IV" },
  "Туапсе":{ snow:"I", wind:"IV" },
  "Лабинск":{ snow:"II", wind:"IV" },
  "Белореченск":{ snow:"II", wind:"IV" },
  "Тихорецк":{ snow:"I", wind:"IV" },
  "Крымск":{ snow:"I", wind:"IV" },
  "Тимашёвск":{ snow:"I", wind:"IV" },
  "Ачинск":{ snow:"III", wind:"III" },
  "Канск":{ snow:"III", wind:"III" },
  "Красноярск":{ snow:"III", wind:"III" },
  "Норильск":{ snow:"V", wind:"IV" },
  "Железногорск":{ snow:"III", wind:"III" },
  "Минусинск":{ snow:"IV", wind:"III" },
  "Лесосибирск":{ snow:"III", wind:"II" },
  "Зеленогорск":{ snow:"III", wind:"III" },
  "Назарово":{ snow:"III", wind:"III" },
  "Евпатория":{ snow:"I", wind:"IV" },
  "Ялта":{ snow:"I", wind:"III" },
  "Симферополь":{ snow:"I", wind:"II" },
  "Керчь":{ snow:"II", wind:"III" },
  "Феодосия":{ snow:"II", wind:"II" },
  "Джанкой":{ snow:"I", wind:"II" },
  "Алушта":{ snow:"II", wind:"III" },
  "Севастополь":{ snow:"I", wind:"II" },
  "Курган":{ snow:"IV", wind:"II" },
  "Шадринск":{ snow:"IV", wind:"II" },
  "Шумиха":{ snow:"IV", wind:"II" },
  "Куртамыш":{ snow:"IV", wind:"II" },
  "Катайск":{ snow:"IV", wind:"II" },
  "Курск":{ snow:"III", wind:"II" },
  "Курчатов":{ snow:"III", wind:"II" },
  "Льгов":{ snow:"III", wind:"II" },
  "Рыльск":{ snow:"III", wind:"II" },
  "Выборг":{ snow:"III", wind:"II" },
  "Гатчина":{ snow:"III", wind:"II" },
  "Пушкин":{ snow:"III", wind:"II" },
  "Санкт-Петербург":{ snow:"III", wind:"II" },
  "Мурино":{ snow:"III", wind:"II" },
  "Всеволжск":{ snow:"III", wind:"II" },
  "Сертолово":{ snow:"IV", wind:"II" },
  "Сосновый Бор":{ snow:"III", wind:"II" },
  "Кудрово":{ snow:"III", wind:"II" },
  "Тихвин":{ snow:"IV", wind:"I" },
  "Кириши":{ snow:"IV", wind:"II" },
  "Кингисепп":{ snow:"III", wind:"II" },
  "Волхов":{ snow:"III", wind:"I" },
  "Елец":{ snow:"III", wind:"II" },
  "Липецк":{ snow:"III", wind:"II" },
  "Грязи":{ snow:"III", wind:"II" },
  "Лебедянь":{ snow:"III", wind:"II" },
  "Данков":{ snow:"III", wind:"II" },
  "Усмань":{ snow:"III", wind:"II" },
  "Магадан":{ snow:"V", wind:"V" },
  "Сусуман":{ snow:"IV", wind:"I" },
  "Йошкар-Ола":{ snow:"IV", wind:"I" },
  "Волжск":{ snow:"III", wind:"II" },
  "Медведево":{ snow:"IV", wind:"I" },
  "Козьмодемьянск":{ snow:"III", wind:"I" },
  "Саранск":{ snow:"III", wind:"II" },
  "Рузаевка":{ snow:"III", wind:"II" },
  "Ковылкино":{ snow:"III", wind:"II" },
  "Дмитров":{ snow:"III", wind:"I" },
  "Клин":{ snow:"IV", wind:"I" },
  "Коломна":{ snow:"III", wind:"I" },
  "Москва":{ snow:"III", wind:"I" },
  "Сергиев Посад":{ snow:"III", wind:"I" },
  "Серпухов":{ snow:"III", wind:"I" },
  "Подольск":{ snow:"III", wind:"I" },
  "Реутов":{ snow:"III", wind:"I" },
  "Балашиха":{ snow:"III", wind:"I" },
  "Ногинск":{ snow:"III", wind:"I" },
  "Воскресенск":{ snow:"III", wind:"I" },
  "Чехов":{ snow:"III", wind:"I" },
  "Химки":{ snow:"III", wind:"I" },
  "Апрелевка":{ snow:"III", wind:"I" },
  "Наро-Фоминск":{ snow:"III", wind:"I" },
  "Белоозерский":{ snow:"III", wind:"I" },
  "Мытищи":{ snow:"III", wind:"I" },
  "Королёв":{ snow:"III", wind:"I" },
  "Люберцы":{ snow:"III", wind:"I" },
  "Красногорск":{ snow:"III", wind:"I" },
  "Одинцово":{ snow:"III", wind:"I" },
  "Домодедово":{ snow:"III", wind:"I" },
  "Электросталь":{ snow:"III", wind:"I" },
  "Щёлково":{ snow:"III", wind:"I" },
  "Долгопрудный":{ snow:"III", wind:"I" },
  "Раменское":{ snow:"III", wind:"I" },
  "Жуковский":{ snow:"III", wind:"I" },
  "Пушкино":{ snow:"III", wind:"I" },
  "Орехово-Зуево":{ snow:"III", wind:"I" },
  "Видное":{ snow:"III", wind:"I" },
  "Ивантеевка":{ snow:"III", wind:"I" },
  "Лобня":{ snow:"III", wind:"I" },
  "Дубна":{ snow:"IV", wind:"I" },
  "Егорьевск":{ snow:"III", wind:"I" },
  "Лыткарино":{ snow:"III", wind:"I" },
  "Павловский Посад":{ snow:"III", wind:"I" },
  "Ступино":{ snow:"III", wind:"I" },
  "Котельники":{ snow:"III", wind:"I" },
  "Фрязино":{ snow:"III", wind:"I" },
  "Мурманск":{ snow:"VII", wind:"IV" },
  "Североморск":{ snow:"V", wind:"IV" },
  "Апатиты":{ snow:"V", wind:"II" },
  "Мончегорск":{ snow:"IV", wind:"II" },
  "Кандалакша":{ snow:"V", wind:"II" },
  "Кировск":{ snow:"VI", wind:"II" },
  "Оленегорск":{ snow:"IV", wind:"II" },
  "Ковдор":{ snow:"V", wind:"II" },
  "Полярные Зори":{ snow:"V", wind:"II" },
  "Заполярный":{ snow:"V", wind:"II" },
  "Заозёрск":{ snow:"VI", wind:"IV" },
  "Островной":{ snow:"VI", wind:"VI" },
  "Арзамас":{ snow:"III", wind:"I" },
  "Нижний Новгород":{ snow:"IV", wind:"I" },
  "Саров":{ snow:"IV", wind:"I" },
  "Дзержинск":{ snow:"IV", wind:"I" },
  "Бор":{ snow:"IV", wind:"I" },
  "Кстово":{ snow:"IV", wind:"I" },
  "Павлово":{ snow:"IV", wind:"I" },
  "Выкса":{ snow:"III", wind:"I" },
  "Балахна":{ snow:"IV", wind:"I" },
  "Заволжье":{ snow:"IV", wind:"I" },
  "Великий Новгород":{ snow:"III", wind:"I" },
  "Боровичи":{ snow:"IV", wind:"I" },
  "Старая Русса":{ snow:"III", wind:"I" },
  "Пестово":{ snow:"IV", wind:"I" },
  "Валдай":{ snow:"III", wind:"I" },
  "Чудово":{ snow:"III", wind:"I" },
  "Бердск":{ snow:"III", wind:"III" },
  "Новосибирск":{ snow:"III", wind:"III" },
  "Искитим":{ snow:"III", wind:"III" },
  "Куйбышев":{ snow:"II", wind:"III" },
  "Барабинск":{ snow:"II", wind:"III" },
  "Омск":{ snow:"III", wind:"II" },
  "Тара":{ snow:"III", wind:"I" },
  "Калачинск":{ snow:"III", wind:"II" },
  "Бузулук":{ snow:"III", wind:"III" },
  "Оренбург":{ snow:"III", wind:"III" },
  "Орск":{ snow:"III", wind:"III" },
  "Новотроицк":{ snow:"III", wind:"III" },
  "Бугуруслан":{ snow:"IV", wind:"III" },
  "Гай":{ snow:"III", wind:"III" },
  "Сорочинск":{ snow:"III", wind:"III" },
  "Орёл":{ snow:"III", wind:"II" },
  "Ливны":{ snow:"III", wind:"II" },
  "Мценск":{ snow:"III", wind:"I" },
  "Болхов":{ snow:"III", wind:"I" },
  "Кузнецк":{ snow:"IV", wind:"II" },
  "Пенза":{ snow:"III", wind:"II" },
  "Заречный":{ snow:"III", wind:"II" },
  "Каменка":{ snow:"III", wind:"II" },
  "Сердобск":{ snow:"III", wind:"II" },
  "Нижний Ломов":{ snow:"III", wind:"II" },
  "Березники":{ snow:"V", wind:"I" },
  "Пермь":{ snow:"IV", wind:"I" },
  "Соликамск":{ snow:"V", wind:"I" },
  "Чайковский":{ snow:"IV", wind:"I" },
  "Кунгур":{ snow:"V", wind:"I" },
  "Лысьва":{ snow:"V", wind:"I" },
  "Краснокамск":{ snow:"V", wind:"I" },
  "Чусовой":{ snow:"V", wind:"I" },
  "Чернушка":{ snow:"V", wind:"II" },
  "Добрянка":{ snow:"V", wind:"I" },
  "Кудымкар":{ snow:"V", wind:"I" },
  "Губаха":{ snow:"VI", wind:"I" },
  "Уссурийск":{ snow:"II", wind:"IV" },
  "Владивосток":{ snow:"II", wind:"IV" },
  "Находка":{ snow:"II", wind:"V" },
  "Артём":{ snow:"II", wind:"IV" },
  "Арсеньев":{ snow:"III", wind:"III" },
  "Спасск-Дальний":{ snow:"II", wind:"III" },
  "Большой Камень":{ snow:"II", wind:"IV" },
  "Партизанск":{ snow:"III", wind:"V" },
  "Лесозаводск":{ snow:"II", wind:"III" },
  "Великие Луки":{ snow:"II", wind:"I" },
  "Псков":{ snow:"III", wind:"I" },
  "Остров":{ snow:"III", wind:"I" },
  "Невель":{ snow:"II", wind:"I" },
  "Волгодонск":{ snow:"II", wind:"III" },
  "Новочеркасск":{ snow:"II", wind:"III" },
  "Новошахтинск":{ snow:"II", wind:"III" },
  "Ростов-на-Дону":{ snow:"II", wind:"III" },
  "Таганрог":{ snow:"II", wind:"III" },
  "Шахты":{ snow:"II", wind:"III" },
  "Рязань":{ snow:"III", wind:"I" },
  "Касимов":{ snow:"III", wind:"I" },
  "Скопин":{ snow:"III", wind:"I" },
  "Сасово":{ snow:"III", wind:"I" },
  "Рыбное":{ snow:"III", wind:"I" },
  "Новокуйбышевск":{ snow:"IV", wind:"III" },
  "Самара":{ snow:"IV", wind:"III" },
  "Сызрань":{ snow:"III", wind:"III" },
  "Тольятти":{ snow:"IV", wind:"III" },
  "Саратов":{ snow:"III", wind:"III" },
  "Энгельс":{ snow:"III", wind:"III" },
  "Балаково":{ snow:"III", wind:"III" },
  "Балашов":{ snow:"III", wind:"II" },
  "Вольск":{ snow:"III", wind:"III" },
  "Пугачёв":{ snow:"III", wind:"III" },
  "Ртищево":{ snow:"III", wind:"II" },
  "Якутск":{ snow:"II", wind:"I" },
  "Нерюнгри":{ snow:"V", wind:"I" },
  "Мирный":{ snow:"IV", wind:"I" },
  "Ленск":{ snow:"IV", wind:"I" },
  "Алдан":{ snow:"V", wind:"I" },
  "Южно-Сахалинск":{ snow:"V", wind:"VI" },
  "Екатеринбург":{ snow:"III", wind:"II" },
  "Каменск-Уральский":{ snow:"III", wind:"I" },
  "Нижний Тагил":{ snow:"IV", wind:"I" },
  "Первоуральск":{ snow:"IV", wind:"I" },
  "Серов":{ snow:"IV", wind:"I" },
  "Владикавказ":{ snow:"II", wind:"IV" },
  "Моздок":{ snow:"I", wind:"IV" },
  "Беслан":{ snow:"I", wind:"IV" },
  "Алагир":{ snow:"II", wind:"IV" },
  "Смоленск":{ snow:"III", wind:"I" },
  "Вязьма":{ snow:"III", wind:"I" },
  "Рославль":{ snow:"III", wind:"I" },
  "Ярцево":{ snow:"III", wind:"I" },
  "Сафроново":{ snow:"III", wind:"I" },
  "Гагарин":{ snow:"III", wind:"I" },
  "Десногорск":{ snow:"III", wind:"I" },
  "Ессентуки":{ snow:"II", wind:"IV" },
  "Кисловодск":{ snow:"II", wind:"IV" },
  "Невинномысск":{ snow:"II", wind:"IV" },
  "Пятигорск":{ snow:"I", wind:"IV" },
  "Ставрополь":{ snow:"II", wind:"IV" },
  "Мичуринск":{ snow:"III", wind:"II" },
  "Тамбов":{ snow:"III", wind:"II" },
  "Рассказово":{ snow:"III", wind:"II" },
  "Моршанск":{ snow:"III", wind:"II" },
  "Котовск":{ snow:"III", wind:"II" },
  "Уварово":{ snow:"III", wind:"II" },
  "Альметьевск":{ snow:"IV", wind:"II" },
  "Бугульма":{ snow:"V", wind:"II" },
  "Казань":{ snow:"V", wind:"II" },
  "Набережные Челны":{ snow:"V", wind:"II" },
  "Нижнекамск":{ snow:"IV", wind:"II" },
  "Зеленодольск":{ snow:"IV", wind:"II" },
  "Елабуга":{ snow:"V", wind:"II" },
  "Лениногорск":{ snow:"V", wind:"II" },
  "Чистополь":{ snow:"IV", wind:"II" },
  "Заинск":{ snow:"IV", wind:"II" },
  "Азнакаево":{ snow:"V", wind:"II" },
  "Нурлат":{ snow:"V", wind:"II" },
  "Менделеевск":{ snow:"V", wind:"II" },
  "Бавлы":{ snow:"V", wind:"II" },
  "Арск":{ snow:"IV", wind:"II" },
  "Тверь":{ snow:"III", wind:"I" },
  "Ржев":{ snow:"III", wind:"I" },
  "Вышний Волочёк":{ snow:"III", wind:"I" },
  "Торжок":{ snow:"III", wind:"I" },
  "Кимры":{ snow:"IV", wind:"I" },
  "Конаково":{ snow:"IV", wind:"I" },
  "Северск":{ snow:"IV", wind:"III" },
  "Томск":{ snow:"IV", wind:"III" },
  "Стрежевой":{ snow:"V", wind:"I" },
  "Асино":{ snow:"IV", wind:"II" },
  "Колпашево":{ snow:"IV", wind:"I" },
  "Кызыл":{ snow:"I", wind:"III" },
  "Каа-Хем":{ snow:"I", wind:"III" },
  "Ак-Довурак":{ snow:"I", wind:"III" },
  "Шагонар":{ snow:"I", wind:"III" },
  "Новомосковск":{ snow:"III", wind:"I" },
  "Тула":{ snow:"III", wind:"I" },
  "Донской":{ snow:"III", wind:"I" },
  "Алексин":{ snow:"III", wind:"I" },
  "Щёкино":{ snow:"III", wind:"I" },
  "Узловая":{ snow:"III", wind:"I" },
  "Ефремов":{ snow:"III", wind:"I" },
  "Тобольск":{ snow:"IV", wind:"I" },
  "Тюмень":{ snow:"IV", wind:"I" },
  "Ишим":{ snow:"IV", wind:"I" },
  "Ялуторовск":{ snow:"IV", wind:"I" },
  "Заводоуковск":{ snow:"IV", wind:"I" },
  "Нефтеюганск":{ snow:"V", wind:"I" },
  "Нижневартовск":{ snow:"V", wind:"I" },
  "Сургут":{ snow:"V", wind:"I" },
  "Ханты-Мансийск":{ snow:"V", wind:"I" },
  "Новый Уренгой":{ snow:"V", wind:"III" },
  "Воткинск":{ snow:"IV", wind:"I" },
  "Глазов":{ snow:"IV", wind:"I" },
  "Ижевск":{ snow:"IV", wind:"I" },
  "Сарапул":{ snow:"IV", wind:"I" },
  "Ульяновск":{ snow:"III", wind:"II" },
  "Димитровград":{ snow:"IV", wind:"II" },
  "Инза":{ snow:"IV", wind:"II" },
  "Барыш":{ snow:"IV", wind:"II" },
  "Новоульяновск":{ snow:"IV", wind:"II" },
  "Сенгилей":{ snow:"IV", wind:"II" },
  "Комсомольск-на-Амуре":{ snow:"III", wind:"III" },
  "Хабаровск":{ snow:"II", wind:"III" },
  "Амурск":{ snow:"III", wind:"III" },
  "Советская Гавань":{ snow:"IV", wind:"VI" },
  "Николаевск-на-Амуре":{ snow:"VI", wind:"VI" },
  "Бикин":{ snow:"II", wind:"III" },
  "Вяземский":{ snow:"II", wind:"III" },
  "Златоуст":{ snow:"V", wind:"II" },
  "Копейск":{ snow:"IV", wind:"II" },
  "Магнитогорск":{ snow:"IV", wind:"II" },
  "Миасс":{ snow:"V", wind:"II" },
  "Челябинск":{ snow:"IV", wind:"II" },
  "Грозный":{ snow:"II", wind:"IV" },
  "Урус-Мартан":{ snow:"II", wind:"IV" },
  "Гудермес":{ snow:"II", wind:"IV" },
  "Шали":{ snow:"II", wind:"IV" },
  "Аргун":{ snow:"II", wind:"IV" },
  "Курчалой":{ snow:"II", wind:"IV" },
  "Новочебоксарск":{ snow:"III", wind:"I" },
  "Чебоксары":{ snow:"III", wind:"I" },
  "Канаш":{ snow:"III", wind:"II" },
  "Алатырь":{ snow:"III", wind:"II" },
  "Шумерля":{ snow:"III", wind:"II" },
  "Рыбинск":{ snow:"III", wind:"I" },
  "Ярославль":{ snow:"III", wind:"I" },
  "Тутаев":{ snow:"III", wind:"I" },
  "Переславль-Залесский":{ snow:"III", wind:"I" },
  "Углич":{ snow:"III", wind:"I" },
  "Ростов":{ snow:"III", wind:"I" },
};
function getCityZones(city: string) {
  return CITY_ZONES[city] ?? { snow: "III", wind: "II" };
}

// ── Cities ────────────────────────────────────────────────────────────────────
const CITIES = Object.keys(CITY_ZONES).sort((a, b) => a.localeCompare(b, "ru"));

const STEP1_OPTIONS = [
  { label:"Производственные и промышленные здания", icon:"Factory" },
  { label:"Склады и ангары", icon:"Package" },
  { label:"Магазины и торговые здания", icon:"ShoppingBag" },
  { label:"Здания для транспорта", icon:"Car" },
  { label:"Сельскохозяйственные здания", icon:"Leaf" },
  { label:"Другое", icon:"MoreHorizontal" },
];
const LENGTHS = [24,30,36,42,48,54];
const WIDTHS  = [12,18,24];
const HEIGHTS = [3.6,4.8,6,7.2,8.4,9.6];
const CLADDING_OPTIONS = ["Профилированный лист","Сэндвич панели"];
const CRANE_OPTIONS    = ["Да","Нет"];
const EXTRA_SERVICES   = ["Подбор земельного участка","Оценка пригодности участка для реализации проекта","Проектирование и получение разрешения на строительство","Поставка комплекта здания","Доставка комплекта здания до стройплощадки","Монтаж здания","Сдача в эксплуатацию"];

// ── Validation helpers ────────────────────────────────────────────────────────
function validateName(v: string) {
  if (!v.trim()) return "Введите имя";
  if (/\d/.test(v)) return "Имя не должно содержать цифры";
  if (v.trim().length < 2) return "Слишком короткое имя";
  return "";
}
function validatePhone(v: string) {
  const digits = v.replace(/\D/g,"");
  if (!digits) return "Введите номер телефона";
  if (digits.length < 11) return "Введите полный номер телефона";
  return "";
}
function validateEmail(v: string) {
  if (!v.trim()) return "Введите email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Некорректный email";
  return "";
}

// ── Phone mask ────────────────────────────────────────────────────────────────
function phoneMask(raw: string): string {
  const digits = raw.replace(/\D/g,"").slice(0,11);
  if (!digits) return "";
  let r = "+7";
  if (digits.length > 1) r += " (" + digits.slice(1,4);
  if (digits.length >= 4) r += ") " + digits.slice(4,7);
  if (digits.length >= 7) r += "-" + digits.slice(7,9);
  if (digits.length >= 9) r += "-" + digits.slice(9,11);
  return r;
}

// ── Counter hook ──────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1200, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function StatCard({ stat, started, delay, isLast }: { stat: typeof STATS[0]; started: boolean; delay: number; isLast?: boolean }) {
  const val = useCounter(stat.num, 1400, started);
  return (
    <div className="transition-all duration-700" style={{ transitionDelay:`${delay}ms`, opacity:started?1:0, transform:started?"none":"translateY(12px)" }}>
      <div className="flex items-baseline gap-1 mb-0.5">
        <span style={{ fontFamily:"'Abril Fatface',serif", fontSize:"clamp(1.5rem,2.5vw,2rem)", color:"var(--orange)", lineHeight:1 }}>{val}{stat.suffix}</span>
      </div>
      <div className="font-semibold text-gray-900 text-xs leading-snug mb-0.5">{stat.title}</div>
      <div className="text-gray-600 text-xs leading-relaxed" style={{ fontSize:"11px" }}>{stat.desc}</div>
      {!isLast && <div className="mt-3 border-b border-gray-200" />}
    </div>
  );
}

function ProjectCard({ p, onClick }: { p: Project; onClick: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <div className="project-card bg-white rounded-xl overflow-hidden border border-gray-200" onClick={onClick}>
      <div className="relative" style={{ height:"160px" }}>
        <img src={p.photos[imgIdx]} alt={p.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {p.photos.map((_,i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setImgIdx(i); }}
              className="w-2 h-2 rounded-full border border-white/80 transition-colors"
              style={{ background:imgIdx===i?"#fff":"rgba(255,255,255,0.35)" }} />
          ))}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <div className="font-bold text-gray-900 text-sm leading-snug">{p.title}</div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Icon name="Ruler" size={11} className="shrink-0" style={{ color:"var(--orange)" }} />
          <span>Размеры: {p.dims} / {p.area}</span>
        </div>
        <div className="flex items-start gap-1.5 text-xs text-gray-400">
          <Icon name="MapPin" size={11} className="mt-0.5 shrink-0" style={{ color:"var(--orange)" }} />
          <span>{p.locationShort}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Icon name="Building2" size={11} className="shrink-0" style={{ color:"var(--orange)" }} />
          <span className="font-semibold" style={{ color:"var(--orange)" }}>{p.purpose}</span>
        </div>
      </div>
    </div>
  );
}

// ── FieldError ────────────────────────────────────────────────────────────────
function FieldError({ msg }: { msg: string }) {
  if (!msg) return null;
  return <p className="text-red-500 text-xs mt-1">{msg}</p>;
}

// ── CitySearch ────────────────────────────────────────────────────────────────
function CitySearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const filtered = query.length >= 2 ? CITIES.filter(c => c.toLowerCase().startsWith(query.toLowerCase())).slice(0,8) : [];
  const zones = value ? getCityZones(value) : null;
  return (
    <div className="relative">
      <input type="text" placeholder="Начните вводить название города..." value={query}
        onChange={e => { setQuery(e.target.value); onChange(""); setOpen(true); }}
        onFocus={() => setOpen(true)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-orange-300 transition-colors" />
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 mt-1 overflow-hidden">
          {filtered.map(c => (
            <button key={c} className="w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
              onClick={() => { setQuery(c); onChange(c); setOpen(false); }}>{c}</button>
          ))}
        </div>
      )}
      {value && zones && (
        <div className="mt-3 rounded-xl p-3.5 border border-orange-100" style={{ background:"#fff8f5" }}>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <div>
              <span className="text-gray-400 text-xs">Снеговой район: </span>
              <span className="font-semibold" style={{ color:"var(--orange)" }}>{zones.snow}</span>
            </div>
            <div>
              <span className="text-gray-400 text-xs">Ветровой район: </span>
              <span className="font-semibold" style={{ color:"var(--orange)" }}>{zones.wind}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-xs">Тип местности: </span>
              <span className="font-semibold" style={{ color:"var(--orange)" }}>B</span>
              <div className="relative group ml-1">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-gray-400 text-xs cursor-help">?</span>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  Городские территории, лесные массивы и другие местности, равномерно покрытые препятствиями высотой более 10 м.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── QuizFullscreen ────────────────────────────────────────────────────────────
interface QuizState {
  purpose: string; city: string;
  length: number; width: number; height: number;
  customDims: string;
  cladding: string; crane: string; extras: string[];
  name: string; phone: string; email: string;
  agreePersonal: boolean; agreePromo: boolean;
}

const PRICE_API_URL = "https://functions.poehali.dev/88524db3-a08f-485b-b913-ae55621e6dc4";

const HEIGHT_TO_PANELS: Record<number, number> = {
  3.6: 4, 4.8: 5, 6.0: 6, 7.2: 7, 8.4: 8, 9.6: 9,
};
const PRICE_PER_SQM_SANDWICH = 15336;
const PRICE_PER_SQM_PROFILE  = 13506;

// ── Калькулятор (фронтенд) ────────────────────────────────────────────────────
const FRAME_RATES: Record<number, Record<number, Record<number, number>>> = {
  3.6: { 24:{12:2525,18:2572,24:1980}, 30:{12:1796,18:1389,24:1488}, 36:{12:1861,18:1008,24:1158}, 42:{12:957,18:734,24:914},   48:{12:695,18:534,24:738},   54:{12:493,18:375,24:598} },
  4.8: { 24:{12:3214,18:2144,24:2550}, 30:{12:2493,18:1576,24:1376}, 36:{12:2020,18:1199,24:1070}, 42:{12:1676,18:929,24:848},  48:{12:1420,18:731,24:679},  54:{12:1222,18:576,24:1224} },
  6.0: { 24:{12:3399,18:2681,24:2439}, 30:{12:3014,18:1883,24:1648}, 36:{12:2145,18:1485,24:1324}, 42:{12:2155,18:1811,24:1734},48:{12:1501,18:995,24:913},  54:{12:1307,18:832,24:781} },
  7.2: { 24:{12:4274,18:3841,24:3694}, 30:{12:3466,18:2641,24:2354}, 36:{12:2931,18:2212,24:1968}, 42:{12:2561,18:1905,24:1620},48:{12:2254,18:1542,24:1483},54:{12:2030,18:1503,24:1319} },
  8.4: { 24:{12:5324,18:5335,24:4701}, 30:{12:4466,18:3565,24:3445}, 36:{12:2871,18:3681,24:2531}, 42:{12:3474,18:2754,24:2710},48:{12:3164,18:2480,24:2287},54:{12:3016,18:2314,24:2379} },
  9.6: { 24:{12:6843,18:4070,24:3746}, 30:{12:6065,18:4732,24:3894}, 36:{12:5405,18:3880,24:3207}, 42:{12:5007,18:3541,24:3185},48:{12:4698,18:3287,24:3179},54:{12:4456,18:3093,24:2792} },
};
const SNOW_COEFF: Record<string, number> = { "I":0.95,"II":0.95,"III":1.00,"IV":1.05,"V":1.12,"VI":1.18,"VII":1.25,"VIII":1.32 };
const WIND_COEFF: Record<string, number> = { "I":1.000,"II":1.008,"III":1.015,"IV":1.025,"V":1.035,"VI":1.045,"VII":1.060 };
const ROOF_RATE = 8750, WALL_BASE = 4800, WALL_SLOPE = 200, FIXED_COST = 180000;

const CRANE_5T_DATA = [
  { length:24, width:12, height:4.8, area:288,  extra:923484 },
  { length:24, width:24, height:6.0, area:576,  extra:1068070 },
  { length:30, width:24, height:7.2, area:720,  extra:1851633 },
  { length:30, width:24, height:6.0, area:720,  extra:1632422 },
  { length:36, width:18, height:6.0, area:648,  extra:1607547 },
  { length:42, width:18, height:6.0, area:756,  extra:1239086 },
  { length:54, width:24, height:9.6, area:1296, extra:2470398 },
];

function interpolateRate(length: number, width: number, height: number): number {
  const points: { length:number; width:number; height:number; rate:number }[] = [];
  for (const h in FRAME_RATES) for (const l in FRAME_RATES[+h]) for (const w in FRAME_RATES[+h][+l])
    points.push({ length:+l, width:+w, height:+h, rate:FRAME_RATES[+h][+l][+w] });
  const withDist = points.map(p => ({ ...p, d: Math.sqrt(Math.pow((p.length-length)/6,2)+Math.pow((p.width-width)/3,2)+Math.pow((p.height-height)/1.2,2)) })).sort((a,b)=>a.d-b.d);
  const nearest = withDist.slice(0, 4);
  let sw=0, wsum=0;
  for (const p of nearest) { if (p.d<0.001) return p.rate; const w=1/(p.d*p.d); sw+=p.rate*w; wsum+=w; }
  return Math.round(sw/wsum);
}

function getCrane5TExtra(length: number, width: number, height: number): number {
  const area = length * width;
  const exact = CRANE_5T_DATA.find(p => p.length===length && p.width===width && p.height===height);
  if (exact) return exact.extra;
  const withDist = CRANE_5T_DATA.map(p => ({ ...p, d: Math.sqrt(Math.pow((p.length-length)/6,2)+Math.pow((p.area-area)/200,2)) })).sort((a,b)=>a.d-b.d);
  const nearest = withDist.slice(0, 3);
  let sw=0, wsum=0;
  for (const p of nearest) { if (p.d<0.001) return p.extra; const w=1/(p.d*p.d); sw+=p.extra*w; wsum+=w; }
  return Math.round(sw/wsum);
}

function calcSandwichPrice(length: number, width: number, height: number, snowZone: string, windZone: string, crane: string): number {
  const area = length * width;
  const perimeter = (length + width) * 2;
  const roofAndFloor = area * ROOF_RATE;
  const walls = perimeter * height * (WALL_BASE - WALL_SLOPE * height);
  const baseRate = FRAME_RATES[height]?.[length]?.[width] ?? interpolateRate(length, width, height);
  let frame = area * baseRate;
  frame *= (SNOW_COEFF[snowZone] ?? 1.0) * (WIND_COEFF[windZone] ?? 1.0);
  const craneExtra = (crane === "Да" && height > 3.6) ? getCrane5TExtra(length, width, height) : 0;
  const base = Math.round(roofAndFloor + walls + frame + FIXED_COST + craneExtra);
  return crane === "Да" && height > 3.6 ? Math.round(base * 1.02) : base;
}

function calcProfilePrice(length: number, width: number, height: number, snowZone: string, windZone: string, crane: string): number {
  const base = Math.round(calcSandwichPrice(length, width, height, snowZone, windZone, crane) / 1.02 / 1.23);
  return crane === "Да" && height > 3.6 ? Math.round(base * 1.04) : base;
}

function quizToPriceParams(state: QuizState, zones: { snow: string; wind: string }, length: number, width: number, height: number) {
  return new URLSearchParams({
    wall_mm:  "150",
    roof_mm:  "150",
    span:     String(width),
    length:   String(length),
    panels:   String(HEIGHT_TO_PANELS[height] ?? 4),
    snow:     zones.snow,
    wind:     zones.wind,
    locality: "B",
  }).toString();
}

function QuizFullscreen({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const TOTAL = 6;
  const [state, setState] = useState<QuizState>({
    purpose:"", city:"", length:24, width:12, height:3.6, customDims:"",
    cladding:"Профилированный лист", crane:"Нет",
    extras:[],
    name:"", phone:"", email:"", agreePersonal:true, agreePromo:false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name:"", phone:"", email:"" });
  const [touched, setTouched] = useState({ name:false, phone:false, email:false });
  const [price, setPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  // Вычисляем площадь — если заполнен customDims, парсим из него
  let length = state.length, width = state.width, height = state.height;
  if (state.customDims.trim()) {
    const parts = state.customDims.replace(/[хx×*\s]+/gi," ").trim().split(/\s+/);
    if (parts.length >= 1 && !isNaN(+parts[0])) length = +parts[0];
    if (parts.length >= 2 && !isNaN(+parts[1])) width = +parts[1];
    if (parts.length >= 3 && !isNaN(+parts[2])) height = +parts[2];
  }
  const area = length * width;
  const zones = getCityZones(state.city);
  const pricePerSqm = price && area > 0 ? Math.round(price / area) : 0;

  function fetchPrice() {
    setPriceLoading(true);
    if (state.customDims.trim()) {
      const a = length * width;
      if (a > 0) {
        const ppsm = state.cladding === "Сэндвич панели" ? PRICE_PER_SQM_SANDWICH : PRICE_PER_SQM_PROFILE;
        setPrice(a * ppsm);
      }
      setPriceLoading(false);
      return;
    }
    if (state.cladding === "Сэндвич панели") {
      setPrice(calcSandwichPrice(length, width, height, zones.snow, zones.wind, state.crane));
    } else {
      setPrice(calcProfilePrice(length, width, height, zones.snow, zones.wind, state.crane));
    }
    setPriceLoading(false);
  }

  // Автопересчёт при изменении параметров после отправки формы
  useEffect(() => {
    if (submitted) {
      fetchPrice();
    }
  }, [submitted, state.length, state.width, state.height, state.cladding, state.customDims, state.city, state.crane]);

  const validate = () => {
    const e = { name:validateName(state.name), phone:validatePhone(state.phone), email:validateEmail(state.email) };
    setErrors(e);
    setTouched({ name:true, phone:true, email:true });
    return !e.name && !e.phone && !e.email && state.agreePersonal;
  };

  const canNext = () => {
    if (step===1) return !!state.purpose;
    if (step===2) return !!state.city;
    return true;
  };

  const dimBtn = (val: number, selected: number, onClick: () => void) => (
    <button key={val} onClick={onClick}
      className="rounded-xl py-2.5 text-sm font-medium transition-all border"
      style={{ borderColor:selected===val?"var(--orange)":"#e5e5e5", background:selected===val?"#fff3ee":"#fff", color:selected===val?"var(--orange)":"#374151" }}>
      {val}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="logo" className="h-8 w-auto object-contain" />
          <span className="text-xs text-gray-400 hidden sm:block">Расчёт стоимости здания</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold" style={{ color:"var(--orange)" }}>Шаг {step} из {TOTAL}</span>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <Icon name="X" size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="h-1 bg-gray-100 shrink-0">
        <div className="quiz-bar h-full" style={{ width:`${Math.round((step/TOTAL)*100)}%` }} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-8 md:py-10">

          {/* STEP 1 */}
          {step===1 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Выберите назначение здания</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STEP1_OPTIONS.map(opt => (
                  <button key={opt.label} onClick={() => setState(s => ({ ...s, purpose:opt.label }))}
                    className="rounded-xl p-4 text-left flex items-center gap-3 border-2 transition-all"
                    style={{ borderColor:state.purpose===opt.label?"var(--orange)":"#e5e5e5", background:state.purpose===opt.label?"#fff3ee":"#fff" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background:"#fff3ee" }}>
                      <Icon name={opt.icon} size={18} style={{ color:"var(--orange)" }} />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step===2 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">Регион строительства</h2>
              <p className="text-sm text-gray-400 text-center mb-6">Начните вводить название вашего города</p>
              <CitySearch value={state.city} onChange={v => setState(s => ({ ...s, city:v }))} />
              {state.city && (
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <Icon name="MapPin" size={12} />
                  Выбран: <strong className="text-gray-700">{state.city}</strong>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — Параметры */}
          {step===3 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">Параметры здания</h2>


              {/* Свой вариант — одно поле */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Свой вариант (Длина × Ширина × Высота, м)</label>
                <input type="text" placeholder="Например: 36 × 18 × 6"
                  value={state.customDims}
                  onChange={e => setState(s => ({ ...s, customDims:e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors" />
                {state.customDims && (
                  <p className="text-xs mt-1" style={{ color:"var(--orange)" }}>
                    Распознано: {length} × {width} × {height} м
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 border-b border-gray-200" />
                <span className="text-xs text-gray-400 shrink-0">или выберите из списка</span>
                <div className="flex-1 border-b border-gray-200" />
              </div>

              {/* Таблицы */}
              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
                <div>
                  <div className="text-xs text-gray-400 text-center mb-2">Ширина, м</div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {WIDTHS.map(v => dimBtn(v, state.customDims?-1:state.width, () => setState(s => ({ ...s, width:v, customDims:"" }))))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 text-center mb-2">Длина, м</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {LENGTHS.map(v => dimBtn(v, state.customDims?-1:state.length, () => setState(s => ({ ...s, length:v, customDims:"" }))))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 text-center mb-2">Высота, м</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {HEIGHTS.map(v => dimBtn(v, state.customDims?-1:state.height, () => setState(s => ({ ...s, height:v, customDims:"" }))))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ background:"#fff3ee" }}>
                <div className="text-sm text-gray-500 mb-1">Площадь здания</div>
                <div style={{ fontFamily:"'Abril Fatface',serif", fontSize:"2.2rem", color:"var(--orange)" }}>{area} м²</div>
                <div className="text-xs text-gray-400 mt-1">{length} × {width} м</div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step===4 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Варианты комплектаций</h2>
              <div className="mb-6">
                <div className="text-sm font-bold text-gray-700 mb-3">Тип стен и кровли:</div>
                <div className="grid grid-cols-2 gap-3">
                  {CLADDING_OPTIONS.map(opt => (
                    <button key={opt} onClick={() => setState(s => ({ ...s, cladding:opt }))}
                      className="rounded-xl py-3.5 text-sm font-medium border-2 transition-all"
                      style={{ borderColor:state.cladding===opt?"var(--orange)":"#e5e5e5", background:state.cladding===opt?"#fff3ee":"#fff", color:state.cladding===opt?"var(--orange)":"#374151" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-700 mb-3">Наличие кран-балки 5 тонн:</div>
                <div className="grid grid-cols-2 gap-3">
                  {CRANE_OPTIONS.map(opt => (
                    <button key={opt} onClick={() => setState(s => ({ ...s, crane:opt }))}
                      className="rounded-xl py-3.5 text-sm font-medium border-2 transition-all"
                      style={{ borderColor:state.crane===opt?"var(--orange)":"#e5e5e5", background:state.crane===opt?"#fff3ee":"#fff", color:state.crane===opt?"var(--orange)":"#374151" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step===5 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Дополнительные услуги</h2>
              <div className="space-y-2">
                {EXTRA_SERVICES.map(svc => {
                  const checked = state.extras.includes(svc);
                  return (
                    <button key={svc} onClick={() => setState(s => ({ ...s, extras:checked?s.extras.filter(x=>x!==svc):[...s.extras,svc] }))}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all"
                        style={{ background:checked?"var(--orange)":"transparent", border:checked?"none":"2px solid #d1d5db" }}>
                        {checked && <Icon name="Check" size={12} className="text-white" />}
                      </div>
                      {svc}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step===6 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">Узнать стоимость здания</h2>
              <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
                Заполните форму и получите предварительный расчёт стоимости здания прямо сейчас<br className="hidden md:block" />
                + эскиз в течение 1 часа. <span className="font-semibold text-gray-700">Это бесплатно и ни к чему не обязывает.</span>
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left */}
                <div>
                  <div className="rounded-xl overflow-hidden border border-gray-200 mb-4" style={{ height:"150px" }}>
                    <img src={QUIZ_IMG} alt="здание" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Характеристики</div>
                  <div className="space-y-1.5 text-sm">
                    {[
                      ["Назначение", state.purpose||"—"],
                      ["Площадь", `${area} м²`],
                      ["Длина × Ширина × Высота", `${length} × ${width} × ${height} м`],
                      ["Тип стен", state.cladding],
                      ["Кран-балка", state.crane],
                      ...(state.city ? [["Снеговой район", `${zones.snow}`], ["Ветровой район", `${zones.wind}`]] : []),
                    ].map(([k,v]) => (
                      <div key={k} className="flex justify-between gap-2">
                        <span className="text-gray-400 text-xs shrink-0">{k}</span>
                        <span className="font-semibold text-gray-900 text-right text-xs">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price block */}
                  <div className="mt-4 rounded-xl p-4 text-center relative overflow-hidden" style={{ background:"#fff3ee" }}>
                    <div className="text-xs text-gray-500 mb-1">Стоимость здания</div>
                    {submitted ? (
                      priceLoading ? (
                        <div className="py-3">
                          <div className="text-sm font-medium mb-2" style={{ color:"var(--orange)" }}>Считаем стоимость…</div>
                          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background:"#f5d5c0" }}>
                            <div className="h-full rounded-full animate-price-bar" style={{ background:"var(--orange)" }} />
                          </div>
                          <div className="text-xs text-gray-400 mt-1.5">обычно занимает 3–5 секунд</div>
                        </div>
                      ) : price !== null ? (
                        <>
                          <div style={{ fontFamily:"'Abril Fatface',serif", fontSize:"1.8rem", color:"var(--orange)" }}>
                            {new Intl.NumberFormat("ru-RU").format(Math.round(price))} ₽
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{new Intl.NumberFormat("ru-RU").format(pricePerSqm)} ₽ / кв.м · {area} м²</div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-400 py-2">Уточним стоимость при звонке</div>
                      )
                    ) : (
                      <>
                        <div className="font-bold text-2xl blur-sm select-none" style={{ color:"var(--orange)" }}>
                          — ₽
                        </div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                          <Icon name="Lock" size={11} /> Заполните форму, чтобы узнать стоимость
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right: form */}
                <div>
                  {submitted ? (
                    <div className="rounded-2xl p-6 text-center" style={{ background:"#f9f9f9", border:"1px solid #e5e5e5" }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background:"#fff3ee" }}>
                        <Icon name="Gift" size={22} style={{ color:"var(--orange)" }} />
                      </div>
                      <div className="font-bold text-gray-900 mb-1">Благодарим за интерес к решениям EVRAZ STEEL BOX!</div>
                      <div className="text-sm text-gray-500 mb-3 leading-relaxed">Запрос успешно отправлен. В ближайшее время мы с вами свяжемся, чтобы обсудить все детали.</div>
                      <div className="text-sm font-semibold mb-4" style={{ color:"var(--orange)" }}>
                        Вам подарок — эскиз в течение 1 часа!
                      </div>
                      <button
                        onClick={() => { setStep(3); }}
                        className="w-full py-3 rounded-xl text-sm font-semibold border-2 transition-all"
                        style={{ borderColor:"var(--orange)", color:"var(--orange)", background:"#fff" }}>
                        ← Изменить параметры и пересчитать
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <div className={`flex items-center gap-2 border-b pb-2 transition-colors ${touched.name && errors.name ? "border-red-400":"border-gray-200"}`}>
                          <Icon name="User" size={16} className="text-gray-300 shrink-0" />
                          <input type="text" placeholder="Ваше имя *" value={state.name}
                            onChange={e => { setState(s => ({ ...s, name:e.target.value })); if (touched.name) setErrors(err => ({ ...err, name:validateName(e.target.value) })); }}
                            onBlur={() => { setTouched(t => ({ ...t, name:true })); setErrors(err => ({ ...err, name:validateName(state.name) })); }}
                            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-300" />
                        </div>
                        <FieldError msg={touched.name?errors.name:""} />
                      </div>
                      <div>
                        <div className={`flex items-center gap-2 border-b pb-2 transition-colors ${touched.phone && errors.phone ? "border-red-400":"border-gray-200"}`}>
                          <Icon name="Phone" size={16} className="text-gray-300 shrink-0" />
                          <input type="tel" placeholder="+7 (___) ___-__-__ *" value={state.phone}
                            onChange={e => { const v=phoneMask(e.target.value); setState(s => ({ ...s, phone:v })); if (touched.phone) setErrors(err => ({ ...err, phone:validatePhone(v) })); }}
                            onBlur={() => { setTouched(t => ({ ...t, phone:true })); setErrors(err => ({ ...err, phone:validatePhone(state.phone) })); }}
                            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-300" />
                        </div>
                        <FieldError msg={touched.phone?errors.phone:""} />
                      </div>
                      <div>
                        <div className={`flex items-center gap-2 border-b pb-2 transition-colors ${touched.email && errors.email ? "border-red-400":"border-gray-200"}`}>
                          <Icon name="Mail" size={16} className="text-gray-300 shrink-0" />
                          <input type="email" placeholder="Email *" value={state.email}
                            onChange={e => { setState(s => ({ ...s, email:e.target.value })); if (touched.email) setErrors(err => ({ ...err, email:validateEmail(e.target.value) })); }}
                            onBlur={() => { setTouched(t => ({ ...t, email:true })); setErrors(err => ({ ...err, email:validateEmail(state.email) })); }}
                            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-300" />
                        </div>
                        <FieldError msg={touched.email?errors.email:""} />
                      </div>
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <div onClick={() => setState(s => ({ ...s, agreePersonal:!s.agreePersonal }))}
                          className="w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 transition-all"
                          style={{ background:state.agreePersonal?"var(--orange)":"transparent", border:state.agreePersonal?"none":"2px solid #d1d5db" }}>
                          {state.agreePersonal && <Icon name="Check" size={12} className="text-white" />}
                        </div>
                        <span className="text-xs text-gray-500 leading-relaxed">
                          Я согласен на{" "}
                          <a href="https://evrazsteelbox.ru/politika_v_oblasti_obrabotki_personalnyh_dannyh/" target="_blank" rel="noreferrer" className="underline" style={{ color:"var(--orange)" }}>обработку персональных данных</a>
                        </span>
                      </label>
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <div onClick={() => setState(s => ({ ...s, agreePromo:!s.agreePromo }))}
                          className="w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 transition-all"
                          style={{ background:state.agreePromo?"var(--orange)":"transparent", border:state.agreePromo?"none":"2px solid #d1d5db" }}>
                          {state.agreePromo && <Icon name="Check" size={12} className="text-white" />}
                        </div>
                        <span className="text-xs text-gray-500 leading-relaxed">Согласен на получение информационных и рекламных сообщений (необязательно)</span>
                      </label>
                      <button
                        onClick={() => { if (validate()) { setSubmitted(true); } }}
                        className="btn-orange w-full py-4 rounded-xl text-sm mt-1">
                        УЗНАТЬ СТОИМОСТЬ →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer nav */}
      <div className="border-t border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between shrink-0 bg-white">
        {step > 1 ? (
          <button onClick={() => setStep(s => s-1)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
            <Icon name="ArrowLeft" size={16} /> Назад
          </button>
        ) : <div />}
        {step < TOTAL ? (
          <button onClick={() => { if (canNext()) setStep(s => s+1); }}
            disabled={!canNext()}
            className="btn-orange px-6 py-2.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed">
            Далее →
          </button>
        ) : (
          !submitted && (
            <button onClick={() => { if (validate()) { setSubmitted(true); fetchPrice(); } }}
              className="btn-orange px-6 py-2.5 rounded-xl text-sm">
              Узнать стоимость →
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ── Thank You page ────────────────────────────────────────────────────────────
function ThankYouPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background:"#fff3ee" }}>
          <Icon name="CheckCircle" size={40} style={{ color:"var(--orange)" }} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Спасибо за заявку!</h1>
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          Ваш запрос успешно принят. Наш менеджер свяжется с вами в течение <strong className="text-gray-700">15 минут</strong> в рабочее время и ответит на все вопросы.
        </p>
        <div className="rounded-2xl p-5 mb-6 text-left" style={{ background:"#fff3ee", border:"1px solid #ffe0d0" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background:"var(--orange)" }}>
              <Icon name="Gift" size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">Вам подарок!</div>
              <div className="text-xs text-gray-500">Эскиз вашего здания — в течение 1 часа, бесплатно</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Пока вы ждёте звонка, загляните на наш сайт — там более <strong>300 реализованных проектов</strong> со всей России.
          </p>
        </div>
        <a href="https://evrazsteelbox.ru" target="_blank" rel="noreferrer"
          className="btn-orange inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm mb-4">
          Смотреть проекты на сайте →
        </a>
        <br />
        <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600 transition-colors mt-2">
          ← Вернуться на главную
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [cbName, setCbName] = useState(""); const [cbPhone, setCbPhone] = useState(""); const [cbSent, setCbSent] = useState(false);
  const [cbErrors, setCbErrors] = useState({ name:"", phone:"" });
  const [cbTouched, setCbTouched] = useState({ name:false, phone:false });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [wordIdx, setWordIdx] = useState(0); const [wordKey, setWordKey] = useState(0);
  const [heroStarted, setHeroStarted] = useState(false);
  const heroVal = useCounter(40, 1600, heroStarted);

  // Contact form
  const [cfName, setCfName] = useState(""); const [cfPhone, setCfPhone] = useState("");
  const [cfEmail, setCfEmail] = useState(""); const [cfMsg, setCfMsg] = useState("");
  const [cfErrors, setCfErrors] = useState({ name:"", phone:"", email:"" });
  const [cfTouched, setCfTouched] = useState({ name:false, phone:false, email:false });

  useEffect(() => { setTimeout(() => setHeroStarted(true), 300); }, []);
  useEffect(() => {
    const t = setInterval(() => { setWordIdx(i => (i+1)%ROTATING_WORDS.length); setWordKey(k => k+1); }, 2000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    document.body.style.overflow = (activeProject||callbackOpen||mobileMenuOpen||quizOpen||showThankYou) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject, callbackOpen, mobileMenuOpen, quizOpen, showThankYou]);

  const heroRef  = useInView(0.05);
  const statsRef = useInView(0.1);
  const portRef  = useInView(0.1);
  const contRef  = useInView(0.1);

  const openCallback = () => { setCallbackOpen(true); setCbSent(false); setCbName(""); setCbPhone(""); setCbErrors({ name:"", phone:"" }); setCbTouched({ name:false, phone:false }); };

  const submitCallback = () => {
    const e = { name:validateName(cbName), phone:validatePhone(cbPhone) };
    setCbErrors(e); setCbTouched({ name:true, phone:true });
    if (!e.name && !e.phone) setCbSent(true);
  };

  const submitContactForm = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = { name:validateName(cfName), phone:validatePhone(cfPhone), email:validateEmail(cfEmail) };
    setCfErrors(e); setCfTouched({ name:true, phone:true, email:true });
    if (!e.name && !e.phone && !e.email) { setShowThankYou(true); }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily:"'Golos Text',sans-serif" }}>

      {showThankYou && <ThankYouPage onBack={() => setShowThankYou(false)} />}
      {quizOpen && <QuizFullscreen onClose={() => setQuizOpen(false)} />}

      {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <img src={LOGO_URL} alt="EVRAZ STEEL BOX" className="h-10 w-auto object-contain shrink-0" />
            <div className="hidden lg:block text-gray-500" style={{ fontSize:"9.5px", lineHeight:"1.55" }}>
              <span className="block whitespace-nowrap">Российский разработчик и поставщик</span>
              <span className="block whitespace-nowrap">быстровозводимых зданий</span>
              <span className="block whitespace-nowrap">на металлическом каркасе</span>
            </div>
          </div>
          <div className="hidden xl:block text-center shrink-0">
            <div className="text-xs font-semibold text-gray-700">Время и график работы</div>
            <div className="text-xs text-gray-500">Пн – Пт &nbsp; 09:30 – 18:00</div>
          </div>
          <div className="hidden md:block text-right shrink-0">
            <div className="font-bold text-base text-gray-900 leading-tight">+7 (800) 302-65-29</div>
            <div className="text-xs" style={{ color:"var(--orange)" }}>sales.box2@evrazsteel.ru</div>
          </div>
          <a href="tel:+78003026529" className="md:hidden font-bold text-sm text-gray-900 leading-tight truncate">+7 (800) 302-65-29</a>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a href="https://t.me/EvrazSmallBox_bot" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded text-white text-sm font-semibold" style={{ background:"#2AABEE" }}>
              <Icon name="Send" size={14} /> Telegram
            </a>
            <button onClick={openCallback} className="px-3 py-2 rounded border border-gray-300 text-sm font-semibold text-gray-700 hover:border-gray-500 transition-colors whitespace-nowrap">
              Обратный звонок
            </button>
          </div>
          <button className="md:hidden p-2 rounded border border-gray-200 shrink-0" onClick={() => setMobileMenuOpen(v => !v)}>
            <Icon name={mobileMenuOpen?"X":"Menu"} size={20} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative ml-auto w-72 max-w-full bg-white h-full flex flex-col shadow-2xl animate-modal-in overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <img src={LOGO_URL} alt="EVRAZ STEEL BOX" className="h-9 w-auto object-contain" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded border border-gray-200"><Icon name="X" size={18} /></button>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">Российский разработчик и поставщик быстровозводимых зданий на металлическом каркасе</p>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-1">Время и график работы</div>
              <div className="text-sm text-gray-700">Пн – Пт &nbsp; 09:30 – 18:00</div>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <a href="tel:+78003026529" className="font-bold text-lg text-gray-900 block">+7 (800) 302-65-29</a>
              <div className="text-xs mt-0.5" style={{ color:"var(--orange)" }}>sales.box2@evrazsteel.ru</div>
            </div>
            <div className="px-5 py-5 flex flex-col gap-3">
              <button onClick={() => { setMobileMenuOpen(false); openCallback(); }} className="btn-orange w-full py-3 rounded text-sm">Обратный звонок</button>
              <a href="https://t.me/EvrazSmallBox_bot" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded text-white text-sm font-semibold" style={{ background:"#2AABEE" }}>
                <Icon name="Send" size={14} /> Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="bg" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0" style={{ background:"rgba(255,255,255,0.88)" }} />
        </div>
        <div ref={heroRef.ref} className="relative max-w-7xl mx-auto px-4 py-8 md:py-16">
          <div className="grid md:grid-cols-[1fr_300px] gap-6 md:gap-12 items-start">
            <div className={`transition-all duration-700 ${heroRef.inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
              <h1 className="font-bold leading-tight text-gray-900 mb-4" style={{ fontSize:"clamp(1.2rem,3.5vw,2.2rem)" }}>
                <span className="block">Спроектируем, изготовим и построим</span>
                <span className="block" style={{ color:"var(--orange)" }}>
                  <span>быстровозводимые&nbsp;</span>
                  <span className="inline-block" style={{ minWidth:"20ch" }}>
                    <span key={wordKey} className="animate-word-flip inline-block">{ROTATING_WORDS[wordIdx]}</span>
                  </span>
                </span>
                <span className="block text-gray-900">под ключ за <span style={{ color:"var(--orange)" }}>{heroVal}</span> дней</span>
              </h1>
              <p className="text-gray-700 mb-5 text-sm md:text-base leading-relaxed">
                Пройдите тест за <strong>1 минуту</strong> и получите{" "}
                <span className="font-bold" style={{ color:"var(--orange)" }}>реальную</span>{" "}
                стоимость здания,<span className="hidden md:inline"><br /></span>{" "}полноценный расчёт + эскиз в течение 1 часа
              </p>
              <button onClick={() => setQuizOpen(true)} className="btn-orange px-6 py-3.5 rounded text-sm inline-flex items-center gap-2">
                РАССЧИТАТЬ СТОИМОСТЬ →
              </button>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                <Icon name="Info" size={12} />
                стоимость вы увидите сразу после заполнения формы — без обмана
              </p>
            </div>
            <div ref={statsRef.ref} className="flex flex-col" style={{ gap:0 }}>
              {STATS.map((s,i) => <StatCard key={i} stat={s} started={statsRef.inView} delay={i*120} isLast={i===STATS.length-1} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PORTFOLIO ════════════════════════════════════════════════════════ */}
      <section id="portfolio" className="py-12 md:py-16" style={{ background:"#f4f4f4" }}>
        <div ref={portRef.ref} className="max-w-7xl mx-auto px-4">
          <h2 className={`text-xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 transition-all duration-700 ${portRef.inView?"opacity-100":"opacity-0"}`}>
            Примеры реализованных проектов:
          </h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-100 ${portRef.inView?"opacity-100":"opacity-0"}`}>
            {projects.map(p => <ProjectCard key={p.id} p={p} onClick={() => { setActiveProject(p); setModalImgIdx(0); }} />)}
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ═════════════════════════════════════════════════════════ */}
      <section id="contacts" className="py-12 md:py-16 bg-white">
        <div ref={contRef.ref} className="max-w-7xl mx-auto px-4">
          <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-start transition-all duration-700 ${contRef.inView?"opacity-100":"opacity-0"}`}>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
              <div className="space-y-5">
                {[
                  { icon:"Phone", label:"+7 (800) 302-65-29", sub:"Бесплатно по России, Пн–Пт 9:30–18:00" },
                  { icon:"Mail",  label:"sales.box2@evrazsteel.ru", sub:"Ответим в течение часа" },
                  { icon:"MapPin",label:"Москва, Пресненская наб., 12", sub:"Московский офис" },
                ].map((c,i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background:"#fff3ee" }}>
                      <Icon name={c.icon} size={18} style={{ color:"var(--orange)" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm break-all">{c.label}</div>
                      <div className="text-xs text-gray-400">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-7">
              <h3 className="font-bold text-gray-900 mb-5">Оставить заявку</h3>
              <form className="space-y-3 md:space-y-4" onSubmit={submitContactForm}>
                <div>
                  <input type="text" placeholder="Ваше имя *" required value={cfName}
                    onChange={e => { setCfName(e.target.value); if (cfTouched.name) setCfErrors(err => ({ ...err, name:validateName(e.target.value) })); }}
                    onBlur={() => { setCfTouched(t => ({ ...t, name:true })); setCfErrors(err => ({ ...err, name:validateName(cfName) })); }}
                    className={`w-full border rounded px-4 py-3 text-sm outline-none transition-colors ${cfTouched.name&&cfErrors.name?"border-red-400":"border-gray-200 focus:border-orange-400"}`} />
                  <FieldError msg={cfTouched.name?cfErrors.name:""} />
                </div>
                <div>
                  <input type="tel" placeholder="+7 (___) ___-__-__ *" required value={cfPhone}
                    onChange={e => { const v=phoneMask(e.target.value); setCfPhone(v); if (cfTouched.phone) setCfErrors(err => ({ ...err, phone:validatePhone(v) })); }}
                    onBlur={() => { setCfTouched(t => ({ ...t, phone:true })); setCfErrors(err => ({ ...err, phone:validatePhone(cfPhone) })); }}
                    className={`w-full border rounded px-4 py-3 text-sm outline-none transition-colors ${cfTouched.phone&&cfErrors.phone?"border-red-400":"border-gray-200 focus:border-orange-400"}`} />
                  <FieldError msg={cfTouched.phone?cfErrors.phone:""} />
                </div>
                <div>
                  <input type="email" placeholder="Email *" required value={cfEmail}
                    onChange={e => { setCfEmail(e.target.value); if (cfTouched.email) setCfErrors(err => ({ ...err, email:validateEmail(e.target.value) })); }}
                    onBlur={() => { setCfTouched(t => ({ ...t, email:true })); setCfErrors(err => ({ ...err, email:validateEmail(cfEmail) })); }}
                    className={`w-full border rounded px-4 py-3 text-sm outline-none transition-colors ${cfTouched.email&&cfErrors.email?"border-red-400":"border-gray-200 focus:border-orange-400"}`} />
                  <FieldError msg={cfTouched.email?cfErrors.email:""} />
                </div>
                <textarea rows={3} placeholder="Опишите вашу задачу" value={cfMsg} onChange={e => setCfMsg(e.target.value)}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-orange-400 transition-colors resize-none" />
                <button type="submit" className="btn-orange w-full py-3.5 rounded text-sm">ОТПРАВИТЬ ЗАЯВКУ →</button>
                <p className="text-center text-xs text-gray-400">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="https://evrazsteelbox.ru/politika_v_oblasti_obrabotki_personalnyh_dannyh/" target="_blank" rel="noreferrer" className="underline" style={{ color:"var(--orange)" }}>политикой конфиденциальности</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROJECT MODAL ════════════════════════════════════════════════════ */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 modal-backdrop animate-fade-in" onClick={() => setActiveProject(null)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-xl overflow-hidden animate-modal-in max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="relative bg-gray-100" style={{ height:"220px" }}>
              <img src={activeProject.photos[modalImgIdx]} alt={activeProject.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {activeProject.photos.map((_,i) => (
                  <button key={i} onClick={() => setModalImgIdx(i)} className="w-2.5 h-2.5 rounded-full border border-white transition-colors"
                    style={{ background:modalImgIdx===i?"#fff":"rgba(255,255,255,0.4)" }} />
                ))}
              </div>
              <button className="absolute right-10 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow"
                onClick={() => setModalImgIdx(i => (i+1)%activeProject.photos.length)}>
                <Icon name="ChevronRight" size={18} className="text-gray-700" />
              </button>
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow" onClick={() => setActiveProject(null)}>
                <Icon name="X" size={16} className="text-gray-700" />
              </button>
            </div>
            <div className="p-4 md:p-6">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Карточка проекта</div>
              <h3 className="text-base md:text-xl font-bold text-gray-900 mb-4">{activeProject.title}</h3>
              <div className="mb-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Характеристики здания</div>
                <div className="space-y-2 text-sm">
                  {[
                    { icon:"Building2", label:"Назначение",   value:activeProject.purpose },
                    { icon:"Ruler",     label:"Размеры",      value:`${activeProject.length.replace(" м","")}×${activeProject.width.replace(" м","")}×${activeProject.height}` },
                    { icon:"Maximize2", label:"Площадь",      value:activeProject.area },
                    { icon:"MapPin",    label:"Расположение", value:activeProject.locationShort },
                    { icon:"Layers",    label:"Кровля",       value:activeProject.roof },
                    { icon:"PanelTop",  label:"Стены",        value:activeProject.walls },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-gray-400 shrink-0">
                        <Icon name={icon} size={12} style={{ color:"var(--orange)" }} />
                        <span>{label}</span>
                      </div>
                      <span className="text-gray-900 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-5 p-3 rounded-lg" style={{ background:"#f9f9f9" }}>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Детали</div>
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Icon name="Info" size={13} style={{ color:"var(--orange)" }} />
                  {activeProject.series}
                </div>
              </div>
              <button onClick={() => { setActiveProject(null); setQuizOpen(true); }} className="btn-orange w-full py-3.5 rounded text-sm">
                РАССЧИТАТЬ ПОХОЖЕЕ ЗДАНИЕ →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ CALLBACK POPUP ═══════════════════════════════════════════════════ */}
      {callbackOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 modal-backdrop animate-fade-in" onClick={() => setCallbackOpen(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm overflow-hidden animate-modal-in" onClick={e => e.stopPropagation()}>
            <div className="px-6 pt-6 pb-5" style={{ background:"var(--orange)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="Phone" size={20} className="text-white" />
                </div>
                <button onClick={() => setCallbackOpen(false)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="X" size={14} className="text-white" />
                </button>
              </div>
              <h3 className="text-white font-bold text-lg leading-tight">Перезвоним за 15 минут</h3>
              <p className="text-white/80 text-sm mt-1">Оставьте номер — менеджер свяжется с вами и ответит на все вопросы</p>
            </div>
            <div className="px-6 pb-6 pt-5">
              {cbSent ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background:"#fff3ee" }}>
                    <Icon name="CheckCircle" size={24} style={{ color:"var(--orange)" }} />
                  </div>
                  <div className="font-bold text-gray-900 mb-1">Заявка принята!</div>
                  <div className="text-sm text-gray-500">Перезвоним в рабочее время в течение 15 минут</div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Ваше имя</label>
                    <input type="text" placeholder="Иван Иванов" value={cbName}
                      onChange={e => { setCbName(e.target.value); if (cbTouched.name) setCbErrors(err => ({ ...err, name:validateName(e.target.value) })); }}
                      onBlur={() => { setCbTouched(t => ({ ...t, name:true })); setCbErrors(err => ({ ...err, name:validateName(cbName) })); }}
                      className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors ${cbTouched.name&&cbErrors.name?"border-red-400":"border-gray-200 focus:border-orange-300"}`} />
                    <FieldError msg={cbTouched.name?cbErrors.name:""} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Телефон</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" value={cbPhone}
                      onChange={e => { const v=phoneMask(e.target.value); setCbPhone(v); if (cbTouched.phone) setCbErrors(err => ({ ...err, phone:validatePhone(v) })); }}
                      onBlur={() => { setCbTouched(t => ({ ...t, phone:true })); setCbErrors(err => ({ ...err, phone:validatePhone(cbPhone) })); }}
                      className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors ${cbTouched.phone&&cbErrors.phone?"border-red-400":"border-gray-200 focus:border-orange-300"}`} />
                    <FieldError msg={cbTouched.phone?cbErrors.phone:""} />
                  </div>
                  <button onClick={submitCallback} className="btn-orange w-full py-3.5 rounded-lg text-sm">ПОЗВОНИТЕ МНЕ →</button>
                  <p className="text-center text-xs text-gray-400">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="https://evrazsteelbox.ru/politika_v_oblasti_obrabotki_personalnyh_dannyh/" target="_blank" rel="noreferrer" className="underline" style={{ color:"var(--orange)" }}>политикой конфиденциальности</a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}