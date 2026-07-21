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
  { label: "Теплые склады", icon: "ThermometerSun" },
  { label: "Холодильные склады", icon: "Snowflake" },
  { label: "Складские комплексы", icon: "Warehouse" },
  { label: "Сухие склады", icon: "PackageCheck" },
  { label: "Мультитемпературные склады", icon: "ThermometerSnowflake" },
  { label: "Другое", icon: "MoreHorizontal" },
];

export default function Sklady() {
  return (
    <Index
      pageTitle="Быстровозводимые склады под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых складов из металлоконструкций под ключ за 50 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
      quizImg="https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/a0680e47-b153-49fe-8fb2-dfbd01b2440c.jpg"
      projects={SKLADY_PROJECTS}
      enableUis
      categoryName="Склады"
    />
  );
}