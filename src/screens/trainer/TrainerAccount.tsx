import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Wallet,
  ClipboardList,
  Eye,
  Pencil,
  Bell,
  MessageSquareText,
  Globe,
  LifeBuoy,
  Repeat,
  LogOut,
  ChevronRight,
  Star,
  Users,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Screen } from '../../components/layout/Screen'
import { Avatar, Card, Toggle, Divider, VerifiedBadge, Button } from '../../components/ui'
import { Stagger } from '../../components/motion'
import { featuredTrainer, earnings, trainerPrograms } from '../../data/mock'
import { sum } from '../../lib/format'

export function TrainerAccount() {
  const navigate = useNavigate()
  const [notif, setNotif] = useState(true)
  const t = featuredTrainer
  const programClients = trainerPrograms.reduce((s, p) => s + p.clients, 0)

  return (
    <Screen>
      <div className="pb-4 pt-3">
        <h1 className="font-display text-[26px] font-extrabold tracking-tight">Профиль</h1>
      </div>

      <Stagger className="space-y-4">
        {/* Profile summary */}
        <Stagger.Item>
          <Card className="p-4">
            <div className="flex items-center gap-3.5">
              <Avatar id={t.avatarId} size={60} ring online />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-display text-[18px] font-bold">{t.name}</span>
                  <VerifiedBadge />
                </div>
                <div className="truncate text-[13px] text-mut">{t.headline}</div>
                <div className="mt-1 flex items-center gap-3 text-[12px] text-mut">
                  <span className="inline-flex items-center gap-1">
                    <Star size={12} className="fill-amber text-amber" /> {t.rating}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users size={12} /> {t.clients}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3.5 flex gap-2.5">
              <Button full variant="secondary" size="sm" icon={Pencil} onClick={() => navigate('/trainer/profile/edit')}>
                Редактировать
              </Button>
              <Button full variant="outline" size="sm" icon={Eye} onClick={() => navigate('/client/trainer/' + t.id)}>
                Превью
              </Button>
            </div>
          </Card>
        </Stagger.Item>

        {/* Finance — moved off the home queue, lives here */}
        <Stagger.Item>
          <Card onClick={() => navigate('/trainer/finance')} className="p-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-volt/15 text-volt">
                <Wallet size={24} strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-[16px] font-bold">Финансы</span>
                  <span className="inline-flex items-center gap-0.5 text-[12px] font-semibold text-mint">
                    <TrendingUp size={13} /> +18%
                  </span>
                </div>
                <div className="truncate text-[13px] text-mut">
                  К выводу <span className="font-semibold text-fg">{sum(earnings.balance)}</span>
                </div>
              </div>
              <ChevronRight size={18} className="ml-1 shrink-0 text-white/30" />
            </div>
          </Card>
        </Stagger.Item>

        {/* Content — moved off the tab bar, lives here */}
        <Stagger.Item>
          <Card onClick={() => navigate('/trainer/programs')} className="p-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-iris/20 text-iris">
                <ClipboardList size={24} strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-[16px] font-bold">Программы и меню</div>
                <div className="text-[13px] text-mut">
                  {trainerPrograms.length} программ · {programClients} клиентов
                </div>
              </div>
              <ChevronRight size={18} className="shrink-0 text-white/30" />
            </div>
          </Card>
        </Stagger.Item>

        {/* Settings */}
        <Stagger.Item>
          <Card className="px-4">
            <Row icon={Bell} title="Уведомления">
              <Toggle checked={notif} onChange={setNotif} />
            </Row>
            <Divider />
            <Row icon={MessageSquareText} title="Шаблоны ответов" onClick={() => navigate('/trainer/inbox')}>
              <ChevronRight size={18} className="text-white/30" />
            </Row>
            <Divider />
            <Row icon={Globe} title="Язык">
              <span className="text-[13px] text-mut">Русский</span>
            </Row>
            <Divider />
            <Row icon={LifeBuoy} title="Помощь">
              <ChevronRight size={18} className="text-white/30" />
            </Row>
          </Card>
        </Stagger.Item>

        <Stagger.Item>
          <Button full variant="secondary" icon={Repeat} onClick={() => navigate('/')}>
            Сменить роль
          </Button>
        </Stagger.Item>
        <Stagger.Item>
          <button
            onClick={() => navigate('/')}
            className="flex w-full items-center justify-center gap-2 py-2 text-[14px] font-semibold text-coral active:opacity-70"
          >
            <LogOut size={16} /> Выйти
          </button>
        </Stagger.Item>
      </Stagger>
    </Screen>
  )
}

function Row({
  icon: Icon,
  title,
  onClick,
  children,
}: {
  icon: LucideIcon
  title: string
  onClick?: () => void
  children: ReactNode
}) {
  const inner = (
    <div className="flex w-full items-center gap-3 py-3.5 text-left">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-fg">
        <Icon size={18} strokeWidth={2.2} />
      </div>
      <span className="flex-1 text-[15px] font-semibold text-fg">{title}</span>
      {children}
    </div>
  )
  return onClick ? (
    <button onClick={onClick} className="block w-full active:opacity-70">
      {inner}
    </button>
  ) : (
    inner
  )
}
