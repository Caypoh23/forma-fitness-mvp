import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  Sparkles,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Dumbbell,
  Scale,
  BarChart3,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { SectionHeader, Segmented } from '../../components/ui'
import { ProgressRing, LineChart, BarChart } from '../../components/charts'
import { Stagger, CountUp } from '../../components/motion'
import { currentTrainer, currentUser, progress, formSessions } from '../../data/mock'

type Metric = 'bench' | 'squat'

function last(arr: number[]) {
  return arr[arr.length - 1]
}

function decimals(n: number) {
  return n % 1 === 0 ? 0 : 1
}

export function ClientProgress() {
  const navigate = useNavigate()
  const [metric, setMetric] = useState<Metric>('bench')

  const technique = progress.techniqueScore
  const techNow = last(technique)
  const techDelta = techNow - technique[0]

  const strengthData = metric === 'bench' ? progress.bench : progress.squat
  const strengthNow = last(strengthData)
  const strengthGain = +(strengthNow - strengthData[0]).toFixed(1)

  const weightNow = last(progress.bodyweight)
  const weightDelta = +(weightNow - progress.bodyweight[0]).toFixed(1)

  const volumeNow = last(progress.weeklyVolume)

  return (
    <Screen>
      {/* Title */}
      <div className="pb-4 pt-3">
        <h1 className="font-display text-[26px] font-extrabold tracking-tight">Прогресс</h1>
        <p className="text-[13px] text-mut">
          Динамика за {currentUser.weeksWith} недель · тренер {currentTrainer.firstName}
        </p>
      </div>

      <Stagger className="space-y-4">
        {/* HERO — Technique score */}
        <Stagger.Item>
          <div className="card relative overflow-hidden p-5">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-volt/10 blur-3xl" />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-mut">
                  <Sparkles size={14} className="text-volt" strokeWidth={2.4} />
                  Оценка техники
                </div>
                <div className="mt-1.5 flex items-end gap-2">
                  <span className="font-display text-[56px] font-extrabold leading-none tracking-tight nums">
                    <CountUp to={techNow} />
                  </span>
                  <span className="mb-2 text-lg font-bold text-mut">/100</span>
                </div>
              </div>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-1 text-[12px] font-bold text-mint">
                <TrendingUp size={13} strokeWidth={2.6} />
                +{techDelta} за 8 нед
              </span>
            </div>

            <div className="relative mt-4">
              <LineChart data={technique} color="volt" height={120} />
              <div className="mt-2 flex justify-between px-1">
                {progress.weeks.map((w) => (
                  <span key={w} className="text-[10px] font-medium text-mut">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Stagger.Item>

        {/* Strength */}
        <Stagger.Item>
          <div className="card p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aqua/15 text-aqua">
                  <Dumbbell size={18} strokeWidth={2.4} />
                </div>
                <span className="font-display text-[17px] font-bold tracking-tight">Сила</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[26px] font-extrabold leading-none text-aqua nums">
                  <CountUp to={strengthNow} decimals={decimals(strengthNow)} />
                </span>
                <span className="text-[13px] font-semibold text-mut">кг</span>
              </div>
            </div>

            <Segmented<Metric>
              options={[
                { value: 'bench', label: 'Жим' },
                { value: 'squat', label: 'Присед' },
              ]}
              value={metric}
              onChange={setMetric}
            />

            <div className="mt-2.5 flex items-center gap-1.5 text-[12px]">
              <span className="inline-flex items-center gap-1 font-bold text-mint">
                <TrendingUp size={13} strokeWidth={2.6} />+{strengthGain} кг
              </span>
              <span className="text-mut">1ПМ за 8 недель</span>
            </div>

            <div className="mt-3">
              <LineChart data={strengthData} color="aqua" height={110} />
            </div>
          </div>
        </Stagger.Item>

        {/* Bodyweight */}
        <Stagger.Item>
          <div className="card p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-iris/15 text-iris">
                  <Scale size={18} strokeWidth={2.4} />
                </div>
                <span className="font-display text-[17px] font-bold tracking-tight">Вес тела</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[26px] font-extrabold leading-none text-iris nums">
                    <CountUp to={weightNow} decimals={1} />
                  </span>
                  <span className="text-[13px] font-semibold text-mut">кг</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-2 py-1 text-[12px] font-bold text-mint">
                  <ArrowUp size={12} strokeWidth={2.8} />
                  {weightDelta} кг
                </span>
              </div>
            </div>
            <LineChart data={progress.bodyweight} color="iris" height={110} />
          </div>
        </Stagger.Item>

        {/* Weekly volume */}
        <Stagger.Item>
          <div className="card p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-volt/15 text-volt">
                  <BarChart3 size={18} strokeWidth={2.4} />
                </div>
                <span className="font-display text-[17px] font-bold tracking-tight">Объём за неделю</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[22px] font-extrabold leading-none nums">
                  {(volumeNow / 1000).toFixed(1)}
                </span>
                <span className="text-[13px] font-semibold text-mut">т</span>
              </div>
            </div>
            <BarChart data={progress.weeklyVolume} labels={progress.weeks} color="volt" height={120} />
            <div className="mt-2 text-center text-[11px] text-mut">тоннаж, кг</div>
          </div>
        </Stagger.Item>

        {/* Measurements */}
        <Stagger.Item>
          <div>
            <SectionHeader title="Замеры" />
            <div className="grid grid-cols-2 gap-3">
              {progress.measurements.map((m) => {
                const up = m.delta > 0
                return (
                  <div key={m.name} className="card p-4">
                    <div className="text-[13px] font-semibold text-mut">{m.name}</div>
                    <div className="mt-1.5 flex items-end justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-[28px] font-extrabold leading-none nums">
                          <CountUp to={m.value} />
                        </span>
                        <span className="text-[12px] font-semibold text-mut">{m.unit}</span>
                      </div>
                      <span
                        className={
                          'inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[12px] font-bold ' +
                          (up ? 'bg-mint/15 text-mint' : 'bg-amber/15 text-amber')
                        }
                      >
                        {up ? (
                          <ArrowUp size={12} strokeWidth={2.8} />
                        ) : (
                          <ArrowDown size={12} strokeWidth={2.8} />
                        )}
                        {up ? '+' : ''}
                        {m.delta}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Stagger.Item>

        {/* Recent form sessions */}
        <Stagger.Item>
          <div>
            <SectionHeader title="Последние разборы" />
            <div className="space-y-3">
              {formSessions.map((fs) => (
                <button
                  key={fs.id}
                  onClick={() => navigate('/client/chat/ai')}
                  className="card flex w-full items-center gap-3.5 p-3.5 text-left transition-colors active:bg-ink-800"
                >
                  <ProgressRing
                    value={fs.formScore}
                    size={48}
                    stroke={5}
                    color={fs.formScore >= 90 ? 'mint' : 'volt'}
                  >
                    <span className="font-display text-[15px] font-extrabold nums">{fs.formScore}</span>
                  </ProgressRing>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-[15px] font-bold">{fs.exercise}</div>
                    <div className="truncate text-[12px] text-mut">{fs.date}</div>
                    <div className="mt-0.5 text-[12px] font-medium text-fg/70">
                      {fs.reps} повт · {fs.durationMin} мин
                    </div>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-white/30" />
                </button>
              ))}
            </div>
          </div>
        </Stagger.Item>
      </Stagger>
    </Screen>
  )
}
