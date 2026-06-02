import Index from "./Index";

const WORDS = [
  "торговые здания",
  "торговые павильоны",
  "торговые центры",
  "рынки",
  "супермаркеты и гипермаркеты",
  "кафе и рестораны",
  "столовые",
  "магазины",
];

const QUIZ_OPTIONS = [
  { label: "Торговый павильон", icon: "Store" },
  { label: "Торговый центр", icon: "ShoppingBag" },
  { label: "Супермаркет или гипермаркет", icon: "ShoppingCart" },
  { label: "Кафе/ресторан/столовая", icon: "UtensilsCrossed" },
  { label: "Магазин", icon: "Tag" },
  { label: "Другое", icon: "MoreHorizontal" },
];

export default function TorgovyeZdaniya() {
  return (
    <Index
      pageTitle="Быстровозводимые торговые здания под ключ"
      pageDescription="Проектирование, изготовление и строительство быстровозводимых торговых зданий из металлоконструкций под ключ за 45 дней по всей России"
      rotatingWords={WORDS}
      quizOptions={QUIZ_OPTIONS}
    />
  );
}
