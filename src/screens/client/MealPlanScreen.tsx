import { useMemo, useState } from 'react'
import { Plus, Flame, Check } from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import { Img, Button, ProgressBar, CheckDot, Sheet } from '../../components/ui'
import { ProgressRing } from '../../components/charts'
import { Stagger, CountUp } from '../../components/motion'
import { mealPlan } from '../../data/mock'
import { img } from '../../lib/images'
import type { Meal } from '../../data/types'

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const
const TODAY_INDEX = 2 // Среда — соответствует currentUser-контексту

type MacroKey = 'protein' | 'fat' | 'carbs'

const MACROS: { key: MacroKey; label: string; accent: 'mint' | 'amber' | 'ai' }[] = [
  { key: 'protein', label: 'Белки', accent: 'mint' },
  { key: 'fat', label: 'Жиры', accent: 'amber' },
  { key: 'carbs', label: 'Углеводы', accent: 'ai' },
]

export function MealPlanScreen() {
  const [day, setDay] = useState(TODAY_INDEX)
  const [meals, setMeals] = useState<Meal[]>(mealPlan.meals)
  const [active, setActive] = useState<Meal | null>(null)

  const eaten = useMemo(
    () => meals.filter((m) => m.done).reduce((s, m) => s + m.kcal, 0),
    [meals],
  )
  const eatenMacros = useMemo(() => {
    const done = meals.filter((m) => m.done)
    return {
      protein: done.reduce((s, m) => s + m.protein, 0),
      fat: done.reduce((s, m) => s + m.fat, 0),
      carbs: done.reduce((s, m) => s + m.carbs, 0),
    }
  }, [meals])

  const target = mealPlan.target
  const kcalPct = Math.round((eaten / target.kcal) * 100)
  const left = Math.max(0, target.kcal - eaten)

  const toggle = (id: string) =>
    setMeals((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)))

  return (
    <Screen gutter={false} padBottom>
      <AppHeader back title="Питание" subtitle={mealPlan.dayLabel} />

      <div className="space-y-4 px-5 pt-3">
        {/* Daily target card */}
        <div className="card p-5">
          <div className="flex items-center gap-5">
            <ProgressRing value={kcalPct} size={92} stroke={9} color="amber">
              <div className="text-center leading-none">
                <div className="font-display text-[22px] font-extrabold nums">
                  <CountUp to={eaten} />
                </div>
                <div className="mt-0.5 text-[10px] font-medium text-mut">ккал</div>
              </div>
            </ProgressRing>

            <div className="min-w-0 flex-1 space-y-3">
              {MACROS.map((mac) => {
                const value = eatenMacros[mac.key]
                const goal = target[mac.key]
                const pct = Math.min(100, Math.round((value / goal) * 100))
                return (
                  <div key={mac.key}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <span className="text-[12px] font-medium text-mut">{mac.label}</span>
                      <span className="font-display text-[12px] font-bold nums">
                        {value}
                        <span className="text-mut"> / {goal} г</span>
                      </span>
                    </div>
                    <ProgressBar value={pct} accent={mac.accent} height={6} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3.5">
            <div className="flex items-center gap-1.5 text-[13px] text-mut">
              <Flame size={15} className="text-amber" strokeWidth={2.4} />
              съедено{' '}
              <span className="font-semibold text-fg nums">{eaten}</span> / {target.kcal} ккал
            </div>
            <div className="text-[13px] text-mut">
              осталось <span className="font-display font-bold text-volt nums">{left}</span>
            </div>
          </div>
        </div>

        {/* Day chips */}
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
          {DAYS.map((d, i) => {
            const isActive = i === day
            const isToday = i === TODAY_INDEX
            return (
              <button
                key={d}
                onClick={() => setDay(i)}
                className={`flex shrink-0 flex-col items-center rounded-2xl border px-4 py-2 transition-colors ${
                  isActive
                    ? 'border-volt bg-volt text-ink-950'
                    : 'border-white/10 bg-white/[0.04] text-mut active:text-fg'
                }`}
              >
                <span className="text-[13px] font-semibold">{d}</span>
                <span
                  className={`mt-0.5 text-[10px] font-medium ${
                    isActive ? 'text-ink-950/70' : isToday ? 'text-volt' : 'text-mut/70'
                  }`}
                >
                  {isToday ? 'сегодня' : ' '}
                </span>
              </button>
            )
          })}
        </div>

        {/* Meals */}
        <Stagger className="space-y-3">
          {meals.map((meal) => (
            <Stagger.Item key={meal.id}>
              <button
                onClick={() => setActive(meal)}
                className="card flex w-full items-center gap-3.5 p-3 text-left active:bg-ink-800"
              >
                <Img
                  src={img(meal.imageId, { w: 240, q: 70 })}
                  className="h-[72px] w-[72px] shrink-0 rounded-2xl"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-mut">
                    {meal.type}
                  </div>
                  <div className="mt-0.5 truncate font-display text-[15px] font-semibold text-fg">
                    {meal.title}
                  </div>
                  <div className="mt-1 truncate text-[12px] text-mut nums">
                    <span className="font-semibold text-fg/80">{meal.kcal}</span> ккал · Б {meal.protein} · Ж {meal.fat} · У {meal.carbs}
                  </div>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggle(meal.id)
                  }}
                  className="shrink-0 self-center p-1"
                >
                  <CheckDot done={meal.done} />
                </div>
              </button>
            </Stagger.Item>
          ))}
        </Stagger>

        {/* Add meal */}
        <Button full variant="outline" icon={Plus}>
          Добавить приём пищи
        </Button>
      </div>

      {/* Meal detail sheet */}
      <Sheet open={!!active} onClose={() => setActive(null)} title={active?.title}>
        {active && (
          <div>
            <div className="mb-4 flex items-center gap-3 text-[13px] text-mut">
              <span className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-fg/80">
                {active.type}
              </span>
              <span className="nums">
                <span className="font-display font-bold text-fg">{active.kcal}</span> ккал
              </span>
              <span className="text-mut nums">
                Б {active.protein} · Ж {active.fat} · У {active.carbs}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl">
              <Img src={img(active.imageId, { w: 800, q: 70 })} className="h-44 w-full" />
            </div>

            <div className="mt-5 space-y-2.5">
              {active.items.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-volt/15 text-volt">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-[15px] text-fg">{item}</span>
                </div>
              ))}
            </div>

            <Button
              full
              variant={active.done ? 'secondary' : 'primary'}
              className="mt-6"
              icon={active.done ? undefined : Check}
              onClick={() => {
                toggle(active.id)
                setActive((m) => (m ? { ...m, done: !m.done } : m))
              }}
            >
              {active.done ? 'Отметить как не съеденное' : 'Отметить съеденным'}
            </Button>
          </div>
        )}
      </Sheet>
    </Screen>
  )
}
