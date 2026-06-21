import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell,
  Dumbbell,
  Moon,
  Globe,
  CreditCard,
  LifeBuoy,
  Info,
  Repeat,
  LogOut,
  ChevronRight,
  Flame,
  Activity,
  type LucideIcon,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import { Avatar, Button, Card, Toggle, Divider } from '../../components/ui'
import { Stagger, CountUp } from '../../components/motion'
import { currentUser, currentTrainer } from '../../data/mock'
import { sum } from '../../lib/format'

type StatItem = { icon: LucideIcon; label: string; value: number }

const STATS: StatItem[] = [
  { icon: Flame, label: 'Серия', value: currentUser.streak },
  { icon: Dumbbell, label: 'Тренировок', value: 27 },
  { icon: Activity, label: 'Ср. форма', value: 89 },
]

function IconCircle({ icon: Icon, accent }: { icon: LucideIcon; accent?: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06]">
      <Icon size={19} strokeWidth={2.3} className={accent ?? 'text-mut'} />
    </span>
  )
}

export function ClientProfile() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true)
  const [reminders, setReminders] = useState(true)
  const [darkTheme, setDarkTheme] = useState(true)

  return (
    <Screen>
      <AppHeader back title="Профиль" />

      {/* Profile hero */}
      <div className="flex flex-col items-center pb-6 pt-4 text-center">
        <Avatar id={currentUser.avatarId} size={84} ring online />
        <h1 className="mt-3.5 font-display text-[22px] font-extrabold tracking-tight text-fg">
          {currentUser.name}
        </h1>
        <div className="mt-2">
          <span className="inline-flex items-center rounded-full bg-volt/15 px-3 py-1 text-[13px] font-semibold text-volt">
            {currentUser.goal}
          </span>
        </div>
        <p className="mt-2.5 text-[13px] text-mut">
          {currentUser.city} · Уровень: {currentUser.level} · {currentUser.weeksWith} нед в FORMA
        </p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-3">
        {STATS.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="card flex flex-col items-center gap-1.5 px-2 py-4">
              <Icon size={18} strokeWidth={2.3} className="text-volt" />
              <div className="font-display text-2xl font-extrabold tracking-tight text-fg nums">
                <CountUp to={s.value} />
              </div>
              <div className="text-[12px] font-medium text-mut">{s.label}</div>
            </div>
          )
        })}
      </div>

      {/* Subscription card */}
      <div className="mt-4">
        <div className="mb-2.5 text-[13px] font-semibold uppercase tracking-wide text-mut">
          Текущая подписка
        </div>
        <Card onClick={() => navigate('/client/trainer/alisher')} className="p-4">
          <div className="flex items-center gap-3">
            <Avatar id={currentTrainer.avatarId} size={48} online />
            <div className="min-w-0 flex-1">
              <div className="truncate font-display text-[16px] font-bold text-fg">
                {currentTrainer.name}
              </div>
              <div className="mt-0.5 truncate text-[13px] text-mut">
                Прогресс · {sum(750000)}/мес
              </div>
            </div>
            <span className="rounded-full bg-mint/15 px-2.5 py-1 text-[11px] font-semibold text-mint">
              Активна
            </span>
          </div>
          <Divider className="my-3.5" />
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-mut">Продлевается 21 июля</span>
            <span className="flex items-center gap-0.5 text-[14px] font-semibold text-fg">
              Управлять
              <ChevronRight size={17} className="text-white/40" />
            </span>
          </div>
        </Card>
      </div>

      {/* Settings */}
      <div className="mt-5">
        <div className="mb-2.5 text-[13px] font-semibold uppercase tracking-wide text-mut">
          Настройки
        </div>
        <Stagger className="space-y-3">
          <Stagger.Item>
            <div className="card px-4">
              <SettingRow icon={Bell} accent="text-volt" title="Уведомления">
                <Toggle checked={notifications} onChange={setNotifications} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Dumbbell} accent="text-volt" title="Напоминания о тренировках">
                <Toggle checked={reminders} onChange={setReminders} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Moon} title="Тёмная тема">
                <Toggle checked={darkTheme} onChange={setDarkTheme} />
              </SettingRow>
            </div>
          </Stagger.Item>

          <Stagger.Item>
            <div className="card px-4">
              <SettingRow icon={Globe} title="Язык" onClick={() => {}}>
                <span className="flex items-center gap-1 text-[14px] text-mut">
                  Русский
                  <ChevronRight size={17} className="text-white/30" />
                </span>
              </SettingRow>
              <Divider />
              <SettingRow
                icon={CreditCard}
                title="Способы оплаты"
                onClick={() => navigate('/client/subscribe/alisher')}
              >
                <ChevronRight size={18} className="text-white/30" />
              </SettingRow>
              <Divider />
              <SettingRow icon={LifeBuoy} title="Помощь" onClick={() => navigate('/client/chat/ai')}>
                <ChevronRight size={18} className="text-white/30" />
              </SettingRow>
              <Divider />
              <SettingRow icon={Info} title="О приложении" onClick={() => {}}>
                <span className="flex items-center gap-1 text-[14px] text-mut">
                  v1.0
                  <ChevronRight size={17} className="text-white/30" />
                </span>
              </SettingRow>
            </div>
          </Stagger.Item>
        </Stagger>
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <Button full variant="secondary" icon={Repeat} onClick={() => navigate('/')}>
          Сменить роль
        </Button>
        <Button full variant="ghost" icon={LogOut} className="text-coral" onClick={() => navigate('/')}>
          Выйти
        </Button>
      </div>
    </Screen>
  )
}

function SettingRow({
  icon,
  accent,
  title,
  onClick,
  children,
}: {
  icon: LucideIcon
  accent?: string
  title: string
  onClick?: () => void
  children: React.ReactNode
}) {
  const Inner = (
    <div className="flex w-full items-center gap-3 py-3.5 text-left">
      <IconCircle icon={icon} accent={accent} />
      <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-fg">{title}</span>
      {children}
    </div>
  )
  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full active:opacity-70">
        {Inner}
      </button>
    )
  }
  return Inner
}
