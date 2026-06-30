import Index from "./Index";

const WORDS = [
  "здания для транспорта",
  "автомойки",
  "автосервисы",
  "ангары для спецтехники",
  "ангары для грузового транспорта",
  "станции техобслуживания (СТО)",
];

const QUIZ_OPTIONS = [
  { label: "Автомойка", icon: "Droplets" },
  { label: "Автосервис", icon: "Wrench" },
  { label: "Ангар для спецтехники", icon: "Truck" },
  { label: "Станция техобслуживания", icon: "Settings" },
  { label: "Гараж для грузового транспорта", icon: "Car" },
  { label: "Другое", icon: "MoreHorizontal" },
];

const PROJECTS = [
  {
    id: 1,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/952e88e7-a58a-4f65-956d-87b9df0ba2e8.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/72f3c563-c37b-4dd9-88ba-3d267d71a234.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/8aa4e106-5ece-4dcc-88f8-85f1e47d7cc5.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/3b35580e-614a-4e8f-a7e4-3740dfce55b8.jpg",
    ],
    title: "Производственное здание",
    dims: "24×60×5 м",
    area: "1440 м²",
    locationShort: "Владимирская обл., г. Муром",
    locationFull: "Россия, Владимирская область, г. Муром",
    purpose: "Производственные здания",
    details: [
      "Наличие кранов: нет",
      "Наличие антресолей: нет",
      "Кровля и стены: сэндвич-панели",
    ],
    length: "60 м",
    width: "24 м",
    height: "5 м",
    category: "Производственные здания",
  },
];

export default function ZdaniyaDlyaTransporta() {
  return (
    <Index
      pageTitle="Быстровозводимые здания для транспорта под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых ангаров для транспорта из металлоконструкций под ключ за 45 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
      quizImg="https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/475e2a1a-3296-4b98-a077-f52be1c6ece6.jpg"
      projects={PROJECTS}
    />
  );
}
