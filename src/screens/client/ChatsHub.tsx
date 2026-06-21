import { useNavigate } from 'react-router-dom'
import { Sparkles, LifeBuoy, ChevronRight } from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { Avatar, VerifiedBadge } from '../../components/ui'
import { Stagger } from '../../components/motion'
import { assistantThread, trainerThread, currentTrainer } from '../../data/mock'

export function ChatsHub() {
  const navigate = useNavigate()

  const lastAi = [...assistantThread].reverse().find((m) => m.from === 'ai' && m.kind === 'text')
  const lastTrainer = [...trainerThread].reverse().find((m) => m.from === 'trainer')
  const lastTrainerAny = trainerThread[trainerThread.length - 1]
  const trainerUnread = trainerThread.some((m) => m.from === 'trainer')

  return (
    <Screen>
      <div className="pb-5 pt-3">
        <h1 className="font-display text-[26px] font-extrabold tracking-tight">Сообщения</h1>
        <p className="text-[13px] text-mut">AI на связи 24/7 · тренер рядом</p>
      </div>

      <Stagger className="space-y-3.5">
        {/* AI assistant — gradient-framed featured row */}
        <Stagger.Item>
          <button
            onClick={() => navigate('/client/chat/ai')}
            className="relative w-full overflow-hidden rounded-3xl bg-ai-grad p-[1.5px] text-left shadow-glow-iris"
          >
            <div className="rounded-[calc(1.5rem-1.5px)] bg-ink-900/85 p-4 backdrop-blur">
              <div className="flex items-center gap-3.5">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-ai-grad text-white shadow-glow-iris" style={{ width: 52, height: 52 }}>
                  <Sparkles size={24} strokeWidth={2.2} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate font-display text-[16px] font-bold">AI-ассистент FORMA</span>
                    <VerifiedBadge />
                    <span className="shrink-0 rounded-full bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold text-grad-ai">24/7</span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-[13px] text-mut">
                    {lastAi?.text ?? 'Спроси про технику, питание или травмы'}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[11px] font-medium text-mut nums">{lastAi?.time ?? ''}</span>
                  <ChevronRight size={18} className="text-white/40" />
                </div>
              </div>
            </div>
          </button>
        </Stagger.Item>

        {/* Trainer + Support grouped card */}
        <Stagger.Item>
          <div className="card overflow-hidden">
            {/* Trainer */}
            <button
              onClick={() => navigate('/client/chat/trainer')}
              className="flex w-full items-center gap-3.5 px-4 py-4 text-left active:bg-ink-800"
            >
              <Avatar id={currentTrainer.avatarId} size={52} online />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-display text-[16px] font-bold">{currentTrainer.name}</span>
                  <span className="shrink-0 text-[12px] text-mut">· твой тренер</span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-[13px] text-mut">
                  {lastTrainer?.text ?? 'Силовой тренинг'}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[11px] font-medium text-mut nums">{lastTrainerAny?.time ?? ''}</span>
                {trainerUnread ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-volt ring-2 ring-ink-850" />
                ) : (
                  <ChevronRight size={18} className="text-white/30" />
                )}
              </div>
            </button>

            <div className="mx-4 h-px bg-white/[0.06]" />

            {/* Support */}
            <button
              onClick={() => navigate('/client/chats')}
              className="flex w-full items-center gap-3.5 px-4 py-4 text-left active:bg-ink-800"
            >
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-aqua" style={{ width: 52, height: 52 }}>
                <LifeBuoy size={24} strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-display text-[16px] font-bold">Поддержка FORMA</div>
                <p className="mt-0.5 line-clamp-1 text-[13px] text-mut">
                  Мы на связи по любым вопросам
                </p>
              </div>
              <ChevronRight size={18} className="text-white/30" />
            </button>
          </div>
        </Stagger.Item>
      </Stagger>
    </Screen>
  )
}
