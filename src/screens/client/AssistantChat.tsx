import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Mic, Play, ShieldAlert } from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import { Img, Chip } from '../../components/ui'
import { spring } from '../../components/motion'
import { assistantThread } from '../../data/mock'
import { img, PHOTOS } from '../../lib/images'
import type { ChatMessage } from '../../data/types'

const T = PHOTOS.training

/* Canned assistant replies keyed loosely by intent; falls back to generic. */
const AI_REPLIES: { match: string; reply: ChatMessage }[] = [
  {
    match: 'станов',
    reply: {
      id: '',
      from: 'ai',
      kind: 'text',
      time: '09:33',
      text: 'Хорошая замена становой, если бережём спину:\n\n• Тяга в наклоне с упором грудью (без осевой нагрузки)\n• Гиперэкстензия + тяга гантели\n• Румынская тяга с лёгким весом и идеальной техникой\n\nНачни с малого веса и следи, чтобы поясница оставалась нейтральной.',
      quickReplies: ['Покажи технику тяги', 'А для ягодиц?'],
    },
  },
  {
    match: 'белок',
    reply: {
      id: '',
      from: 'ai',
      kind: 'text',
      time: '09:33',
      text: 'Под твою цель (набор массы) ориентир — 1.6–2.0 г белка на кг веса.\n\nПри 78 кг это примерно 130–155 г в день. Раздели на 4–5 приёмов по 30–40 г: так усвоение ровнее. В меню FORMA уже подобраны блюда под эту норму.',
      quickReplies: ['Источники белка', 'Открыть моё меню'],
    },
  },
  {
    match: 'тренер',
    reply: {
      id: '',
      from: 'ai',
      kind: 'text',
      time: '09:33',
      text: 'Готово — добавил краткое резюме диалога и передал его тренеру Алишеру. Он подключится к чату и подтвердит план. Обычно отвечает в течение пары часов.',
    },
  },
  {
    match: 'плеч',
    reply: {
      id: '',
      from: 'ai',
      kind: 'text',
      time: '09:33',
      text: 'Чтобы разгрузить плечо: сведи лопатки, опусти плечи вниз и веди гриф к низу груди. Хват чуть уже, локти под ~45°. Временно снизь рабочий вес на 20–30%.',
      quickReplies: ['Альтернативы жиму', 'Когда к врачу?'],
    },
  },
  {
    match: 'врач',
    reply: {
      id: '',
      from: 'ai',
      kind: 'text',
      disclaimer: true,
      time: '09:33',
      text: 'Если боль острая, не проходит дольше 3–4 дней, есть онемение или слабость в руке — стоит показаться врачу или физиотерапевту. Я не ставлю диагнозов. Пока сустав беспокоит, давай снизим нагрузку и подберём безопасные альтернативы.',
      quickReplies: ['Безопасные альтернативы', 'Подключить тренера'],
    },
  },
  {
    match: 'мен',
    reply: {
      id: '',
      from: 'ai',
      kind: 'text',
      time: '09:33',
      text: 'Открываю твоё меню на сегодня. Цель по калориям и белку учтена — блюда уже сбалансированы под набор массы. Заметишь, что не наедаешься, скажи: добавлю перекус.',
    },
  },
]

function makeId(prefix: string): string {
  return prefix + '-' + Math.random().toString(36).slice(2)
}

function aiReplyFor(text: string): ChatMessage {
  const lower = text.toLowerCase()
  const hit = AI_REPLIES.find((r) => lower.includes(r.match))
  if (hit) return { ...hit.reply, id: makeId('ai') }
  return {
    id: makeId('ai'),
    from: 'ai',
    kind: 'text',
    time: '09:33',
    text: 'Понял вопрос. Дам короткий безопасный ответ и при необходимости подключу твоего тренера. Уточни цель — техника, питание или восстановление?',
    quickReplies: ['Техника упражнения', 'Питание', 'Что-то болит'],
  }
}

export function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(assistantThread)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing])

  function pushUser(text: string) {
    const userMsg: ChatMessage = {
      id: makeId('me'),
      from: 'me',
      kind: 'text',
      text,
      time: '09:32',
    }
    setMessages((prev) => [...prev, userMsg])
    setTyping(true)
    window.setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, aiReplyFor(text)])
    }, 700)
  }

  function onSend() {
    const text = input.trim()
    if (!text) return
    setInput('')
    pushUser(text)
  }

  function onQuickReply(text: string) {
    pushUser(text)
  }

  return (
    <Screen gutter={false} padBottom={false} className="flex min-h-full flex-col">
      <AppHeader
        back
        title={
          <span className="inline-flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-ai-grad text-white shadow-glow-iris">
              <Sparkles size={14} strokeWidth={2.4} />
            </span>
            AI-ассистент
          </span>
        }
        subtitle="на базе Claude"
      />

      {/* Message feed */}
      <div className="flex-1 space-y-3 px-5 py-4">
        {messages.map((m, i) => {
          const firstAi = m.from === 'ai' && (i === 0 || messages[i - 1].from !== 'ai')
          return (
            <MessageBubble
              key={m.id}
              msg={m}
              showAvatar={firstAi}
              onQuickReply={onQuickReply}
            />
          )
        })}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ai-grad text-white shadow-glow-iris">
                <Sparkles size={14} strokeWidth={2.4} />
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-ink-800 px-4 py-3">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="block h-1.5 w-1.5 rounded-full bg-white/40"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={endRef} />
      </div>

      {/* Composer */}
      <div className="glass sticky bottom-0 z-10 border-t border-white/[0.06] px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex flex-1 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] px-4 transition-colors focus-within:border-iris/50">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSend()
              }}
              placeholder="Спросите ассистента…"
              className="h-12 w-full bg-transparent text-[15px] text-fg placeholder:text-mut focus:outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.88 }}
              transition={spring}
              aria-label="Голосовой ввод"
              className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-mut transition-colors active:text-iris"
            >
              <Mic size={20} strokeWidth={2.2} />
            </motion.button>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={spring}
            onClick={onSend}
            aria-label="Отправить"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ai-grad text-white shadow-glow-iris disabled:opacity-40"
            disabled={!input.trim()}
          >
            <Send size={20} strokeWidth={2.4} />
          </motion.button>
        </div>
      </div>
    </Screen>
  )
}

/* ───────────────────────── Single message ───────────────────────── */

function MessageBubble({
  msg,
  showAvatar,
  onQuickReply,
}: {
  msg: ChatMessage
  showAvatar?: boolean
  onQuickReply: (text: string) => void
}) {
  const isMe = msg.from === 'me'

  /* Disclaimer block — distinct safety note */
  if (msg.disclaimer) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="space-y-2"
        role="note"
        aria-label="Важная информация о здоровье"
      >
        <div className="flex gap-3 rounded-2xl border border-amber/30 bg-amber/10 p-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber/15 text-amber">
            <ShieldAlert size={18} strokeWidth={2.4} />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-bold uppercase tracking-wide text-amber">
              Важно про здоровье
            </div>
            <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed text-fg/85">
              {msg.text}
            </p>
          </div>
        </div>
        {msg.quickReplies && <QuickReplies items={msg.quickReplies} onPick={onQuickReply} />}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className={isMe ? 'flex flex-col items-end' : 'flex flex-col items-start'}
    >
      <div className={isMe ? 'flex max-w-[82%] justify-end' : 'flex max-w-[86%] items-end gap-2'}>
        {!isMe && (
          <div className="w-7 shrink-0">
            {showAvatar && (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ai-grad text-white shadow-glow-iris">
                <Sparkles size={14} strokeWidth={2.4} />
              </div>
            )}
          </div>
        )}

        <div className="min-w-0">
          {msg.kind === 'video' ? (
            <VideoBubble msg={msg} isMe={isMe} />
          ) : (
            <div
              className={
                isMe
                  ? 'rounded-2xl rounded-tr-md bg-volt px-4 py-2.5 text-[15px] leading-relaxed text-ink-950'
                  : 'rounded-2xl rounded-tl-md bg-ink-800 px-4 py-2.5 text-[15px] leading-relaxed text-fg'
              }
            >
              <span className="whitespace-pre-line">{msg.text}</span>
            </div>
          )}
          <div className={isMe ? 'mt-1 pr-1 text-right text-[11px] text-mut' : 'mt-1 pl-1 text-[11px] text-mut'}>
            {msg.time}
          </div>
        </div>
      </div>

      {!isMe && msg.quickReplies && (
        <div className="mt-1 pl-9">
          <QuickReplies items={msg.quickReplies} onPick={onQuickReply} />
        </div>
      )}
    </motion.div>
  )
}

function VideoBubble({ msg, isMe }: { msg: ChatMessage; isMe: boolean }) {
  return (
    <div className={isMe ? 'overflow-hidden rounded-2xl rounded-tr-md' : 'overflow-hidden rounded-2xl rounded-tl-md'}>
      <div className="relative h-40 w-60">
        <Img src={img(msg.videoThumbId ?? T[1], { w: 600, q: 70 })} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileTap={{ scale: 0.9 }}
            transition={spring}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink-950 shadow-lg"
          >
            <Play size={20} className="ml-0.5 fill-ink-950" />
          </motion.div>
        </div>
        {msg.durationLabel && (
          <span className="absolute right-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
            {msg.durationLabel}
          </span>
        )}
        {msg.text && (
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="text-[13px] font-semibold leading-snug text-white">{msg.text}</div>
          </div>
        )}
      </div>
    </div>
  )
}

function QuickReplies({ items, onPick }: { items: string[]; onPick: (t: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((q) => (
        <Chip key={q} onClick={() => onPick(q)}>
          {q}
        </Chip>
      ))}
    </div>
  )
}
