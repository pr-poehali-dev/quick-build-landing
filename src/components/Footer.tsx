import { Link } from "react-router-dom";

const LOGO_URL =
  "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/528f5996-8edc-44d4-8206-5de1a1c38adf.png";

const CATEGORIES = [
  {
    label: "Быстровозводимые производственные здания",
    href: "/proizvodstvennye-zdaniya",
  },
  {
    label: "Быстровозводимые здания для транспорта",
    href: "/zdaniya-dlya-transporta",
  },
  {
    label: "Быстровозводимые торговые здания",
    href: "/torgovye-zdaniya",
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Логотип и описание */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src={LOGO_URL}
                alt="EVRAZ STEEL BOX"
                className="h-10 w-auto object-contain"
              />
              <div style={{ fontSize: "9.5px", lineHeight: "1.55" }} className="text-gray-500">
                <span className="block whitespace-nowrap">Российский разработчик и поставщик</span>
                <span className="block whitespace-nowrap">быстровозводимых зданий</span>
                <span className="block whitespace-nowrap">на металлическом каркасе</span>
              </div>
            </div>
          </div>

          {/* Категории зданий */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Категории зданий</h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    to={cat.href}
                    className="text-sm text-gray-600 hover:text-orange-500 transition-colors leading-snug block"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Контакты</h4>
            <p className="text-xs text-gray-500 mb-2">Пн – Пт &nbsp;09:30 – 18:00</p>
            <a
              href="tel:+78003026529"
              className="block text-base font-bold text-gray-900 hover:text-orange-500 transition-colors mb-1"
            >
              +7 (800) 302-65-29
            </a>
            <a
              href="mailto:sales.box@evrazsteel.ru"
              className="block text-sm hover:text-orange-600 transition-colors mb-3"
              style={{ color: "var(--orange)" }}
            >
              sales.box@evrazsteel.ru
            </a>
            <p className="text-xs text-gray-500">Москва, Пресненская наб., 12</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} EVRAZ STEEL BOX. Все права защищены.
          </p>
          <a
            href="https://evrazsteelbox.ru/politika_v_oblasti_obrabotki_personalnyh_dannyh/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors underline"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
