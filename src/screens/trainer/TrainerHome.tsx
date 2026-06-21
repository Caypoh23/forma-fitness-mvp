import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  ChevronRight,
  UserPlus,
  MessageSquare,
  AlertTriangle,
  Video,
  ClipboardCheck,
  Play,
  ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Screen } from '../../components/layout/Screen'
import { Avatar, Img, Button } from '../../components/ui'
import { Stagger } from '../../components/motion'
import { currentTrainer, trainerClients, trainerInbox, trainerSchedule } from '../../data/mock'
import { img, PHOTOS } from '../../lib/images'
import { plural } from '../../lib/format'

/* The trainer Home is a prioritized "what to do now" queue (TrueCoach / Everfit pattern):
   AI reviews -> new requests -> clients needing attention -> unread chats -> today's calls.
   No metrics wall — income/analytics live in the Profile tab. */

export function TrainerHome() {
  const navigate = useNavigate()

  const sanjar = trainerClients.find((c) => c.id === 'c1')!
  const reviewsPending = 3
  const newRequests = trainerClients.filter((c) => c.status === 'new')
  const attention = trainerClients.filter((c) => c.status === 'attention')
  const unread = trainerInbox.reduce((s, i) => s + i.unread, 0)
  const calls = trainerSchedule.filter((s) => s.kind === 'call')

  const taskCount =
    (reviewsPending > 0 ? 1 : 0) + newRequests.length + attention.length + (unread > 0 ? 1 : 0)

  return (
    <Screen>
      {/* Greeting */}
      <div className="flex items-center justify-between pb-4 pt-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/trainer/profile')}>
            <Avatar id={currentTrainer.avatarId} size={46} ring online />
          </button>
          <div>
            <div className="text-[13px] text-mut">Среда, 21 июня</div>
            <div className="font-display text-xl font-extrabold leading-tight tracking-tight">
              Привет, {currentTrainer.firstName} 👋
            </div>
          </div>
        </div>
      </div>

      {/* One-line summary: what's on your plate */}
      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-volt/20 bg-volt/[0.07] px-4 py-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-volt text-ink-950">
          <ClipboardCheck size={16} strokeWidth={2.6} />
        </div>
        <p className="text-[14px] font-medium text-fg">
          <span className="font-bold text-volt">{taskCount} {plural(taskCount, 'дело', 'дела', 'дел')}</span> на сегодня — пройдись по порядку
        </p>
      </div>

      <Stagger className="space-y-3">
        {/* 1. HERO: AI technique review — the dominant action */}
        <Stagger.Item>
          <button
            onClick={() => navigate('/trainer/client/' + sanjar.id)}
            className="relative block w-full overflow-hidden rounded-3xl bg-ai-grad p-[1.5px] text-left shadow-glow-iris"
          >
            <div className="rounded-[calc(1.5rem-1.5px)] bg-ink-900/90 p-4 backdrop-blur">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-grad-ai" />
                <span className="text-[13px] font-bold text-grad-ai">AI-разбор техники готов</span>
                <span className="ml-auto rounded-full bg-white/[0.08] px-2 py-0.5 text-[11px] font-bold text-fg nums">
                  +{reviewsPending - 1} ещё
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                  <Img src={img(PHOTOS.training[1], { w: 240, q: 70 })} className="absolute inset-0 h-full w-full" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-volt text-ink-950">
                      <Play size={14} className="ml-0.5 fill-ink-950" />
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Avatar id={sanjar.avatarId} size={22} />
                    <span className="truncate text-[14px] font-bold text-fg">{sanjar.name}</span>
                  </div>
                  <div className="mt-1 text-[13px] text-mut">прислал: Жим штанги лёжа · 4 подхода</div>
                  <div className="mt-1.5 inline-flex items-center gap-1 rounded-lg bg-mint/15 px-2 py-0.5 text-[12px] font-bold text-mint nums">
                    форма 89
                  </div>
                </div>
              </div>

              <Button full size="lg" variant="ai" icon={Sparkles} className="mt-4" onClick={() => navigate('/trainer/client/' + sanjar.id)}>
                Проверить технику
              </Button>
            </div>
          </button>
        </Stagger.Item>

        {/* 2. New client requests */}
        {newRequests.length > 0 && (
          <Stagger.Item>
            <QueueGroup
              icon={UserPlus}
              accent="iris"
              title="Новые запросы"
              count={newRequests.length}
            >
              {newRequests.map((c) => (
                <div key={c.id} className="flex items-center gap-3 px-4 py-3">
                  <Avatar id={c.avatarId} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-semibold text-fg">{c.name}</div>
                    <div className="truncate text-[12px] text-mut">Цель: {c.goal}</div>
                  </div>
                  <Button size="sm" className="shrink-0" onClick={() => navigate('/trainer/client/' + c.id)}>
                    Принять
                  </Button>
                </div>
              ))}
            </QueueGroup>
          </Stagger.Item>
        )}

        {/* 3. Needs attention (auto-flagged) */}
        {attention.length > 0 && (
          <Stagger.Item>
            <QueueGroup
              icon={AlertTriangle}
              accent="amber"
              title="Требуют внимания"
              count={attention.length}
            >
              {attention.map((c) => {
                const fem = c.name.endsWith('а')
                return (
                  <div key={c.id} className="flex items-center gap-3 px-4 py-3">
                    <Avatar id={c.avatarId} size={40} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-semibold text-fg">{c.name}</div>
                      <div className="text-[12px] leading-snug text-amber">
                        не тренировал{fem ? 'ась' : 'ся'} {c.lastActive}
                      </div>
                    </div>
                    <Button size="sm" variant="secondary" className="shrink-0" onClick={() => navigate('/trainer/chat/' + c.id)}>
                      Написать
                    </Button>
                  </div>
                )
              })}
            </QueueGroup>
          </Stagger.Item>
        )}

        {/* 4. Unread chats */}
        {unread > 0 && (
          <Stagger.Item>
            <TaskRow
              icon={MessageSquare}
              accent="volt"
              title="Ответить в чатах"
              sub={unread + ' непрочитанных · клиенты ждут'}
              onClick={() => navigate('/trainer/inbox')}
            />
          </Stagger.Item>
        )}

        {/* 5. Today's calls */}
        {calls.length > 0 && (
          <Stagger.Item>
            <QueueGroup icon={Video} accent="aqua" title="Созвоны сегодня" count={calls.length}>
              {calls.map((s) => (
                <div key={s.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-12 shrink-0 font-display text-[15px] font-bold tracking-tight nums text-fg">
                    {s.time}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-semibold text-fg">{s.title}</div>
                    <div className="truncate text-[12px] text-mut">{s.sub}</div>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-white/30" />
                </div>
              ))}
            </QueueGroup>
          </Stagger.Item>
        )}

        {/* Footer: all caught up vibe + go to clients */}
        <Stagger.Item>
          <button
            onClick={() => navigate('/trainer/clients')}
            className="flex w-full items-center justify-center gap-1.5 py-3 text-[14px] font-semibold text-mut active:text-fg"
          >
            Все клиенты <ArrowRight size={16} />
          </button>
        </Stagger.Item>
      </Stagger>
    </Screen>
  )
}

/* ───────── building blocks ───────── */

const ACCENTS: Record<string, { dot: string; text: string }> = {
  volt: { dot: 'bg-volt/15 text-volt', text: 'text-volt' },
  iris: { dot: 'bg-iris/20 text-iris', text: 'text-iris' },
  amber: { dot: 'bg-amber/15 text-amber', text: 'text-amber' },
  aqua: { dot: 'bg-aqua/15 text-aqua', text: 'text-aqua' },
}

function QueueGroup({
  icon: Icon,
  accent,
  title,
  count,
  children,
}: {
  icon: LucideIcon
  accent: keyof typeof ACCENTS
  title: string
  count: number
  children: ReactNode
}) {
  const a = ACCENTS[accent]
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 pb-1 pt-3.5">
        <div className={`flex h-7 w-7 items-center justify-center rounded-full ${a.dot}`}>
          <Icon size={15} strokeWidth={2.5} />
        </div>
        <span className="text-[14px] font-bold text-fg">{title}</span>
        <span className={`ml-auto rounded-full bg-white/[0.07] px-2 py-0.5 text-[12px] font-bold nums ${a.text}`}>
          {count}
        </span>
      </div>
      <div className="divide-y divide-white/[0.05]">{children}</div>
    </div>
  )
}

function TaskRow({
  icon: Icon,
  accent,
  title,
  sub,
  onClick,
}: {
  icon: LucideIcon
  accent: keyof typeof ACCENTS
  title: string
  sub: string
  onClick: () => void
}) {
  const a = ACCENTS[accent]
  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="card flex w-full items-center gap-3 p-4 text-left active:bg-ink-800"
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${a.dot}`}>
        <Icon size={20} strokeWidth={2.4} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-bold text-fg">{title}</div>
        <div className="truncate text-[13px] text-mut">{sub}</div>
      </div>
      <ChevronRight size={20} className="shrink-0 text-white/30" />
    </motion.button>
  )
}
