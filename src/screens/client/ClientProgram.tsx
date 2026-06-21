import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Play,
  Dumbbell,
  Clock,
  Flame,
  ChevronRight,
  ScanLine,
  CalendarDays,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { Img, Card, ProgressBar, SectionHeader, CheckDot } from '../../components/ui'
import { Stagger } from '../../components/motion'
import { program, todayWorkout } from '../../data/mock'
import { img } from '../../lib/images'
import type { WorkoutDay } from '../../data/types'

function dayHasAI(day: WorkoutDay) {
  return day.exercises.some((e) => e.hasAI)
}

export function ClientProgram() {
  const navigate = useNavigate()

  const currentWeek = Math.max(1, Math.round((program.progressPct / 100) * program.weeks))
  const todayHasAI = dayHasAI(todayWorkout)
  const todayCover = todayWorkout.exercises[0]?.imageId ?? program.coverId

  return (
    <Screen>
      {/* Title */}
      <div className="pb-4 pt-3">
        <h1 className="font-display text-[26px] font-extrabold tracking-tight">Тренировка</h1>
        <p className="text-[13px] text-mut">{program.title}</p>
      </div>

      <Stagger className="space-y-5">
        {/* Program card */}
        <Stagger.Item>
          <Card className="overflow-hidden p-0">
            <div className="flex gap-3.5 p-3.5">
              <Img
                src={img(program.coverId, { w: 400, q: 70 })}
                className="h-24 w-24 shrink-0 rounded-2xl"
              />
              <div className="min-w-0 flex-1">
                <div className="font-display text-[18px] font-bold leading-tight tracking-tight">
                  {program.title}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-mut">
                  <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-medium text-fg/80">
                    {program.level}
                  </span>
                  <span>
                    {program.weeks} нед · {program.perWeek}×/нед
                  </span>
                </div>
                <div className="mt-3">
                  <ProgressBar value={program.progressPct} />
                  <div className="mt-1.5 flex items-center justify-between text-[12px] text-mut">
                    <span>
                      Неделя {currentWeek} из {program.weeks}
                    </span>
                    <span className="font-semibold text-volt nums">{program.progressPct}%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Stagger.Item>

        {/* Today hero */}
        <Stagger.Item>
          <div>
            <SectionHeader title="Сегодня" />
            <Card
              onClick={() => navigate('/client/workout/' + todayWorkout.id)}
              className="relative h-56"
            >
              <Img
                src={img(todayCover, { w: 800, q: 70 })}
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="rounded-full bg-volt px-2.5 py-1 text-[11px] font-bold text-ink-950">
                  СЕГОДНЯ
                </span>
                {todayHasAI && (
                  <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                    <Sparkles size={12} className="text-volt" /> AI-разбор
                  </span>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="font-display text-[22px] font-extrabold leading-tight tracking-tight">
                  {todayWorkout.title}
                </div>
                <div className="mt-1 flex items-center gap-3 text-[13px] text-mut">
                  <span className="flex items-center gap-1">
                    <Dumbbell size={13} strokeWidth={2.4} /> {todayWorkout.exercises.length} упр.
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} strokeWidth={2.4} /> {todayWorkout.durationMin} мин
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={13} strokeWidth={2.4} /> {todayWorkout.kcal} ккал
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-2xl bg-volt px-4 py-2.5 text-ink-950">
                  <span className="font-bold">Начать</span>
                  <Play size={18} className="fill-ink-950" />
                </div>
              </div>
            </Card>
          </div>
        </Stagger.Item>

        {/* All days */}
        <Stagger.Item>
          <div>
            <SectionHeader title="Программа · все дни" />
            <Stagger className="space-y-3">
              {program.days.map((day, i) => {
                const hasAI = dayHasAI(day)
                return (
                  <Stagger.Item key={day.id}>
                    <Card
                      onClick={() => navigate('/client/workout/' + day.id)}
                      className="flex items-center gap-3.5 p-3.5"
                    >
                      {day.done ? (
                        <CheckDot done />
                      ) : (
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] font-display text-[13px] font-bold text-mut nums">
                          {i + 1}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-display text-[15px] font-bold leading-tight">
                            {day.title}
                          </span>
                          {hasAI && (
                            <span className="flex shrink-0 items-center gap-1 rounded-md bg-ai-grad/15 px-1.5 py-0.5 text-[10px] font-semibold text-grad-ai">
                              <Sparkles size={10} /> AI
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-[12px] text-mut">
                          <span className="truncate">{day.focus}</span>
                          <span className="text-white/20">·</span>
                          <span className="flex shrink-0 items-center gap-1">
                            <Clock size={11} strokeWidth={2.4} /> {day.durationMin} мин
                          </span>
                          <span className="flex shrink-0 items-center gap-1">
                            <Flame size={11} strokeWidth={2.4} /> {day.kcal}
                          </span>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <span className="rounded-lg bg-white/[0.06] px-2 py-1 text-[11px] font-semibold text-fg/80">
                          {day.day}
                        </span>
                        <ChevronRight size={18} className="text-white/30" />
                      </div>
                    </Card>
                  </Stagger.Item>
                )
              })}
            </Stagger>
          </div>
        </Stagger.Item>

        {/* AI form-analysis info */}
        <Stagger.Item>
          <div className="relative overflow-hidden rounded-3xl bg-ai-grad p-[1.5px]">
            <div className="flex items-center gap-3.5 rounded-[calc(1.5rem-1.5px)] bg-ink-900/85 p-4 backdrop-blur">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ai-grad text-white shadow-glow-iris">
                <ScanLine size={24} strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-[15px] font-bold">AI-разбор техники</div>
                <div className="text-[13px] leading-snug text-mut">
                  Наведи камеру на упражнение — ИИ считает повторы и подскажет, где поправить форму.
                </div>
              </div>
            </div>
          </div>
        </Stagger.Item>

        {/* Footer hint */}
        <Stagger.Item>
          <div className="flex items-center justify-center gap-1.5 pt-1 text-[12px] text-mut">
            <CalendarDays size={13} strokeWidth={2.4} />
            <span>
              {program.perWeek} тренировки в неделю · {program.weeks} недель
            </span>
          </div>
        </Stagger.Item>
      </Stagger>
    </Screen>
  )
}
