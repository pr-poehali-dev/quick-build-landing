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
    photos: [],
    title: "",
    dims: "",
    area: "",
    locationShort: "",
    locationFull: "",
    purpose: "Торговые здания",
    details: [],
    length: "",
    width: "",
    height: "",
    category: "Торговые здания",
  },
  {
    id: 4,
    photos: [],
    title: "",
    dims: "",
    area: "",
    locationShort: "",
    locationFull: "",
    purpose: "Торговые здания",
    details: [],
    length: "",
    width: "",
    height: "",
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
      pageDescription="Проектирование, изготовление и строительство быстровозводимых торговых зданий из металлоконструкций под ключ за 45 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
      quizImg="https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/67469387-74c8-416d-aed0-495aca623f3f.jpg"
      projects={TORGOVYE_PROJECTS}
    />
  );
}