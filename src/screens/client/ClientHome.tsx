import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, Flame, ChevronRight, Sparkles, Play, Dumbbell, Clock, Flame as FlameIcon, ArrowRight } from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { Avatar, Img, Card } from '../../components/ui'
import { ProgressRing } from '../../components/charts'
import { Stagger, CountUp } from '../../components/motion'
import { currentUser, todayWorkout, currentTrainer, mealPlan, notifications, trainerThread } from '../../data/mock'
import { img } from '../../lib/images'

export function ClientHome() {
  const navigate = useNavigate()
  const unread = notifications.filter((n) => n.unread).length
  const eaten = mealPlan.meals.filter((m) => m.done).reduce((s, m) => s + m.kcal, 0)
  const kcalPct = Math.round((eaten / mealPlan.target.kcal) * 100)
  const lastMsg = trainerThread.filter((m) => m.from === 'trainer').slice(-1)[0]

  return (
    <Screen>
      {/* Greeting */}
      <div className="flex items-center justify-between pb-5 pt-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/client/profile')}>
            <Avatar id={currentUser.avatarId} size={46} ring online />
          </button>
          <div>
            <div className="text-[13px] text-mut">Среда, 21 июня</div>
            <div className="font-display text-xl font-extrabold leading-tight tracking-tight">
              Привет, {currentUser.firstName} 👋
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/client/notifications')}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-fg"
        >
          <Bell size={20} strokeWidth={2.2} />
          {unread > 0 && (
            <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-volt ring-2 ring-ink-950" />
          )}
        </button>
      </div>

      <Stagger className="space-y-4">
        {/* Today workout hero */}
        <Stagger.Item>
          <Card onClick={() => navigate(`/client/workout/${todayWorkout.id}`)} className="relative h-52">
            <Img src={img(todayWorkout.exercises[0].imageId, { w: 800, q: 70 })} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
              <span className="rounded-full bg-volt px-2.5 py-1 text-[11px] font-bold text-ink-950">СЕГОДНЯ</span>
              <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                <Sparkles size={12} className="text-volt" /> AI-разбор
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="font-display text-2xl font-extrabold tracking-tight">{todayWorkout.title}</div>
              <div className="mt-1 flex items-center gap-3 text-[13px] text-mut">
                <span className="flex items-center gap-1"><Dumbbell size={13} /> {todayWorkout.exercises.length} упр.</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {todayWorkout.durationMin} мин</span>
                <span className="flex items-center gap-1"><FlameIcon size={13} /> {todayWorkout.kcal} ккал</span>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-volt px-4 py-2.5 text-ink-950">
                <span className="font-bold">Начать тренировку</span>
                <Play size={18} className="fill-ink-950" />
              </div>
            </div>
          </Card>
        </Stagger.Item>

        {/* Stats */}
        <Stagger.Item>
          <div className="grid grid-cols-3 gap-3">
            <div className="card flex flex-col items-center justify-center p-3.5">
              <Flame size={20} className="text-volt" />
              <div className="mt-1.5 font-display text-2xl font-extrabold nums">{currentUser.streak}</div>
              <div className="text-[11px] text-mut">дней серия</div>
            </div>
            <div className="card flex flex-col items-center justify-center p-3.5">
              <div className="font-display text-2xl font-extrabold nums"><CountUp to={3} />/4</div>
              <div className="mt-1 text-[11px] text-mut">тренировки</div>
              <div className="text-[10px] text-mut">на неделе</div>
            </div>
            <div className="card flex flex-col items-center justify-center p-2">
              <ProgressRing value={89} size={58} stroke={6} color="volt">
                <span className="font-display text-base font-extrabold nums">89</span>
              </ProgressRing>
              <div className="mt-1 text-[11px] text-mut">форма</div>
            </div>
          </div>
        </Stagger.Item>

        {/* AI assistant banner */}
        <Stagger.Item>
          <button onClick={() => navigate('/client/chat/ai')} className="relative w-full overflow-hidden rounded-3xl bg-ai-grad p-[1.5px] text-left">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-ink-900/80 p-4 backdrop-blur">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ai-grad text-white shadow-glow-iris">
                  <Sparkles size={24} strokeWidth={2.2} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[16px] font-bold">AI-ассистент FORMA</div>
                  <div className="truncate text-[13px] text-mut">«Болит плечо при жиме?» — спроси что угодно</div>
                </div>
                <ArrowRight size={20} className="text-fg" />
              </div>
            </div>
          </button>
        </Stagger.Item>

        {/* Trainer card */}
        <Stagger.Item>
          <Card onClick={() => navigate('/client/chat/trainer')} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-mut">Твой тренер</span>
              <ChevronRight size={16} className="text-white/30" />
            </div>
            <div className="flex items-center gap-3">
              <Avatar id={currentTrainer.avatarId} size={48} online />
              <div className="min-w-0 flex-1">
                <div className="font-display text-[16px] font-bold">{currentTrainer.name}</div>
                <div className="truncate text-[13px] text-mut">{lastMsg?.text ?? 'Силовой тренинг'}</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-volt text-ink-950">
                <motion.span whileTap={{ scale: 0.9 }}>
                  <ChevronRight size={20} strokeWidth={2.6} />
                </motion.span>
              </div>
            </div>
          </Card>
        </Stagger.Item>

        {/* Nutrition */}
        <Stagger.Item>
          <Card onClick={() => navigate('/client/meal')} className="flex items-center gap-4 p-4">
            <ProgressRing value={kcalPct} size={64} stroke={7} color="amber">
              <div className="text-center">
                <div className="font-display text-sm font-extrabold leading-none nums">{kcalPct}%</div>
              </div>
            </ProgressRing>
            <div className="min-w-0 flex-1">
              <div className="font-display text-[16px] font-bold">Питание сегодня</div>
              <div className="text-[13px] text-mut">
                {eaten} / {mealPlan.target.kcal} ккал · осталось {mealPlan.target.kcal - eaten}
              </div>
            </div>
            <ChevronRight size={18} className="text-white/30" />
          </Card>
        </Stagger.Item>
      </Stagger>
    </Screen>
  )
}
