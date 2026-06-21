import { motion } from 'framer-motion'
import {
  Dumbbell,
  MessageCircle,
  Star,
  CreditCard,
  Bell,
  Trophy,
  User,
  type LucideIcon,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import { Button, SectionHeader } from '../../components/ui'
import { Stagger } from '../../components/motion'
import { spring } from '../../components/motion'
import { notifications } from '../../data/mock'
import type { Notification } from '../../data/types'

const ICONS: Record<Notification['icon'], LucideIcon> = {
  dumbbell: Dumbbell,
  message: MessageCircle,
  star: Star,
  card: CreditCard,
  bell: Bell,
  trophy: Trophy,
  user: User,
}

const ACCENTS: Record<NonNullable<Notification['accent']>, { bg: string; fg: string }> = {
  volt: { bg: 'bg-volt/15', fg: 'text-volt' },
  iris: { bg: 'bg-iris/15', fg: 'text-iris' },
  coral: { bg: 'bg-coral/15', fg: 'text-coral' },
  amber: { bg: 'bg-amber/15', fg: 'text-amber' },
}

function NotificationRow({ n }: { n: Notification }) {
  const Icon = ICONS[n.icon]
  const accent = ACCENTS[n.accent ?? 'volt']
  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      transition={spring}
      className="flex w-full items-start gap-3.5 rounded-3xl border border-white/[0.06] bg-ink-850 p-4 text-left shadow-soft active:bg-ink-800"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${accent.bg} ${accent.fg}`}
      >
        <Icon size={20} strokeWidth={2.4} />
      </div>
      <div className="min-w-0 flex-1">
        <div
          className={`truncate text-[15px] font-semibold ${n.unread ? 'text-fg' : 'text-fg/80'}`}
        >
          {n.title}
        </div>
        <div className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-mut">{n.body}</div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2 pt-0.5">
        <span className="text-[11px] font-medium text-mut">{n.time}</span>
        {n.unread && <span className="h-2 w-2 rounded-full bg-volt" />}
      </div>
    </motion.button>
  )
}

export function Notifications() {
  const mid = Math.ceil(notifications.length / 2)
  const today = notifications.slice(0, mid)
  const earlier = notifications.slice(mid)

  return (
    <Screen gutter={false}>
      <AppHeader
        back
        title="Уведомления"
        right={
          <Button variant="ghost" size="sm">
            Прочитать все
          </Button>
        }
      />

      <div className="space-y-5 px-5 pt-4">
        {today.length > 0 && (
          <section>
            <SectionHeader title="Сегодня" />
            <Stagger className="space-y-3">
              {today.map((n) => (
                <Stagger.Item key={n.id}>
                  <NotificationRow n={n} />
                </Stagger.Item>
              ))}
            </Stagger>
          </section>
        )}

        {earlier.length > 0 && (
          <section>
            <SectionHeader title="Ранее" />
            <Stagger className="space-y-3">
              {earlier.map((n) => (
                <Stagger.Item key={n.id}>
                  <NotificationRow n={n} />
                </Stagger.Item>
              ))}
            </Stagger>
          </section>
        )}
      </div>
    </Screen>
  )
}
