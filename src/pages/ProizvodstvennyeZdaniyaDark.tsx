import Index from "./Index";

const WORDS = [
  "производственные здания",
  "промышленные здания",
  "цеха",
  "мастерские",
  "здания для энергетики",
  "ТЭЦ и ГРЭС",
  "котельные",
  "здания для очистных сооружений",
  "здания для электростанции",
  "пекарни",
  "бетонные и цементные заводы",
  "производственные корпусы",
];

const QUIZ_OPTIONS = [
  { label: "Промышленный цех", icon: "Factory" },
  { label: "Производственный корпус", icon: "Building2" },
  { label: "Здание для энергетики/ТЭЦ/ГРЭС", icon: "Zap" },
  { label: "Цементный/Бетонный завод", icon: "Layers" },
  { label: "Здание для очистных сооружений", icon: "Droplets" },
  { label: "Другое", icon: "MoreHorizontal" },
];

export default function ProizvodstvennyeZdaniyaDark() {
  return (
    <Index
      pageTitle="Быстровозводимые производственные здания под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых производственных зданий из металлоконструкций под ключ за 45 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
      forceTheme="dark"
    />
  );
}
