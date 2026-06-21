import { useNavigate } from 'react-router-dom'
import {
  Bell,
  Users,
  UserPlus,
  MessageSquare,
  Star,
  Video,
  ClipboardCheck,
  Wallet,
  ChevronRight,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { Avatar, Card, Button } from '../../components/ui'
import { Sparkline } from '../../components/charts'
import { Stagger, CountUp } from '../../components/motion'
import {
  currentTrainer,
  trainerDashboard,
  earnings,
  trainerSchedule,
  trainerClients,
  trainerInbox,
} from '../../data/mock'

const SCHEDULE_ICON: Record<'call' | 'review' | 'message', LucideIcon> = {
  call: Video,
  review: ClipboardCheck,
  message: MessageSquare,
}

export function TrainerHome() {
  const navigate = useNavigate()

  const unread = trainerInbox.reduce((s, t) => s + t.unread, 0)
  const monthDelta = Math.round(
    ((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth) * 100,
  )
  const attention = trainerClients.filter((c) => c.status === 'attention')
  const requests = trainerClients.filter((c) => c.status === 'new')

  return (
    <Screen>
      {/* Greeting */}
      <div className="flex items-center justify-between pb-5 pt-3">
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
        <button
          onClick={() => navigate('/trainer/inbox')}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-fg"
        >
          <Bell size={20} strokeWidth={2.2} />
          {unread > 0 && (
            <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-volt ring-2 ring-ink-950" />
          )}
        </button>
      </div>

      <Stagger className="space-y-4">
        {/* Earnings hero */}
        <Stagger.Item>
          <Card onClick={() => navigate('/trainer/finance')} className="relative p-5">
            {/* volt glow */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-volt/15 blur-3xl" />
            <div className="relative flex items-start justify-between">
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-mut">Доход за июнь</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-display text-[34px] font-extrabold leading-none tracking-tight nums text-fg">
                    <CountUp to={earnings.thisMonth} />
                  </span>
                  <span className="text-base font-semibold text-mut">сум</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-mint/15 px-2 py-0.5 text-[12px] font-bold text-mint">
                  <TrendingUp size={13} strokeWidth={2.6} />
                  +{monthDelta}% к маю
                </div>
              </div>
              <div className="w-20 shrink-0 pt-1">
                <Sparkline data={earnings.series} color="volt" />
              </div>
            </div>

            <div className="relative mt-4 flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-volt/15 text-volt">
                  <Wallet size={18} strokeWidth={2.3} />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-fg">Кошелёк</div>
                  <div className="text-[12px] text-mut nums">
                    Доступно {earnings.balance.toLocaleString('ru-RU').replace(/,/g, ' ')} сум
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/30" />
            </div>
          </Card>
        </Stagger.Item>

        {/* Stats grid 2x2 */}
        <Stagger.Item>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={Users}
              value={trainerDashboard.activeClients}
              label="Активных клиентов"
              onClick={() => navigate('/trainer/clients')}
            />
            <StatCard
              icon={UserPlus}
              value={trainerDashboard.newRequests}
              label="Новых запросов"
              badge
              onClick={() => navigate('/trainer/clients')}
            />
            <StatCard
              icon={MessageSquare}
              value={trainerDashboard.unread}
              label="Непрочитано"
              onClick={() => navigate('/trainer/inbox')}
            />
            <StatCard
              icon={Star}
              value={trainerDashboard.rating}
              label="Рейтинг"
              decimals={1}
              accent="amber"
              onClick={() => navigate('/trainer/profile')}
            />
          </div>
        </Stagger.Item>

        {/* Today schedule */}
        <Stagger.Item>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-[17px] font-bold tracking-tight text-fg">Сегодня</h2>
              <span className="text-[13px] font-medium text-mut nums">
                {trainerSchedule.length} событий
              </span>
            </div>
            <Card className="divide-y divide-white/[0.06] p-0">
              {trainerSchedule.map((s) => {
                const Icon = SCHEDULE_ICON[s.kind]
                return (
                  <div key={s.id} className="flex items-center gap-3 px-4 py-3.5">
                    <div className="w-12 shrink-0 font-display text-[15px] font-bold tracking-tight nums text-fg">
                      {s.time}
                    </div>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-volt">
                      <Icon size={17} strokeWidth={2.3} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-semibold text-fg">{s.title}</div>
                      <div className="line-clamp-2 text-[12px] leading-snug text-mut">{s.sub}</div>
                    </div>
                  </div>
                )
              })}
            </Card>
          </div>
        </Stagger.Item>

        {/* Needs attention */}
        {attention.length > 0 && (
          <Stagger.Item>
            <div>
              <h2 className="mb-3 font-display text-[17px] font-bold tracking-tight text-fg">
                Требуют внимания
              </h2>
              <div className="space-y-3">
                {attention.map((c) => {
                  const fem = c.name.endsWith('а')
                  return (
                    <Card key={c.id} className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar id={c.avatarId} size={44} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[15px] font-semibold text-fg">{c.name}</div>
                          <div className="text-[13px] leading-snug text-mut">
                            не тренировал{fem ? 'ась' : 'ся'} {c.lastActive}
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-amber/15 px-2.5 py-1 text-[11px] font-bold text-amber nums">
                          {c.adherence}% дисц.
                        </span>
                      </div>
                      <Button
                        full
                        variant="secondary"
                        size="sm"
                        icon={MessageSquare}
                        className="mt-3"
                        onClick={() => navigate('/trainer/chat/' + c.id)}
                      >
                        Написать
                      </Button>
                    </Card>
                  )
                })}
              </div>
            </div>
          </Stagger.Item>
        )}

        {/* New requests */}
        {requests.length > 0 && (
          <Stagger.Item>
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-[17px] font-bold tracking-tight text-fg">
                  Новые запросы
                </h2>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-volt px-1.5 text-[12px] font-bold text-ink-950 nums">
                  {requests.length}
                </span>
              </div>
              <div className="space-y-3">
                {requests.map((c) => (
                  <Card key={c.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar id={c.avatarId} size={44} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[15px] font-semibold text-fg">{c.name}</div>
                        <div className="truncate text-[13px] text-mut">Цель: {c.goal}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2.5">
                      <Button
                        full
                        size="sm"
                        onClick={() => navigate('/trainer/client/' + c.id)}
                      >
                        Принять
                      </Button>
                      <Button
                        full
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/trainer/client/' + c.id)}
                      >
                        Профиль
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Stagger.Item>
        )}

        {/* Quick actions */}
        <Stagger.Item>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              icon={ClipboardCheck}
              onClick={() => navigate('/trainer/programs')}
            >
              Создать программу
            </Button>
            <Button
              variant="secondary"
              icon={MessageSquare}
              onClick={() => navigate('/trainer/inbox')}
            >
              Ответить в чатах
            </Button>
          </div>
        </Stagger.Item>
      </Stagger>
    </Screen>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
  onClick,
  badge,
  decimals = 0,
  accent = 'volt',
}: {
  icon: LucideIcon
  value: number
  label: string
  onClick?: () => void
  badge?: boolean
  decimals?: number
  accent?: 'volt' | 'amber'
}) {
  const iconColor = accent === 'amber' ? 'text-amber' : 'text-volt'
  return (
    <Card onClick={onClick} className="relative p-4">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06]">
          <Icon size={18} strokeWidth={2.3} className={iconColor} />
        </div>
        {badge && value > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-volt px-1.5 text-[11px] font-bold text-ink-950 nums">
            {value}
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-[26px] font-extrabold leading-none tracking-tight nums text-fg">
        <CountUp to={value} decimals={decimals} />
      </div>
      <div className="mt-1 text-[12px] text-mut">{label}</div>
    </Card>
  )
}
