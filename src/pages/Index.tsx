import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ── Images ───────────────────────────────────────────────────────────────────
const HERO_BG  = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/e04968b8-999e-4c94-812a-66bd0ded90d1.jpg";
const LOGO_URL = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/528f5996-8edc-44d4-8206-5de1a1c38adf.png";
const QUIZ_IMG = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/b804bc76-6c00-4b45-a412-fd6862c13609.png";
const P1_A = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/67305f47-00a1-4a07-983d-4f915afe13fd.png";
const P1_B = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/16bd85b5-ba1b-4bcf-818e-20d141de7209.png";
const P1_C = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/b804bc76-6c00-4b45-a412-fd6862c13609.png";
const P2_A = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/ea209454-b909-4daa-af92-c0da34240618.jpg";
const P2_B = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/b804bc76-6c00-4b45-a412-fd6862c13609.png";
const P2_C = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/67305f47-00a1-4a07-983d-4f915afe13fd.png";
const P3_A = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/8e5eb3d6-5c31-48ea-8143-dc4a7452062f.jpg";
const P3_B = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/16bd85b5-ba1b-4bcf-818e-20d141de7209.png";
const P3_C = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/b804bc76-6c00-4b45-a412-fd6862c13609.png";
const P4_A = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/files/ac8a4f07-7780-4883-83be-5083ef582f7b.jpg";
const P4_B = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/67305f47-00a1-4a07-983d-4f915afe13fd.png";
const P4_C = "https://cdn.poehali.dev/projects/571d06ae-01f7-46bc-a2c0-5e7834965168/bucket/16bd85b5-ba1b-4bcf-818e-20d141de7209.png";

const ROTATING_WORDS = ["здания","склады","ангары","цеха","офисы","медицинские здания","магазины","кафе и рестораны","торговые здания","административные здания","автомойки","здания для транспорта","автосервисы","автосалоны","сельхоз здания","фермы","спортивные сооружения"];

const STATS = [
  { num:300, suffix:"+", title:"Реализованных проектов", desc:"Промышленных и коммерческих зданий по всей России" },
  { num:40, suffix:" дней", title:"Срок поставки и монтажа", desc:"Всего за 40 дней мы обеспечиваем поставку и монтаж быстровозводимых зданий SMALL BOX для малого и среднего бизнеса" },
  { num:500, suffix:"+ тыс.кв.м", title:"Запроектировано", desc:"Запроектированных объектов в нашем портфеле и более 300 тыс.кв.м построенных объектов BIG BOX" },
  { num:60, suffix:"+", title:"Многоуровневых паркингов", desc:"Запроектировали паркингов на 50 000 машиномест и построили более 20 паркингов на 9 000 машиномест" },
];

interface Project { id:number; photos:string[]; title:string; dims:string; area:string; locationShort:string; locationFull:string; purpose:string; series:string; roof:string; walls:string; length:string; width:string; height:string; category:string; }
const projects: Project[] = [
  { id:1, photos:[P1_C,P1_A,P1_B], title:"Склад для хранения металлоизделий", dims:"18×30×6 м", area:"540 м²", locationShort:"Ярославская обл., г. Рыбинск", locationFull:"Россия, Ярославская обл., г. Рыбинск", purpose:"Склад и ангар", series:"Здание по серии Р4-1", roof:"Сэндвич-панели — 200 мм", walls:"Сэндвич-панели — 150 мм", length:"30 м", width:"18 м", height:"6 м", category:"Склады и ангары" },
  { id:2, photos:[P2_A,P2_B,P2_C], title:"Производственный цех", dims:"24×48×8 м", area:"1152 м²", locationShort:"Московская обл., г. Подольск", locationFull:"Россия, Московская обл., г. Подольск", purpose:"Производственное здание", series:"Здание по серии П3-2", roof:"Профлист — 150 мм", walls:"Профлист — 120 мм", length:"48 м", width:"24 м", height:"8 м", category:"Производственные здания" },
  { id:3, photos:[P3_A,P3_B,P3_C], title:"Торговый центр", dims:"30×60×6 м", area:"1800 м²", locationShort:"Краснодарский край, г. Сочи", locationFull:"Россия, Краснодарский край, г. Сочи", purpose:"Торговое здание", series:"Здание по серии Т2-1", roof:"Сэндвич-панели — 200 мм", walls:"Сэндвич-панели — 150 мм", length:"60 м", width:"30 м", height:"6 м", category:"Магазины и торговые здания" },
  { id:4, photos:[P4_A,P4_B,P4_C], title:"Автосервис с автомойкой", dims:"12×24×4.8 м", area:"288 м²", locationShort:"Свердловская обл., г. Екатеринбург", locationFull:"Россия, Свердловская обл., г. Екатеринбург", purpose:"Автосервис", series:"Здание по серии А1-1", roof:"Профлист — 120 мм", walls:"Профлист — 100 мм", length:"24 м", width:"12 м", height:"4.8 м", category:"Здания для транспорта" },
];

// ── Snow/Wind zones by city ───────────────────────────────────────────────────
const CITY_ZONES: Record<string, { snow: string; wind: string }> = {
  "Москва":{ snow:"III", wind:"I" }, "Санкт-Петербург":{ snow:"II", wind:"II" }, "Новосибирск":{ snow:"IV", wind:"II" },
  "Екатеринбург":{ snow:"III", wind:"II" }, "Казань":{ snow:"III", wind:"II" }, "Нижний Новгород":{ snow:"III", wind:"I" },
  "Самара":{ snow:"III", wind:"II" }, "Омск":{ snow:"IV", wind:"III" }, "Ростов-на-Дону":{ snow:"II", wind:"III" },
  "Уфа":{ snow:"III", wind:"II" }, "Красноярск":{ snow:"III", wind:"II" }, "Пермь":{ snow:"IV", wind:"II" },
  "Воронеж":{ snow:"III", wind:"II" }, "Волгоград":{ snow:"II", wind:"III" }, "Краснодар":{ snow:"I", wind:"III" },
  "Саратов":{ snow:"III", wind:"III" }, "Тюмень":{ snow:"IV", wind:"II" }, "Томск":{ snow:"IV", wind:"II" },
  "Иркутск":{ snow:"III", wind:"II" }, "Хабаровск":{ snow:"II", wind:"II" }, "Владивосток":{ snow:"II", wind:"III" },
  "Ярославль":{ snow:"III", wind:"I" }, "Барнаул":{ snow:"IV", wind:"III" }, "Ульяновск":{ snow:"III", wind:"II" },
  "Иваново":{ snow:"III", wind:"I" }, "Брянск":{ snow:"III", wind:"I" }, "Тула":{ snow:"III", wind:"I" },
  "Калининград":{ snow:"II", wind:"II" }, "Липецк":{ snow:"III", wind:"II" }, "Курск":{ snow:"III", wind:"II" },
  "Тверь":{ snow:"III", wind:"I" }, "Рязань":{ snow:"III", wind:"I" }, "Чита":{ snow:"II", wind:"II" },
  "Мурманск":{ snow:"IV", wind:"IV" }, "Архангельск":{ snow:"IV", wind:"III" }, "Сочи":{ snow:"I", wind:"II" },
  "Махачкала":{ snow:"I", wind:"IV" }, "Якутск":{ snow:"IV", wind:"I" }, "Норильск":{ snow:"V", wind:"V" },
};
function getCityZones(city: string) {
  return CITY_ZONES[city] ?? { snow: "III", wind: "II" };
}

// ── Cities ────────────────────────────────────────────────────────────────────
const CITIES = [
  "Абаза","Абакан","Абдулино","Абинск","Агидель","Агрыз","Адыгейск","Азнакаево","Азов","Аксай",
  "Алагир","Алапаевск","Алатырь","Алдан","Алейск","Александров","Александровск","Алексеевка","Алексин","Альметьевск",
  "Амурск","Анадырь","Анапа","Ангарск","Анжеро-Судженск","Апатиты","Апшеронск","Армавир","Арсеньев","Артём",
  "Архангельск","Асбест","Астрахань","Ачинск","Аша","Балаково","Балашиха","Балашов","Балтийск","Барнаул",
  "Батайск","Белгород","Белогорск","Белорецк","Белореченск","Бердск","Березники","Берёзовский","Бийск","Биробиджан",
  "Благовещенск","Братск","Брянск","Бугульма","Бузулук","Великий Новгород","Великий Устюг","Владивосток","Владикавказ","Владимир",
  "Волгоград","Волгодонск","Волжский","Вологда","Воркута","Воронеж","Выборг","Вышний Волочёк","Гатчина","Геленджик",
  "Георгиевск","Глазов","Горно-Алтайск","Грозный","Губкин","Гудермес","Дербент","Дзержинск","Димитровград","Дмитров",
  "Долгопрудный","Домодедово","Дубна","Екатеринбург","Елабуга","Елец","Ессентуки","Железногорск","Жуковский","Заречный",
  "Зеленоград","Зеленодольск","Златоуст","Иваново","Ижевск","Иркутск","Истра","Ишим","Ишимбай","Йошкар-Ола",
  "Казань","Калининград","Калуга","Каменск-Уральский","Каменск-Шахтинский","Камышин","Кемерово","Керчь","Киров","Кирово-Чепецк",
  "Кисловодск","Клин","Коломна","Комсомольск-на-Амуре","Королёв","Кострома","Краснодар","Красногорск","Красноярск","Кропоткин",
  "Крымск","Кстово","Курган","Курск","Кызыл","Лабытнанги","Ленинск-Кузнецкий","Липецк","Лобня","Люберцы",
  "Магадан","Магнитогорск","Майкоп","Махачкала","Мегион","Миасс","Минеральные Воды","Минусинск","Москва","Мурманск",
  "Муром","Мытищи","Набережные Челны","Надым","Нальчик","Находка","Невинномысск","Нефтекамск","Нефтеюганск","Нижневартовск",
  "Нижнекамск","Нижний Новгород","Нижний Тагил","Новокузнецк","Новокуйбышевск","Новомосковск","Новороссийск","Новосибирск","Новотроицк","Новочебоксарск",
  "Новочеркасск","Новый Уренгой","Ногинск","Норильск","Ноябрьск","Обнинск","Одинцово","Омск","Орёл","Оренбург",
  "Орск","Пенза","Первоуральск","Петрозаводск","Петропавловск-Камчатский","Подольск","Прокопьевск","Псков","Пушкино","Пятигорск",
  "Раменское","Реутов","Рубцовск","Рязань","Салават","Самара","Саранск","Саратов","Севастополь","Серпухов",
  "Симферополь","Смоленск","Сочи","Ставрополь","Старый Оскол","Стерлитамак","Сургут","Сыктывкар","Таганрог","Тамбов",
  "Тверь","Тольятти","Томск","Тула","Тюмень","Улан-Удэ","Ульяновск","Уссурийск","Уфа","Ухта",
  "Хабаровск","Ханты-Мансийск","Хасавюрт","Химки","Чебоксары","Челябинск","Черкесск","Череповец","Чита","Шахты","Щёлково","Электросталь","Энгельс",
  "Южно-Сахалинск","Якутск","Ярославль"
];

const STEP1_OPTIONS = [
  { label:"Производственные и промышленные здания", icon:"Factory" },
  { label:"Склады и ангары", icon:"Package" },
  { label:"Магазины и торговые здания", icon:"ShoppingBag" },
  { label:"Здания для транспорта", icon:"Car" },
  { label:"Сельскохозяйственные здания", icon:"Leaf" },
  { label:"Другое", icon:"MoreHorizontal" },
];
const LENGTHS = [24,30,36,42,48,54];
const WIDTHS  = [12,18,24];
const HEIGHTS = [3.6,4.8,6,7.2,8.4,9.6,10.8,12];
const CLADDING_OPTIONS = ["Профилированный лист","Сэндвич панели"];
const CRANE_OPTIONS    = ["Да","Нет"];
const EXTRA_SERVICES   = ["Подбор земельного участка","Оценка пригодности участка для реализации проекта","Проектирование и получение разрешения на строительство","Поставка комплекта здания","Доставка комплекта здания до стройплощадки","Монтаж здания","Сдача в эксплуатацию"];

// ── Validation helpers ────────────────────────────────────────────────────────
function validateName(v: string) {
  if (!v.trim()) return "Введите имя";
  if (/\d/.test(v)) return "Имя не должно содержать цифры";
  if (v.trim().length < 2) return "Слишком короткое имя";
  return "";
}
function validatePhone(v: string) {
  const digits = v.replace(/\D/g,"");
  if (!digits) return "Введите номер телефона";
  if (digits.length < 11) return "Введите полный номер телефона";
  return "";
}
function validateEmail(v: string) {
  if (!v.trim()) return "Введите email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Некорректный email";
  return "";
}

// ── Phone mask ────────────────────────────────────────────────────────────────
function phoneMask(raw: string): string {
  const digits = raw.replace(/\D/g,"").slice(0,11);
  if (!digits) return "";
  let r = "+7";
  if (digits.length > 1) r += " (" + digits.slice(1,4);
  if (digits.length >= 4) r += ") " + digits.slice(4,7);
  if (digits.length >= 7) r += "-" + digits.slice(7,9);
  if (digits.length >= 9) r += "-" + digits.slice(9,11);
  return r;
}

// ── Counter hook ──────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1200, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

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

function StatCard({ stat, started, delay, isLast }: { stat: typeof STATS[0]; started: boolean; delay: number; isLast?: boolean }) {
  const val = useCounter(stat.num, 1400, started);
  return (
    <div className="transition-all duration-700" style={{ transitionDelay:`${delay}ms`, opacity:started?1:0, transform:started?"none":"translateY(12px)" }}>
      <div className="flex items-baseline gap-1 mb-0.5">
        <span style={{ fontFamily:"'Abril Fatface',serif", fontSize:"clamp(1.5rem,2.5vw,2rem)", color:"var(--orange)", lineHeight:1 }}>{val}{stat.suffix}</span>
      </div>
      <div className="font-semibold text-gray-900 text-xs leading-snug mb-0.5">{stat.title}</div>
      <div className="text-gray-600 text-xs leading-relaxed" style={{ fontSize:"11px" }}>{stat.desc}</div>
      {!isLast && <div className="mt-3 border-b border-gray-200" />}
    </div>
  );
}

function ProjectCard({ p, onClick }: { p: Project; onClick: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <div className="project-card bg-white rounded-xl overflow-hidden border border-gray-200" onClick={onClick}>
      <div className="relative" style={{ height:"160px" }}>
        <img src={p.photos[imgIdx]} alt={p.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {p.photos.map((_,i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setImgIdx(i); }}
              className="w-2 h-2 rounded-full border border-white/80 transition-colors"
              style={{ background:imgIdx===i?"#fff":"rgba(255,255,255,0.35)" }} />
          ))}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <div className="font-bold text-gray-900 text-sm leading-snug">{p.title}</div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Icon name="Ruler" size={11} className="shrink-0" style={{ color:"var(--orange)" }} />
          <span>Размеры: {p.dims} / {p.area}</span>
        </div>
        <div className="flex items-start gap-1.5 text-xs text-gray-400">
          <Icon name="MapPin" size={11} className="mt-0.5 shrink-0" style={{ color:"var(--orange)" }} />
          <span>{p.locationShort}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Icon name="Building2" size={11} className="shrink-0" style={{ color:"var(--orange)" }} />
          <span className="font-semibold" style={{ color:"var(--orange)" }}>{p.purpose}</span>
        </div>
      </div>
    </div>
  );
}

// ── FieldError ────────────────────────────────────────────────────────────────
function FieldError({ msg }: { msg: string }) {
  if (!msg) return null;
  return <p className="text-red-500 text-xs mt-1">{msg}</p>;
}

// ── CitySearch ────────────────────────────────────────────────────────────────
function CitySearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const filtered = query.length >= 2 ? CITIES.filter(c => c.toLowerCase().startsWith(query.toLowerCase())).slice(0,8) : [];
  return (
    <div className="relative">
      <input type="text" placeholder="Начните вводить название города..." value={query}
        onChange={e => { setQuery(e.target.value); onChange(""); setOpen(true); }}
        onFocus={() => setOpen(true)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-orange-300 transition-colors" />
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 mt-1 overflow-hidden">
          {filtered.map(c => (
            <button key={c} className="w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
              onClick={() => { setQuery(c); onChange(c); setOpen(false); }}>{c}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── QuizFullscreen ────────────────────────────────────────────────────────────
interface QuizState {
  purpose: string; city: string;
  length: number; width: number; height: number;
  customDims: string;
  cladding: string; crane: string; extras: string[];
  name: string; phone: string; email: string;
  agreePersonal: boolean; agreePromo: boolean;
}

const PRICE_API_URL = "https://functions.poehali.dev/88524db3-a08f-485b-b913-ae55621e6dc4";

const HEIGHT_TO_PANELS: Record<number, number> = {
  3.6: 4, 4.8: 5, 6.0: 6, 7.2: 7, 8.4: 8, 9.6: 9, 10.8: 10, 12.0: 11,
};

function quizToPriceParams(state: QuizState, zones: { snow: string; wind: string }) {
  const wallMm  = state.cladding === "Сэндвич панели" ? 150 : 100;
  const roofMm  = state.cladding === "Сэндвич панели" ? 150 : 100;
  const panels  = HEIGHT_TO_PANELS[state.height] ?? 4;
  return new URLSearchParams({
    wall_mm:  String(wallMm),
    roof_mm:  String(roofMm),
    span:     String(state.width),
    length:   String(state.length),
    panels:   String(panels),
    snow:     zones.snow,
    wind:     zones.wind,
    locality: "B",
  }).toString();
}

function QuizFullscreen({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const TOTAL = 6;
  const [state, setState] = useState<QuizState>({
    purpose:"", city:"", length:24, width:12, height:3.6, customDims:"",
    cladding:"Профилированный лист", crane:"Нет",
    extras:["Поставка комплекта здания"],
    name:"", phone:"", email:"", agreePersonal:true, agreePromo:false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name:"", phone:"", email:"" });
  const [touched, setTouched] = useState({ name:false, phone:false, email:false });
  const [price, setPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  // Вычисляем площадь — если заполнен customDims, парсим из него
  let length = state.length, width = state.width, height = state.height;
  if (state.customDims.trim()) {
    const parts = state.customDims.replace(/[хx×*\s]+/gi," ").trim().split(/\s+/);
    if (parts.length >= 1 && !isNaN(+parts[0])) length = +parts[0];
    if (parts.length >= 2 && !isNaN(+parts[1])) width = +parts[1];
    if (parts.length >= 3 && !isNaN(+parts[2])) height = +parts[2];
  }
  const area = length * width;
  const zones = getCityZones(state.city);
  const pricePerSqm = price && area > 0 ? Math.round(price / area) : 0;

  async function fetchPrice() {
    setPriceLoading(true);
    try {
      const qs = quizToPriceParams(state, zones);
      const res = await fetch(`${PRICE_API_URL}?${qs}`);
      const data = await res.json();
      if (data.price) setPrice(data.price);
    } catch {
      // оставляем price = null
    } finally {
      setPriceLoading(false);
    }
  }

  const validate = () => {
    const e = { name:validateName(state.name), phone:validatePhone(state.phone), email:validateEmail(state.email) };
    setErrors(e);
    setTouched({ name:true, phone:true, email:true });
    return !e.name && !e.phone && !e.email && state.agreePersonal;
  };

  const canNext = () => {
    if (step===1) return !!state.purpose;
    if (step===2) return !!state.city;
    return true;
  };

  const dimBtn = (val: number, selected: number, onClick: () => void) => (
    <button key={val} onClick={onClick}
      className="rounded-xl py-2.5 text-sm font-medium transition-all border"
      style={{ borderColor:selected===val?"var(--orange)":"#e5e5e5", background:selected===val?"#fff3ee":"#fff", color:selected===val?"var(--orange)":"#374151" }}>
      {val}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="logo" className="h-8 w-auto object-contain" />
          <span className="text-xs text-gray-400 hidden sm:block">Расчёт стоимости здания</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold" style={{ color:"var(--orange)" }}>Шаг {step} из {TOTAL}</span>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <Icon name="X" size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="h-1 bg-gray-100 shrink-0">
        <div className="quiz-bar h-full" style={{ width:`${Math.round((step/TOTAL)*100)}%` }} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-8 md:py-10">

          {/* STEP 1 */}
          {step===1 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Выберите назначение здания</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STEP1_OPTIONS.map(opt => (
                  <button key={opt.label} onClick={() => setState(s => ({ ...s, purpose:opt.label }))}
                    className="rounded-xl p-4 text-left flex items-center gap-3 border-2 transition-all"
                    style={{ borderColor:state.purpose===opt.label?"var(--orange)":"#e5e5e5", background:state.purpose===opt.label?"#fff3ee":"#fff" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background:"#fff3ee" }}>
                      <Icon name={opt.icon} size={18} style={{ color:"var(--orange)" }} />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step===2 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">Регион строительства</h2>
              <p className="text-sm text-gray-400 text-center mb-6">Начните вводить название вашего города</p>
              <CitySearch value={state.city} onChange={v => setState(s => ({ ...s, city:v }))} />
              {state.city && (
                <div className="mt-4 flex items-center gap-2 text-sm" style={{ color:"var(--orange)" }}>
                  <Icon name="MapPin" size={14} />
                  Выбран: <strong>{state.city}</strong>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — Параметры */}
          {step===3 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Параметры здания</h2>

              {/* Свой вариант — одно поле */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Свой вариант (Длина × Ширина × Высота, м)</label>
                <input type="text" placeholder="Например: 36 × 18 × 6"
                  value={state.customDims}
                  onChange={e => setState(s => ({ ...s, customDims:e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors" />
                {state.customDims && (
                  <p className="text-xs mt-1" style={{ color:"var(--orange)" }}>
                    Распознано: {length} × {width} × {height} м
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 border-b border-gray-200" />
                <span className="text-xs text-gray-400 shrink-0">или выберите из списка</span>
                <div className="flex-1 border-b border-gray-200" />
              </div>

              {/* Таблицы */}
              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
                <div>
                  <div className="text-xs text-gray-400 text-center mb-2">Длина, м</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {LENGTHS.map(v => dimBtn(v, state.customDims?-1:state.length, () => setState(s => ({ ...s, length:v, customDims:"" }))))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 text-center mb-2">Ширина, м</div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {WIDTHS.map(v => dimBtn(v, state.customDims?-1:state.width, () => setState(s => ({ ...s, width:v, customDims:"" }))))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 text-center mb-2">Высота, м</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {HEIGHTS.map(v => dimBtn(v, state.customDims?-1:state.height, () => setState(s => ({ ...s, height:v, customDims:"" }))))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ background:"#fff3ee" }}>
                <div className="text-sm text-gray-500 mb-1">Площадь здания</div>
                <div style={{ fontFamily:"'Abril Fatface',serif", fontSize:"2.2rem", color:"var(--orange)" }}>{area} м²</div>
                <div className="text-xs text-gray-400 mt-1">{length} × {width} м</div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step===4 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Варианты комплектаций</h2>
              <div className="mb-6">
                <div className="text-sm font-bold text-gray-700 mb-3">Тип стен и кровли:</div>
                <div className="grid grid-cols-2 gap-3">
                  {CLADDING_OPTIONS.map(opt => (
                    <button key={opt} onClick={() => setState(s => ({ ...s, cladding:opt }))}
                      className="rounded-xl py-3.5 text-sm font-medium border-2 transition-all"
                      style={{ borderColor:state.cladding===opt?"var(--orange)":"#e5e5e5", background:state.cladding===opt?"#fff3ee":"#fff", color:state.cladding===opt?"var(--orange)":"#374151" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-700 mb-3">Наличие кран-балки 5 тонн:</div>
                <div className="grid grid-cols-2 gap-3">
                  {CRANE_OPTIONS.map(opt => (
                    <button key={opt} onClick={() => setState(s => ({ ...s, crane:opt }))}
                      className="rounded-xl py-3.5 text-sm font-medium border-2 transition-all"
                      style={{ borderColor:state.crane===opt?"var(--orange)":"#e5e5e5", background:state.crane===opt?"#fff3ee":"#fff", color:state.crane===opt?"var(--orange)":"#374151" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step===5 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Дополнительные услуги</h2>
              <div className="space-y-2">
                {EXTRA_SERVICES.map(svc => {
                  const checked = state.extras.includes(svc);
                  return (
                    <button key={svc} onClick={() => setState(s => ({ ...s, extras:checked?s.extras.filter(x=>x!==svc):[...s.extras,svc] }))}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all"
                        style={{ background:checked?"var(--orange)":"transparent", border:checked?"none":"2px solid #d1d5db" }}>
                        {checked && <Icon name="Check" size={12} className="text-white" />}
                      </div>
                      {svc}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step===6 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">Узнать стоимость здания</h2>
              <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
                Заполните форму и получите предварительный расчёт стоимости здания прямо сейчас<br className="hidden md:block" />
                + эскиз в течение 1 часа. <span className="font-semibold text-gray-700">Это бесплатно и ни к чему не обязывает.</span>
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left */}
                <div>
                  <div className="rounded-xl overflow-hidden border border-gray-200 mb-4" style={{ height:"150px" }}>
                    <img src={QUIZ_IMG} alt="здание" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Характеристики</div>
                  <div className="space-y-1.5 text-sm">
                    {[
                      ["Назначение", state.purpose||"—"],
                      ["Площадь", `${area} м²`],
                      ["Длина × Ширина × Высота", `${length} × ${width} × ${height} м`],
                      ["Тип стен", state.cladding],
                      ["Кран-балка", state.crane],
                      ...(state.city ? [["Снеговой район", `${zones.snow}`], ["Ветровой район", `${zones.wind}`]] : []),
                    ].map(([k,v]) => (
                      <div key={k} className="flex justify-between gap-2">
                        <span className="text-gray-400 text-xs shrink-0">{k}</span>
                        <span className="font-semibold text-gray-900 text-right text-xs">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price block */}
                  <div className="mt-4 rounded-xl p-4 text-center relative overflow-hidden" style={{ background:"#fff3ee" }}>
                    <div className="text-xs text-gray-500 mb-1">Стоимость здания</div>
                    {submitted ? (
                      priceLoading ? (
                        <div className="text-sm text-gray-400 py-2">Считаем стоимость…</div>
                      ) : price !== null ? (
                        <>
                          <div style={{ fontFamily:"'Abril Fatface',serif", fontSize:"1.8rem", color:"var(--orange)" }}>
                            {new Intl.NumberFormat("ru-RU").format(Math.round(price))} ₽
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{new Intl.NumberFormat("ru-RU").format(pricePerSqm)} ₽ / кв.м · {area} м²</div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-400 py-2">Уточним стоимость при звонке</div>
                      )
                    ) : (
                      <>
                        <div className="font-bold text-2xl blur-sm select-none" style={{ color:"var(--orange)" }}>
                          — ₽
                        </div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                          <Icon name="Lock" size={11} /> Заполните форму, чтобы узнать стоимость
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right: form */}
                <div>
                  {submitted ? (
                    <div className="rounded-2xl p-6 text-center" style={{ background:"#f9f9f9", border:"1px solid #e5e5e5" }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background:"#fff3ee" }}>
                        <Icon name="Gift" size={22} style={{ color:"var(--orange)" }} />
                      </div>
                      <div className="font-bold text-gray-900 mb-1">Благодарим за интерес к решениям EVRAZ STEEL BOX!</div>
                      <div className="text-sm text-gray-500 mb-3 leading-relaxed">Запрос успешно отправлен. В ближайшее время мы с вами свяжемся, чтобы обсудить все детали.</div>
                      <div className="flex items-center justify-center gap-2 text-sm font-semibold mb-3" style={{ color:"var(--orange)" }}>
                        <Icon name="Gift" size={16} />
                        Вам подарок — эскиз в течение 1 часа!
                      </div>
                      <a href="https://evrazsteelbox.ru" target="_blank" rel="noreferrer"
                        className="text-xs underline" style={{ color:"var(--orange)" }}>
                        Каталог готовых решений Evraz Steel Box →
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <div className={`flex items-center gap-2 border-b pb-2 transition-colors ${touched.name && errors.name ? "border-red-400":"border-gray-200"}`}>
                          <Icon name="User" size={16} className="text-gray-300 shrink-0" />
                          <input type="text" placeholder="Ваше имя *" value={state.name}
                            onChange={e => { setState(s => ({ ...s, name:e.target.value })); if (touched.name) setErrors(err => ({ ...err, name:validateName(e.target.value) })); }}
                            onBlur={() => { setTouched(t => ({ ...t, name:true })); setErrors(err => ({ ...err, name:validateName(state.name) })); }}
                            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-300" />
                        </div>
                        <FieldError msg={touched.name?errors.name:""} />
                      </div>
                      <div>
                        <div className={`flex items-center gap-2 border-b pb-2 transition-colors ${touched.phone && errors.phone ? "border-red-400":"border-gray-200"}`}>
                          <Icon name="Phone" size={16} className="text-gray-300 shrink-0" />
                          <input type="tel" placeholder="+7 (___) ___-__-__ *" value={state.phone}
                            onChange={e => { const v=phoneMask(e.target.value); setState(s => ({ ...s, phone:v })); if (touched.phone) setErrors(err => ({ ...err, phone:validatePhone(v) })); }}
                            onBlur={() => { setTouched(t => ({ ...t, phone:true })); setErrors(err => ({ ...err, phone:validatePhone(state.phone) })); }}
                            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-300" />
                        </div>
                        <FieldError msg={touched.phone?errors.phone:""} />
                      </div>
                      <div>
                        <div className={`flex items-center gap-2 border-b pb-2 transition-colors ${touched.email && errors.email ? "border-red-400":"border-gray-200"}`}>
                          <Icon name="Mail" size={16} className="text-gray-300 shrink-0" />
                          <input type="email" placeholder="Email *" value={state.email}
                            onChange={e => { setState(s => ({ ...s, email:e.target.value })); if (touched.email) setErrors(err => ({ ...err, email:validateEmail(e.target.value) })); }}
                            onBlur={() => { setTouched(t => ({ ...t, email:true })); setErrors(err => ({ ...err, email:validateEmail(state.email) })); }}
                            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-300" />
                        </div>
                        <FieldError msg={touched.email?errors.email:""} />
                      </div>
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <div onClick={() => setState(s => ({ ...s, agreePersonal:!s.agreePersonal }))}
                          className="w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 transition-all"
                          style={{ background:state.agreePersonal?"var(--orange)":"transparent", border:state.agreePersonal?"none":"2px solid #d1d5db" }}>
                          {state.agreePersonal && <Icon name="Check" size={12} className="text-white" />}
                        </div>
                        <span className="text-xs text-gray-500 leading-relaxed">
                          Я согласен на{" "}
                          <a href="https://evrazsteelbox.ru/politika_v_oblasti_obrabotki_personalnyh_dannyh/" target="_blank" rel="noreferrer" className="underline" style={{ color:"var(--orange)" }}>обработку персональных данных</a>
                        </span>
                      </label>
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <div onClick={() => setState(s => ({ ...s, agreePromo:!s.agreePromo }))}
                          className="w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 transition-all"
                          style={{ background:state.agreePromo?"var(--orange)":"transparent", border:state.agreePromo?"none":"2px solid #d1d5db" }}>
                          {state.agreePromo && <Icon name="Check" size={12} className="text-white" />}
                        </div>
                        <span className="text-xs text-gray-500 leading-relaxed">Согласен на получение информационных и рекламных сообщений (необязательно)</span>
                      </label>
                      <button
                        onClick={() => { if (validate()) { setSubmitted(true); fetchPrice(); } }}
                        className="btn-orange w-full py-4 rounded-xl text-sm mt-1">
                        УЗНАТЬ СТОИМОСТЬ →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer nav */}
      <div className="border-t border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between shrink-0 bg-white">
        {step > 1 ? (
          <button onClick={() => setStep(s => s-1)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
            <Icon name="ArrowLeft" size={16} /> Назад
          </button>
        ) : <div />}
        {step < TOTAL ? (
          <button onClick={() => { if (canNext()) setStep(s => s+1); }}
            disabled={!canNext()}
            className="btn-orange px-6 py-2.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed">
            Далее →
          </button>
        ) : (
          !submitted && (
            <button onClick={() => { if (validate()) { setSubmitted(true); fetchPrice(); } }}
              className="btn-orange px-6 py-2.5 rounded-xl text-sm">
              Узнать стоимость →
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ── Thank You page ────────────────────────────────────────────────────────────
function ThankYouPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background:"#fff3ee" }}>
          <Icon name="CheckCircle" size={40} style={{ color:"var(--orange)" }} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Спасибо за заявку!</h1>
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          Ваш запрос успешно принят. Наш менеджер свяжется с вами в течение <strong className="text-gray-700">15 минут</strong> в рабочее время и ответит на все вопросы.
        </p>
        <div className="rounded-2xl p-5 mb-6 text-left" style={{ background:"#fff3ee", border:"1px solid #ffe0d0" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background:"var(--orange)" }}>
              <Icon name="Gift" size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">Вам подарок!</div>
              <div className="text-xs text-gray-500">Эскиз вашего здания — в течение 1 часа, бесплатно</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Пока вы ждёте звонка, загляните на наш сайт — там более <strong>300 реализованных проектов</strong> со всей России.
          </p>
        </div>
        <a href="https://evrazsteelbox.ru" target="_blank" rel="noreferrer"
          className="btn-orange inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm mb-4">
          Смотреть проекты на сайте →
        </a>
        <br />
        <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600 transition-colors mt-2">
          ← Вернуться на главную
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [cbName, setCbName] = useState(""); const [cbPhone, setCbPhone] = useState(""); const [cbSent, setCbSent] = useState(false);
  const [cbErrors, setCbErrors] = useState({ name:"", phone:"" });
  const [cbTouched, setCbTouched] = useState({ name:false, phone:false });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [wordIdx, setWordIdx] = useState(0); const [wordKey, setWordKey] = useState(0);
  const [heroStarted, setHeroStarted] = useState(false);
  const heroVal = useCounter(40, 1600, heroStarted);

  // Contact form
  const [cfName, setCfName] = useState(""); const [cfPhone, setCfPhone] = useState("");
  const [cfEmail, setCfEmail] = useState(""); const [cfMsg, setCfMsg] = useState("");
  const [cfErrors, setCfErrors] = useState({ name:"", phone:"", email:"" });
  const [cfTouched, setCfTouched] = useState({ name:false, phone:false, email:false });

  useEffect(() => { setTimeout(() => setHeroStarted(true), 300); }, []);
  useEffect(() => {
    const t = setInterval(() => { setWordIdx(i => (i+1)%ROTATING_WORDS.length); setWordKey(k => k+1); }, 2000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    document.body.style.overflow = (activeProject||callbackOpen||mobileMenuOpen||quizOpen||showThankYou) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject, callbackOpen, mobileMenuOpen, quizOpen, showThankYou]);

  const heroRef  = useInView(0.05);
  const statsRef = useInView(0.1);
  const portRef  = useInView(0.1);
  const contRef  = useInView(0.1);

  const openCallback = () => { setCallbackOpen(true); setCbSent(false); setCbName(""); setCbPhone(""); setCbErrors({ name:"", phone:"" }); setCbTouched({ name:false, phone:false }); };

  const submitCallback = () => {
    const e = { name:validateName(cbName), phone:validatePhone(cbPhone) };
    setCbErrors(e); setCbTouched({ name:true, phone:true });
    if (!e.name && !e.phone) setCbSent(true);
  };

  const submitContactForm = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = { name:validateName(cfName), phone:validatePhone(cfPhone), email:validateEmail(cfEmail) };
    setCfErrors(e); setCfTouched({ name:true, phone:true, email:true });
    if (!e.name && !e.phone && !e.email) { setShowThankYou(true); }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily:"'Golos Text',sans-serif" }}>

      {showThankYou && <ThankYouPage onBack={() => setShowThankYou(false)} />}
      {quizOpen && <QuizFullscreen onClose={() => setQuizOpen(false)} />}

      {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <img src={LOGO_URL} alt="EVRAZ STEEL BOX" className="h-10 w-auto object-contain shrink-0" />
            <div className="hidden lg:block text-gray-500" style={{ fontSize:"9.5px", lineHeight:"1.55" }}>
              <span className="block whitespace-nowrap">Российский разработчик и поставщик</span>
              <span className="block whitespace-nowrap">быстровозводимых зданий</span>
              <span className="block whitespace-nowrap">на металлическом каркасе</span>
            </div>
          </div>
          <div className="hidden xl:block text-center shrink-0">
            <div className="text-xs font-semibold text-gray-700">Время и график работы</div>
            <div className="text-xs text-gray-500">Пн – Пт &nbsp; 09:30 – 18:00</div>
          </div>
          <div className="hidden md:block text-right shrink-0">
            <div className="font-bold text-base text-gray-900 leading-tight">+7 (800) 302-65-29</div>
            <div className="text-xs" style={{ color:"var(--orange)" }}>sales.box2@evrazsteel.ru</div>
          </div>
          <a href="tel:+78003026529" className="md:hidden font-bold text-sm text-gray-900 leading-tight truncate">+7 (800) 302-65-29</a>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a href="https://t.me/EvrazSmallBox_bot" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded text-white text-sm font-semibold" style={{ background:"#2AABEE" }}>
              <Icon name="Send" size={14} /> Telegram
            </a>
            <button onClick={openCallback} className="px-3 py-2 rounded border border-gray-300 text-sm font-semibold text-gray-700 hover:border-gray-500 transition-colors whitespace-nowrap">
              Обратный звонок
            </button>
          </div>
          <button className="md:hidden p-2 rounded border border-gray-200 shrink-0" onClick={() => setMobileMenuOpen(v => !v)}>
            <Icon name={mobileMenuOpen?"X":"Menu"} size={20} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative ml-auto w-72 max-w-full bg-white h-full flex flex-col shadow-2xl animate-modal-in overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <img src={LOGO_URL} alt="EVRAZ STEEL BOX" className="h-9 w-auto object-contain" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded border border-gray-200"><Icon name="X" size={18} /></button>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">Российский разработчик и поставщик быстровозводимых зданий на металлическом каркасе</p>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-1">Время и график работы</div>
              <div className="text-sm text-gray-700">Пн – Пт &nbsp; 09:30 – 18:00</div>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <a href="tel:+78003026529" className="font-bold text-lg text-gray-900 block">+7 (800) 302-65-29</a>
              <div className="text-xs mt-0.5" style={{ color:"var(--orange)" }}>sales.box2@evrazsteel.ru</div>
            </div>
            <div className="px-5 py-5 flex flex-col gap-3">
              <button onClick={() => { setMobileMenuOpen(false); openCallback(); }} className="btn-orange w-full py-3 rounded text-sm">Обратный звонок</button>
              <a href="https://t.me/EvrazSmallBox_bot" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded text-white text-sm font-semibold" style={{ background:"#2AABEE" }}>
                <Icon name="Send" size={14} /> Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="bg" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0" style={{ background:"rgba(255,255,255,0.88)" }} />
        </div>
        <div ref={heroRef.ref} className="relative max-w-7xl mx-auto px-4 py-8 md:py-16">
          <div className="grid md:grid-cols-[1fr_300px] gap-6 md:gap-12 items-start">
            <div className={`transition-all duration-700 ${heroRef.inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
              <h1 className="font-bold leading-tight text-gray-900 mb-4" style={{ fontSize:"clamp(1.2rem,3.5vw,2.2rem)" }}>
                <span className="block">Спроектируем, изготовим и построим</span>
                <span className="block" style={{ color:"var(--orange)" }}>
                  <span>быстровозводимые&nbsp;</span>
                  <span className="inline-block" style={{ minWidth:"20ch" }}>
                    <span key={wordKey} className="animate-word-flip inline-block">{ROTATING_WORDS[wordIdx]}</span>
                  </span>
                </span>
                <span className="block text-gray-900">под ключ за <span style={{ color:"var(--orange)" }}>{heroVal}</span> дней</span>
              </h1>
              <p className="text-gray-700 mb-5 text-sm md:text-base leading-relaxed">
                Пройдите тест за <strong>1 минуту</strong> и получите{" "}
                <span className="font-bold" style={{ color:"var(--orange)" }}>реальную</span>{" "}
                стоимость здания,<span className="hidden md:inline"><br /></span>{" "}полноценный расчёт + эскиз в течение 1 часа
              </p>
              <button onClick={() => setQuizOpen(true)} className="btn-orange px-6 py-3.5 rounded text-sm inline-flex items-center gap-2">
                РАССЧИТАТЬ СТОИМОСТЬ →
              </button>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                <Icon name="Info" size={12} />
                стоимость вы увидите сразу после заполнения формы — без обмана
              </p>
            </div>
            <div ref={statsRef.ref} className="flex flex-col" style={{ gap:0 }}>
              {STATS.map((s,i) => <StatCard key={i} stat={s} started={statsRef.inView} delay={i*120} isLast={i===STATS.length-1} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PORTFOLIO ════════════════════════════════════════════════════════ */}
      <section id="portfolio" className="py-12 md:py-16" style={{ background:"#f4f4f4" }}>
        <div ref={portRef.ref} className="max-w-7xl mx-auto px-4">
          <h2 className={`text-xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 transition-all duration-700 ${portRef.inView?"opacity-100":"opacity-0"}`}>
            Примеры реализованных проектов:
          </h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-100 ${portRef.inView?"opacity-100":"opacity-0"}`}>
            {projects.map(p => <ProjectCard key={p.id} p={p} onClick={() => { setActiveProject(p); setModalImgIdx(0); }} />)}
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ═════════════════════════════════════════════════════════ */}
      <section id="contacts" className="py-12 md:py-16 bg-white">
        <div ref={contRef.ref} className="max-w-7xl mx-auto px-4">
          <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-start transition-all duration-700 ${contRef.inView?"opacity-100":"opacity-0"}`}>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
              <div className="space-y-5">
                {[
                  { icon:"Phone", label:"+7 (800) 302-65-29", sub:"Бесплатно по России, Пн–Пт 9:30–18:00" },
                  { icon:"Mail",  label:"sales.box2@evrazsteel.ru", sub:"Ответим в течение часа" },
                  { icon:"MapPin",label:"Москва, Пресненская наб., 12", sub:"Московский офис" },
                ].map((c,i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background:"#fff3ee" }}>
                      <Icon name={c.icon} size={18} style={{ color:"var(--orange)" }} />
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
              <form className="space-y-3 md:space-y-4" onSubmit={submitContactForm}>
                <div>
                  <input type="text" placeholder="Ваше имя *" required value={cfName}
                    onChange={e => { setCfName(e.target.value); if (cfTouched.name) setCfErrors(err => ({ ...err, name:validateName(e.target.value) })); }}
                    onBlur={() => { setCfTouched(t => ({ ...t, name:true })); setCfErrors(err => ({ ...err, name:validateName(cfName) })); }}
                    className={`w-full border rounded px-4 py-3 text-sm outline-none transition-colors ${cfTouched.name&&cfErrors.name?"border-red-400":"border-gray-200 focus:border-orange-400"}`} />
                  <FieldError msg={cfTouched.name?cfErrors.name:""} />
                </div>
                <div>
                  <input type="tel" placeholder="+7 (___) ___-__-__ *" required value={cfPhone}
                    onChange={e => { const v=phoneMask(e.target.value); setCfPhone(v); if (cfTouched.phone) setCfErrors(err => ({ ...err, phone:validatePhone(v) })); }}
                    onBlur={() => { setCfTouched(t => ({ ...t, phone:true })); setCfErrors(err => ({ ...err, phone:validatePhone(cfPhone) })); }}
                    className={`w-full border rounded px-4 py-3 text-sm outline-none transition-colors ${cfTouched.phone&&cfErrors.phone?"border-red-400":"border-gray-200 focus:border-orange-400"}`} />
                  <FieldError msg={cfTouched.phone?cfErrors.phone:""} />
                </div>
                <div>
                  <input type="email" placeholder="Email *" required value={cfEmail}
                    onChange={e => { setCfEmail(e.target.value); if (cfTouched.email) setCfErrors(err => ({ ...err, email:validateEmail(e.target.value) })); }}
                    onBlur={() => { setCfTouched(t => ({ ...t, email:true })); setCfErrors(err => ({ ...err, email:validateEmail(cfEmail) })); }}
                    className={`w-full border rounded px-4 py-3 text-sm outline-none transition-colors ${cfTouched.email&&cfErrors.email?"border-red-400":"border-gray-200 focus:border-orange-400"}`} />
                  <FieldError msg={cfTouched.email?cfErrors.email:""} />
                </div>
                <textarea rows={3} placeholder="Опишите вашу задачу" value={cfMsg} onChange={e => setCfMsg(e.target.value)}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-orange-400 transition-colors resize-none" />
                <button type="submit" className="btn-orange w-full py-3.5 rounded text-sm">ОТПРАВИТЬ ЗАЯВКУ →</button>
                <p className="text-center text-xs text-gray-400">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="https://evrazsteelbox.ru/politika_v_oblasti_obrabotki_personalnyh_dannyh/" target="_blank" rel="noreferrer" className="underline" style={{ color:"var(--orange)" }}>политикой конфиденциальности</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROJECT MODAL ════════════════════════════════════════════════════ */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 modal-backdrop animate-fade-in" onClick={() => setActiveProject(null)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-xl overflow-hidden animate-modal-in max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="relative bg-gray-100" style={{ height:"220px" }}>
              <img src={activeProject.photos[modalImgIdx]} alt={activeProject.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {activeProject.photos.map((_,i) => (
                  <button key={i} onClick={() => setModalImgIdx(i)} className="w-2.5 h-2.5 rounded-full border border-white transition-colors"
                    style={{ background:modalImgIdx===i?"#fff":"rgba(255,255,255,0.4)" }} />
                ))}
              </div>
              <button className="absolute right-10 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow"
                onClick={() => setModalImgIdx(i => (i+1)%activeProject.photos.length)}>
                <Icon name="ChevronRight" size={18} className="text-gray-700" />
              </button>
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow" onClick={() => setActiveProject(null)}>
                <Icon name="X" size={16} className="text-gray-700" />
              </button>
            </div>
            <div className="p-4 md:p-6">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Карточка проекта</div>
              <h3 className="text-base md:text-xl font-bold text-gray-900 mb-4">{activeProject.title}</h3>
              <div className="mb-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Характеристики здания</div>
                <div className="space-y-2 text-sm">
                  {[
                    { icon:"Building2", label:"Назначение",   value:activeProject.purpose },
                    { icon:"Ruler",     label:"Размеры",      value:`${activeProject.length.replace(" м","")}×${activeProject.width.replace(" м","")}×${activeProject.height}` },
                    { icon:"Maximize2", label:"Площадь",      value:activeProject.area },
                    { icon:"MapPin",    label:"Расположение", value:activeProject.locationShort },
                    { icon:"Layers",    label:"Кровля",       value:activeProject.roof },
                    { icon:"PanelTop",  label:"Стены",        value:activeProject.walls },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-gray-400 shrink-0">
                        <Icon name={icon} size={12} style={{ color:"var(--orange)" }} />
                        <span>{label}</span>
                      </div>
                      <span className="font-semibold text-gray-900 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-5 p-3 rounded-lg" style={{ background:"#f9f9f9" }}>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Детали</div>
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Icon name="Info" size={13} style={{ color:"var(--orange)" }} />
                  {activeProject.series}
                </div>
              </div>
              <button onClick={() => { setActiveProject(null); setQuizOpen(true); }} className="btn-orange w-full py-3.5 rounded text-sm">
                РАССЧИТАТЬ ПОХОЖЕЕ ЗДАНИЕ →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ CALLBACK POPUP ═══════════════════════════════════════════════════ */}
      {callbackOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 modal-backdrop animate-fade-in" onClick={() => setCallbackOpen(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm overflow-hidden animate-modal-in" onClick={e => e.stopPropagation()}>
            <div className="px-6 pt-6 pb-5" style={{ background:"var(--orange)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="Phone" size={20} className="text-white" />
                </div>
                <button onClick={() => setCallbackOpen(false)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="X" size={14} className="text-white" />
                </button>
              </div>
              <h3 className="text-white font-bold text-lg leading-tight">Перезвоним за 15 минут</h3>
              <p className="text-white/80 text-sm mt-1">Оставьте номер — менеджер свяжется с вами и ответит на все вопросы</p>
            </div>
            <div className="px-6 pb-6 pt-5">
              {cbSent ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background:"#fff3ee" }}>
                    <Icon name="CheckCircle" size={24} style={{ color:"var(--orange)" }} />
                  </div>
                  <div className="font-bold text-gray-900 mb-1">Заявка принята!</div>
                  <div className="text-sm text-gray-500">Перезвоним в рабочее время в течение 15 минут</div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Ваше имя</label>
                    <input type="text" placeholder="Иван Иванов" value={cbName}
                      onChange={e => { setCbName(e.target.value); if (cbTouched.name) setCbErrors(err => ({ ...err, name:validateName(e.target.value) })); }}
                      onBlur={() => { setCbTouched(t => ({ ...t, name:true })); setCbErrors(err => ({ ...err, name:validateName(cbName) })); }}
                      className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors ${cbTouched.name&&cbErrors.name?"border-red-400":"border-gray-200 focus:border-orange-300"}`} />
                    <FieldError msg={cbTouched.name?cbErrors.name:""} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Телефон</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" value={cbPhone}
                      onChange={e => { const v=phoneMask(e.target.value); setCbPhone(v); if (cbTouched.phone) setCbErrors(err => ({ ...err, phone:validatePhone(v) })); }}
                      onBlur={() => { setCbTouched(t => ({ ...t, phone:true })); setCbErrors(err => ({ ...err, phone:validatePhone(cbPhone) })); }}
                      className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors ${cbTouched.phone&&cbErrors.phone?"border-red-400":"border-gray-200 focus:border-orange-300"}`} />
                    <FieldError msg={cbTouched.phone?cbErrors.phone:""} />
                  </div>
                  <button onClick={submitCallback} className="btn-orange w-full py-3.5 rounded-lg text-sm">ПОЗВОНИТЕ МНЕ →</button>
                  <p className="text-center text-xs text-gray-400">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="https://evrazsteelbox.ru/politika_v_oblasti_obrabotki_personalnyh_dannyh/" target="_blank" rel="noreferrer" className="underline" style={{ color:"var(--orange)" }}>политикой конфиденциальности</a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}