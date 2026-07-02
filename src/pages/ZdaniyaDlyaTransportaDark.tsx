import Index, { Project } from "./Index";

const TRANSPORT_PROJECTS: Project[] = [
  {
    id: 1,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/83a801f3-002d-4f03-b7cd-fc0b8596d7dc.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/bebe8e5e-8bcc-4979-b50a-d14c2fb024a4.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/6ea8a835-7138-4c59-90dd-9ee68d3d88ea.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/cbd03750-9968-4dcb-9d4f-4b0292259724.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/7eb08d23-3ac7-4985-9648-6bcf43cac986.jpg",
    ],
    title: "Станция технического обслуживания большегрузного транспорта",
    dims: "28×35×10 м",
    area: "980 м²",
    locationShort: "Ярославская обл., г. Ярославль",
    locationFull: "Россия, Ярославская область, г. Ярославль",
    purpose: "Здания для транспорта",
    details: [
      "Стены: сэндвич-панели",
      "Кровля: мембрана",
    ],
    length: "35 м",
    width: "28 м",
    height: "10 м",
    category: "Здания для транспорта",
  },
  {
    id: 2,
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
    id: 3,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/e77db425-cfb8-4a22-8bd6-2ad831171587.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/8aa2ab9d-c126-4083-a99e-5523da378bd9.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/0e9f44ee-08b5-4499-b55c-7e4394a96043.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/f1f453a7-958c-458a-95d7-83d63a223d9c.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/832b9050-6f12-4a90-b6df-97f79f99ceed.jpg",
    ],
    title: "Здание по ремонту строительной техники",
    dims: "18×30×4,5 м",
    area: "540 м²",
    locationShort: "Московская обл., г. Химки",
    locationFull: "Россия, Московская область, г. Химки",
    purpose: "Здания для транспорта",
    details: [
      "Наличие кранов: нет",
      "Наличие антресолей: нет",
      "Кровля и стены: сэндвич-панели",
    ],
    length: "30 м",
    width: "18 м",
    height: "4,5 м",
    category: "Здания для транспорта",
  },
  {
    id: 4,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/90cacd94-4d7b-4433-a770-9a18c3bba803.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/d27cbc85-3e43-4bb1-b1f4-32af15520ae4.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/82050d8a-55cc-44f4-b372-6f0cb4fd0701.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/e2932aa7-4681-4a56-b8a7-a4d6bf7f393f.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/acc8cade-d912-4908-af43-cbe2149e4126.jpg",
    ],
    title: "Автомойка",
    dims: "10×20,6×6 м",
    area: "206 м²",
    locationShort: "Московская обл., пос. Крекшино",
    locationFull: "Россия, Московская область, пос. Крекшино",
    purpose: "Здания для транспорта",
    details: [
      "Наличие кранов: нет",
      "Наличие антресолей: нет",
      "Особенности: 2 этажа, с зоной офиса",
    ],
    length: "20,6 м",
    width: "10 м",
    height: "6 м",
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

export default function ZdaniyaDlyaTransportaDark() {
  return (
    <Index
      pageTitle="Быстровозводимые здания для транспорта под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых ангаров для транспорта из металлоконструкций под ключ за 45 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
      quizImg="https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/475e2a1a-3296-4b98-a077-f52be1c6ece6.jpg"
      forceTheme="dark"
      projects={TRANSPORT_PROJECTS}
    />
  );
}