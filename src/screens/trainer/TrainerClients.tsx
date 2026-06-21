import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, UserPlus, CalendarClock } from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { Avatar, Input, Chip, ProgressBar, Button } from '../../components/ui'
import { Stagger, spring } from '../../components/motion'
import { trainerClients } from '../../data/mock'
import type { TrainerClientRow } from '../../data/types'

type Filter = 'all' | 'active' | 'attention' | 'new'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'attention', label: 'Внимание' },
  { value: 'new', label: 'Новые' },
]

const STATUS_BADGE: Record<TrainerClientRow['status'], { label: string; cls: string }> = {
  active: { label: 'активен', cls: 'bg-mint/15 text-mint' },
  attention: { label: 'внимание', cls: 'bg-amber/15 text-amber' },
  new: { label: 'новый', cls: 'bg-iris/20 text-iris' },
}

function adherenceAccent(v: number): 'mint' | 'volt' | 'amber' | 'coral' {
  if (v >= 85) return 'mint'
  if (v >= 60) return 'volt'
  if (v >= 40) return 'amber'
  return 'coral'
}

function ClientRow({ c, onOpen }: { c: TrainerClientRow; onOpen: () => void }) {
  const isNew = c.status === 'new'
  const badge = STATUS_BADGE[c.status]

  return (
    <motion.div
      whileTap={isNew ? undefined : { scale: 0.99 }}
      transition={spring}
      onClick={isNew ? undefined : onOpen}
      className={`card p-3.5 ${isNew ? '' : 'cursor-pointer active:bg-ink-800'}`}
    >
      <div className="flex items-center gap-3">
        <Avatar id={c.avatarId} size={48} online={c.status === 'active'} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-display text-[15px] font-bold leading-tight">{c.name}</span>
            {isNew && (
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${badge.cls}`}>
                {badge.label}
              </span>
            )}
          </div>
          <div className="mt-0.5 truncate text-[12.5px] text-mut">
            {isNew ? c.goal : `${c.plan} · ${c.goal}`}
          </div>
        </div>

        {!isNew && (
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${badge.cls}`}>
              {badge.label}
            </span>
            <span className="text-[11px] text-mut">{c.lastActive}</span>
          </div>
        )}
      </div>

      {isNew ? (
        <div className="mt-3 flex items-center gap-2">
          <Button size="sm" full icon={UserPlus} onClick={onOpen}>
            Принять
          </Button>
          <Button size="sm" variant="outline" onClick={onOpen}>
            Профиль
          </Button>
        </div>
      ) : (
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between text-[11.5px]">
            <span className="text-mut">Дисциплина</span>
            <span className="font-semibold text-fg nums">{c.adherence}%</span>
          </div>
          <ProgressBar value={c.adherence} accent={adherenceAccent(c.adherence)} height={6} />
          {c.nextSession && (
            <div className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-volt">
              <CalendarClock size={13} strokeWidth={2.4} /> {c.nextSession}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export function TrainerClients() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const q = query.trim().toLowerCase()
  const filtered = trainerClients.filter((c) => {
    if (q && !c.name.toLowerCase().includes(q)) return false
    if (filter !== 'all' && c.status !== filter) return false
    return true
  })

  const activeCount = trainerClients.filter((c) => c.status === 'active').length
  const newCount = trainerClients.filter((c) => c.status === 'new').length

  const count = (f: Filter) =>
    f === 'all' ? trainerClients.length : trainerClients.filter((c) => c.status === f).length

  return (
    <Screen gutter={false}>
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-ink-950/90 px-5 pb-3 pt-3 backdrop-blur-xl">
        <div className="mb-3">
          <h1 className="font-display text-[26px] font-extrabold tracking-tight">Клиенты</h1>
          <p className="text-[13px] text-mut">
            {activeCount} активных
            {newCount > 0 && <span className="text-iris"> · {newCount} новых запроса</span>}
          </p>
        </div>

        <Input
          icon={Search}
          placeholder="Поиск клиента"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">
          {FILTERS.map((f) => (
            <Chip key={f.value} active={f.value === filter} onClick={() => setFilter(f.value)}>
              {f.label}
              <span className={f.value === filter ? 'text-ink-950/60' : 'text-mut/70'}>
                {count(f.value)}
              </span>
            </Chip>
          ))}
        </div>
      </div>

      {/* List */}
      <Stagger className="space-y-3 px-5 pt-4">
        {filtered.map((c) => (
          <Stagger.Item key={c.id}>
            <ClientRow c={c} onOpen={() => navigate('/trainer/client/' + c.id)} />
          </Stagger.Item>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-[14px] text-mut">
            Клиентов не найдено
          </div>
        )}
      </Stagger>
    </Screen>
  )
}
