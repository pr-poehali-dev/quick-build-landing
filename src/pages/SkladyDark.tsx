import Index, { Project } from "./Index";

const SKLADY_PROJECTS: Project[] = [
  {
    id: 1,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/7e684be1-0307-465d-981e-eab7082944b0.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/6c5b623c-44ca-49a5-a3a5-ff707b2122f7.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/9ab7741b-5749-4861-8068-f14317ba1ebe.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/f79defa9-1fac-4671-a354-f979f704808e.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/1973cc88-213b-4417-9d67-88ba5621f3fe.jpg",
    ],
    title: "Склад",
    dims: "24×60×7,5 м",
    area: "1440 м²",
    locationShort: "Московская обл., г. Химки",
    locationFull: "Россия, Московская обл., г. Химки",
    purpose: "Склады и Ангары",
    details: ["Наличие кранов: да, 3.2т", "Наличие антресолей: нет"],
    length: "60 м",
    width: "24 м",
    height: "7,5 м",
    category: "Склады и Ангары",
  },
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

export default function SkladyDark() {
  return (
    <Index
      pageTitle="Быстровозводимые склады под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых складов из металлоконструкций под ключ за 50 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
      quizImg="https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/7e684be1-0307-465d-981e-eab7082944b0.jpg"
      forceTheme="dark"
      projects={SKLADY_PROJECTS}
      enableUis
      categoryName="Склады"
    />
  );
}