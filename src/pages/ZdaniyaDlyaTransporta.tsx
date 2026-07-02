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
    id: 3,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/cda47c01-f810-4cb2-a607-23ed7ff49c3d.png",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/357a9f24-fb9f-4ed7-ae72-4023b9198f2f.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/a324d4a6-3641-47f4-acde-1df02c3c5aae.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/2832f334-fab8-41bc-bbd7-07e41c9e6efd.png",
    ],
    title: "Здание по ремонту техники",
    dims: "14×20×4,8 м",
    area: "280 м²",
    locationShort: "Респ. Башкортостан, г. Октябрьский",
    locationFull: "Россия, Республика Башкортостан, г. Октябрьский",
    purpose: "Здания для транспорта",
    details: [
      "Наличие кранов: нет",
      "Наличие антресолей: нет",
      "Кровля и стены: сэндвич-панели",
    ],
    length: "20 м",
    width: "14 м",
    height: "4,8 м",
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