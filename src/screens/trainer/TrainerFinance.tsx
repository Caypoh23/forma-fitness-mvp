import { useState } from 'react'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  RotateCcw,
  Wallet,
  TrendingUp,
  Percent,
  CalendarClock,
  Check,
  type LucideIcon,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import { Button, Card, SectionHeader, Sheet, Divider } from '../../components/ui'
import { BarChart } from '../../components/charts'
import { Stagger, CountUp } from '../../components/motion'
import { earnings, trainerTransactions, paymentMethods } from '../../data/mock'
import { sum } from '../../lib/format'
import type { Transaction } from '../../data/types'

/* ───────── Transaction visual config per kind ───────── */

const TX_META: Record<
  Transaction['kind'],
  { icon: LucideIcon; tint: string; bg: string }
> = {
  subscription: { icon: ArrowDownLeft, tint: 'text-mint', bg: 'bg-mint/12' },
  payout: { icon: ArrowUpRight, tint: 'text-fg', bg: 'bg-white/[0.07]' },
  tip: { icon: Gift, tint: 'text-amber', bg: 'bg-amber/12' },
  refund: { icon: RotateCcw, tint: 'text-coral', bg: 'bg-coral/12' },
}

const STATUS_META: Record<
  Transaction['status'],
  { label: string; cls: string }
> = {
  completed: { label: 'Завершено', cls: 'bg-mint/12 text-mint' },
  pending: { label: 'В обработке', cls: 'bg-amber/12 text-amber' },
  failed: { label: 'Ошибка', cls: 'bg-coral/12 text-coral' },
}

export function TrainerFinance() {
  const [payoutOpen, setPayoutOpen] = useState(false)
  const [methodId, setMethodId] = useState(
    paymentMethods.find((m) => m.type === 'card')?.id ?? paymentMethods[0].id,
  )

  const cards = paymentMethods.filter((m) => m.type === 'card')
  const delta = earnings.thisMonth - earnings.lastMonth
  const deltaPct = Math.round((delta / earnings.lastMonth) * 100)

  return (
    <>
      <AppHeader title="Финансы" />
      <Screen>
        <Stagger className="space-y-4 pt-3">
          {/* HERO — available balance */}
          <Stagger.Item>
            <Card className="relative overflow-hidden p-5">
              {/* soft volt glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-volt/15 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[13px] font-medium text-mut">
                  <Wallet size={15} strokeWidth={2.4} className="text-volt" />
                  Доступно к выводу
                </div>
                <div className="mt-2 font-display text-[40px] font-extrabold leading-none tracking-tight text-fg nums">
                  <CountUp to={earnings.balance} />
                  <span className="ml-1.5 align-baseline text-xl font-bold text-mut">сум</span>
                </div>
                <div className="mt-2 text-[13px] text-mut">
                  В ожидании:{' '}
                  <span className="font-semibold text-fg">{sum(earnings.pending)}</span>
                </div>
                <div className="mt-4">
                  <Button full icon={ArrowUpRight} onClick={() => setPayoutOpen(true)}>
                    Вывести на карту
                  </Button>
                </div>
              </div>
            </Card>
          </Stagger.Item>

          {/* Income chart */}
          <Stagger.Item>
            <Card className="p-5">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <div className="text-[13px] font-medium text-mut">Доход · этот месяц</div>
                  <div className="mt-1 font-display text-2xl font-extrabold tracking-tight text-fg nums">
                    {sum(earnings.thisMonth)}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-mint/12 px-2.5 py-1 text-[12px] font-bold text-mint nums">
                  <TrendingUp size={13} strokeWidth={2.6} />
                  +{deltaPct}%
                </span>
              </div>

              <BarChart data={earnings.series} labels={earnings.months} color="volt" height={120} />

              <Divider className="my-4" />

              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-1.5 text-mut">
                  <Percent size={14} strokeWidth={2.4} />
                  Комиссия платформы
                </span>
                <span className="font-semibold text-fg nums">{earnings.takeRate}%</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-1.5 text-mut">
                  <CalendarClock size={14} strokeWidth={2.4} />
                  Следующая выплата
                </span>
                <span className="font-semibold text-fg">{earnings.nextPayout}</span>
              </div>
            </Card>
          </Stagger.Item>

          {/* Operations */}
          <Stagger.Item>
            <div>
              <SectionHeader title="Операции" />
              <Card className="divide-y divide-white/[0.06]">
                {trainerTransactions.map((tx) => {
                  const meta = TX_META[tx.kind]
                  const status = STATUS_META[tx.status]
                  const Icon = meta.icon
                  const positive = tx.amount > 0
                  return (
                    <div key={tx.id} className="flex items-center gap-3 px-4 py-3.5">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${meta.bg} ${meta.tint}`}
                      >
                        <Icon size={18} strokeWidth={2.4} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[15px] font-semibold text-fg">{tx.title}</div>
                        <div className="truncate text-[13px] text-mut">
                          {tx.sub} · {tx.date}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <div
                          className={`font-display text-[15px] font-bold nums ${
                            positive ? 'text-mint' : 'text-fg'
                          }`}
                        >
                          {positive ? '+' : ''}
                          {sum(tx.amount)}
                        </div>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${status.cls}`}
                        >
                          {status.label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </Card>
            </div>
          </Stagger.Item>
        </Stagger>
      </Screen>

      {/* Payout sheet */}
      <Sheet open={payoutOpen} onClose={() => setPayoutOpen(false)} title="Вывод средств">
        <div className="mt-1 space-y-4">
          <div className="rounded-2xl bg-ink-800 p-4">
            <div className="text-[13px] text-mut">К выводу</div>
            <div className="mt-1 font-display text-3xl font-extrabold tracking-tight text-fg nums">
              {sum(earnings.balance)}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-semibold text-mut">Карта для зачисления</div>
            <div className="space-y-2.5">
              {cards.map((m) => {
                const active = m.id === methodId
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethodId(m.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                      active
                        ? 'border-volt bg-volt/[0.06]'
                        : 'border-white/10 bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.name === 'Uzcard' ? 'UZ' : 'HU'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-semibold text-fg">{m.name}</div>
                      <div className="truncate text-[13px] text-mut nums">{m.hint}</div>
                    </div>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        active ? 'border-volt bg-volt text-ink-950' : 'border-white/20 text-transparent'
                      }`}
                    >
                      <Check size={14} strokeWidth={3} />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.04] p-3.5 text-[12px] leading-relaxed text-mut">
            Зачисление на Uzcard/Humo обычно занимает до 1 рабочего дня. Комиссия платформы{' '}
            {earnings.takeRate}% уже учтена в балансе.
          </div>

          <Button full icon={ArrowUpRight} onClick={() => setPayoutOpen(false)}>
            Вывести {sum(earnings.balance)}
          </Button>
        </div>
      </Sheet>
    </>
  )
}
