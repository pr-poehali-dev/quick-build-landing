import Index from "./Index";

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
    />
  );
}
