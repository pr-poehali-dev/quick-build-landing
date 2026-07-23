import Index, { Project } from "./Index";

const SKLADY_PROJECTS: Project[] = [
  {
    id: 2,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/a0680e47-b153-49fe-8fb2-dfbd01b2440c.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/0f232dc8-c073-4635-9773-9d39c1a94d61.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/2d425123-5272-482d-bfdc-b771c403ddee.jpg",
    ],
    title: "Склад запчастей",
    dims: "24×32×6,5 м",
    area: "768 м²",
    locationShort: "Московская обл., д. Ильинское",
    locationFull: "Россия, Московская обл., д. Ильинское",
    purpose: "Склады",
    details: ["Наличие кранов: нет", "Тип стен и кровли: Сэндвич-панели"],
    length: "32 м",
    width: "24 м",
    height: "6,5 м",
    category: "Склады",
  },
  {
    id: 3,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/76b42683-8871-4849-9193-60a1a5480e25.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/15e303a4-3311-430a-9753-a5c0f39a1a3e.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/6c9302a9-268e-4b47-bee8-2c45b5bed058.jpg",
    ],
    title: "Склад стеклопластиковых изделий",
    dims: "12×36×5 м",
    area: "432 м²",
    locationShort: "Владимирская обл., с. Лемешки",
    locationFull: "Россия, Владимирская обл., с. Лемешки",
    purpose: "Склады",
    details: ["Наличие кранов: нет", "Тип стен и кровли: Сэндвич-панели"],
    length: "36 м",
    width: "12 м",
    height: "5 м",
    category: "Склады",
  },
  {
    id: 4,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/527ee443-6e11-4483-ae58-2259cafb4265.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/eeb51a23-7c52-48c6-a765-2d325a768858.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/cdc91bf1-d78b-4340-b621-c7e6ea758836.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/fb5200be-a084-44c8-a75f-b9733741f5fc.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/e5b61b86-54b7-47a3-bd4f-50f4702ecf2b.jpg",
    ],
    title: "Склад кухонных изделий",
    dims: "16×32×5 м",
    area: "512 м²",
    locationShort: "Московская обл., г. Сергиев Посад",
    locationFull: "Россия, Московская обл., г. Сергиев Посад",
    purpose: "Склады",
    details: ["Наличие кранов: нет", "Тип стен и кровли: Сэндвич-панели"],
    length: "32 м",
    width: "16 м",
    height: "5 м",
    category: "Склады",
  },
  {
    id: 5,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/2f9f7464-9fcb-48c6-8088-1d06c8f81cd4.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/8bfbb1a3-f53f-4e70-8f78-96b274ac93c6.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/0f4d7f4e-6240-49a9-80a6-449a1cf7d507.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/124b5d80-08a8-439b-b2bd-22cd9447babd.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/559acb40-7627-4358-b4a8-90e8fec0a635.jpg",
    ],
    title: "Продуктовый склад с антресолью",
    dims: "18×62,4×8,5 м",
    area: "1123 м²",
    locationShort: "Московская обл., д. Андреевское",
    locationFull: "Россия, Московская обл., д. Андреевское",
    purpose: "Склады",
    details: ["Наличие кранов: нет", "Тип стен и кровли: Сэндвич-панели"],
    length: "62,4 м",
    width: "18 м",
    height: "8,5 м",
    category: "Склады",
  },
];

const WORDS = [
  "cкладские комплексы",
  "склады",
  "ангары",
  "склады из сэндвич-панелей",
  "теплые склады",
  "логистические комплексы",
];

const QUIZ_OPTIONS = [
  { label: "Складской комплекс", icon: "Warehouse" },
  { label: "Быстровозводимый склад/ангар", icon: "Building2" },
  { label: "Склад из сэндвич-панелей", icon: "PanelsTopLeft" },
  { label: "Теплый склад", icon: "ThermometerSun" },
  { label: "Логистический комплекс", icon: "Truck" },
  { label: "Другое", icon: "MoreHorizontal" },
];

export default function SkladyDark() {
  return (
    <Index
      pageTitle="Быстровозводимые склады под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых складов из металлоконструкций под ключ за 50 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
      quizImg="https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/89385ba1-7a7f-4d27-9074-db4be9b47ef4.jpg"
      forceTheme="dark"
      projects={SKLADY_PROJECTS}
      enableUis
      categoryName="Склады"
    />
  );
}