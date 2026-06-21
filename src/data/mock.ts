import { PHOTOS } from '../lib/images'
import type {
  Trainer,
  Program,
  MealPlan,
  FormSession,
  ChatMessage,
  Notification,
  Transaction,
  TrainerClientRow,
  PaymentMethod,
} from './types'

const M = PHOTOS.trainersMale
const F = PHOTOS.trainersFemale
const T = PHOTOS.training
const FD = PHOTOS.food

/* ───────────────────────── Current users ───────────────────────── */

export const currentUser = {
  name: 'Санжар Алиев',
  firstName: 'Санжар',
  avatarId: '1506794778202-cad84cf45f1d',
  goal: 'Набрать 5 кг мышц',
  city: 'Ташкент',
  phone: '+998 90 123 45 67',
  streak: 12,
  level: 'Средний',
  weeksWith: 6,
}

export const currentTrainer = {
  name: 'Алишер Рахимов',
  firstName: 'Алишер',
  avatarId: M[0],
  headline: 'Сила и гипертрофия · Мастер спорта',
  city: 'Ташкент',
  rating: 4.9,
  activeClients: 18,
}

/* ───────────────────────── Marketplace ───────────────────────── */

export const categories = [
  'Все',
  'Сила',
  'Похудение',
  'Функционал',
  'Йога',
  'Бокс',
  'Питание',
]

export const trainers: Trainer[] = [
  {
    id: 'alisher',
    name: 'Алишер Рахимов',
    avatarId: M[0],
    coverId: T[4],
    headline: 'Сила и гипертрофия. Ставлю технику базовых движений',
    city: 'Ташкент',
    rating: 4.9,
    reviewsCount: 214,
    clients: 18,
    experienceYears: 9,
    verified: true,
    online: true,
    specializations: ['Сила', 'Гипертрофия', 'Техника'],
    tags: ['Силовой тренинг', 'Набор массы', 'Жим/Присед/Тяга'],
    languages: ['Русский', 'Ўзбекча'],
    priceFrom: 450_000,
    successRate: 94,
    bio: 'Мастер спорта по пауэрлифтингу. 9 лет ставлю технику и веду клиентов к силовым целям без травм. Работаю с AI-разбором техники — вижу каждое повторение, даже когда меня нет рядом.',
    certifications: ['Мастер спорта (пауэрлифтинг)', 'NSCA-CSCS', 'Кинезио-тейпирование'],
    galleryIds: [T[4], T[1], T[13], T[3], T[7], T[0]],
    reels: [
      { id: 'r1', title: 'Как не сорвать поясницу в становой', imageId: T[13], views: '42k', durationLabel: '0:48' },
      { id: 'r2', title: 'Жим лёжа: 3 ошибки новичка', imageId: T[1], views: '31k', durationLabel: '1:12' },
      { id: 'r3', title: 'Глубина приседа под твою анатомию', imageId: T[3], views: '27k', durationLabel: '0:56' },
    ],
    reviews: [
      { id: 'rv1', author: 'Жасур К.', avatarId: M[4], rating: 5, date: '2 недели назад', text: 'За 3 месяца жим вырос с 60 до 90 кг. Алишер реально следит за техникой через приложение — это другое.', result: 'Жим 60 → 90 кг' },
      { id: 'rv2', author: 'Дилшод Р.', avatarId: M[5], rating: 5, date: 'месяц назад', text: 'Перестала болеть спина после того, как поправил мне становую. AI-подсказки помогают между тренировками.', result: 'Боль в спине ушла' },
      { id: 'rv3', author: 'Отабек М.', avatarId: M[6], rating: 4, date: 'месяц назад', text: 'Программа жёсткая, но результат есть. Отвечает не мгновенно, но всегда по делу.', result: '+6 кг массы' },
    ],
    plans: [
      { id: 'p1', name: 'Старт', price: 450_000, period: 'мес', features: ['Программа тренировок', 'AI-разбор техники', 'Чат-поддержка (асинхронно)'] },
      { id: 'p2', name: 'Прогресс', price: 750_000, period: 'мес', popular: true, features: ['Всё из «Старт»', 'Меню питания', 'Еженедельная корректировка', '1 видеозвонок / нед'] },
      { id: 'p3', name: 'Премиум', price: 1_200_000, period: 'мес', features: ['Всё из «Прогресс»', 'Безлимит видеозвонков', 'Приоритетные ответы < 2ч', 'Разбор каждой тренировки'] },
    ],
  },
  {
    id: 'kamila',
    name: 'Камила Юсупова',
    avatarId: F[0],
    coverId: T[0],
    headline: 'Женский фитнес и мягкое похудение без жёстких диет',
    city: 'Ташкент',
    rating: 4.95,
    reviewsCount: 308,
    clients: 26,
    experienceYears: 7,
    verified: true,
    online: true,
    specializations: ['Похудение', 'Тонус', 'Питание'],
    tags: ['Снижение веса', 'Ягодицы/ноги', 'Питание'],
    languages: ['Русский', 'Ўзбекча', 'English'],
    priceFrom: 500_000,
    successRate: 91,
    bio: 'Помогаю женщинам прийти в форму без изнуряющих диет. Упор на привычки, питание и регулярность. Поддержка каждый день.',
    certifications: ['FPA Персональный тренер', 'Нутрициолог (Precision Nutrition L1)'],
    galleryIds: [T[0], T[10], T[12], T[8], FD[1], T[2]],
    reels: [
      { id: 'r1', title: 'Ягодичный мостик: чувствуй мышцу', imageId: T[12], views: '88k', durationLabel: '0:41' },
      { id: 'r2', title: '5 завтраков на 350 ккал', imageId: FD[1], views: '120k', durationLabel: '1:30' },
    ],
    reviews: [
      { id: 'rv1', author: 'Нигора Х.', avatarId: F[3], rating: 5, date: 'неделю назад', text: 'Минус 8 кг за 3 месяца и без срывов. Камила всегда на связи и поддерживает.', result: '−8 кг за 3 мес' },
      { id: 'rv2', author: 'Севара Т.', avatarId: F[4], rating: 5, date: '3 недели назад', text: 'Наконец-то еда, которую можно есть всей семьёй. Талия −6 см.', result: 'Талия −6 см' },
    ],
    plans: [
      { id: 'p1', name: 'Старт', price: 500_000, period: 'мес', features: ['Программа дома/зал', 'AI-разбор техники', 'Чат-поддержка'] },
      { id: 'p2', name: 'Трансформация', price: 850_000, period: 'мес', popular: true, features: ['Всё из «Старт»', 'Индивидуальное меню', 'Еженедельные созвоны', 'Замеры и отчёты'] },
    ],
  },
  {
    id: 'timur',
    name: 'Тимур Азизов',
    avatarId: M[1],
    coverId: T[7],
    headline: 'Функциональный тренинг и выносливость',
    city: 'Ташкент',
    rating: 4.8,
    reviewsCount: 156,
    clients: 21,
    experienceYears: 6,
    verified: true,
    online: false,
    specializations: ['Функционал', 'Кроссфит', 'Выносливость'],
    tags: ['Кроссфит', 'HIIT', 'Сжигание жира'],
    languages: ['Русский', 'Ўзбекча'],
    priceFrom: 420_000,
    successRate: 89,
    bio: 'Заряжаю энергией и строю атлетичное тело. Функциональные комплексы, которые работают и дома, и в зале.',
    certifications: ['CrossFit Level 2', 'TRX Certified'],
    galleryIds: [T[7], T[9], T[10], T[5], T[6], T[11]],
    reels: [
      { id: 'r1', title: '12-минутный жиросжигающий комплекс', imageId: T[9], views: '64k', durationLabel: '0:59' },
    ],
    reviews: [
      { id: 'rv1', author: 'Бекзод У.', avatarId: M[3], rating: 5, date: '2 недели назад', text: 'Реально драйвовые тренировки. Сбросил 5 кг и стал выносливее.', result: '−5 кг, +выносливость' },
    ],
    plans: [
      { id: 'p1', name: 'Старт', price: 420_000, period: 'мес', features: ['Функциональная программа', 'AI-разбор техники', 'Чат-поддержка'] },
      { id: 'p2', name: 'Атлет', price: 720_000, period: 'мес', popular: true, features: ['Всё из «Старт»', 'Меню питания', 'Корректировки 2×/нед'] },
    ],
  },
  {
    id: 'dilnoza',
    name: 'Дилноза Каримова',
    avatarId: F[1],
    coverId: T[8],
    headline: 'Йога, мобильность и восстановление спины',
    city: 'Ташкент',
    rating: 4.9,
    reviewsCount: 192,
    clients: 19,
    experienceYears: 8,
    verified: true,
    online: true,
    specializations: ['Йога', 'Мобильность', 'Осанка'],
    tags: ['Йога', 'Здоровье спины', 'Гибкость'],
    languages: ['Русский', 'Ўзбекча', 'English'],
    priceFrom: 380_000,
    successRate: 92,
    bio: 'Возвращаю телу лёгкость. Работаю с осанкой, болями в спине и шее у тех, кто много сидит за компьютером.',
    certifications: ['RYT-500 Yoga Alliance', 'Реабилитация позвоночника'],
    galleryIds: [T[8], T[10], T[9], T[2], T[0], T[5]],
    reels: [
      { id: 'r1', title: 'Разгрузка спины за 7 минут', imageId: T[8], views: '95k', durationLabel: '1:04' },
    ],
    reviews: [
      { id: 'rv1', author: 'Малика С.', avatarId: F[2], rating: 5, date: 'неделю назад', text: 'После родов вернула спину в норму. Спокойный и грамотный подход.', result: 'Спина без боли' },
    ],
    plans: [
      { id: 'p1', name: 'Старт', price: 380_000, period: 'мес', features: ['Программа практик', 'AI-контроль позы', 'Чат-поддержка'] },
      { id: 'p2', name: 'Глубже', price: 620_000, period: 'мес', popular: true, features: ['Всё из «Старт»', 'Персональные комплексы', 'Созвоны 1×/нед'] },
    ],
  },
  {
    id: 'rustam',
    name: 'Рустам Холматов',
    avatarId: M[2],
    coverId: T[3],
    headline: 'Пауэрлифтинг и максимальная сила',
    city: 'Самарканд',
    rating: 4.85,
    reviewsCount: 98,
    clients: 12,
    experienceYears: 11,
    verified: true,
    online: false,
    specializations: ['Сила', 'Пауэрлифтинг'],
    tags: ['Пауэрлифтинг', 'Присед/Жим/Тяга', 'Соревнования'],
    languages: ['Русский', 'Ўзбекча'],
    priceFrom: 550_000,
    successRate: 90,
    bio: 'КМС, готовлю к соревнованиям и просто к большим весам. Техника — это безопасность и результат.',
    certifications: ['КМС пауэрлифтинг', 'Судья IPF'],
    galleryIds: [T[3], T[13], T[1], T[4], T[6], T[11]],
    reels: [
      { id: 'r1', title: 'Становая: как держать спину', imageId: T[13], views: '54k', durationLabel: '1:20' },
    ],
    reviews: [
      { id: 'rv1', author: 'Шохрух М.', avatarId: M[5], rating: 5, date: 'месяц назад', text: 'Присед +30 кг за полгода. Объясняет до мелочей.', result: 'Присед +30 кг' },
    ],
    plans: [
      { id: 'p1', name: 'Сила', price: 550_000, period: 'мес', features: ['Силовой цикл', 'AI-разбор техники', 'Чат-поддержка'] },
      { id: 'p2', name: 'Соревнования', price: 950_000, period: 'мес', popular: true, features: ['Всё из «Сила»', 'Подводка к турниру', 'Анализ каждой тренировки'] },
    ],
  },
  {
    id: 'malika',
    name: 'Малика Сатторова',
    avatarId: F[2],
    coverId: FD[2],
    headline: 'Питание и фитнес: результат начинается с тарелки',
    city: 'Ташкент',
    rating: 4.92,
    reviewsCount: 174,
    clients: 23,
    experienceYears: 5,
    verified: true,
    online: true,
    specializations: ['Питание', 'Похудение', 'Тонус'],
    tags: ['Нутрициология', 'Меню', 'Снижение веса'],
    languages: ['Русский', 'Ўзбекча'],
    priceFrom: 480_000,
    successRate: 93,
    bio: 'Нутрициолог и тренер. Составляю меню под локальную кухню — плов и самса тоже могут быть в плане. Без голодовок.',
    certifications: ['Нутрициолог (PN L1)', 'FPA Тренер'],
    galleryIds: [FD[2], FD[1], FD[0], FD[3], T[0], T[12]],
    reels: [
      { id: 'r1', title: 'Плов, который не мешает форме', imageId: FD[5], views: '210k', durationLabel: '1:45' },
    ],
    reviews: [
      { id: 'rv1', author: 'Зарина А.', avatarId: F[5], rating: 5, date: '2 недели назад', text: 'Ем привычную еду и худею. Это магия. −7 кг.', result: '−7 кг' },
    ],
    plans: [
      { id: 'p1', name: 'Питание', price: 480_000, period: 'мес', features: ['Индивидуальное меню', 'Разбор анализов', 'Чат-поддержка'] },
      { id: 'p2', name: 'Питание + Тренировки', price: 820_000, period: 'мес', popular: true, features: ['Всё из «Питание»', 'Программа тренировок', 'AI-разбор техники'] },
    ],
  },
]

export const featuredTrainer = trainers[0]

/* ───────────────────── Client: active program ───────────────────── */

export const program: Program = {
  id: 'prog-strength',
  title: 'Сила и масса',
  level: 'Средний',
  weeks: 8,
  perWeek: 4,
  coverId: T[4],
  progressPct: 62,
  days: [
    {
      id: 'd-a',
      day: 'Сегодня',
      title: 'Грудь / Трицепс',
      focus: 'Жимовой день',
      durationMin: 55,
      kcal: 420,
      done: false,
      exercises: [
        { id: 'e1', name: 'Жим штанги лёжа', muscle: 'Грудь', imageId: T[1], sets: 4, reps: '6–8', rest: '120 сек', hasAI: true, tips: ['Лопатки сведены, плечи вниз', 'Гриф к низу груди', 'Стопы плотно в пол'] },
        { id: 'e2', name: 'Отжимания на брусьях', muscle: 'Грудь', imageId: T[5], sets: 3, reps: '8–12', rest: '90 сек', hasAI: true, tips: ['Наклон корпуса вперёд', 'Локти не разводи широко', 'Опускайся до 90°'] },
        { id: 'e3', name: 'Жим гантелей под углом', muscle: 'Верх груди', imageId: T[6], sets: 3, reps: '10–12', rest: '75 сек', hasAI: false, tips: ['Угол скамьи 30°', 'Не стучи гантелями вверху'] },
        { id: 'e4', name: 'Французский жим', muscle: 'Трицепс', imageId: T[11], sets: 3, reps: '12–15', rest: '60 сек', hasAI: false, tips: ['Локти зафиксированы', 'Опускай за голову'] },
        { id: 'e5', name: 'Планка', muscle: 'Кор', imageId: T[7], sets: 3, reps: '45 сек', rest: '45 сек', hasAI: true, tips: ['Таз не проваливай', 'Пресс и ягодицы в напряжении', 'Спина прямая'] },
      ],
    },
    {
      id: 'd-b',
      day: 'Ср',
      title: 'Спина / Бицепс',
      focus: 'Тяговый день',
      durationMin: 60,
      kcal: 460,
      done: false,
      exercises: [
        { id: 'e6', name: 'Становая тяга', muscle: 'Спина', imageId: T[13], sets: 4, reps: '5', rest: '150 сек', hasAI: true, tips: ['Спина нейтральна', 'Гриф вдоль ног', 'Таз и грудь синхронно'] },
        { id: 'e7', name: 'Подтягивания', muscle: 'Широчайшие', imageId: T[3], sets: 4, reps: '6–10', rest: '120 сек', hasAI: false, tips: ['Полная амплитуда', 'Без раскачки'] },
      ],
    },
    {
      id: 'd-c',
      day: 'Пт',
      title: 'Ноги / Кор',
      focus: 'День ног',
      durationMin: 65,
      kcal: 520,
      done: false,
      exercises: [
        { id: 'e8', name: 'Присед со штангой', muscle: 'Ноги', imageId: T[4], sets: 5, reps: '5', rest: '150 сек', hasAI: true, tips: ['Колени по линии стоп', 'Глубина ниже параллели', 'Спина прямая'] },
        { id: 'e9', name: 'Выпады с гантелями', muscle: 'Ноги/Ягодицы', imageId: T[10], sets: 3, reps: '10 на ногу', rest: '90 сек', hasAI: true, tips: ['Колено над стопой', 'Корпус вертикально'] },
      ],
    },
  ],
}

export const todayWorkout = program.days[0]

/* ───────────────────────── Meal plan ───────────────────────── */

export const mealPlan: MealPlan = {
  dayLabel: 'Сегодня',
  target: { kcal: 2600, protein: 180, carbs: 280, fat: 80 },
  meals: [
    { id: 'm1', type: 'Завтрак', title: 'Омлет, овсянка, ягоды', imageId: FD[7], kcal: 620, protein: 38, carbs: 70, fat: 18, items: ['3 яйца + 2 белка', 'Овсянка 60 г', 'Горсть ягод', 'Кофе без сахара'], done: true },
    { id: 'm2', type: 'Перекус', title: 'Творог с орехами', imageId: FD[0], kcal: 340, protein: 32, carbs: 18, fat: 14, items: ['Творог 5% 200 г', 'Грецкий орех 20 г', 'Мёд 1 ч.л.'], done: true },
    { id: 'm3', type: 'Обед', title: 'Курица, рис, овощи', imageId: FD[5], kcal: 760, protein: 55, carbs: 90, fat: 16, items: ['Куриная грудка 200 г', 'Рис 80 г (сухой)', 'Салат из овощей', 'Оливковое масло 1 ст.л.'], done: false },
    { id: 'm4', type: 'Перекус', title: 'Протеин + банан', imageId: FD[4], kcal: 300, protein: 28, carbs: 40, fat: 4, items: ['Протеин 1 порция', 'Банан', 'Вода 300 мл'], done: false },
    { id: 'm5', type: 'Ужин', title: 'Лосось и овощи на гриле', imageId: FD[3], kcal: 580, protein: 42, carbs: 30, fat: 28, items: ['Лосось 180 г', 'Брокколи и спаржа', 'Лимон, специи'], done: false },
  ],
}

/* ───────────────────────── Progress ───────────────────────── */

export const progress = {
  weeks: ['Нед 1', '2', '3', '4', '5', '6', '7', '8'],
  bodyweight: [74.2, 74.8, 75.3, 75.9, 76.4, 77.1, 77.6, 78.1],
  bench: [60, 65, 70, 75, 80, 85, 88, 92.5],
  squat: [80, 90, 95, 100, 108, 115, 120, 125],
  techniqueScore: [71, 74, 77, 79, 82, 85, 87, 89],
  measurements: [
    { name: 'Грудь', value: 104, delta: +5, unit: 'см' },
    { name: 'Бицепс', value: 39, delta: +3, unit: 'см' },
    { name: 'Талия', value: 82, delta: +1, unit: 'см' },
    { name: 'Бедро', value: 60, delta: +4, unit: 'см' },
  ],
  weeklyVolume: [8200, 9100, 9800, 10400, 11200, 12000, 12600, 13400],
}

export const formSessions: FormSession[] = [
  { id: 'fs1', exercise: 'Жим штанги лёжа', date: 'Сегодня · 18:40', reps: 28, formScore: 89, durationMin: 14, issues: ['Локти разводятся на последних повторах'], wins: ['Стабильная траектория грифа', 'Полная амплитуда'] },
  { id: 'fs2', exercise: 'Присед со штангой', date: 'Вчера · 19:10', reps: 25, formScore: 92, durationMin: 18, issues: ['Небольшой завал колена внутрь'], wins: ['Глубина ниже параллели', 'Прямая спина'] },
  { id: 'fs3', exercise: 'Становая тяга', date: '3 дня назад', reps: 20, formScore: 85, durationMin: 16, issues: ['Округление поясницы на 5-м повторе'], wins: ['Хороший старт от пола'] },
  { id: 'fs4', exercise: 'Планка', date: '4 дня назад', reps: 3, formScore: 95, durationMin: 4, issues: [], wins: ['Идеальная линия корпуса'] },
]

/* ───────────────────── Chats: AI assistant + trainer ───────────────────── */

export const assistantThread: ChatMessage[] = [
  { id: 'a1', from: 'ai', kind: 'text', text: 'Привет, Санжар! Я AI-ассистент FORMA. Спроси про технику, питание или если что-то болит — подберу безопасные варианты и подключу тренера.', time: '09:30', quickReplies: ['Болит плечо при жиме', 'Чем заменить становую?', 'Как считать белок?'] },
  { id: 'a2', from: 'me', kind: 'text', text: 'Болит плечо при жиме лёжа, что делать?', time: '09:31' },
  { id: 'a3', from: 'ai', kind: 'text', text: 'Понял. Я не ставлю диагнозов, но помогу снизить нагрузку на плечо. Что обычно помогает:\n\n• Сведи лопатки и опусти плечи — так сустав стабильнее\n• Уменьши хват чуть уже, локти ближе к корпусу (~45°)\n• Временно замени штангу на гантели или жим в наклоне\n• Снизь рабочий вес на 20–30% на 1–2 недели', time: '09:31' },
  { id: 'a4', from: 'ai', kind: 'video', text: 'Короткое видео: безопасное положение плеча в жиме', videoThumbId: T[1], durationLabel: '0:52', time: '09:31' },
  { id: 'a5', from: 'ai', kind: 'text', disclaimer: true, text: 'Если боль острая, не проходит несколько дней или есть онемение — обратись к врачу/физиотерапевту. Это не медицинский совет. Подключить вашего тренера Алишера к диалогу?', time: '09:31', quickReplies: ['Да, подключить тренера', 'Показать альтернативы жиму'] },
]

export const trainerThread: ChatMessage[] = [
  { id: 't1', from: 'trainer', kind: 'text', text: 'Санжар, видел твою последнюю тренировку — жим стал стабильнее 👍 Но на последних повторах локти уходят в стороны.', time: 'Вчера 20:10' },
  { id: 't2', from: 'trainer', kind: 'video', text: 'Глянь, как держать локти ближе к корпусу', videoThumbId: T[5], durationLabel: '0:38', time: 'Вчера 20:11' },
  { id: 't3', from: 'me', kind: 'text', text: 'Понял, спасибо! Вес оставляем тот же на след. неделю?', time: 'Вчера 20:24' },
  { id: 't4', from: 'trainer', kind: 'text', text: 'Да, добавим 2.5 кг только когда форма будет 90+ на всех подходах. AI это отследит.', time: 'Вчера 20:30' },
  { id: 't5', from: 'me', kind: 'voice', text: 'Голосовое', durationLabel: '0:12', time: '08:05' },
]

/* ───────────────────────── Notifications (client) ───────────────────────── */

export const notifications: Notification[] = [
  { id: 'n1', icon: 'dumbbell', title: 'Время тренировки', body: 'Сегодня день груди и трицепса · 5 упражнений', time: '5 мин', unread: true, accent: 'volt' },
  { id: 'n2', icon: 'message', title: 'Алишер ответил', body: '«Добавим 2.5 кг только когда форма будет 90+»', time: '1 ч', unread: true, accent: 'iris' },
  { id: 'n3', icon: 'trophy', title: 'Серия 12 дней! 🔥', body: 'Ты не пропустил ни одной тренировки 2 недели', time: '3 ч', unread: false, accent: 'amber' },
  { id: 'n4', icon: 'card', title: 'Оплата прошла', body: 'Подписка «Прогресс» продлена · 750 000 сум', time: 'Вчера', unread: false, accent: 'volt' },
  { id: 'n5', icon: 'star', title: 'Оцените тренера', body: 'Как вам неделя с Алишером? Оставьте отзыв', time: '2 дня', unread: false, accent: 'iris' },
]

/* ───────────────────────── Payments ───────────────────────── */

export const paymentMethods: PaymentMethod[] = [
  { id: 'payme', name: 'Payme', type: 'wallet', hint: 'Кошелёк · мгновенно', color: '#33D1C9' },
  { id: 'click', name: 'Click', type: 'wallet', hint: 'Кошелёк · мгновенно', color: '#15A1E6' },
  { id: 'uzcard', name: 'Uzcard', type: 'card', hint: '8600 •••• •••• 4521', color: '#1B4DA0' },
  { id: 'humo', name: 'Humo', type: 'card', hint: '9860 •••• •••• 7733', color: '#2BB673' },
]

/* ════════════════════════ TRAINER APP ════════════════════════ */

export const trainerDashboard = {
  activeClients: 18,
  newRequests: 3,
  unread: 5,
  rating: 4.9,
  retention: 88,
  todaySessions: 4,
}

export const trainerClients: TrainerClientRow[] = [
  { id: 'c1', name: 'Санжар Алиев', avatarId: '1506794778202-cad84cf45f1d', plan: 'Прогресс', adherence: 92, progressPct: 62, streak: 12, lastActive: '20 мин назад', status: 'active', nextSession: 'Сегодня 18:00', goal: 'Набор массы', weightDelta: '+3.9 кг', lastFormScore: 89 },
  { id: 'c2', name: 'Нигора Хамидова', avatarId: F[3], plan: 'Старт', adherence: 41, progressPct: 28, streak: 0, lastActive: '5 дней назад', status: 'attention', goal: 'Похудение', weightDelta: '−1.2 кг', lastFormScore: 74 },
  { id: 'c3', name: 'Шохрух Маматов', avatarId: M[5], plan: 'Премиум', adherence: 78, progressPct: 45, streak: 6, lastActive: '2 ч назад', status: 'active', nextSession: 'Завтра 09:00', goal: 'Сила', weightDelta: '+2.1 кг', lastFormScore: 86 },
  { id: 'c4', name: 'Зарина Абдуллаева', avatarId: F[5], plan: 'Прогресс', adherence: 95, progressPct: 71, streak: 21, lastActive: '1 ч назад', status: 'active', nextSession: 'Сегодня 19:30', goal: 'Тонус', weightDelta: '−6.4 кг', lastFormScore: 91 },
  { id: 'c5', name: 'Отабек Мурадов', avatarId: M[6], plan: 'Старт', adherence: 63, progressPct: 38, streak: 3, lastActive: 'Вчера', status: 'active', goal: 'Набор массы', weightDelta: '+1.5 кг', lastFormScore: 80 },
  { id: 'c6', name: 'Камрон Юлдашев', avatarId: M[4], plan: '—', adherence: 0, progressPct: 0, streak: 0, lastActive: 'Новый запрос', status: 'new', goal: 'Сила', weightDelta: '—', lastFormScore: 0 },
  { id: 'c7', name: 'Феруза Тошева', avatarId: F[4], plan: '—', adherence: 0, progressPct: 0, streak: 0, lastActive: 'Новый запрос', status: 'new', goal: 'Похудение', weightDelta: '—', lastFormScore: 0 },
]

export const trainerSchedule = [
  { id: 's1', time: '18:00', title: 'Санжар Алиев', sub: 'Разбор тренировки · видеозвонок', kind: 'call' as const },
  { id: 's2', time: '19:30', title: 'Зарина Абдуллаева', sub: 'Контрольный созвон · замеры', kind: 'call' as const },
  { id: 's3', time: '20:00', title: 'Проверить FormSession', sub: '6 тренировок ждут разбора', kind: 'review' as const },
  { id: 's4', time: '21:00', title: 'Ответить в чатах', sub: '5 непрочитанных сообщений', kind: 'message' as const },
]

export const earnings = {
  balance: 4_280_000,
  pending: 1_150_000,
  thisMonth: 9_640_000,
  lastMonth: 8_200_000,
  takeRate: 15,
  months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
  series: [5_600_000, 6_400_000, 7_100_000, 7_800_000, 8_200_000, 9_640_000],
  nextPayout: '25 июня',
}

export const trainerTransactions: Transaction[] = [
  { id: 'tx1', kind: 'subscription', title: 'Санжар Алиев', sub: 'Подписка «Прогресс»', amount: 750_000, date: 'Сегодня', status: 'completed' },
  { id: 'tx2', kind: 'subscription', title: 'Зарина Абдуллаева', sub: 'Подписка «Прогресс»', amount: 750_000, date: 'Сегодня', status: 'completed' },
  { id: 'tx3', kind: 'tip', title: 'Шохрух Маматов', sub: 'Чаевые за разбор', amount: 100_000, date: 'Вчера', status: 'completed' },
  { id: 'tx4', kind: 'subscription', title: 'Отабек Мурадов', sub: 'Подписка «Старт»', amount: 450_000, date: 'Вчера', status: 'pending' },
  { id: 'tx5', kind: 'payout', title: 'Вывод на Uzcard', sub: '8600 •••• 4521', amount: -3_000_000, date: '20 июня', status: 'completed' },
]

export const trainerInbox = [
  { id: 'i1', clientId: 'c1', name: 'Санжар Алиев', avatarId: '1506794778202-cad84cf45f1d', preview: 'Понял, спасибо! Вес оставляем тот же?', time: '08:05', unread: 0, online: true },
  { id: 'i2', clientId: 'c2', name: 'Нигора Хамидова', avatarId: F[3], preview: 'Не успела вчера, можно перенести?', time: 'Вчера', unread: 2, online: false },
  { id: 'i3', clientId: 'c4', name: 'Зарина Абдуллаева', avatarId: F[5], preview: 'Отправила замеры за неделю 💪', time: 'Вчера', unread: 1, online: true },
  { id: 'i4', clientId: 'c3', name: 'Шохрух Маматов', avatarId: M[5], preview: 'Голосовое сообщение · 0:24', time: '2 дня', unread: 0, online: false },
]

export const trainerPrograms = [
  { id: 'tp1', title: 'Сила и масса', level: 'Средний', weeks: 8, perWeek: 4, clients: 7, coverId: T[4] },
  { id: 'tp2', title: 'Жиросжигание 360', level: 'Начальный', weeks: 6, perWeek: 5, clients: 9, coverId: T[9] },
  { id: 'tp3', title: 'Новичок 0→1', level: 'Начальный', weeks: 4, perWeek: 3, clients: 5, coverId: T[0] },
  { id: 'tp4', title: 'Пик силы (подводка)', level: 'Продвинутый', weeks: 6, perWeek: 4, clients: 2, coverId: T[13] },
]

export const trainerMealPlans = [
  { id: 'mp1', title: 'Масса · 2800 ккал', sub: 'Б 190 · Ж 85 · У 320', clients: 6, imageId: FD[5] },
  { id: 'mp2', title: 'Дефицит · 1700 ккал', sub: 'Б 150 · Ж 55 · У 150', clients: 8, imageId: FD[1] },
  { id: 'mp3', title: 'Поддержание · 2200 ккал', sub: 'Б 165 · Ж 70 · У 230', clients: 4, imageId: FD[2] },
]
