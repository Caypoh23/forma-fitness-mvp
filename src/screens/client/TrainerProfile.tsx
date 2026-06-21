import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Share2,
  Heart,
  MapPin,
  Star,
  Users,
  Award,
  Target,
  BadgeCheck,
  Play,
  Eye,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { Img, Avatar, Button, Chip, VerifiedBadge, RatingStars, SectionHeader } from '../../components/ui'
import { Stagger, CountUp } from '../../components/motion'
import { trainers } from '../../data/mock'
import { img } from '../../lib/images'
import { sumShort } from '../../lib/format'

export function TrainerProfile() {
  const navigate = useNavigate()
  const { id } = useParams()
  const t = trainers.find((x) => x.id === id) ?? trainers[0]

  const stats = [
    { icon: Users, value: t.clients, label: 'Клиентов' },
    { icon: Award, value: t.experienceYears, suffix: ' лет', label: 'Опыт' },
    { icon: Target, value: t.successRate, suffix: '%', label: 'Успех' },
    { icon: Star, value: t.rating, decimals: 1, label: 'Рейтинг' },
  ]

  return (
    <Screen gutter={false}>
      {/* ───── Hero ───── */}
      <div className="relative h-[280px] w-full">
        <Img src={img(t.coverId, { w: 900, q: 72 })} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-ink-950/15" />

        {/* Top controls */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="glass flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-fg"
          >
            <ChevronLeft size={22} strokeWidth={2.4} />
          </motion.button>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="glass flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-fg"
            >
              <Share2 size={18} strokeWidth={2.2} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="glass flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-fg"
            >
              <Heart size={18} strokeWidth={2.2} />
            </motion.button>
          </div>
        </div>

        {/* Identity */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-4">
          <div className="flex items-end gap-3.5">
            <Avatar id={t.avatarId} size={72} ring online={t.online} className="shrink-0" />
            <div className="min-w-0 flex-1 pb-1">
              <div className="flex items-center gap-1.5">
                <h1 className="truncate font-display text-2xl font-extrabold leading-none tracking-tight">
                  {t.name}
                </h1>
                {t.verified && <VerifiedBadge className="shrink-0" />}
              </div>
            </div>
          </div>
          <p className="mt-2.5 line-clamp-2 text-[13px] leading-snug text-fg/75">{t.headline}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-mut">
            <span className="flex items-center gap-1">
              <MapPin size={13} strokeWidth={2.4} /> {t.city}
            </span>
            <span className="flex items-center gap-1">
              <Star size={13} className="fill-amber text-amber" strokeWidth={2} />
              <span className="font-semibold text-fg nums">{t.rating}</span>
              <span>({t.reviewsCount})</span>
            </span>
            {t.online && (
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" /> онлайн
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ───── Body ───── */}
      <div className="px-5 pb-32 pt-5">
        {/* Specialization chips */}
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {t.specializations.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>

        {/* Stat grid */}
        <div className="mt-4 grid grid-cols-4 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="card flex flex-col items-center justify-center p-3 text-center">
              <s.icon
                size={16}
                strokeWidth={2.4}
                className={s.label === 'Рейтинг' ? 'fill-amber text-amber' : 'text-volt'}
              />
              <div className="mt-1.5 font-display text-lg font-extrabold leading-none nums">
                <CountUp to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ''} />
              </div>
              <div className="mt-1 text-[10px] leading-tight text-mut">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-7 space-y-7">
          {/* About */}
          <section>
            <SectionHeader title="О тренере" />
            <p className="text-[14px] leading-relaxed text-fg/80">{t.bio}</p>
          </section>

          {/* Certifications */}
          <section>
            <SectionHeader title="Квалификация" />
            <Stagger className="space-y-2.5">
              {t.certifications.map((c) => (
                <Stagger.Item key={c}>
                  <div className="card flex items-center gap-3 p-3.5">
                    <BadgeCheck size={20} className="shrink-0 text-aqua" strokeWidth={2.4} />
                    <span className="text-[14px] font-medium text-fg/90">{c}</span>
                  </div>
                </Stagger.Item>
              ))}
            </Stagger>
          </section>

          {/* Portfolio (reels) */}
          {t.reels.length > 0 && (
            <section>
              <SectionHeader title="Портфолио" />
              <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
                {t.reels.map((r) => (
                  <motion.button
                    key={r.id}
                    whileTap={{ scale: 0.97 }}
                    className="relative h-[210px] w-[150px] shrink-0 overflow-hidden rounded-3xl text-left"
                  >
                    <Img src={img(r.imageId, { w: 400, q: 70 })} className="absolute inset-0 h-full w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-black/25" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-volt text-ink-950 shadow-[0_8px_24px_-8px_rgba(212,255,62,0.7)]">
                        <Play size={20} className="ml-0.5 fill-ink-950" strokeWidth={2.4} />
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <div className="line-clamp-2 text-[12px] font-semibold leading-snug text-fg">{r.title}</div>
                      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-mut">
                        <span className="flex items-center gap-1">
                          <Eye size={11} strokeWidth={2.4} /> {r.views}
                        </span>
                        <span>·</span>
                        <span className="nums">{r.durationLabel}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>
          )}

          {/* Gallery */}
          {t.galleryIds.length > 0 && (
            <section>
              <SectionHeader title="Галерея" />
              <div className="grid grid-cols-3 gap-2">
                {t.galleryIds.map((g, i) => (
                  <motion.div key={`${g}-${i}`} whileTap={{ scale: 0.97 }}>
                    <Img src={img(g, { w: 300, q: 65 })} className="aspect-square w-full rounded-xl" />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section>
            <SectionHeader title="Отзывы" action="Все" onAction={() => {}} />
            <Stagger className="space-y-3">
              {t.reviews.map((r) => (
                <Stagger.Item key={r.id}>
                  <div className="card p-4">
                    <div className="flex items-center gap-3">
                      <Avatar id={r.avatarId} size={36} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[14px] font-semibold text-fg">{r.author}</div>
                        <RatingStars value={r.rating} size={12} />
                      </div>
                      <span className="shrink-0 text-[11px] text-mut">{r.date}</span>
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-fg/80">{r.text}</p>
                    {r.result && (
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-volt/15 px-3 py-1.5 text-[12px] font-bold text-volt">
                        <Target size={13} strokeWidth={2.6} /> {r.result}
                      </div>
                    )}
                  </div>
                </Stagger.Item>
              ))}
            </Stagger>
          </section>

          {/* Languages */}
          <section>
            <SectionHeader title="Языки" />
            <div className="flex flex-wrap gap-2">
              {t.languages.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-fg/85"
                >
                  {l}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ───── Sticky CTA ───── */}
      <div className="glass sticky bottom-0 z-30 border-t border-white/[0.06] px-5 pb-5 pt-3.5">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <div className="text-[11px] text-mut">от</div>
            <div className="font-display text-xl font-extrabold leading-none text-volt nums">
              {sumShort(t.priceFrom)}
              <span className="text-[12px] font-medium text-mut"> сум/мес</span>
            </div>
          </div>
          <Button
            size="lg"
            className="flex-1"
            onClick={() => navigate('/client/subscribe/' + t.id)}
          >
            Подписаться
          </Button>
        </div>
      </div>
    </Screen>
  )
}
