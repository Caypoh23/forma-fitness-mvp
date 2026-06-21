import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Users, ChevronRight, Dumbbell, UtensilsCrossed } from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { Img, Segmented, Sheet, Button, ListRow } from '../../components/ui'
import { Stagger } from '../../components/motion'
import { trainerPrograms, trainerMealPlans } from '../../data/mock'
import { img } from '../../lib/images'

type Tab = 'programs' | 'meals'

export function TrainerPrograms() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('programs')
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <Screen gutter={false} className="relative min-h-[100dvh]">
      {/* Header */}
      <div className="px-5 pt-3">
        <h1 className="font-display text-[26px] font-extrabold tracking-tight">Контент</h1>
        <p className="text-[13px] text-mut">Программы и меню</p>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-ink-950/90 px-5 pb-3 pt-3 backdrop-blur-xl">
        <Segmented<Tab>
          options={[
            { value: 'programs', label: 'Программы' },
            { value: 'meals', label: 'Меню' },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {/* Programs */}
      {tab === 'programs' && (
        <Stagger className="space-y-3 px-5 pb-28">
          {trainerPrograms.map((p) => (
            <Stagger.Item key={p.id}>
              <button
                onClick={() => navigate('/trainer/program/' + p.id)}
                className="card flex w-full items-center gap-3.5 p-3 text-left transition-colors active:bg-ink-800"
              >
                <Img
                  src={img(p.coverId, { w: 240 })}
                  className="h-20 w-20 shrink-0 rounded-2xl"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-[16px] font-bold leading-tight">{p.title}</div>
                  <div className="mt-1 truncate text-[12.5px] text-mut">
                    {p.level} · {p.weeks} нед × {p.perWeek}/нед
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-lg bg-white/[0.06] px-2 py-1 text-[11px] font-medium text-fg/80">
                    <Users size={12} strokeWidth={2.4} /> {p.clients} клиентов
                  </span>
                </div>
                <ChevronRight size={20} className="shrink-0 text-white/30" />
              </button>
            </Stagger.Item>
          ))}
        </Stagger>
      )}

      {/* Meals */}
      {tab === 'meals' && (
        <Stagger className="space-y-3 px-5 pb-28">
          {trainerMealPlans.map((m) => (
            <Stagger.Item key={m.id}>
              <div className="card flex w-full items-center gap-3.5 p-3 text-left">
                <Img
                  src={img(m.imageId, { w: 240 })}
                  className="h-20 w-20 shrink-0 rounded-2xl"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-[16px] font-bold leading-tight">{m.title}</div>
                  <div className="mt-1 truncate text-[12.5px] text-mut">{m.sub}</div>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-lg bg-white/[0.06] px-2 py-1 text-[11px] font-medium text-fg/80">
                    <Users size={12} strokeWidth={2.4} /> {m.clients} клиентов
                  </span>
                </div>
                <ChevronRight size={20} className="shrink-0 text-white/30" />
              </div>
            </Stagger.Item>
          ))}
        </Stagger>
      )}

      {/* Floating create button */}
      <div className="pointer-events-none sticky bottom-4 z-30 flex justify-end px-5">
        <div className="pointer-events-auto">
          <Button variant="ai" icon={Plus} size="lg" onClick={() => setSheetOpen(true)}>
            Создать
          </Button>
        </div>
      </div>

      {/* Create sheet */}
      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Что создаём?">
        <div className="space-y-2.5">
          <button
            onClick={() => {
              setSheetOpen(false)
              navigate('/trainer/program/new')
            }}
            className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] p-3.5 transition-colors active:bg-white/[0.07]"
          >
            <ListRow
              left={
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt/15 text-volt">
                  <Dumbbell size={20} strokeWidth={2.2} />
                </span>
              }
              title="Новая программа"
              sub="Тренировки по дням и неделям"
            />
          </button>
          <button
            onClick={() => {
              setSheetOpen(false)
              setTab('meals')
            }}
            className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] p-3.5 transition-colors active:bg-white/[0.07]"
          >
            <ListRow
              left={
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-aqua/15 text-aqua">
                  <UtensilsCrossed size={20} strokeWidth={2.2} />
                </span>
              }
              title="Новое меню"
              sub="План питания с макросами"
            />
          </button>
        </div>
      </Sheet>
    </Screen>
  )
}
