import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mic, Zap, Check, Send, RotateCcw, ChevronRight } from 'lucide-react'
import { img, PHOTOS } from '../lib/images'
import { program } from '../data/mock'
import { ProgressRing } from '../components/charts'
import { Button } from '../components/ui'

/* Pose skeleton (stylized) */
const J = {
  head: [100, 42], neck: [100, 62],
  shL: [74, 76], shR: [126, 76],
  elL: [62, 114], elR: [138, 114],
  wrL: [58, 152], wrR: [142, 152],
  hipL: [86, 154], hipR: [114, 154],
  knL: [82, 214], knR: [118, 214],
  anL: [80, 274], anR: [120, 274],
} as const
type JK = keyof typeof J
const JOINT_KEY: Partial<Record<JK, string>> = {
  shL: 'back', shR: 'back', elL: 'elbow', elR: 'elbow',
  hipL: 'hip', hipR: 'hip', knL: 'depth', knR: 'depth',
}
const BONES: [JK, JK][] = [
  ['head', 'neck'], ['neck', 'shL'], ['neck', 'shR'], ['shL', 'shR'],
  ['shL', 'elL'], ['elL', 'wrL'], ['shR', 'elR'], ['elR', 'wrR'],
  ['neck', 'hipL'], ['neck', 'hipR'], ['hipL', 'hipR'],
  ['hipL', 'knL'], ['knL', 'anL'], ['hipR', 'knR'], ['knR', 'anR'],
]

const CUES = [
  { key: 'elbow', text: 'Прижми локти' },
  { key: null, text: 'Темп ровный — так держать', good: true },
  { key: 'depth', text: 'Глубже амплитуда' },
  { key: 'back', text: 'Спина прямее' },
  { key: null, text: 'Отличный контроль 💪', good: true },
  { key: 'hip', text: 'Таз чуть назад' },
]

export function CoachScreen() {
  const navigate = useNavigate()
  const { exerciseId } = useParams()
  const exercise = useMemo(() => {
    for (const d of program.days) {
      const e = d.exercises.find((x) => x.id === exerciseId)
      if (e) return e
    }
    return program.days[0].exercises[0]
  }, [exerciseId])

  const [phase, setPhase] = useState<'live' | 'summary'>('live')
  const [reps, setReps] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [score, setScore] = useState(88)
  const [cueIdx, setCueIdx] = useState(0)
  const cue = CUES[cueIdx]

  useEffect(() => {
    if (phase !== 'live') return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    const r = setInterval(() => setReps((n) => (n < 12 ? n + 1 : n)), 1900)
    const c = setInterval(() => setCueIdx((i) => (i + 1) % CUES.length), 2600)
    const sc = setInterval(() => setScore(() => 84 + Math.round(Math.random() * 10)), 2600)
    return () => {
      clearInterval(t); clearInterval(r); clearInterval(c); clearInterval(sc)
    }
  }, [phase])

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  const avgScore = 89

  if (phase === 'summary') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex h-full w-full flex-col overflow-y-auto bg-ink-950 px-5 pb-8 pt-14 no-scrollbar"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-volt text-ink-950"
          >
            <Check size={34} strokeWidth={3} />
          </motion.div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Подход разобран</h1>
          <p className="mt-1 text-sm text-mut">{exercise.name}</p>
        </div>

        <div className="mt-7 flex items-center justify-center">
          <ProgressRing value={avgScore} size={150} stroke={13} color="volt">
            <div className="text-center">
              <div className="font-display text-4xl font-extrabold leading-none nums">{avgScore}</div>
              <div className="mt-1 text-xs font-medium text-mut">оценка техники</div>
            </div>
          </ProgressRing>
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3">
          {[
            { label: 'Повторы', value: reps || 10 },
            { label: 'Время', value: mmss },
            { label: 'Темп', value: 'Ровный' },
          ].map((s) => (
            <div key={s.label} className="card p-3 text-center">
              <div className="font-display text-xl font-bold nums">{s.value}</div>
              <div className="mt-0.5 text-[11px] text-mut">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 card p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-mint">
            <Check size={16} strokeWidth={3} /> Что получилось
          </div>
          <ul className="space-y-1.5 text-[13px] text-fg/80">
            <li>· Стабильная траектория грифа</li>
            <li>· Полная амплитуда движения</li>
            <li>· Контроль на опускании</li>
          </ul>
        </div>

        <div className="mt-3 card p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-amber">
            <Zap size={16} strokeWidth={2.6} /> Над чем работать
          </div>
          <ul className="space-y-1.5 text-[13px] text-fg/80">
            <li>· Локти разводятся на последних повторах</li>
            <li>· Добавь паузу 1 сек в нижней точке</li>
          </ul>
          <div className="mt-3 rounded-xl bg-iris/10 p-3 text-[12px] leading-relaxed text-iris-400">
            AI отправит этот разбор тренеру Алишеру. Он подтвердит прибавку веса, когда форма стабильно ≥ 90.
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          <Button full size="lg" icon={Send} variant="ai" onClick={() => navigate('/client/chat/trainer')}>
            Отправить тренеру
          </Button>
          <div className="flex gap-2.5">
            <Button full variant="secondary" icon={RotateCcw} onClick={() => { setPhase('live'); setReps(0); setSeconds(0) }}>
              Ещё подход
            </Button>
            <Button full variant="outline" onClick={() => navigate(-1)}>Готово</Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* "Camera" background */}
      <img src={img(PHOTOS.training[5], { w: 800, q: 60 })} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* Scan line */}
      <motion.div
        initial={{ top: '12%' }}
        animate={{ top: ['12%', '82%', '12%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-volt to-transparent shadow-[0_0_12px_2px_rgba(212,255,62,0.5)]"
      />

      {/* Corner reticle */}
      {[
        'left-6 top-24 border-l-2 border-t-2',
        'right-6 top-24 border-r-2 border-t-2',
        'left-6 bottom-44 border-b-2 border-l-2',
        'right-6 bottom-44 border-b-2 border-r-2',
      ].map((c) => (
        <div key={c} className={`absolute h-7 w-7 rounded-[4px] border-volt/70 ${c}`} />
      ))}

      {/* Skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          viewBox="0 0 200 320"
          className="h-[62%]"
          animate={{ y: [0, 16, 0], scaleY: [1, 0.965, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(212,255,62,0.45))' }}
        >
          {BONES.map(([a, b], i) => (
            <line key={i} x1={J[a][0]} y1={J[a][1]} x2={J[b][0]} y2={J[b][1]} stroke="rgba(212,255,62,0.55)" strokeWidth={2.5} strokeLinecap="round" />
          ))}
          {(Object.keys(J) as JK[]).map((k) => {
            const active = cue.key && JOINT_KEY[k] === cue.key && !cue.good
            const [x, y] = J[k]
            return (
              <g key={k}>
                {active && <motion.circle cx={x} cy={y} r={11} fill="none" stroke="#FBBF24" strokeWidth={1.5} initial={{ opacity: 0.8, scale: 0.6 }} animate={{ opacity: 0, scale: 1.8 }} transition={{ duration: 1, repeat: Infinity }} />}
                <circle cx={x} cy={y} r={k === 'head' ? 7 : 4.5} fill={active ? '#FBBF24' : '#D4FF3E'} stroke="#0A0C0F" strokeWidth={1.5} />
              </g>
            )
          })}
        </motion.svg>
      </div>

      {/* Top HUD */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-12">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur">
          <X size={20} strokeWidth={2.4} />
        </button>
        <div className="rounded-full bg-black/50 px-3 py-1.5 text-center backdrop-blur">
          <div className="text-[13px] font-bold leading-none">{exercise.name}</div>
          <div className="mt-0.5 text-[10px] text-mut">AI-разбор техники</div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-coral" />
          <span className="text-[12px] font-semibold nums">{mmss}</span>
        </div>
      </div>

      {/* Live stats: reps + score */}
      <div className="absolute left-5 top-28 z-10 space-y-3">
        <div className="rounded-2xl bg-black/45 p-3 backdrop-blur">
          <div className="text-[10px] font-medium uppercase tracking-wide text-mut">Повторы</div>
          <div className="font-display text-4xl font-extrabold leading-none nums text-volt">{reps}</div>
        </div>
        <div className="rounded-2xl bg-black/45 p-3 backdrop-blur">
          <div className="text-[10px] font-medium uppercase tracking-wide text-mut">Форма</div>
          <div className="font-display text-3xl font-extrabold leading-none nums">{score}</div>
        </div>
      </div>

      {/* Phase chip */}
      <div className="absolute right-5 top-28 z-10 rounded-full border border-volt/40 bg-volt/10 px-3 py-1.5 text-[12px] font-semibold text-volt backdrop-blur">
        {reps % 2 === 0 ? 'Опускание' : 'Подъём'}
      </div>

      {/* Bottom: voice cue + finish */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={cueIdx}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-md ${
              cue.good ? 'border-mint/40 bg-mint/15' : 'border-amber/40 bg-amber/15'
            }`}
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${cue.good ? 'bg-mint text-ink-950' : 'bg-amber text-ink-950'}`}>
              <Mic size={18} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-wide text-white/60">Голосовая подсказка</div>
              <div className="truncate text-[15px] font-bold text-white">{cue.text}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        <Button full size="lg" onClick={() => setPhase('summary')} iconRight={ChevronRight}>
          Завершить подход
        </Button>
      </div>
    </div>
  )
}
