import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Check,
  Wallet,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Dumbbell,
  MessageCircle,
  Info,
  type LucideIcon,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import { Button, Avatar, VerifiedBadge } from '../../components/ui'
import { trainers, paymentMethods } from '../../data/mock'
import { sum } from '../../lib/format'
import { spring, softSpring } from '../../components/motion'

type Perk = { icon: LucideIcon; title: string; sub: string; ai?: boolean }

export function Subscribe() {
  const navigate = useNavigate()
  const { id } = useParams()
  const trainer = trainers.find((t) => t.id === id) ?? trainers[0]

  const defaultPlan =
    trainer.plans.find((p) => p.popular) ?? trainer.plans[1] ?? trainer.plans[0]

  const [selectedPlanId, setSelectedPlanId] = useState(defaultPlan.id)
  const [methodId, setMethodId] = useState('payme')
  const [paid, setPaid] = useState(false)

  const selectedPlan =
    trainer.plans.find((p) => p.id === selectedPlanId) ?? trainer.plans[0]
  const firstName = trainer.name.split(' ')[0]

  /* ───────────────────────── Success overlay ───────────────────────── */
  if (paid) {
    const perks: Perk[] = [
      {
        icon: Dumbbell,
        title: 'Программа тренировок',
        sub: 'Твой план уже в разделе «Тренировка»',
      },
      {
        icon: Sparkles,
        title: 'AI-разбор техники',
        sub: 'Камера считает повторы и оценивает форму',
        ai: true,
      },
      {
        icon: MessageCircle,
        title: 'Чат с тренером',
        sub: `${firstName} на связи и ведёт тебя`,
      },
    ]

    const particles = [
      { l: '18%', t: '22%', s: 7, d: 0 },
      { l: '78%', t: '18%', s: 5, d: 0.3 },
      { l: '30%', t: '14%', s: 4, d: 0.6 },
      { l: '66%', t: '30%', s: 6, d: 0.15 },
      { l: '50%', t: '10%', s: 5, d: 0.45 },
      { l: '85%', t: '40%', s: 4, d: 0.5 },
    ]

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex h-full w-full flex-col overflow-hidden bg-ink-950"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-volt/20 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-10 -right-16 h-56 w-56 rounded-full bg-iris/20 blur-[90px]" />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0 }}
            animate={{ opacity: [0, 1, 0.4], y: -18, scale: 1 }}
            transition={{
              duration: 2.4,
              delay: 0.3 + p.d,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute rounded-full bg-volt shadow-[0_0_10px_2px_rgba(212,255,62,0.6)]"
            style={{ left: p.l, top: p.t, width: p.s, height: p.s }}
          />
        ))}

        <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
          {/* Spring check */}
          <motion.div
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 14, delay: 0.1 }}
            className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-volt text-ink-950 shadow-[0_12px_40px_-8px_rgba(212,255,62,0.7)]"
          >
            <motion.span
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-volt"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.32 }}
            >
              <Check size={48} strokeWidth={3.2} />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, ...softSpring }}
            className="font-display text-[28px] font-extrabold tracking-tight"
          >
            Подписка активна
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, ...softSpring }}
            className="mt-1.5 text-[15px] text-mut"
          >
            {trainer.name} · план «{selectedPlan.name}»
          </motion.p>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ...softSpring }}
            className="mt-8 w-full space-y-2.5 text-left"
          >
            {perks.map((perk) => {
              const Icon = perk.icon
              return (
                <div key={perk.title} className="card flex items-center gap-3.5 p-3.5">
                  <div
                    className={
                      'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ' +
                      (perk.ai
                        ? 'bg-ai-grad text-white shadow-glow-iris'
                        : 'bg-volt/15 text-volt')
                    }
                  >
                    <Icon size={20} strokeWidth={2.3} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-[15px] font-bold">{perk.title}</div>
                    <div className="truncate text-[12.5px] text-mut">{perk.sub}</div>
                  </div>
                  <Check size={18} className="ml-auto shrink-0 text-mint" strokeWidth={2.6} />
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, ...softSpring }}
          className="relative space-y-2.5 px-6 pb-8"
        >
          <Button full size="lg" variant="ai" icon={Dumbbell} onClick={() => navigate('/client/program')}>
            Перейти к тренировкам
          </Button>
          <Button full size="lg" variant="outline" onClick={() => navigate('/client')}>
            На главную
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  /* ───────────────────────── Checkout ───────────────────────── */
  return (
    <Screen gutter={false} padBottom={false}>
      <AppHeader back title="Оформление" />

      <div className="space-y-6 px-5 pb-40 pt-4">
        {/* Trainer mini-card */}
        <div className="flex items-center gap-3.5 rounded-3xl border border-white/[0.06] bg-ink-850 p-3.5 shadow-soft">
          <Avatar id={trainer.avatarId} size={52} online={trainer.online} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-display text-[16px] font-bold">{trainer.name}</span>
              {trainer.verified && <VerifiedBadge />}
            </div>
            <p className="mt-0.5 line-clamp-1 text-[13px] text-mut">{trainer.headline}</p>
          </div>
        </div>

        {/* Plans */}
        <div>
          <h2 className="mb-3 font-display text-[17px] font-bold tracking-tight">Тариф</h2>
          <div className="space-y-3">
            {trainer.plans.map((plan) => {
              const active = plan.id === selectedPlanId
              return (
                <motion.button
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  whileTap={{ scale: 0.985 }}
                  transition={spring}
                  className={
                    'relative block w-full overflow-hidden rounded-3xl border p-4 text-left transition-colors ' +
                    (active
                      ? 'border-volt bg-volt/[0.06]'
                      : 'border-white/[0.07] bg-ink-850 hover:border-white/15')
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-[17px] font-extrabold tracking-tight">
                          {plan.name}
                        </span>
                        {plan.popular && (
                          <span className="rounded-full bg-volt px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink-950">
                            ПОПУЛЯРНЫЙ
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 flex items-baseline gap-1">
                        <span className="font-display text-[22px] font-extrabold tracking-tight nums">
                          {sum(plan.price)}
                        </span>
                        <span className="text-[13px] text-mut">/ {plan.period}</span>
                      </div>
                    </div>
                    {/* Radio / check */}
                    <span
                      className={
                        'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ' +
                        (active
                          ? 'border-volt bg-volt text-ink-950'
                          : 'border-white/20 text-transparent')
                      }
                    >
                      <Check size={14} strokeWidth={3.2} />
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-[13px] text-fg/85">
                        <Check size={15} className="mt-0.5 shrink-0 text-volt" strokeWidth={2.8} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Payment method */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="font-display text-[17px] font-bold tracking-tight">Способ оплаты</h2>
            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-mut">
              местные платежи
            </span>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-ink-850">
            {paymentMethods.map((method, i) => {
              const active = method.id === methodId
              const Icon = method.type === 'wallet' ? Wallet : CreditCard
              return (
                <motion.button
                  key={method.id}
                  onClick={() => setMethodId(method.id)}
                  whileTap={{ scale: 0.99 }}
                  transition={spring}
                  className={
                    'flex w-full items-center gap-3 px-4 py-3.5 text-left ' +
                    (i > 0 ? 'border-t border-white/[0.06] ' : '') +
                    (active ? 'bg-volt/[0.05]' : '')
                  }
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: method.color }}
                  >
                    <Icon size={18} strokeWidth={2.4} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-semibold text-fg">{method.name}</div>
                    <div className="truncate text-[12.5px] text-mut">{method.hint}</div>
                  </div>
                  {/* Radio */}
                  <span
                    className={
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ' +
                      (active ? 'border-volt' : 'border-white/20')
                    }
                  >
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-volt" />}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-3xl border border-white/[0.06] bg-ink-850 p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-mut">План «{selectedPlan.name}»</span>
            <span className="font-display text-[16px] font-bold nums">{sum(selectedPlan.price)}</span>
          </div>
          <div className="my-3 h-px w-full bg-white/[0.06]" />
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-fg">К оплате</span>
            <span className="font-display text-[19px] font-extrabold text-volt nums">
              {sum(selectedPlan.price)}
            </span>
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-2xl bg-white/[0.04] p-3">
            <Info size={15} className="mt-0.5 shrink-0 text-mut" strokeWidth={2.3} />
            <p className="text-[12px] leading-relaxed text-mut">
              Списание разовое. Продление — через сохранённый токен карты с напоминанием за 3 дня:
              локальные платёжные системы (Payme/Click/Uzcard/Humo) не поддерживают полностью
              автоматический рекуррент, поэтому продлеваешь в один тап.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky inset-x-0 bottom-0 z-30 border-t border-white/[0.06] bg-ink-950/90 px-5 pb-7 pt-3 backdrop-blur-xl">
        <Button full size="lg" icon={ShieldCheck} onClick={() => setPaid(true)}>
          Оплатить {sum(selectedPlan.price)}
        </Button>
        <p className="mt-2 text-center text-[11px] text-mut">
          Безопасная оплата · можно отменить в любой момент
        </p>
      </div>
    </Screen>
  )
}
