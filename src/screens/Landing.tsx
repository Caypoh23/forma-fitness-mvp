import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ScanLine, Dumbbell, Star, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { img, PHOTOS } from '../lib/images'
import { spring } from '../components/motion'

function RoleCard({
  title,
  desc,
  icon,
  accent,
  delay,
  onClick,
}: {
  title: string
  desc: string
  icon: ReactNode
  accent: 'volt' | 'ai'
  delay: number
  onClick: () => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ...spring }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-3xl border border-white/10 bg-ink-850/80 p-4 text-left backdrop-blur-xl"
    >
      <div
        className={
          accent === 'volt'
            ? 'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-volt text-ink-950'
            : 'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ai-grad text-white shadow-glow-iris'
        }
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-display text-[17px] font-bold text-fg">{title}</div>
        <div className="text-[13px] leading-snug text-mut">{desc}</div>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-fg transition-transform group-active:translate-x-0.5">
        <ArrowRight size={18} strokeWidth={2.4} />
      </div>
    </motion.button>
  )
}

export function Landing() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-ink-950">
      {/* Hero image */}
      <div className="absolute inset-x-0 top-0 h-[58%]">
        <motion.img
          src={img(PHOTOS.training[4], { w: 900, q: 75 })}
          alt=""
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/30 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-iris/25 via-transparent to-aqua/10" />
      </div>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 flex items-center justify-between px-6 pt-14"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-volt">
            <span className="font-display text-lg font-extrabold text-ink-950">F</span>
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-fg">FORMA</span>
        </div>
        <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-medium text-fg/80 backdrop-blur">
          демо · данные замоканы
        </span>
      </motion.div>

      {/* Floating AI badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, ...spring }}
        className="absolute right-6 top-[22%] z-10 flex items-center gap-2 rounded-2xl border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-md"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-volt" />
        </span>
        <span className="text-xs font-semibold text-fg">AI-разбор техники</span>
      </motion.div>

      {/* Bottom content */}
      <div className="relative z-10 mt-auto px-6 pb-9">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[34px] font-extrabold leading-[1.05] tracking-tight text-fg"
        >
          Тренер в кармане.
          <br />
          <span className="text-grad-ai">ИИ, который видит</span>
          <br />
          твою технику.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-3 max-w-[300px] text-[15px] leading-relaxed text-mut"
        >
          Маркетплейс фитнес-тренеров с разбором техники прямо на телефоне. Выбери, как продолжить.
        </motion.p>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-5 mt-5 flex items-center gap-4 text-[12px] text-mut"
        >
          <span className="inline-flex items-center gap-1.5">
            <Star size={13} className="fill-amber text-amber" /> 4.9 рейтинг
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-aqua" /> Проверенные тренеры
          </span>
        </motion.div>

        <div className="space-y-3">
          <RoleCard
            title="Я клиент"
            desc="Найти тренера, тренироваться с AI, видеть прогресс"
            icon={<ScanLine size={26} strokeWidth={2.2} />}
            accent="ai"
            delay={0.6}
            onClick={() => navigate('/client')}
          />
          <RoleCard
            title="Я тренер"
            desc="Вести клиентов, программы и доход — из приложения"
            icon={<Dumbbell size={26} strokeWidth={2.2} />}
            accent="volt"
            delay={0.7}
            onClick={() => navigate('/trainer')}
          />
        </div>
      </div>
    </div>
  )
}
