import Index from "./Index";

const WORDS = [
  "промышленные здания",
  "производственные здания",
  "цеха",
  "мастерские",
  "здания для энергетики",
  "котельные",
  "заводы",
];

const QUIZ_OPTIONS = [
  { label: "Производственный цех", icon: "Factory" },
  { label: "Мастерская", icon: "Wrench" },
  { label: "Здание для энергетики", icon: "Zap" },
  { label: "Котельная", icon: "Flame" },
  { label: "Завод", icon: "Building2" },
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
  {
    id: 2,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/7f6efaf7-569a-4b2a-832d-06a699e9229f.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/2cd1c189-1ced-462b-b958-0b4192be83dc.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/88dbb56e-0d3b-4496-b88d-b6b06f9e9266.jpg",
    ],
    title: "Производственное здание",
    dims: "18×24×6 м",
    area: "432 м²",
    locationShort: "Московская обл., г. Одинцово",
    locationFull: "Россия, Московская обл., г. Одинцово",
    purpose: "Производственные и промышленные здания",
    details: ["Наличие кранов: нет", "Наличие антресолей: нет"],
    length: "24 м",
    width: "18 м",
    height: "6 м",
    category: "Производственные и промышленные здания",
  },
  {
    id: 3,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/20974fcd-d088-4bad-b865-6100c75100f0.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/130b00ac-7f2d-4889-bc1d-e3385392e0ee.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/cd8f7707-4ea2-4ab9-9b1d-35e49c5ce11a.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/f75a8b17-ecf2-4c67-bc70-0870c4359bf9.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/3e78c886-0bee-44a2-8973-4e29ee332fac.jpg",
    ],
    title: "Производственно-складское здание",
    dims: "24×60×6 м",
    area: "1440 м²",
    locationShort: "Московская обл., д. Селевкино",
    locationFull: "Россия, Московская обл., д. Селевкино",
    purpose: "Производственные и промышленные здания",
    details: ["Наличие кранов: нет", "Наличие антресолей: нет"],
    length: "60 м",
    width: "24 м",
    height: "6 м",
    category: "Производственные и промышленные здания",
  },
  {
    id: 4,
    photos: [
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/7e684be1-0307-465d-981e-eab7082944b0.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/6c5b623c-44ca-49a5-a3a5-ff707b2122f7.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/9ab7741b-5749-4861-8068-f14317ba1ebe.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/f79defa9-1fac-4671-a354-f979f704808e.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/1973cc88-213b-4417-9d67-88ba5621f3fe.jpg",
      "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/f37c447b-50e9-4de1-a519-7d9740155de9.jpg",
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
];

export default function ProizvodstvennyeZdaniyaDark() {
  return (
    <Index
      pageTitle="Быстровозводимые производственные здания под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых производственных зданий из металлоконструкций под ключ за 45 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
      projects={PROJECTS}
      forceTheme="dark"
    />
  );
}