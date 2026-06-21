import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Video,
  TrendingUp,
  Flame,
  Target,
  Activity,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import { Avatar, Button, Card, ProgressBar, SectionHeader } from '../../components/ui'
import { LineChart, ProgressRing } from '../../components/charts'
import { Stagger, CountUp } from '../../components/motion'
import { trainerClients, progress, formSessions, program } from '../../data/mock'
import { spring } from '../../components/motion'

const STATUS_META: Record<
  'active' | 'attention' | 'new',
  { label: string; cls: string; dot: string }
> = {
  active: { label: 'Активен', cls: 'border-mint/30 bg-mint/10 text-mint', dot: 'bg-mint' },
  attention: { label: 'Требует внимания', cls: 'border-amber/30 bg-amber/10 text-amber', dot: 'bg-amber' },
  new: { label: 'Новый запрос', cls: 'border-iris/30 bg-iris/10 text-iris-400', dot: 'bg-iris' },
}

function StatTile({
  icon: Icon,
  value,
  suffix,
  label,
  color = 'text-volt',
}: {
  icon: LucideIcon
  value: number
  suffix?: string
  label: string
  color?: string
}) {
  return (
    <div className="card flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <Icon size={18} strokeWidth={2.4} className={color} />
        <div className="font-display text-[26px] font-extrabold leading-none nums">
          <CountUp to={value} />
          {suffix && <span className="text-[15px] font-bold text-mut">{suffix}</span>}
        </div>
      </div>
      <div className="text-[12px] text-mut">{label}</div>
    </div>
  )
}

export function TrainerClientDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const client = trainerClients.find((c) => c.id === id) ?? trainerClients[0]
  const status = STATUS_META[client.status]

  return (
    <Screen>
      <AppHeader
        back
        title={client.name}
        right={
          <button
            onClick={() => navigate('/trainer/chat/' + client.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-fg active:bg-white/10"
            aria-label="Написать"
          >
            <MessageSquare size={20} strokeWidth={2.2} />
          </button>
        }
      />

      <Stagger className="space-y-5 pt-2">
        {/* Header card */}
        <Stagger.Item>
          <Card className="p-4">
            <div className="flex items-center gap-3.5">
              <Avatar id={client.avatarId} size={64} online={client.status === 'active'} ring />
              <div className="min-w-0 flex-1">
                <div className="font-display text-[19px] font-extrabold leading-tight tracking-tight">
                  {client.name}
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-white/[0.06] px-2.5 py-1 text-[12px] font-medium text-fg/80">
                    <Target size={12} strokeWidth={2.4} className="text-volt" />
                    {client.goal}
                  </span>
                  <span
                    className={
                      'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[12px] font-semibold ' +
                      status.cls
                    }
                  >
                    <span className={'h-1.5 w-1.5 rounded-full ' + status.dot} />
                    {status.label}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3.5 border-t border-white/[0.06] pt-3 text-[13px] text-mut">
              План: <span className="font-semibold text-fg">{client.plan}</span> · был(а){' '}
              {client.lastActive}
            </div>
          </Card>
        </Stagger.Item>

        {/* Stats 2x2 */}
        <Stagger.Item>
          <div className="grid grid-cols-2 gap-3">
            <StatTile icon={Activity} value={client.adherence} suffix="%" label="Дисциплина" color="text-mint" />
            <StatTile icon={TrendingUp} value={client.progressPct} suffix="%" label="Прогресс" color="text-volt" />
            <StatTile icon={Flame} value={client.streak} suffix=" дн" label="Серия" color="text-amber" />
            <StatTile icon={ShieldCheck} value={client.lastFormScore} label="Посл. форма" color="text-aqua" />
          </div>
        </Stagger.Item>

        {/* Dynamics chart */}
        <Stagger.Item>
          <Card className="p-4">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <div className="font-display text-[16px] font-bold">Динамика</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[13px] text-mint">
                  <TrendingUp size={14} strokeWidth={2.4} /> оценка техники растёт
                </div>
              </div>
              <div className="rounded-xl bg-white/[0.05] px-3 py-1.5 text-right">
                <div className="text-[11px] text-mut">вес</div>
                <div className="font-display text-[15px] font-extrabold text-fg nums">
                  {client.weightDelta}
                </div>
              </div>
            </div>
            <LineChart data={progress.techniqueScore} color="volt" height={104} />
            <div className="mt-1 flex justify-between text-[11px] text-mut">
              <span>{progress.weeks[0]}</span>
              <span>{progress.weeks[progress.weeks.length - 1]}</span>
            </div>
          </Card>
        </Stagger.Item>

        {/* Recent form reviews */}
        <Stagger.Item>
          <div>
            <SectionHeader title="Последние разборы" />
            <Stagger className="space-y-3">
              {formSessions.map((fs) => {
                const issue = fs.issues[0]
                return (
                  <Stagger.Item key={fs.id}>
                    <div className="card flex items-center gap-3.5 p-3.5">
                      <ProgressRing
                        value={fs.formScore}
                        size={44}
                        stroke={5}
                        color={fs.formScore >= 90 ? 'mint' : fs.formScore >= 80 ? 'volt' : 'amber'}
                      >
                        <span className="font-display text-[13px] font-extrabold nums">{fs.formScore}</span>
                      </ProgressRing>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[15px] font-semibold text-fg">{fs.exercise}</div>
                        <div className="text-[12px] text-mut">{fs.date}</div>
                        <div className="mt-1 flex items-center gap-1.5 text-[12px]">
                          {issue ? (
                            <>
                              <AlertTriangle size={12} strokeWidth={2.4} className="shrink-0 text-amber" />
                              <span className="truncate text-amber">{issue}</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck size={12} strokeWidth={2.4} className="shrink-0 text-mint" />
                              <span className="text-mint">Техника чистая</span>
                            </>
                          )}
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        transition={spring}
                        onClick={() => navigate('/coach/' + fs.id)}
                        className="shrink-0 rounded-xl bg-white/[0.07] px-3 py-2 text-[12px] font-semibold text-fg active:bg-white/10"
                      >
                        Комментировать
                      </motion.button>
                    </div>
                  </Stagger.Item>
                )
              })}
            </Stagger>
          </div>
        </Stagger.Item>

        {/* Program */}
        <Stagger.Item>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-[12px] font-semibold text-mut">Программа клиента</div>
                <div className="mt-0.5 truncate font-display text-[16px] font-bold">{program.title}</div>
                <div className="mt-0.5 text-[13px] text-mut">
                  {program.level} · {program.weeks} нед · {program.perWeek}×/нед
                </div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                iconRight={ChevronRight}
                onClick={() => navigate('/trainer/program/' + 'tp1')}
              >
                Изменить
              </Button>
            </div>
            <div className="mt-3.5">
              <div className="mb-1.5 flex items-center justify-between text-[12px]">
                <span className="text-mut">Пройдено</span>
                <span className="font-display font-bold text-volt nums">{client.progressPct}%</span>
              </div>
              <ProgressBar value={client.progressPct} accent="volt" />
            </div>
          </Card>
        </Stagger.Item>

        {/* Bottom actions */}
        <Stagger.Item>
          <div className="space-y-3">
            <Button full size="lg" variant="ai" icon={Video} onClick={() => navigate('/trainer/chat/' + client.id)}>
              Видеозвонок
            </Button>
            <div className="flex gap-3">
              <Button full variant="secondary" onClick={() => navigate('/trainer/programs')}>
                Назначить программу
              </Button>
              <Button full variant="outline" icon={MessageSquare} onClick={() => navigate('/trainer/chat/' + client.id)}>
                Сообщение
              </Button>
            </div>
          </div>
        </Stagger.Item>
      </Stagger>
    </Screen>
  )
}
