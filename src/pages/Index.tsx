import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/743e51e9-ceec-411a-832f-0554702885ed.jpg";
const PORTFOLIO_IMAGE_1 = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/d29e9bb7-82fb-4cfd-98e3-116d675a9332.jpg";
const PORTFOLIO_IMAGE_2 = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/d7cf6e80-7218-4732-9738-539e2555f6e3.jpg";

const quizQuestions = [
  {
    id: 1,
    question: "Какой тип производства вас интересует?",
    options: [
      { value: "metal", label: "Металлообработка", icon: "Wrench" },
      { value: "construct", label: "Строительство", icon: "Building2" },
      { value: "auto", label: "Автоматизация", icon: "Settings" },
      { value: "energy", label: "Энергетика", icon: "Zap" },
    ],
  },
  {
    id: 2,
    question: "Каков масштаб вашего проекта?",
    options: [
      { value: "small", label: "До 1 млн руб.", icon: "PackageOpen" },
      { value: "medium", label: "1–10 млн руб.", icon: "Package" },
      { value: "large", label: "10–50 млн руб.", icon: "Boxes" },
      { value: "enterprise", label: "Свыше 50 млн руб.", icon: "Factory" },
    ],
  },
  {
    id: 3,
    question: "Какие сроки реализации?",
    options: [
      { value: "urgent", label: "До 1 месяца", icon: "Timer" },
      { value: "short", label: "1–3 месяца", icon: "Clock" },
      { value: "medium_t", label: "3–6 месяцев", icon: "CalendarDays" },
      { value: "long", label: "Более 6 месяцев", icon: "CalendarRange" },
    ],
  },
];

const recommendations: Record<string, { title: string; desc: string; icon: string }> = {
  metal_small: { title: "Малосерийная токарная обработка", desc: "Быстрое изготовление малых партий с точностью до 0.01 мм", icon: "Wrench" },
  metal_medium: { title: "Серийное фрезерование", desc: "Оптимальное соотношение цены и качества для средних партий", icon: "Wrench" },
  metal_large: { title: "Крупносерийное производство", desc: "Полный цикл обработки металла под ваш проект", icon: "Factory" },
  metal_enterprise: { title: "Промышленный аутсорсинг", desc: "Комплексное производство с гарантией поставок", icon: "Factory" },
  construct_small: { title: "Малые конструкции", desc: "Металлоконструкции для небольших объектов и помещений", icon: "Building2" },
  construct_medium: { title: "Гражданское строительство", desc: "Проектирование и монтаж промышленных зданий", icon: "Building2" },
  construct_large: { title: "Промышленное строительство", desc: "Полный комплекс строительных работ под ключ", icon: "Building2" },
  construct_enterprise: { title: "Инфраструктурные проекты", desc: "Масштабные промышленные объекты с нуля", icon: "Building2" },
  auto_small: { title: "Частичная автоматизация", desc: "Автоматизация отдельных процессов вашего производства", icon: "Settings" },
  auto_medium: { title: "Комплексная автоматизация цеха", desc: "Внедрение SCADA и управляющих систем", icon: "Settings" },
  auto_large: { title: "Интеграция ERP + MES", desc: "Полная цифровизация производственных процессов", icon: "Settings" },
  auto_enterprise: { title: "Умный завод (Smart Factory)", desc: "Создание цифрового двойника и полная автоматизация", icon: "Settings" },
  energy_small: { title: "Локальная энергетика", desc: "Резервное питание и локальные решения", icon: "Zap" },
  energy_medium: { title: "Электроснабжение предприятия", desc: "Проектирование и монтаж электросетей", icon: "Zap" },
  energy_large: { title: "Подстанции и ВЛ", desc: "Строительство подстанций и воздушных линий", icon: "Zap" },
  energy_enterprise: { title: "Генерация и распределение", desc: "Создание собственных энергетических объектов", icon: "Zap" },
};

const sizeMap: Record<string, string> = {
  small: "small", medium: "medium", large: "large", enterprise: "enterprise"
};

const services = [
  { icon: "Wrench", title: "Металлообработка", desc: "Токарные, фрезерные и сварочные работы любой сложности. Точность до 0.01 мм.", color: "#1a8fff" },
  { icon: "Building2", title: "Промышленное строительство", desc: "Возведение производственных корпусов, складов и инфраструктурных объектов.", color: "#ff6b1a" },
  { icon: "Settings", title: "Автоматизация производства", desc: "Внедрение роботизированных линий, SCADA-систем и цифровых технологий.", color: "#a78bfa" },
  { icon: "Zap", title: "Электроэнергетика", desc: "Проектирование и монтаж электрических сетей промышленного уровня.", color: "#22d3ee" },
  { icon: "Shield", title: "Промышленная безопасность", desc: "Аудит, сертификация и внедрение систем промышленной безопасности.", color: "#34d399" },
  { icon: "TrendingUp", title: "Инжиниринговый консалтинг", desc: "Технические экспертизы, проектная документация и сопровождение.", color: "#f59e0b" },
];

const portfolio = [
  { img: PORTFOLIO_IMAGE_1, title: "Завод «СтальПром»", tag: "Строительство", year: "2024", large: true },
  { img: PORTFOLIO_IMAGE_2, title: "ЦНИИмаш — линия ЧПУ", tag: "Автоматизация", year: "2024", large: false },
  { img: HERO_IMAGE, title: "Энергоцентр Новосибирск", tag: "Энергетика", year: "2023", large: false },
  { img: PORTFOLIO_IMAGE_2, title: "АвтоДеталь — фрезеровка", tag: "Металлообработка", year: "2023", large: false },
  { img: PORTFOLIO_IMAGE_1, title: "Склад класса A", tag: "Строительство", year: "2023", large: false },
  { img: HERO_IMAGE, title: "Подстанция 110/10 кВ", tag: "Энергетика", year: "2022", large: false },
];

const stats = [
  { value: "12+", label: "Лет на рынке" },
  { value: "340+", label: "Завершённых объектов" },
  { value: "98%", label: "Клиентов возвращаются" },
  { value: "47", label: "Специалистов в штате" },
];

const team = [
  { name: "Александр Громов", role: "Генеральный директор", exp: "20 лет опыта" },
  { name: "Ирина Соколова", role: "Главный инженер", exp: "15 лет опыта" },
  { name: "Дмитрий Ковалёв", role: "Руководитель проектов", exp: "12 лет опыта" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Index() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<{ title: string; desc: string; icon: string } | null>(null);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleQuizAnswer = (value: string) => {
    const step = quizStep - 1;
    const newAnswers = [...quizAnswers];
    newAnswers[step] = value;
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      const industry = newAnswers[0];
      const rawSize = step === 1 ? value : newAnswers[1];
      const size = sizeMap[rawSize] || "medium";
      const key = `${industry}_${size}`;
      setQuizResult(recommendations[key] || {
        title: "Индивидуальное решение",
        desc: "Мы подберём оптимальное решение после консультации с нашим специалистом.",
        icon: "Star",
      });
      setQuizStep(quizQuestions.length + 1);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  const progress = quizStep === 0 ? 0 : Math.round((quizStep / quizQuestions.length) * 100);

  const heroRef = useInView(0.1);
  const aboutRef = useInView(0.1);
  const servicesRef = useInView(0.1);
  const portfolioRef = useInView(0.1);
  const quizRef = useInView(0.1);
  const contactRef = useInView(0.1);

  return (
    <div className="min-h-screen font-golos" style={{ backgroundColor: "var(--dark-bg)", color: "#e8eef5" }}>

      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: navScrolled ? "rgba(9,12,18,0.95)" : "transparent", backdropFilter: navScrolled ? "blur(20px)" : "none", borderBottom: navScrolled ? "1px solid rgba(26,143,255,0.1)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "var(--neon-blue)" }}>
              <Icon name="Factory" size={16} className="text-white" />
            </div>
            <span className="font-oswald text-xl font-bold tracking-wider text-white">ПРОМТЕХ</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[["hero","Главная"],["about","О компании"],["services","Услуги"],["portfolio","Портфолио"],["quiz","Квиз"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: "#94a3b8" }}>
                {label}
              </button>
            ))}
          </div>

          <button onClick={() => scrollTo("contacts")}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white btn-shimmer">
            Консультация
          </button>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#94a3b8" }}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden glass-card border-t px-6 py-4 flex flex-col gap-3" style={{ borderColor: "var(--dark-border)" }}>
            {[["hero","Главная"],["about","О компании"],["services","Услуги"],["portfolio","Портфолио"],["quiz","Квиз"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left font-medium py-2" style={{ color: "#94a3b8" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden grid-bg">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(9,12,18,0.95) 0%, rgba(9,12,18,0.6) 50%, rgba(9,12,18,0.9) 100%)" }} />
        </div>

        <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full opacity-10 animate-float"
          style={{ background: "radial-gradient(circle, #1a8fff 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 left-10 w-64 h-64 rounded-full opacity-10 animate-float" style={{ animationDelay: "2s",
          background: "radial-gradient(circle, #ff6b1a 0%, transparent 70%)" }} />
        <div className="absolute top-20 right-20 w-40 h-40 opacity-20 animate-rotate-slow hidden lg:block"
          style={{ border: "1px solid #1a8fff", borderRadius: "50%", borderTopColor: "transparent" }} />

        <div ref={heroRef.ref} className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className={`max-w-3xl transition-all duration-1000 ${heroRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: "var(--neon-blue)" }} />
              <span className="section-tag">Промышленные решения нового поколения</span>
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-none mb-6 text-white">
              МЫ СТРОИМ<br />
              <span className="gradient-text">БУДУЩЕЕ</span><br />
              ПРОМЫШЛЕННОСТИ
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-xl leading-relaxed" style={{ color: "#94a3b8" }}>
              Комплексные инженерные решения — от проектирования до сдачи объекта. 
              12 лет опыта, 340+ успешных проектов по всей России.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo("quiz")}
                className="px-8 py-4 rounded-xl font-bold text-white btn-shimmer text-base">
                Подобрать решение
                <Icon name="ArrowRight" size={18} className="inline ml-2" />
              </button>
              <button onClick={() => scrollTo("portfolio")}
                className="px-8 py-4 rounded-xl font-semibold neon-border transition-all text-base"
                style={{ color: "#94a3b8", background: "rgba(26,143,255,0.05)" }}>
                Смотреть портфолио
              </button>
            </div>
          </div>

          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${heroRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-5 neon-border text-center">
                <div className="font-oswald text-3xl md:text-4xl font-bold gradient-text-blue">{s.value}</div>
                <div className="text-sm mt-1" style={{ color: "#64748b" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs" style={{ color: "#64748b", letterSpacing: "0.1em" }}>SCROLL</span>
          <div className="w-px h-10 animate-pulse" style={{ background: "var(--neon-blue)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 relative" style={{ backgroundColor: "var(--dark-card)" }}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div ref={aboutRef.ref} className="relative max-w-7xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${aboutRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-12" style={{ background: "var(--neon-orange)" }} />
                <span className="section-tag" style={{ color: "var(--neon-orange)" }}>О КОМПАНИИ</span>
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                ИНЖЕНЕРНЫЙ ОПЫТ<br />
                <span className="gradient-text">В КАЖДОМ ПРОЕКТЕ</span>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#94a3b8" }}>
                С 2012 года мы реализуем сложные промышленные проекты по всей России. 
                Наша команда из 47 специалистов объединяет инженеров, технологов и менеджеров 
                с опытом в металлообработке, строительстве и автоматизации.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#94a3b8" }}>
                Мы не просто выполняем заказы — мы создаём долгосрочные партнёрства, 
                обеспечивая полный цикл от концепции до запуска производства.
              </p>
              <div className="flex flex-wrap gap-3">
                {["ISO 9001:2015", "СРО Строителей", "НАКС Сварка", "ПАО Россети"].map((cert) => (
                  <span key={cert} className="px-3 py-1.5 rounded-lg text-xs font-semibold neon-border"
                    style={{ color: "var(--neon-blue)", background: "rgba(26,143,255,0.05)" }}>
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {team.map((member, i) => (
                <div key={i} className="glass-card rounded-xl p-5 flex items-center gap-4 neon-border transition-all hover:translate-x-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-oswald font-bold text-lg shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--neon-blue), #a78bfa)", color: "#fff" }}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{member.name}</div>
                    <div className="text-xs" style={{ color: "#64748b" }}>{member.role} · {member.exp}</div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="ml-auto" style={{ color: "var(--neon-blue)" }} />
                </div>
              ))}
              <div className="glass-card rounded-xl p-5 neon-border" style={{ borderColor: "rgba(255,107,26,0.3)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Award" size={20} style={{ color: "var(--neon-orange)" }} />
                  <span className="font-semibold text-white text-sm">Лауреат «Промышленник года 2023»</span>
                </div>
                <p className="text-xs" style={{ color: "#64748b" }}>
                  Победитель в номинации «Лучший инженерный проект» по итогам года
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 relative" style={{ backgroundColor: "var(--dark-bg)" }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div ref={servicesRef.ref} className="relative max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${servicesRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: "var(--neon-blue)" }} />
              <span className="section-tag">НАШИ УСЛУГИ</span>
              <div className="h-px w-12" style={{ background: "var(--neon-blue)" }} />
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              ПОЛНЫЙ СПЕКТР<br />
              <span className="gradient-text">ПРОМЫШЛЕННЫХ РЕШЕНИЙ</span>
            </h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${servicesRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {services.map((svc, i) => (
              <div key={i}
                className="glass-card rounded-2xl p-7 group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{ border: "1px solid var(--dark-border)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = svc.color + "55"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--dark-border)"; }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: svc.color + "15", border: `1px solid ${svc.color}30` }}>
                  <Icon name={svc.icon} size={22} style={{ color: svc.color }} />
                </div>
                <h3 className="font-oswald text-xl font-bold text-white mb-3">{svc.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{svc.desc}</p>
                <div className="flex items-center gap-2 mt-5 text-sm font-medium transition-all group-hover:gap-3"
                  style={{ color: svc.color }}>
                  Подробнее <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28 relative" style={{ backgroundColor: "var(--dark-card)" }}>
        <div ref={portfolioRef.ref} className="relative max-w-7xl mx-auto px-6">
          <div className={`flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 transition-all duration-1000 ${portfolioRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-12" style={{ background: "var(--neon-blue)" }} />
                <span className="section-tag">ПОРТФОЛИО</span>
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white">
                НАШИ ЛУЧШИЕ<br />
                <span className="gradient-text">ПРОЕКТЫ</span>
              </h2>
            </div>
            <p className="text-sm max-w-xs" style={{ color: "#64748b" }}>
              Более 340 реализованных проектов в разных отраслях промышленности
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-1000 delay-200 ${portfolioRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {portfolio.map((item, i) => (
              <div key={i}
                className={`portfolio-card rounded-2xl cursor-pointer group ${item.large && i === 0 ? "lg:col-span-2" : ""}`}
                style={{ border: "1px solid var(--dark-border)", background: "var(--dark-bg)" }}>
                <div className="relative overflow-hidden rounded-t-2xl" style={{ height: item.large && i === 0 ? "300px" : "210px" }}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: "linear-gradient(180deg, transparent 40%, rgba(9,12,18,0.92) 100%)" }} />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded" style={{ background: "var(--neon-blue)", color: "#fff" }}>
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white text-sm">{item.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>{item.tag} · {item.year}</div>
                  </div>
                  <Icon name="ExternalLink" size={15} style={{ color: "#334155" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section id="quiz" className="py-28 relative overflow-hidden" style={{ backgroundColor: "var(--dark-bg)" }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--neon-blue) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div ref={quizRef.ref} className="relative max-w-2xl mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-1000 ${quizRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: "var(--neon-orange)" }} />
              <span className="section-tag" style={{ color: "var(--neon-orange)" }}>УМНЫЙ КВИЗ</span>
              <div className="h-px w-12" style={{ background: "var(--neon-orange)" }} />
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              ПОДБЕРЁМ РЕШЕНИЕ<br />
              <span className="gradient-text">ЗА 3 ВОПРОСА</span>
            </h2>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Ответьте на несколько вопросов — получите персональную рекомендацию
            </p>
          </div>

          <div className={`glass-card rounded-2xl p-8 neon-border transition-all duration-1000 delay-200 ${quizRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {quizStep > 0 && quizStep <= quizQuestions.length && (
              <div className="mb-8">
                <div className="flex justify-between text-xs mb-2" style={{ color: "#64748b" }}>
                  <span>Вопрос {quizStep} из {quizQuestions.length}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "var(--dark-border)" }}>
                  <div className="h-full rounded-full quiz-progress-bar" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {quizStep === 0 && (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center animate-glow-pulse"
                  style={{ background: "linear-gradient(135deg, rgba(26,143,255,0.2), rgba(167,139,250,0.2))", border: "1px solid rgba(26,143,255,0.4)" }}>
                  <Icon name="Sparkles" size={36} style={{ color: "var(--neon-blue)" }} />
                </div>
                <h3 className="font-oswald text-2xl font-bold text-white mb-3">Персональный подбор решения</h3>
                <p className="text-sm mb-8" style={{ color: "#94a3b8" }}>
                  3 простых вопроса — и вы получите конкретное решение,
                  подходящее именно вашему проекту
                </p>
                <button onClick={() => setQuizStep(1)}
                  className="px-8 py-3.5 rounded-xl font-bold text-white btn-shimmer">
                  Начать подбор <Icon name="ArrowRight" size={16} className="inline ml-1.5" />
                </button>
              </div>
            )}

            {quizStep >= 1 && quizStep <= quizQuestions.length && (
              <div>
                <h3 className="font-oswald text-2xl font-bold text-white mb-6">
                  {quizQuestions[quizStep - 1].question}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quizQuestions[quizStep - 1].options.map((opt) => (
                    <button key={opt.value} onClick={() => handleQuizAnswer(opt.value)}
                      className="flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: "rgba(26,143,255,0.05)", border: "1px solid var(--dark-border)", color: "#94a3b8" }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(26,143,255,0.6)";
                        el.style.color = "#fff";
                        el.style.background = "rgba(26,143,255,0.1)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--dark-border)";
                        el.style.color = "#94a3b8";
                        el.style.background = "rgba(26,143,255,0.05)";
                      }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "rgba(26,143,255,0.1)" }}>
                        <Icon name={opt.icon} size={15} style={{ color: "var(--neon-blue)" }} />
                      </div>
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
                {quizStep > 1 && (
                  <button onClick={() => setQuizStep(quizStep - 1)}
                    className="mt-5 text-xs flex items-center gap-1.5 transition-colors hover:text-white"
                    style={{ color: "#64748b" }}>
                    <Icon name="ArrowLeft" size={12} /> Назад
                  </button>
                )}
              </div>
            )}

            {quizStep === quizQuestions.length + 1 && quizResult && (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(26,143,255,0.3), rgba(167,139,250,0.3))", border: "1px solid rgba(26,143,255,0.5)" }}>
                  <Icon name={quizResult.icon} fallback="Star" size={28} style={{ color: "var(--neon-blue)" }} />
                </div>
                <div className="text-xs font-semibold mb-2 section-tag mx-auto">Ваше персональное решение</div>
                <h3 className="font-oswald text-2xl font-bold text-white mb-3">{quizResult.title}</h3>
                <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>{quizResult.desc}</p>
                <div className="p-4 rounded-xl mb-6" style={{ background: "rgba(26,143,255,0.08)", border: "1px solid rgba(26,143,255,0.2)" }}>
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <Icon name="CheckCircle" size={16} style={{ color: "var(--neon-blue)" }} />
                    <span className="text-sm font-semibold text-white">Получите детальный расчёт</span>
                  </div>
                  <p className="text-xs" style={{ color: "#64748b" }}>Оставьте заявку — КП подготовим в течение 24 часов</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => scrollTo("contacts")}
                    className="flex-1 py-3 rounded-xl font-bold text-white btn-shimmer text-sm">
                    Получить КП
                  </button>
                  <button onClick={resetQuiz}
                    className="px-5 py-3 rounded-xl text-sm neon-border transition-all hover:text-white"
                    style={{ color: "#64748b" }}>
                    Заново
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 relative" style={{ backgroundColor: "var(--dark-card)" }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div ref={contactRef.ref} className="relative max-w-7xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 gap-16 items-start transition-all duration-1000 ${contactRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-12" style={{ background: "var(--neon-blue)" }} />
                <span className="section-tag">КОНТАКТЫ</span>
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-6">
                ГОТОВЫ К<br />
                <span className="gradient-text">СОТРУДНИЧЕСТВУ?</span>
              </h2>
              <p className="text-base mb-8 leading-relaxed" style={{ color: "#64748b" }}>
                Расскажите о вашем проекте — мы предложим оптимальное техническое решение 
                с подробным расчётом в течение 24 часов.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "+7 (800) 555-35-35", sub: "Бесплатно по России" },
                  { icon: "Mail", label: "info@promtech.ru", sub: "Ответим в течение часа" },
                  { icon: "MapPin", label: "Москва, ул. Промышленная, 14", sub: "Пн–Пт 9:00 – 18:00" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(26,143,255,0.1)", border: "1px solid rgba(26,143,255,0.2)" }}>
                      <Icon name={c.icon} size={17} style={{ color: "var(--neon-blue)" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{c.label}</div>
                      <div className="text-xs" style={{ color: "#64748b" }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 neon-border">
              <h3 className="font-oswald text-xl font-bold text-white mb-6">Оставить заявку</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#64748b" }}>Имя *</label>
                  <input type="text" placeholder="Иван Иванов"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "rgba(26,143,255,0.05)", border: "1px solid var(--dark-border)", color: "#e8eef5" }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#64748b" }}>Телефон *</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "rgba(26,143,255,0.05)", border: "1px solid var(--dark-border)", color: "#e8eef5" }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#64748b" }}>Компания</label>
                  <input type="text" placeholder="ООО «Название»"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "rgba(26,143,255,0.05)", border: "1px solid var(--dark-border)", color: "#e8eef5" }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#64748b" }}>Опишите задачу</label>
                  <textarea rows={4} placeholder="Кратко опишите ваш проект..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{ background: "rgba(26,143,255,0.05)", border: "1px solid var(--dark-border)", color: "#e8eef5" }} />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl font-bold text-white btn-shimmer">
                  Отправить заявку
                  <Icon name="Send" size={16} className="inline ml-2" />
                </button>
                <p className="text-center text-xs" style={{ color: "#475569" }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t" style={{ borderColor: "var(--dark-border)", backgroundColor: "var(--dark-bg)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "var(--neon-blue)" }}>
              <Icon name="Factory" size={14} className="text-white" />
            </div>
            <span className="font-oswald font-bold tracking-wider text-white">ПРОМТЕХ</span>
          </div>
          <p className="text-xs" style={{ color: "#475569" }}>© 2024 ПромТех. Все права защищены.</p>
          <div className="flex gap-5">
            {["Политика","Реквизиты"].map(l => (
              <button key={l} className="text-xs transition-colors hover:text-white" style={{ color: "#475569" }}>{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}