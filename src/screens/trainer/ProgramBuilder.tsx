import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Save,
  Image as ImageIcon,
  ChevronDown,
  GripVertical,
  X,
  Plus,
  Sparkles,
  Users,
  Check,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import {
  Button,
  Card,
  Img,
  Avatar,
  Field,
  Input,
  Segmented,
  Sheet,
  SectionHeader,
  Divider,
} from '../../components/ui'
import { Stagger } from '../../components/motion'
import { spring } from '../../components/motion'
import { trainerPrograms, program, trainerClients } from '../../data/mock'
import { img } from '../../lib/images'
import { plural } from '../../lib/format'

type Level = 'Начальный' | 'Средний' | 'Продвинутый'

const LEVEL_OPTIONS: { value: Level; label: string }[] = [
  { value: 'Начальный', label: 'Начальный' },
  { value: 'Средний', label: 'Средний' },
  { value: 'Продвинутый', label: 'Продвинутый' },
]

function normLevel(raw: string): Level {
  if (raw === 'Начальный' || raw === 'Средний' || raw === 'Продвинутый') return raw
  return 'Средний'
}

export function ProgramBuilder() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = id === 'new'
  const source = trainerPrograms.find((p) => p.id === id) ?? trainerPrograms[0]

  const [title, setTitle] = useState(isNew ? '' : source.title)
  const [level, setLevel] = useState<Level>(isNew ? 'Начальный' : normLevel(source.level))
  const [weeks, setWeeks] = useState(isNew ? '' : String(source.weeks))
  const [perWeek, setPerWeek] = useState(isNew ? '' : String(source.perWeek))
  const [openDayId, setOpenDayId] = useState<string | null>(program.days[0]?.id ?? null)
  const [assignOpen, setAssignOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const coverId = isNew ? program.coverId : source.coverId
  const days = program.days

  const toggleClient = (cid: string) =>
    setSelected((s) => (s.includes(cid) ? s.filter((x) => x !== cid) : [...s, cid]))

  return (
    <Screen>
      <div className="-mx-5">
        <AppHeader
          back
          title={isNew ? 'Новая программа' : 'Программа'}
          right={
            <Button size="sm" variant="primary" icon={Save} onClick={() => navigate(-1)}>
              Сохранить
            </Button>
          }
        />
      </div>

      <Stagger className="space-y-5 pt-4">
        {/* Cover */}
        <Stagger.Item>
          <Card className="relative h-44">
            <Img
              src={img(coverId, { w: 800, q: 70 })}
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-mut">
                  Обложка программы
                </div>
                <div className="truncate font-display text-lg font-extrabold tracking-tight">
                  {title || 'Без названия'}
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.94 }}
                transition={spring}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-black/45 px-3 py-2 text-[12px] font-semibold text-fg backdrop-blur"
              >
                <ImageIcon size={15} strokeWidth={2.4} />
                Изменить обложку
              </motion.button>
            </div>
          </Card>
        </Stagger.Item>

        {/* Basic fields */}
        <Stagger.Item>
          <div className="space-y-4">
            <Field label="Название программы">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например, Сила и масса"
              />
            </Field>

            <Field label="Уровень">
              <Segmented options={LEVEL_OPTIONS} value={level} onChange={setLevel} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Недель">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value)}
                  placeholder="8"
                />
              </Field>
              <Field label="В неделю">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={perWeek}
                  onChange={(e) => setPerWeek(e.target.value)}
                  placeholder="4"
                />
              </Field>
            </div>
          </div>
        </Stagger.Item>

        {/* Days & exercises */}
        <Stagger.Item>
          <div>
            <SectionHeader title="Дни и упражнения" />
            <div className="space-y-3">
              {days.map((day) => {
                const open = openDayId === day.id
                return (
                  <div
                    key={day.id}
                    className="overflow-hidden rounded-3xl border border-white/[0.06] bg-ink-850"
                  >
                    <button
                      onClick={() => setOpenDayId(open ? null : day.id)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] font-display text-[13px] font-bold text-mut">
                        {day.day}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-display text-[15px] font-bold text-fg">
                          {day.title}
                        </div>
                        <div className="truncate text-[12px] text-mut">
                          {day.exercises.length} упр · {day.focus}
                        </div>
                      </div>
                      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={spring}>
                        <ChevronDown size={20} className="text-white/35" strokeWidth={2.2} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Divider />
                          <div className="space-y-1 p-2">
                            {day.exercises.map((ex) => (
                              <div
                                key={ex.id}
                                className="flex items-center gap-2.5 rounded-2xl px-2 py-2.5 active:bg-white/[0.03]"
                              >
                                <GripVertical
                                  size={18}
                                  className="shrink-0 cursor-grab text-white/25"
                                  strokeWidth={2.2}
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-[14px] font-semibold text-fg">
                                    {ex.name}
                                  </div>
                                  <div className="text-[12px] text-mut nums">
                                    {ex.sets}×{ex.reps} · {ex.muscle}
                                  </div>
                                </div>
                                <motion.button
                                  whileTap={{ scale: 0.85 }}
                                  transition={spring}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-coral active:bg-coral/15"
                                  aria-label="Удалить упражнение"
                                >
                                  <X size={17} strokeWidth={2.4} />
                                </motion.button>
                              </div>
                            ))}

                            <button className="flex w-full items-center gap-2 rounded-2xl px-3 py-3 text-[13px] font-semibold text-mut active:text-fg">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.06]">
                                <Plus size={15} strokeWidth={2.6} />
                              </span>
                              Добавить упражнение
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <Button full variant="outline" icon={Plus} className="mt-3">
              Добавить день
            </Button>
          </div>
        </Stagger.Item>

        {/* Assign */}
        <Stagger.Item>
          <Button full variant="ai" icon={Sparkles} onClick={() => setAssignOpen(true)}>
            Назначить клиентам
          </Button>
        </Stagger.Item>
      </Stagger>

      <Sheet open={assignOpen} onClose={() => setAssignOpen(false)} title="Назначить клиентам">
        <div className="mb-3 flex items-center gap-2 text-[13px] text-mut">
          <Users size={15} strokeWidth={2.2} />
          Выберите, кому отправить «{title || 'программу'}»
        </div>

        <div className="space-y-2">
          {trainerClients
            .filter((c) => c.status !== 'new')
            .map((c) => {
              const checked = selected.includes(c.id)
              return (
                <button
                  key={c.id}
                  onClick={() => toggleClient(c.id)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 text-left active:bg-white/[0.05]"
                >
                  <Avatar id={c.avatarId} size={42} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-[15px] font-bold text-fg">
                      {c.name}
                    </div>
                    <div className="truncate text-[12px] text-mut">
                      {c.plan} · {c.goal}
                    </div>
                  </div>
                  <span
                    className={
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ' +
                      (checked
                        ? 'border-volt bg-volt text-ink-950'
                        : 'border-white/20 text-transparent')
                    }
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                </button>
              )
            })}
        </div>

        <div className="mt-5">
          <Button
            full
            size="lg"
            variant="primary"
            disabled={selected.length === 0}
            onClick={() => setAssignOpen(false)}
          >
            {selected.length > 0
              ? `Назначить ${selected.length} ${plural(selected.length, 'клиенту', 'клиентам', 'клиентам')}`
              : 'Выберите клиентов'}
          </Button>
        </div>
      </Sheet>
    </Screen>
  )
}
