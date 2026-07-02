import Index, { Project } from "./Index";

const TRANSPORT_PROJECTS: Project[] = [
  {
    id: 1,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/dfd561e2-6fdb-49ba-800c-31a80f816318.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/d175b4a0-9816-4513-b964-6de699180322.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/e7f97895-f1ab-44ab-902c-2216b486153e.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/9934c13a-5cb1-426e-85e8-a75354ce8316.jpg",
    ],
    title: "Здание для хранения техники",
    dims: "20×30×5,2 м",
    area: "600 м²",
    locationShort: "ЯНАО, г. Муравленко",
    locationFull: "Россия, Ямало-Ненецкий автономный округ, г. Муравленко",
    purpose: "Здания для транспорта",
    details: [
      "Наличие кранов: нет",
      "Наличие антресолей: нет",
      "Кровля и стены: сэндвич-панели",
    ],
    length: "30 м",
    width: "20 м",
    height: "5,2 м",
    category: "Здания для транспорта",
  },
  {
    id: 2,
    photos: [],
    title: "",
    dims: "",
    area: "",
    locationShort: "",
    locationFull: "",
    purpose: "Здания для транспорта",
    details: [],
    length: "",
    width: "",
    height: "",
    category: "Здания для транспорта",
  },
  {
    id: 3,
    photos: [],
    title: "",
    dims: "",
    area: "",
    locationShort: "",
    locationFull: "",
    purpose: "Здания для транспорта",
    details: [],
    length: "",
    width: "",
    height: "",
    category: "Здания для транспорта",
  },
  {
    id: 4,
    photos: [],
    title: "",
    dims: "",
    area: "",
    locationShort: "",
    locationFull: "",
    purpose: "Здания для транспорта",
    details: [],
    length: "",
    width: "",
    height: "",
    category: "Здания для транспорта",
  },
];

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

export default function ZdaniyaDlyaTransporta() {
  return (
    <Index
      pageTitle="Быстровозводимые здания для транспорта под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых ангаров для транспорта из металлоконструкций под ключ за 45 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
      quizImg="https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/475e2a1a-3296-4b98-a077-f52be1c6ece6.jpg"
      projects={TRANSPORT_PROJECTS}
    />
  );
}