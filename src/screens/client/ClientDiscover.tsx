import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, Users, MapPin, Sparkles } from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { Img, Chip, VerifiedBadge, Avatar } from '../../components/ui'
import { Stagger } from '../../components/motion'
import { trainers, categories } from '../../data/mock'
import { img } from '../../lib/images'
import { sumShort } from '../../lib/format'
import type { Trainer } from '../../data/types'

function TrainerCard({ t, onClick }: { t: Trainer; onClick: () => void }) {
  return (
    <button onClick={onClick} className="card w-full overflow-hidden text-left">
      <div className="relative h-40">
        <Img src={img(t.coverId, { w: 800, q: 70 })} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/10 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {t.online && (
            <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" /> онлайн
            </span>
          )}
          <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold backdrop-blur">
            <Sparkles size={10} className="text-volt" /> AI
          </span>
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[11px] font-bold backdrop-blur">
          <Star size={11} className="fill-amber text-amber" /> {t.rating}
        </div>
        <div className="absolute -bottom-6 left-4">
          <Avatar id={t.avatarId} size={56} className="ring-2 ring-ink-850" />
        </div>
      </div>
      <div className="px-4 pb-4 pt-8">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-[17px] font-bold leading-tight">{t.name}</span>
          {t.verified && <VerifiedBadge />}
        </div>
        <p className="mt-0.5 line-clamp-1 text-[13px] text-mut">{t.headline}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {t.specializations.slice(0, 3).map((s) => (
            <span key={s} className="rounded-lg bg-white/[0.06] px-2 py-1 text-[11px] font-medium text-fg/80">{s}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
          <div className="flex items-center gap-3 text-[12px] text-mut">
            <span className="flex items-center gap-1"><Users size={13} /> {t.clients}</span>
            <span className="flex items-center gap-1"><MapPin size={13} /> {t.city}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-mut">от </span>
            <span className="font-display text-[15px] font-extrabold text-volt nums">{sumShort(t.priceFrom)}</span>
            <span className="text-[11px] text-mut"> сум/мес</span>
          </div>
        </div>
      </div>
    </button>
  )
}

export function ClientDiscover() {
  const navigate = useNavigate()
  const [cat, setCat] = useState('Все')

  const filtered = trainers.filter((t) => {
    if (cat === 'Все') return true
    return t.specializations.some((s) => s.toLowerCase().includes(cat.toLowerCase())) || t.tags.some((s) => s.toLowerCase().includes(cat.toLowerCase()))
  })

  return (
    <Screen gutter={false}>
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-ink-950/90 px-5 pb-3 pt-3 backdrop-blur-xl">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h1 className="font-display text-[26px] font-extrabold tracking-tight">Тренеры</h1>
            <p className="text-[13px] text-mut">{trainers.length} проверенных в Ташкенте</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="flex flex-1 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
            <Search size={18} className="text-mut" />
            <input
              placeholder="Поиск по имени или цели"
              className="w-full bg-transparent text-[15px] text-fg placeholder:text-mut focus:outline-none"
            />
          </div>
          <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-fg">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="no-scrollbar -mx-0 flex gap-2 overflow-x-auto px-5 pb-4">
        {categories.map((c) => (
          <Chip key={c} active={c === cat} onClick={() => setCat(c)}>{c}</Chip>
        ))}
      </div>

      {/* List */}
      <Stagger className="space-y-4 px-5">
        {filtered.map((t) => (
          <Stagger.Item key={t.id}>
            <TrainerCard t={t} onClick={() => navigate(`/client/trainer/${t.id}`)} />
          </Stagger.Item>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-mut">Никого не нашлось в этой категории</div>
        )}
      </Stagger>
    </Screen>
  )
}
