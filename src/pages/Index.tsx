import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ── Images ──────────────────────────────────────────────────────────────────
const HERO_BG = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/e04968b8-999e-4c94-812a-66bd0ded90d1.jpg";
const LOGO_URL = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/528f5996-8edc-44d4-8206-5de1a1c38adf.png";

const IMG_WAREHOUSE = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/a4cbbfd8-4f55-4ad0-9498-9d69a60a62c9.jpg";
const IMG_FACTORY   = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/ea209454-b909-4daa-af92-c0da34240618.jpg";
const IMG_TRADE     = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/8e5eb3d6-5c31-48ea-8143-dc4a7452062f.jpg";
const IMG_AUTO      = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/ac8a4f07-7780-4883-83be-5083ef582f7b.jpg";

// ── Rotating words (согласованы с "быстровозводимые") ─────────────────────
const ROTATING_WORDS = [
  "здания",
  "склады",
  "ангары",
  "цеха",
  "офисы",
  "медицинские здания",
  "магазины",
  "кафе и рестораны",
  "торговые здания",
  "административные здания",
  "автомойки",
  "здания для транспорта",
  "автосервисы",
  "автосалоны",
  "сельхоз здания",
  "фермы",
  "спортивные сооружения",
];

// ── Stats ─────────────────────────────────────────────────────────────────
const STATS = [
  { num: 300, suffix: "+", title: "Реализованных проектов", desc: "Промышленных и коммерческих зданий по всей России" },
  { num: 40, suffix: " дней", title: "Срок поставки и монтажа", desc: "Всего за 40 дней мы обеспечиваем поставку и монтаж быстровозводимых зданий SMALL BOX для малого и среднего бизнеса" },
  { num: 500, suffix: "+ тыс.кв.м", title: "Запроектировано", desc: "Запроектированных объектов в нашем портфеле и более 300 тыс.кв.м построенных объектов BIG BOX" },
  { num: 60, suffix: "+", title: "Многоуровневых паркингов", desc: "Запроектировали паркингов на 50000 машиномест и построили более 20 паркингов на 9000 машиномест" },
];

// ── Projects ──────────────────────────────────────────────────────────────────
interface Project {
  id: number;
  img: string;
  img2?: string;
  title: string;
  dims: string;
  area: string;
  location: string;
  category: string;
  purpose: string;
  length: string;
  width: string;
  height: string;
  walls: string;
}

const projects: Project[] = [
  {
    id: 1,
    img: IMG_WAREHOUSE,
    img2: IMG_WAREHOUSE,
    title: "Склад для хранения металлоизделий",
    dims: "18×30×6 м",
    area: "540 м²",
    location: "Россия, Ярославская обл., г. Рыбинск",
    category: "Склады и ангары",
    purpose: "Склад и ангар",
    length: "30 м",
    width: "18 м",
    height: "6 м",
    walls: "Сэндвич-панели",
  },
  {
    id: 2,
    img: IMG_FACTORY,
    img2: IMG_FACTORY,
    title: "Производственный цех",
    dims: "24×48×8 м",
    area: "1152 м²",
    location: "Россия, Московская обл., г. Подольск",
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
    title: "Торговый центр",
    dims: "30×60×6 м",
    area: "1800 м²",
    location: "Россия, Краснодарский край, г. Сочи",
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
    title: "Автосервис с автомойкой",
    dims: "12×24×4.8 м",
    area: "288 м²",
    location: "Россия, Свердловская обл., г. Екатеринбург",
    category: "Здания для транспорта",
    purpose: "Автосервис",
    length: "24 м",
    width: "12 м",
    height: "4.8 м",
    walls: "Профлист",
  },
];

// ── Quiz ──────────────────────────────────────────────────────────────────────
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

// ── Counter hook ──────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1200, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

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

// ── StatCard ──────────────────────────────────────────────────────────────────
function StatCard({ stat, started }: { stat: typeof STATS[0]; started: boolean }) {
  const val = useCounter(stat.num, 1400, started);
  return (
    <div className="flex flex-col gap-1">
      <div className="font-extrabold leading-none" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#fff" }}>
        {val}{stat.suffix}
      </div>
      <div className="font-semibold text-white text-sm leading-snug">{stat.title}</div>
      <div className="text-white/75 text-xs leading-relaxed">{stat.desc}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Callback popup
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbSent, setCbSent] = useState(false);

  // Modal
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);

  // Quiz
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  // Rotating word
  const [wordIdx, setWordIdx] = useState(0);
  const [wordKey, setWordKey] = useState(0);

  // Hero counter (40 days)
  const [heroStarted, setHeroStarted] = useState(false);
  const heroCountRef = useRef<HTMLSpanElement>(null);
  const heroVal = useCounter(40, 1600, heroStarted);

  useEffect(() => {
    const t = setTimeout(() => setHeroStarted(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIdx(i => (i + 1) % ROTATING_WORDS.length);
      setWordKey(k => k + 1);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (activeProject || quizOpen || callbackOpen || mobileMenuOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject, quizOpen, callbackOpen, mobileMenuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const openQuiz = () => {
    setQuizOpen(true);
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizDone(false);
  };

  const handleQuizAnswer = (label: string) => {
    const next = [...quizAnswers, label];
    setQuizAnswers(next);
    if (quizStep + 1 >= quizSteps.length) setQuizDone(true);
    else setQuizStep(quizStep + 1);
  };

  const recommendation = quizDone ? getRecommendation(quizAnswers) : null;
  const progress = quizDone ? 100 : Math.round((quizStep / quizSteps.length) * 100);

  const heroRef  = useInView(0.05);
  const statsRef = useInView(0.1);
  const portRef  = useInView(0.1);
  const contRef  = useInView(0.1);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">

          {/* Logo + description (desktop) */}
          <div className="flex items-center gap-3 shrink-0 min-w-0">
            <img src={LOGO_URL} alt="EVRAZ STEEL BOX" className="h-10 w-auto object-contain shrink-0" />
            <p className="text-[11px] text-gray-500 leading-snug hidden lg:block" style={{ maxWidth: "185px" }}>
              Российский разработчик и поставщик<br />
              быстровозводимых зданий<br />
              на металлическом каркасе
            </p>
          </div>

          {/* Schedule (desktop only) */}
          <div className="hidden xl:block text-center shrink-0">
            <div className="text-xs font-semibold text-gray-700">Время и график работы</div>
            <div className="text-xs text-gray-500">Пн – Пт &nbsp; 09:30 – 18:00</div>
          </div>

          {/* Phone (desktop) */}
          <div className="hidden md:block text-right shrink-0">
            <div className="font-bold text-base text-gray-900 leading-tight">+7 (800) 302-65-29</div>
            <div className="text-xs" style={{ color: "var(--orange)" }}>sales.box2@evrazsteel.ru</div>
          </div>

          {/* Phone small (mobile) */}
          <a href="tel:+78003026529" className="md:hidden font-bold text-sm text-gray-900 leading-tight">
            +7 (800) 302-65-29
          </a>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a href="https://t.me/" className="flex items-center gap-1.5 px-3 py-2 rounded text-white text-sm font-semibold" style={{ background: "#2AABEE" }}>
              <Icon name="Send" size={14} /> Telegram
            </a>
            <button
              onClick={() => { setCallbackOpen(true); setCbSent(false); setCbName(""); setCbPhone(""); }}
              className="px-3 py-2 rounded border border-gray-300 text-sm font-semibold text-gray-700 hover:border-gray-500 transition-colors whitespace-nowrap"
            >
              Обратный звонок
            </button>
          </div>

          {/* Burger (mobile) */}
          <button
            className="md:hidden p-2 rounded border border-gray-200 shrink-0"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Меню"
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </header>

      {/* ── Mobile menu overlay ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          {/* drawer */}
          <div className="relative ml-auto w-72 max-w-full bg-white h-full flex flex-col shadow-2xl animate-modal-in overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <img src={LOGO_URL} alt="EVRAZ STEEL BOX" className="h-9 w-auto object-contain" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded border border-gray-200">
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">
                Российский разработчик и поставщик быстровозводимых зданий на металлическом каркасе
              </p>
            </div>

            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-1">Время и график работы</div>
              <div className="text-sm text-gray-700">Пн – Пт &nbsp; 09:30 – 18:00</div>
            </div>

            <div className="px-5 py-4 border-b border-gray-100">
              <a href="tel:+78003026529" className="font-bold text-lg text-gray-900 block">+7 (800) 302-65-29</a>
              <div className="text-xs mt-0.5" style={{ color: "var(--orange)" }}>sales.box2@evrazsteel.ru</div>
            </div>

            <div className="px-5 py-4 flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); setCallbackOpen(true); setCbSent(false); setCbName(""); setCbPhone(""); }}
                className="btn-orange w-full py-3 rounded text-sm"
              >
                Обратный звонок
              </button>
              <a href="https://t.me/" className="flex items-center justify-center gap-2 w-full py-3 rounded text-white text-sm font-semibold" style={{ background: "#2AABEE" }}>
                <Icon name="Send" size={14} /> Написать в Telegram
              </a>
            </div>

            <div className="px-5 pb-6 flex flex-col gap-1 mt-auto">
              {[["hero","Главная"],["portfolio","Проекты"],["contacts","Контакты"]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-left py-2.5 text-sm font-medium text-gray-700 border-b border-gray-100 last:border-0">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative overflow-hidden" style={{ minHeight: "580px" }}>
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="bg" className="w-full h-full object-cover" />
          {/* stronger overlay so text is readable on mobile */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.25) 100%)" }} />
        </div>

        <div ref={heroRef.ref} className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-[1fr_300px] gap-8 lg:gap-12 items-start">

            {/* Left: headline */}
            <div className={`transition-all duration-700 ${heroRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <h1 className="font-bold leading-tight text-gray-900 mb-4" style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.3rem)" }}>
                <span className="block">Проектируем, изготавливаем и строим</span>
                <span className="block" style={{ color: "var(--orange)" }}>
                  <span>быстровозводимые&nbsp;</span>
                  <span className="inline-block align-bottom" style={{ minWidth: "22ch" }}>
                    <span key={wordKey} className="animate-word-flip inline-block">
                      {ROTATING_WORDS[wordIdx]}
                    </span>
                  </span>
                </span>
                <span className="block text-gray-900">
                  «под ключ» за{" "}
                  <span ref={heroCountRef} style={{ color: "var(--orange)" }}>{heroVal}</span>
                  {" "}дней
                </span>
              </h1>

              <p className="text-gray-700 mb-2 text-sm md:text-base leading-relaxed">
                Пройдите тест за <strong>1 минуту</strong> и получите{" "}
                <span className="font-bold" style={{ color: "var(--orange)", fontSize: "1.05em" }}>реальную</span>{" "}
                стоимость здания + расчёт + эскиз в течение 1 часа
              </p>

              <button onClick={openQuiz} className="btn-orange px-6 py-3.5 rounded text-sm inline-flex items-center gap-2 mt-4">
                РАССЧИТАТЬ СТОИМОСТЬ →
              </button>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                <Icon name="Info" size={12} />
                * стоимость вы увидите сразу после заполнения формы — без обмана
              </p>
            </div>

            {/* Right: stats */}
            <div ref={statsRef.ref} className={`grid grid-cols-1 gap-5 transition-all duration-700 delay-200 ${statsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {STATS.map((s, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: "var(--orange)" }}>
                  <StatCard stat={s} started={statsRef.inView} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══ PORTFOLIO ════════════════════════════════════════════════════════ */}
      <section id="portfolio" className="py-12 md:py-16" style={{ background: "#f4f4f4" }}>
        <div ref={portRef.ref} className="max-w-7xl mx-auto px-4">
          <h2 className={`text-xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 transition-all duration-700 ${portRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            Примеры реализованных проектов:
          </h2>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 transition-all duration-700 delay-100 ${portRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            {projects.map((p) => (
              <div key={p.id} className="project-card bg-white rounded-xl overflow-hidden border border-gray-200"
                onClick={() => { setActiveProject(p); setModalImgIdx(0); }}>
                <div className="relative" style={{ height: "160px" }}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col gap-1.5">
                  {/* 1 — название */}
                  <div className="font-bold text-gray-900 text-sm leading-snug">{p.title}</div>
                  {/* 2 — размеры / площадь */}
                  <div className="text-xs text-gray-500">Размеры: {p.dims} / {p.area}</div>
                  {/* 3 — расположение */}
                  <div className="flex items-start gap-1 text-xs text-gray-400">
                    <Icon name="MapPin" size={11} className="mt-0.5 shrink-0" />
                    <span>{p.location}</span>
                  </div>
                  {/* 4 — назначение */}
                  <div className="inline-flex items-center gap-1 mt-0.5">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "#fff3ee", color: "var(--orange)" }}>
                      {p.purpose}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ═════════════════════════════════════════════════════════ */}
      <section id="contacts" className="py-12 md:py-16 bg-white">
        <div ref={contRef.ref} className="max-w-7xl mx-auto px-4">
          <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-start transition-all duration-700 ${contRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
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
                      <div className="font-semibold text-gray-900 text-sm break-all">{c.label}</div>
                      <div className="text-xs text-gray-400">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-7">
              <h3 className="font-bold text-gray-900 mb-5">Оставить заявку</h3>
              <form className="space-y-3 md:space-y-4" onSubmit={e => e.preventDefault()}>
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

      {/* ══ PROJECT MODAL ════════════════════════════════════════════════════ */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 modal-backdrop animate-fade-in"
          onClick={() => setActiveProject(null)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-xl overflow-hidden animate-modal-in max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="relative bg-gray-100" style={{ height: "220px" }}>
              <img
                src={modalImgIdx === 0 ? activeProject.img : (activeProject.img2 || activeProject.img)}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {[0, 1].map(i => (
                  <button key={i} onClick={() => setModalImgIdx(i)}
                    className="w-2.5 h-2.5 rounded-full border border-white transition-colors"
                    style={{ background: modalImgIdx === i ? "#fff" : "rgba(255,255,255,0.4)" }} />
                ))}
              </div>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow"
                onClick={() => setModalImgIdx(i => i === 0 ? 1 : 0)}>
                <Icon name="ChevronRight" size={18} className="text-gray-700" />
              </button>
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow"
                onClick={() => setActiveProject(null)}>
                <Icon name="X" size={16} className="text-gray-700" />
              </button>
            </div>

            <div className="p-5 md:p-6">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Карточка проекта</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-5">{activeProject.title}</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Характеристики</div>
                  <div className="space-y-2 text-sm">
                    {[
                      ["Назначение", activeProject.purpose],
                      ["Длина", activeProject.length],
                      ["Ширина", activeProject.width],
                      ["Высота", activeProject.height],
                      ["Площадь", activeProject.area],
                      ["Тип стен", activeProject.walls],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-2">
                        <span className="text-gray-400 shrink-0">{k}</span>
                        <span className="font-semibold text-gray-900 text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Детали</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="CheckCircle" size={14} style={{ color: "var(--orange)" }} />
                      Статус: Завершено
                    </div>
                    <div className="flex items-start gap-2 text-gray-700">
                      <Icon name="Tag" size={14} className="mt-0.5 shrink-0" style={{ color: "var(--orange)" }} />
                      <span>Категория: {activeProject.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="Maximize2" size={14} style={{ color: "var(--orange)" }} />
                      {activeProject.area}
                    </div>
                    <div className="flex items-start gap-2 text-gray-700">
                      <Icon name="MapPin" size={14} className="mt-0.5 shrink-0" style={{ color: "var(--orange)" }} />
                      <span>{activeProject.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => { setActiveProject(null); openQuiz(); }}
                className="btn-orange w-full mt-6 py-3.5 rounded text-sm">
                РАССЧИТАТЬ ПОХОЖЕЕ ЗДАНИЕ →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ QUIZ MODAL ═══════════════════════════════════════════════════════ */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 modal-backdrop animate-fade-in"
          onClick={() => setQuizOpen(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg overflow-hidden animate-modal-in max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div>
                <div className="text-xs text-gray-400 mb-0.5">{quizDone ? "Результат" : quizSteps[quizStep]?.hint}</div>
                <div className="text-xs font-semibold" style={{ color: "var(--orange)" }}>{quizDone ? "Готово!" : `${progress}% пройдено`}</div>
              </div>
              <button onClick={() => setQuizOpen(false)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                <Icon name="X" size={15} className="text-gray-500" />
              </button>
            </div>
            <div className="h-1 bg-gray-100 mx-5 rounded-full mb-5">
              <div className="quiz-bar h-full rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <div className="px-5 pb-6">
              {!quizDone && (
                <>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4">{quizSteps[quizStep].question}</h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {quizSteps[quizStep].options.map((opt) => (
                      <button key={opt.label} onClick={() => handleQuizAnswer(opt.label)}
                        className="quiz-option rounded-xl p-3.5 text-left flex items-center gap-2.5 bg-white">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#fff3ee" }}>
                          <Icon name={opt.icon} size={15} style={{ color: "var(--orange)" }} />
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
                  <div className="p-4 rounded-xl mb-4" style={{ background: "#fff3ee", border: "1px solid #ffe0d0" }}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--orange)" }}>Рекомендуемое решение</div>
                    <div className="font-bold text-gray-900 text-base mb-1">{recommendation.title}</div>
                    <div className="text-sm text-gray-600">{recommendation.desc}</div>
                    {recommendation.area && <div className="mt-2 text-xs text-gray-500">Площадь: <strong>{recommendation.area}</strong></div>}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Оставьте контакты — наш менеджер пришлёт точный расчёт в течение 2 часов</p>
                  <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder="Ваше имя"
                      className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors" />
                    <input type="tel" placeholder="+7 (___) ___-__-__"
                      className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors" />
                    <button type="submit" className="btn-orange w-full py-3.5 rounded text-sm">ПОЛУЧИТЬ РАСЧЁТ →</button>
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

      {/* ══ CALLBACK POPUP ═══════════════════════════════════════════════════ */}
      {callbackOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 modal-backdrop animate-fade-in"
          onClick={() => setCallbackOpen(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm overflow-hidden animate-modal-in"
            onClick={e => e.stopPropagation()}>
            {/* Header banner */}
            <div className="px-6 pt-6 pb-4" style={{ background: "var(--orange)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="Phone" size={20} className="text-white" />
                </div>
                <button onClick={() => setCallbackOpen(false)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="X" size={14} className="text-white" />
                </button>
              </div>
              <h3 className="text-white font-bold text-lg leading-tight">Перезвоним за 15 минут</h3>
              <p className="text-white/80 text-sm mt-1">Оставьте номер — менеджер свяжется с вами и ответит на любые вопросы</p>
            </div>

            <div className="px-6 pb-6 pt-5">
              {cbSent ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "#fff3ee" }}>
                    <Icon name="CheckCircle" size={24} style={{ color: "var(--orange)" }} />
                  </div>
                  <div className="font-bold text-gray-900 mb-1">Заявка принята!</div>
                  <div className="text-sm text-gray-500">Перезвоним в рабочее время в течение 15 минут</div>
                </div>
              ) : (
                <form className="space-y-3.5" onSubmit={e => { e.preventDefault(); setCbSent(true); }}>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      value={cbName}
                      onChange={e => setCbName(e.target.value)}
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={cbPhone}
                      onChange={e => setCbPhone(e.target.value)}
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors"
                    />
                  </div>
                  <button type="submit" className="btn-orange w-full py-3.5 rounded-lg text-sm">
                    ПОЗВОНИТЕ МНЕ →
                  </button>
                  <p className="text-center text-xs text-gray-400">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
