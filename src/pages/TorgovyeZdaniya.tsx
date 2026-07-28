import Index, { Project } from "./Index";

const TORGOVYE_PROJECTS: Project[] = [
  {
    id: 1,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/7f7c57b6-73c0-4473-b20f-142cf2361974.jpeg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/1012b3a1-e989-40d1-92c4-ebdc7cd49de3.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/b8b7a91b-648d-4f3a-9ca9-55eddf09f047.jpeg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/02a01a21-87e8-45d2-a0f2-7777ba9e1ddb.jpeg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/01002c8a-feec-47cb-8986-1d0fdaad2a8f.jpeg",
    ],
    title: "Торговый центр",
    dims: "31×50×4 м",
    area: "1550 м²",
    locationShort: "Московская обл., г. Чехов",
    locationFull: "Россия, Московская область, г. Чехов",
    purpose: "Торговые здания",
    details: [
      "Стены: сэндвич-панели",
      "Кровля: мембрана",
      "Окна: витражное остекление",
      "Фасад: реечная структура",
    ],
    length: "50 м",
    width: "31 м",
    height: "4 м",
    category: "Торговые здания",
  },
  {
    id: 4,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/7e40f746-0de7-4b10-88bc-d5f23af409b2.JPG",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/ce2c1f10-3081-4a14-9339-d63f66c254b1.JPG",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/dea6d7da-6a96-4524-ba9d-c180c098f562.JPG",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/1a5f1ab8-fb84-4c41-a6bd-d1c9d9b54951.JPG",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/679536ba-12d7-4dbe-aa60-03a5f008234c.JPG",
    ],
    title: "Торговый центр",
    dims: "24×60×4 м",
    area: "1440 м²",
    locationShort: "ЯНАО, г. Надым",
    locationFull: "Россия, Ямало-Ненецкий автономный округ, г. Надым",
    purpose: "Торговые здания",
    details: [
      "Стены: сэндвич-панели",
      "Кровля: мембрана",
      "Окна: витражное остекление",
      "Фасад: реечная структура",
    ],
    length: "60 м",
    width: "24 м",
    height: "4 м",
    category: "Торговые здания",
  },
  {
    id: 2,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/b947e707-810d-45c4-a42a-2843c3f1e888.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/59c9f707-97a0-4871-87b3-9212cac246ab.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/94969555-1748-4149-b214-8a31d6bbed20.jpg",
    ],
    title: "Торговое здание",
    dims: "24×60×2,9 м",
    area: "1440 м²",
    locationShort: "Московская обл., г. Ступино",
    locationFull: "Россия, Московская область, г. Ступино",
    purpose: "Торговые здания",
    details: ["Кровля и стены: сэндвич-панели"],
    length: "60 м",
    width: "24 м",
    height: "2,9 м",
    category: "Торговые здания",
  },
  {
    id: 3,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/058f87fa-8e5c-4c82-a330-319df26dd5de.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/f3fa9969-abb9-445c-a950-973426f8deba.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/9366fbd9-2b67-4595-b440-c54b1fc21ec8.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/8f050785-a59b-4e82-94be-ec3b5a1caa38.jpg",
    ],
    title: "Здание магазина",
    dims: "8,76×13,76×4,6 м",
    area: "120,5 м²",
    locationShort: "г. Москва, п. Марушкинское",
    locationFull: "Россия, г. Москва, поселение Марушкинское",
    purpose: "Торговые здания",
    details: ["Кровля и стены: сэндвич-панели"],
    length: "13,76 м",
    width: "8,76 м",
    height: "4,6 м",
    category: "Торговые здания",
  },
];

const WORDS = [
  "торговые здания",
  "торговые павильоны",
  "торговые центры",
  "супермаркеты",
  "кафе и столовые",
  "магазины",
  "рынки",
];

const QUIZ_OPTIONS = [
  { label: "Торговый павильон", icon: "Store" },
  { label: "Магазин", icon: "Tag" },
  { label: "Супермаркет", icon: "ShoppingCart" },
  { label: "Торговый центр", icon: "ShoppingBag" },
  { label: "Кафе/столовая", icon: "UtensilsCrossed" },
  { label: "Другое", icon: "MoreHorizontal" },
];

export default function TorgovyeZdaniya() {
  return (
    <Index
      pageTitle="Быстровозводимые торговые здания под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых торговых зданий из металлоконструкций под ключ за 50 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
      quizImg="https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/67469387-74c8-416d-aed0-495aca623f3f.jpg"
      projects={TORGOVYE_PROJECTS}
      categoryName="Торговые здания"
      hideCrane
      hideSketch
    />
  );
}