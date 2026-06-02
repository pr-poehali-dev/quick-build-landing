import Index from "./Index";

const WORDS = [
  "здания для транспорта",
  "автомойки",
  "автосервисы",
  "ангары для техники",
  "автосалоны",
  "ангары для автодрома",
  "таможенные терминалы",
  "ангары для спецтехники",
  "ангары для грузового транспорта",
  "СТО и сервисные центры",
  "гаражи",
];

const QUIZ_OPTIONS = [
  { label: "Автомойка", icon: "Droplets" },
  { label: "Автосервис", icon: "Wrench" },
  { label: "Ангар для техники", icon: "Truck" },
  { label: "Автосалон", icon: "Car" },
  { label: "Гараж", icon: "ParkingSquare" },
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
