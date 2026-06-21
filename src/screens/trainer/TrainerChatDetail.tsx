import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Video, Play, Send } from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import { Avatar, Img, Input } from '../../components/ui'
import { spring } from '../../components/motion'
import { trainerInbox, trainerClients, trainerThread } from '../../data/mock'
import { img } from '../../lib/images'
import type { ChatMessage } from '../../data/types'

/* Pseudo-waveform bar heights for voice bubbles (deterministic, no data dep) */
const WAVE = [8, 14, 20, 11, 24, 16, 9, 18, 22, 13, 7, 17, 21, 10, 15, 12, 19, 8]

/* Trainer's perspective: 'trainer' messages are MINE (right, volt).
   'me'/'client' messages are the client's (left, ink-800). */
function isOutgoing(from: ChatMessage['from']) {
  return from === 'trainer'
}

export function TrainerChatDetail() {
  const { id } = useParams()
  const inboxEntry =
    trainerInbox.find((c) => c.clientId === id || c.id === id) ?? trainerInbox[0]
  const client =
    trainerClients.find((c) => c.id === inboxEntry.clientId) ??
    trainerClients.find((c) => c.id === id)

  const name = client?.name ?? inboxEntry.name
  const avatarId = client?.avatarId ?? inboxEntry.avatarId
  const online = inboxEntry.online
  const subtitle = online ? 'В сети' : client?.lastActive ?? inboxEntry.time

  const [thread, setThread] = useState<ChatMessage[]>(trainerThread)
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [thread.length])

  function send() {
    const text = draft.trim()
    if (!text) return
    setThread((prev) => [
      ...prev,
      {
        id: 'trainer-' + prev.length,
        from: 'trainer',
        kind: 'text',
        text,
        time: 'Сейчас',
      },
    ])
    setDraft('')
  }

  return (
    <Screen gutter={false} padBottom={false} className="flex h-full flex-col">
      <AppHeader
        back
        title={
          <span className="flex items-center gap-2.5">
            <Avatar id={avatarId} size={30} online={online} />
            <span className="truncate">{name}</span>
          </span>
        }
        subtitle={subtitle}
        right={
          <>
            <RoundAction icon={Video} label="Видео-разбор" />
            <RoundAction icon={Phone} label="Позвонить" />
          </>
        }
      />

      {/* Feed */}
      <div className="flex-1 space-y-3 overflow-y-auto px-5 pb-4 pt-4 no-scrollbar">
        <DateChip label="Вчера" />
        {thread.map((m, i) => (
          <Bubble key={m.id} msg={m} index={i} />
        ))}
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <div className="sticky bottom-0 z-10 border-t border-white/[0.06] bg-ink-950/90 px-4 pb-4 pt-3 backdrop-blur-xl">
        <div className="flex items-end gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={spring}
            aria-label="Видео-разбор"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-volt active:bg-white/10"
          >
            <Video size={20} strokeWidth={2.2} />
          </motion.button>

          <div className="flex-1">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send()
              }}
              placeholder="Ответить клиенту…"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={spring}
            onClick={send}
            aria-label="Отправить"
            disabled={!draft.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-volt text-ink-950 shadow-[0_8px_24px_-10px_rgba(212,255,62,0.6)] disabled:opacity-40"
          >
            <Send size={19} strokeWidth={2.4} />
          </motion.button>
        </div>
      </div>
    </Screen>
  )
}

/* ───────────────────────── Header round action ───────────────────────── */

function RoundAction({ icon: Icon, label }: { icon: typeof Phone; label: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={spring}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-fg active:bg-white/10"
    >
      <Icon size={19} strokeWidth={2.2} />
    </motion.button>
  )
}

/* ───────────────────────── Date chip ───────────────────────── */

function DateChip({ label }: { label: string }) {
  return (
    <div className="flex justify-center py-1">
      <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold text-mut">
        {label}
      </span>
    </div>
  )
}

/* ───────────────────────── Bubble ───────────────────────── */

function Bubble({ msg, index }: { msg: ChatMessage; index: number }) {
  const mine = isOutgoing(msg.from)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: Math.min(index * 0.04, 0.3) }}
      className={mine ? 'flex justify-end' : 'flex justify-start'}
    >
      <div className="max-w-[82%]">
        {msg.kind === 'video' ? (
          <VideoBubble msg={msg} mine={mine} />
        ) : msg.kind === 'voice' ? (
          <VoiceBubble msg={msg} mine={mine} />
        ) : (
          <TextBubble msg={msg} mine={mine} />
        )}
        <div className={`mt-1 px-1 text-[10px] text-mut ${mine ? 'text-right' : 'text-left'}`}>
          {msg.time}
        </div>
      </div>
    </motion.div>
  )
}

function bubbleShape(mine: boolean) {
  return mine
    ? 'rounded-3xl rounded-br-lg bg-volt text-ink-950'
    : 'rounded-3xl rounded-bl-lg bg-ink-800 text-fg'
}

function TextBubble({ msg, mine }: { msg: ChatMessage; mine: boolean }) {
  return (
    <div className={`whitespace-pre-line px-4 py-2.5 text-[15px] leading-relaxed ${bubbleShape(mine)}`}>
      {msg.text}
    </div>
  )
}

function VideoBubble({ msg, mine }: { msg: ChatMessage; mine: boolean }) {
  return (
    <div className={`overflow-hidden ${bubbleShape(mine)} ${mine ? '' : 'border border-white/[0.06]'}`}>
      <div className="relative">
        {msg.videoThumbId && (
          <Img src={img(msg.videoThumbId, { w: 600, q: 70 })} className="h-44 w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileTap={{ scale: 0.88 }}
            transition={spring}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-volt text-ink-950 shadow-[0_8px_24px_-8px_rgba(212,255,62,0.7)]"
          >
            <Play size={24} className="ml-0.5 fill-ink-950" strokeWidth={0} />
          </motion.div>
        </div>
        {msg.durationLabel && (
          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
            {msg.durationLabel}
          </span>
        )}
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
          Видео-разбор
        </span>
      </div>
      {msg.text && (
        <div className={`px-4 py-2.5 text-[13.5px] ${mine ? 'text-ink-950/85' : 'text-mut'}`}>
          {msg.text}
        </div>
      )}
    </div>
  )
}

function VoiceBubble({ msg, mine }: { msg: ChatMessage; mine: boolean }) {
  const barColor = mine ? 'bg-ink-950/45' : 'bg-white/30'
  return (
    <div className={`flex items-center gap-3 px-3.5 py-2.5 ${bubbleShape(mine)}`}>
      <motion.button
        whileTap={{ scale: 0.88 }}
        transition={spring}
        aria-label="Воспроизвести"
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          mine ? 'bg-ink-950/15 text-ink-950' : 'bg-white/10 text-fg'
        }`}
      >
        <Play size={16} className="ml-0.5" strokeWidth={0} fill="currentColor" />
      </motion.button>
      <div className="flex h-8 items-center gap-[3px]">
        {WAVE.map((h, i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full ${barColor}`}
            style={{ height: h }}
          />
        ))}
      </div>
      {msg.durationLabel && (
        <span className={`shrink-0 text-[12px] font-semibold nums ${mine ? 'text-ink-950/70' : 'text-mut'}`}>
          {msg.durationLabel}
        </span>
      )}
    </div>
  )
}
