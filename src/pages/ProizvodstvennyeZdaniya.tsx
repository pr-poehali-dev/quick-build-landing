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

export default function ProizvodstvennyeZdaniya() {
  return (
    <Index
      pageTitle="Быстровозводимые производственные здания под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых производственных зданий из металлоконструкций под ключ за 45 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
    />
  );
}
