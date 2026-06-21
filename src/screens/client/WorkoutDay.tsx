import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Dumbbell, Clock, Flame, Sparkles, Info, Play, Repeat, Timer } from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import { Img, Button, Sheet } from '../../components/ui'
import { Stagger, CountUp, spring } from '../../components/motion'
import { program, todayWorkout } from '../../data/mock'
import { img } from '../../lib/images'
import type { Exercise } from '../../data/types'

export function WorkoutDay() {
  const navigate = useNavigate()
  const { dayId } = useParams()
  const day = useMemo(
    () => program.days.find((d) => d.id === dayId) ?? todayWorkout,
    [dayId],
  )

  const [openTips, setOpenTips] = useState<Exercise | null>(null)

  const startExercise = day.exercises.find((e) => e.hasAI) ?? day.exercises[0]

  return (
    <>
      <AppHeader back title={day.title} subtitle={day.focus} />

      <Screen className="pb-28 pt-4">
        {/* Summary card: 3 metrics */}
        <div className="card mb-5 grid grid-cols-3 divide-x divide-white/[0.06] p-1">
          <Metric icon={Dumbbell} value={day.exercises.length} label="упражнений" />
          <Metric icon={Clock} value={day.durationMin} label="минут" />
          <Metric icon={Flame} value={day.kcal} label="ккал" accent="amber" />
        </div>

        {/* Exercise list */}
        <Stagger className="space-y-3">
          {day.exercises.map((ex, i) => (
            <Stagger.Item key={ex.id}>
              <motion.div
                whileTap={{ scale: 0.985 }}
                transition={spring}
                onClick={() => setOpenTips(ex)}
                className="card flex cursor-pointer items-center gap-3.5 p-3 active:bg-ink-800"
              >
                {/* Thumb */}
                <div className="relative shrink-0">
                  <Img
                    src={img(ex.imageId, { w: 200, q: 70 })}
                    className="h-16 w-16 rounded-2xl"
                  />
                  <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-lg bg-black/55 text-[11px] font-bold text-white backdrop-blur">
                    {i + 1}
                  </span>
                </div>

                {/* Center */}
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-[15px] font-semibold leading-tight text-fg">
                    {ex.name}
                  </div>
                  <div className="mt-0.5 truncate text-[13px] text-mut">{ex.muscle}</div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-mut">
                      <Repeat size={11} strokeWidth={2.4} />
                      {ex.sets} × {ex.reps}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-mut">
                      <Timer size={11} strokeWidth={2.4} />
                      отдых {ex.rest}
                    </span>
                    {ex.hasAI && (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-volt/15 px-2 py-0.5 text-[11px] font-semibold text-volt">
                        <Sparkles size={11} strokeWidth={2.4} />
                        AI-разбор
                      </span>
                    )}
                  </div>
                </div>

                {/* Right action */}
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  {ex.hasAI ? (
                    <Button
                      variant="ai"
                      size="sm"
                      icon={Sparkles}
                      onClick={() => navigate('/coach/' + ex.id)}
                    >
                      Разбор
                    </Button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      transition={spring}
                      onClick={() => setOpenTips(ex)}
                      aria-label="Подсказки по технике"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-mut active:text-fg"
                    >
                      <Info size={18} strokeWidth={2.2} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </Stagger.Item>
          ))}
        </Stagger>
      </Screen>

      {/* Sticky CTA */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-ink-950 via-ink-950/90 to-transparent px-5 pb-6 pt-8">
        <div className="pointer-events-auto">
          <Button full size="lg" icon={Play} onClick={() => navigate('/coach/' + startExercise.id)}>
            Начать с AI-разбора
          </Button>
        </div>
      </div>

      {/* Technique tips sheet */}
      <Sheet
        open={!!openTips}
        onClose={() => setOpenTips(null)}
        title={openTips ? 'Техника: ' + openTips.name : undefined}
      >
        {openTips && (
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Img
                src={img(openTips.imageId, { w: 200, q: 70 })}
                className="h-14 w-14 rounded-2xl"
              />
              <div className="min-w-0">
                <div className="text-[13px] text-mut">{openTips.muscle}</div>
                <div className="text-[13px] font-medium text-fg">
                  {openTips.sets} × {openTips.reps} · отдых {openTips.rest}
                </div>
              </div>
            </div>

            <ul className="space-y-2.5">
              {openTips.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-3.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-volt/15 text-[11px] font-bold text-volt">
                    {i + 1}
                  </span>
                  <span className="text-[14px] leading-snug text-fg">{tip}</span>
                </li>
              ))}
            </ul>

            {openTips.hasAI && (
              <Button
                full
                variant="ai"
                size="lg"
                icon={Sparkles}
                className="mt-5"
                onClick={() => {
                  const id = openTips.id
                  setOpenTips(null)
                  navigate('/coach/' + id)
                }}
              >
                Разобрать технику с AI
              </Button>
            )}
          </div>
        )}
      </Sheet>
    </>
  )
}

/* ───────────────────────── Summary metric ───────────────────────── */

function Metric({
  icon: Icon,
  value,
  label,
  accent = 'volt',
}: {
  icon: typeof Dumbbell
  value: number
  label: string
  accent?: 'volt' | 'amber'
}) {
  return (
    <div className="flex flex-col items-center justify-center px-2 py-3">
      <Icon
        size={18}
        strokeWidth={2.4}
        className={accent === 'amber' ? 'text-amber' : 'text-volt'}
      />
      <div className="mt-1.5 font-display text-2xl font-extrabold tracking-tight nums">
        <CountUp to={value} />
      </div>
      <div className="text-[11px] text-mut">{label}</div>
    </div>
  )
}
