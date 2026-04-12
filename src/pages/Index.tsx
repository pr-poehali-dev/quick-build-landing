import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ── Images ──────────────────────────────────────────────────────────────────
const HERO_BG = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/743e51e9-ceec-411a-832f-0554702885ed.jpg";

const IMG_WAREHOUSE = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/a4cbbfd8-4f55-4ad0-9498-9d69a60a62c9.jpg";
const IMG_FACTORY   = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/ea209454-b909-4daa-af92-c0da34240618.jpg";
const IMG_TRADE     = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/8e5eb3d6-5c31-48ea-8143-dc4a7452062f.jpg";
const IMG_AUTO      = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/ac8a4f07-7780-4883-83be-5083ef582f7b.jpg";
const IMG_AGRO      = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/6ac49967-de43-46ce-93dc-88c223f213d4.jpg";
const IMG_FRAME     = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/d3e9eb1f-3859-449d-98c2-1eb5bb54e512.jpg";

// ── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: number;
  img: string;
  img2?: string;
  title: string;
  location: string;
  area: string;
  category: string;
  purpose: string;
  length: string;
  width: string;
  height: string;
  walls: string;
}

// ── Projects data ─────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 1,
    img: IMG_WAREHOUSE,
    img2: IMG_AGRO,
    title: "Склад для хранения металлоизделий, 18×30×6 м",
    location: "Россия, Ярославская обл., г. Рыбинск",
    area: "540 кв.м",
    category: "Склады и ангары",
    purpose: "Склад и ангар",
    length: "30 м",
    width: "18 м",
    height: "6 м",
    walls: "Сэндвич-панели",
  },
  {
    id: 2,
    img: IMG_FRAME,
    img2: IMG_FACTORY,
    title: "Производственный цех, 24×48×8 м",
    location: "Россия, Московская обл., г. Подольск",
    area: "1152 кв.м",
    category: "Производственные здания",
    purpose: "Производств. здание",
    length: "48 м",
    width: "24 м",
    height: "8 м",
    walls: "Профлист",
  },
  {
    id: 3,
    img: IMG_TRADE,
    img2: IMG_TRADE,
    title: "Торговый центр, 30×60×6 м",
    location: "Россия, Краснодарский край, г. Сочи",
    area: "1800 кв.м",
    category: "Магазины и торговые здания",
    purpose: "Торговое здание",
    length: "60 м",
    width: "30 м",
    height: "6 м",
    walls: "Сэндвич-панели",
  },
  {
    id: 4,
    img: IMG_AUTO,
    img2: IMG_AUTO,
    title: "Автосервис с автомойкой, 12×24×4.8 м",
    location: "Россия, Свердловская обл., г. Екатеринбург",
    area: "288 кв.м",
    category: "Здания для транспорта",
    purpose: "Автосервис",
    length: "24 м",
    width: "12 м",
    height: "4.8 м",
    walls: "Профлист",
  },
];

// ── Quiz data ─────────────────────────────────────────────────────────────────
const quizSteps = [
  {
    question: "Выберите назначение здания",
    hint: "Шаг 1 из 4",
    options: [
      { label: "Склад / Ангар", icon: "Package" },
      { label: "Производство", icon: "Factory" },
      { label: "Торговля / ТЦ", icon: "ShoppingBag" },
      { label: "Сельское хозяйство", icon: "Leaf" },
      { label: "Автосервис / Паркинг", icon: "Car" },
      { label: "Другое", icon: "MoreHorizontal" },
    ],
  },
  {
    question: "Укажите площадь здания",
    hint: "Шаг 2 из 4",
    options: [
      { label: "До 300 кв.м", icon: "Square" },
      { label: "300 – 1 000 кв.м", icon: "Square" },
      { label: "1 000 – 3 000 кв.м", icon: "Square" },
      { label: "Более 3 000 кв.м", icon: "Square" },
    ],
  },
  {
    question: "Когда планируете начать строительство?",
    hint: "Шаг 3 из 4",
    options: [
      { label: "В ближайший месяц", icon: "Timer" },
      { label: "В течение 3 месяцев", icon: "Clock" },
      { label: "В течение полугода", icon: "CalendarDays" },
      { label: "Пока изучаю варианты", icon: "Search" },
    ],
  },
  {
    question: "Ваш регион строительства",
    hint: "Шаг 4 из 4",
    options: [
      { label: "Москва и МО", icon: "MapPin" },
      { label: "Санкт-Петербург", icon: "MapPin" },
      { label: "Центральная Россия", icon: "MapPin" },
      { label: "Другой регион", icon: "MapPin" },
    ],
  },
];

// ── Services ──────────────────────────────────────────────────────────────────
const services = [
  { icon: "Package", title: "Склады и ангары", desc: "Быстровозводимые склады любого размера под ключ" },
  { icon: "Factory", title: "Производственные здания", desc: "Цеха, производства, ангары для промышленности" },
  { icon: "ShoppingBag", title: "Торговые здания", desc: "ТЦ, магазины, торговые павильоны на металлокаркасе" },
  { icon: "Leaf", title: "Сельхоз здания", desc: "Зернохранилища, коровники, фермы и агропостройки" },
  { icon: "Car", title: "Здания для транспорта", desc: "Автосервисы, паркинги, автомойки и автосалоны" },
  { icon: "Building2", title: "Административные здания", desc: "Офисы, бытовки, модульные здания любой конфигурации" },
];

// ── InView hook ───────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Recommendation logic ──────────────────────────────────────────────────────
function getRecommendation(answers: string[]) {
  const purpose = answers[0] || "";
  const size = answers[1] || "";
  if (purpose.includes("Склад")) return { title: "Склад-ангар на металлокаркасе", desc: "Оптимальное решение — быстровозводимый ангар с профлистом. Срок монтажа от 25 дней.", area: size };
  if (purpose.includes("Производство")) return { title: "Производственный цех", desc: "Многопролётное производственное здание с кран-балкой и утеплением. Под ключ.", area: size };
  if (purpose.includes("Торговля")) return { title: "Торговый павильон / ТЦ", desc: "Светлое здание с большими витринными проёмами. Фасад на выбор: сэндвич-панели или алюминий.", area: size };
  if (purpose.includes("Сельское")) return { title: "Сельскохозяйственный ангар", desc: "Зернохранилище, коровник или овощехранилище. Утеплённое, с принудительной вентиляцией.", area: size };
  if (purpose.includes("Авто")) return { title: "Автосервис / Паркинг", desc: "Здание с большими гаражными воротами, смотровыми ямами и удобной планировкой.", area: size };
  return { title: "Индивидуальный проект", desc: "Наш инженер свяжется с вами и подберёт оптимальное решение под ваши задачи.", area: size };
}

// ════════════════════════════════════════════════════════════════════════════
export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Modal
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);

  // Quiz
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // lock scroll when modal/quiz open
  useEffect(() => {
    document.body.style.overflow = (activeProject || quizOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject, quizOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const openQuiz = () => {
    setQuizOpen(true);
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizDone(false);
  };

  const handleQuizAnswer = (label: string) => {
    const newAnswers = [...quizAnswers, label];
    setQuizAnswers(newAnswers);
    if (quizStep + 1 >= quizSteps.length) {
      setQuizDone(true);
    } else {
      setQuizStep(quizStep + 1);
    }
  };

  const recommendation = quizDone ? getRecommendation(quizAnswers) : null;
  const progress = quizDone ? 100 : Math.round(((quizStep) / quizSteps.length) * 100);

  const heroRef    = useInView(0.05);
  const statsRef   = useInView(0.1);
  const servRef    = useInView(0.1);
  const portRef    = useInView(0.1);
  const quizSecRef = useInView(0.1);
  const contRef    = useInView(0.1);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* ══ TOPBAR ══════════════════════════════════════════════════════════ */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 flex flex-col items-center justify-center border-2 border-gray-900 rounded text-center leading-none p-1">
              <span className="text-[8px] font-black tracking-tight text-gray-900 leading-tight">EVRAZ</span>
              <span className="text-[8px] font-black tracking-tight leading-tight" style={{ color: "var(--orange)" }}>STEEL</span>
              <span className="text-[8px] font-black tracking-tight text-gray-900 leading-tight">BOX</span>
            </div>
            <p className="text-xs text-gray-500 max-w-[170px] leading-snug hidden sm:block">
              Российский разработчик и поставщик полнокомплектных быстровозводимых зданий на металлическом каркасе
            </p>
          </div>

          {/* Schedule */}
          <div className="hidden md:block text-center">
            <div className="text-xs font-semibold text-gray-700">Время и график работы</div>
            <div className="text-xs text-gray-500">Пн – Пт &nbsp; 09:30 – 18:00</div>
          </div>

          {/* Phone + buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block text-right">
              <div className="font-bold text-lg text-gray-900 leading-tight">+7 (800) 302-65-29</div>
              <div className="text-xs" style={{ color: "var(--orange)" }}>sales.box2@evrazsteel.ru</div>
            </div>
            <a href="https://t.me/" className="flex items-center gap-1.5 px-3 py-2 rounded text-white text-sm font-semibold" style={{ background: "#2AABEE" }}>
              <Icon name="Send" size={14} /> Telegram
            </a>
            <button onClick={() => scrollTo("contacts")} className="px-3 py-2 rounded border border-gray-300 text-sm font-semibold text-gray-700 hover:border-gray-500 transition-colors">
              Обратный звонок
            </button>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-col gap-2 md:hidden">
          {[["hero","Главная"],["about","О нас"],["services","Услуги"],["portfolio","Проекты"],["quiz","Рассчитать"],["contacts","Контакты"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-left py-2 text-sm font-medium text-gray-700 border-b border-gray-100 last:border-0">
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative overflow-hidden" style={{ minHeight: "520px" }}>
        {/* BG image */}
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="bg" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div ref={heroRef.ref} className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: headline */}
            <div className={`transition-all duration-700 ${heroRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
                Проектирование, производство<br />
                и строительство<br />
                быстровозводимых<br />
                <span style={{ color: "var(--orange)" }}>сельхоз зданий</span><br />
                под ключ за <span style={{ color: "var(--orange)" }}>40 дней</span>
              </h1>
              <p className="text-gray-600 mb-8 text-base">
                Пройдите тест за <strong>1 минуту</strong> чтобы узнать стоимость и получить расчёт
              </p>
              <button onClick={openQuiz} className="btn-orange px-8 py-4 rounded text-sm inline-flex items-center gap-2">
                РАССЧИТАТЬ СТОИМОСТЬ →
              </button>
            </div>

            {/* Right: stats */}
            <div ref={statsRef.ref} className={`space-y-6 transition-all duration-700 delay-200 ${statsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {[
                { num: "300+", desc: "Реализованных проектов промышленных и коммерческих зданий по всей России" },
                { num: "40 дней", desc: "Всего за 40 дней мы обеспечиваем поставку и монтаж быстровозводимых зданий SMALL BOX для малого и среднего бизнеса" },
                { num: "500+ тыс.кв.м", desc: "Запроектированных объектов в нашем портфеле и более 300 тыс.кв.м построенных объектов BIG BOX" },
                { num: "60+", desc: "Запроектировали многоуровневых паркингов на 50000 машиномест и построили более 20 паркингов на 9000 машиномест" },
              ].map((s, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="shrink-0 font-bold text-xl md:text-2xl leading-tight" style={{ color: "var(--orange)", minWidth: "110px" }}>
                    {s.num}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "Award", title: "Собственное производство", desc: "Завод в Липецкой области площадью 15 000 кв.м. Полный производственный цикл металлоконструкций." },
              { icon: "Shield", title: "Гарантия 25 лет", desc: "На металлокаркас здания. Используем только сертифицированный российский металлопрокат." },
              { icon: "Truck", title: "Доставка по всей России", desc: "Собственный парк спецтехники. Доставляем и монтируем здания в любой регион России." },
            ].map((c, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded flex items-center justify-center shrink-0" style={{ background: "#fff3ee" }}>
                  <Icon name={c.icon} size={20} style={{ color: "var(--orange)" }} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">{c.title}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════════════════════════ */}
      <section id="services" className="py-16 bg-white">
        <div ref={servRef.ref} className="max-w-7xl mx-auto px-4">
          <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-8 transition-all duration-700 ${servRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            Виды зданий:
          </h2>
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-700 delay-100 ${servRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            {services.map((svc, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5 hover:border-orange-300 transition-colors cursor-pointer group">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: "#fff3ee" }}>
                  <Icon name={svc.icon} size={18} style={{ color: "var(--orange)" }} />
                </div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{svc.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{svc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PORTFOLIO ════════════════════════════════════════════════════════ */}
      <section id="portfolio" className="py-16" style={{ background: "#f4f4f4" }}>
        <div ref={portRef.ref} className="max-w-7xl mx-auto px-4">
          <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-8 transition-all duration-700 ${portRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            Примеры реализованных проектов:
          </h2>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 delay-100 ${portRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            {projects.map((p) => (
              <div key={p.id} className="project-card bg-white rounded-xl overflow-hidden border border-gray-200"
                onClick={() => { setActiveProject(p); setModalImgIdx(0); }}>
                {/* Image */}
                <div className="relative" style={{ height: "180px" }}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-semibold text-white" style={{ background: "rgba(30,30,30,0.75)" }}>
                    +1 фото
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <div className="font-semibold text-gray-900 text-sm mb-2 leading-snug">{p.title}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                    <Icon name="MapPin" size={11} />
                    {p.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm">{p.area}</span>
                    <span className="text-xs px-2 py-1 rounded" style={{ background: "#f4f4f4", color: "#555" }}>{p.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className={`mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 delay-200 ${portRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <p className="text-gray-700 text-sm">
              Пройдите тест за <strong>1 минуту</strong> чтобы узнать стоимость вашего здания
            </p>
            <button onClick={openQuiz} className="btn-orange px-8 py-3 rounded text-sm shrink-0">
              РАССЧИТАТЬ →
            </button>
          </div>
        </div>
      </section>

      {/* ══ QUIZ SECTION (inline teaser) ═════════════════════════════════════ */}
      <section id="quiz" className="py-16 bg-white">
        <div ref={quizSecRef.ref} className="max-w-3xl mx-auto px-4 text-center">
          <div className={`transition-all duration-700 ${quizSecRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Узнайте стоимость вашего здания за <span style={{ color: "var(--orange)" }}>1 минуту</span>
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Пройдите короткий тест — получите персональный расчёт и коммерческое предложение
            </p>
            <button onClick={openQuiz} className="btn-orange px-10 py-4 rounded text-base inline-flex items-center gap-2">
              РАССЧИТАТЬ СТОИМОСТЬ →
            </button>
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ═════════════════════════════════════════════════════════ */}
      <section id="contacts" className="py-16" style={{ background: "#f4f4f4" }}>
        <div ref={contRef.ref} className="max-w-7xl mx-auto px-4">
          <div className={`grid md:grid-cols-2 gap-12 items-start transition-all duration-700 ${contRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "+7 (800) 302-65-29", sub: "Бесплатно по России, Пн–Пт 9:30–18:00" },
                  { icon: "Mail", label: "sales.box2@evrazsteel.ru", sub: "Ответим в течение часа" },
                  { icon: "MapPin", label: "Москва, Пресненская наб., 12", sub: "Московский офис" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#fff3ee" }}>
                      <Icon name={c.icon} size={18} style={{ color: "var(--orange)" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{c.label}</div>
                      <div className="text-xs text-gray-400">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-7">
              <h3 className="font-bold text-gray-900 mb-5">Оставить заявку</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder="Ваше имя"
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-orange-400 transition-colors" />
                <input type="tel" placeholder="+7 (___) ___-__-__"
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-orange-400 transition-colors" />
                <textarea rows={3} placeholder="Опишите вашу задачу"
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-orange-400 transition-colors resize-none" />
                <button type="submit" className="btn-orange w-full py-3.5 rounded text-sm">
                  ОТПРАВИТЬ ЗАЯВКУ →
                </button>
                <p className="text-center text-xs text-gray-400">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex flex-col items-center justify-center border-2 border-gray-900 rounded text-center leading-none p-1">
              <span className="text-[7px] font-black text-gray-900 leading-tight">EVRAZ</span>
              <span className="text-[7px] font-black leading-tight" style={{ color: "var(--orange)" }}>STEEL</span>
              <span className="text-[7px] font-black text-gray-900 leading-tight">BOX</span>
            </div>
            <span className="text-xs text-gray-500">© 2024 EVRAZ STEEL BOX. Все права защищены.</span>
          </div>
          <div className="flex gap-5">
            {["Политика конфиденциальности", "Реквизиты"].map(l => (
              <button key={l} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* ══ PROJECT MODAL ════════════════════════════════════════════════════ */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in"
          onClick={() => setActiveProject(null)}>
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden animate-modal-in max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            {/* Image slider */}
            <div className="relative bg-gray-100" style={{ height: "260px" }}>
              <img
                src={modalImgIdx === 0 ? activeProject.img : (activeProject.img2 || activeProject.img)}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {[0, 1].map(i => (
                  <button key={i} onClick={() => setModalImgIdx(i)}
                    className="w-2.5 h-2.5 rounded-full border border-white transition-colors"
                    style={{ background: modalImgIdx === i ? "#fff" : "rgba(255,255,255,0.4)" }} />
                ))}
              </div>
              {/* Next arrow */}
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow"
                onClick={() => setModalImgIdx(i => i === 0 ? 1 : 0)}>
                <Icon name="ChevronRight" size={18} className="text-gray-700" />
              </button>
              {/* Close */}
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow"
                onClick={() => setActiveProject(null)}>
                <Icon name="X" size={16} className="text-gray-700" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Карточка проекта</div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">{activeProject.title}</h3>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Characteristics */}
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Характеристики</div>
                  <div className="space-y-2.5 text-sm">
                    {[
                      ["Назначение", activeProject.purpose],
                      ["Длина", activeProject.length],
                      ["Ширина", activeProject.width],
                      ["Высота", activeProject.height],
                      ["Площадь", activeProject.area],
                      ["Тип стен", activeProject.walls],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-2">
                        <span className="text-gray-400">{k}</span>
                        <span className="font-semibold text-gray-900 text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Детали</div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="CheckCircle" size={15} style={{ color: "var(--orange)" }} />
                      Статус: Завершено
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="Tag" size={15} style={{ color: "var(--orange)" }} />
                      Категория: {activeProject.category}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="Maximize2" size={15} style={{ color: "var(--orange)" }} />
                      Площадь: {activeProject.area}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="MapPin" size={15} style={{ color: "var(--orange)" }} />
                      {activeProject.location}
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => { setActiveProject(null); openQuiz(); }}
                className="btn-orange w-full mt-7 py-4 rounded text-sm">
                РАССЧИТАТЬ ПОХОЖЕЕ ЗДАНИЕ →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ QUIZ MODAL ═══════════════════════════════════════════════════════ */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in"
          onClick={() => setQuizOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden animate-modal-in"
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div>
                <div className="text-xs text-gray-400 mb-0.5">
                  {quizDone ? "Результат" : quizSteps[quizStep]?.hint}
                </div>
                <div className="text-xs font-semibold" style={{ color: "var(--orange)" }}>
                  {quizDone ? "Готово!" : `${progress}% пройдено`}
                </div>
              </div>
              <button onClick={() => setQuizOpen(false)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                <Icon name="X" size={15} className="text-gray-500" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-gray-100 mx-6 rounded-full mb-6">
              <div className="quiz-bar h-full rounded-full" style={{ width: `${progress}%` }} />
            </div>

            {/* Body */}
            <div className="px-6 pb-6">
              {!quizDone && (
                <>
                  <h3 className="text-lg font-bold text-gray-900 mb-5">{quizSteps[quizStep].question}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quizSteps[quizStep].options.map((opt) => (
                      <button key={opt.label} onClick={() => handleQuizAnswer(opt.label)}
                        className="quiz-option rounded-xl p-4 text-left flex items-center gap-3 bg-white">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#fff3ee" }}>
                          <Icon name={opt.icon} size={16} style={{ color: "var(--orange)" }} />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  {quizStep > 0 && (
                    <button onClick={() => { setQuizStep(s => s - 1); setQuizAnswers(a => a.slice(0, -1)); }}
                      className="mt-4 text-xs flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                      <Icon name="ArrowLeft" size={12} /> Назад
                    </button>
                  )}
                </>
              )}

              {quizDone && recommendation && (
                <div>
                  <div className="p-4 rounded-xl mb-5" style={{ background: "#fff3ee", border: "1px solid #ffe0d0" }}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--orange)" }}>
                      Рекомендуемое решение
                    </div>
                    <div className="font-bold text-gray-900 text-base mb-1">{recommendation.title}</div>
                    <div className="text-sm text-gray-600">{recommendation.desc}</div>
                    {recommendation.area && (
                      <div className="mt-2 text-xs text-gray-500">Площадь: <strong>{recommendation.area}</strong></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-5">
                    Оставьте контакты — наш менеджер пришлёт точный расчёт в течение 2 часов
                  </p>
                  <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder="Ваше имя"
                      className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors" />
                    <input type="tel" placeholder="+7 (___) ___-__-__"
                      className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors" />
                    <button type="submit" className="btn-orange w-full py-3.5 rounded text-sm">
                      ПОЛУЧИТЬ РАСЧЁТ →
                    </button>
                  </form>
                  <button onClick={() => { setQuizStep(0); setQuizAnswers([]); setQuizDone(false); }}
                    className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors mx-auto block">
                    Пройти заново
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
