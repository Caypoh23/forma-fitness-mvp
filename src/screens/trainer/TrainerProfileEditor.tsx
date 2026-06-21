import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Camera,
  Pencil,
  Plus,
  X,
  BadgeCheck,
  Play,
  Star,
  Users,
  MessageSquare,
  Eye,
  Check,
} from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { AppHeader } from '../../components/layout/AppHeader'
import {
  Img,
  Avatar,
  Button,
  Card,
  Chip,
  Field,
  Input,
  Textarea,
  SectionHeader,
} from '../../components/ui'
import { Stagger, CountUp } from '../../components/motion'
import { featuredTrainer } from '../../data/mock'
import { img } from '../../lib/images'
import { sum } from '../../lib/format'

export function TrainerProfileEditor() {
  const navigate = useNavigate()
  const t = featuredTrainer

  const [name, setName] = useState(t.name)
  const [headline, setHeadline] = useState(t.headline)
  const [bio, setBio] = useState(t.bio)
  const [specs, setSpecs] = useState<string[]>(t.specializations)

  const removeSpec = (s: string) => setSpecs((prev) => prev.filter((x) => x !== s))

  return (
    <Screen>
      <AppHeader
        back
        title="Мой профиль"
        right={
          <Button
            size="sm"
            variant="secondary"
            icon={Eye}
            onClick={() => navigate('/client/trainer/' + t.id)}
          >
            Предпросмотр
          </Button>
        }
      />

      <Stagger className="space-y-5 pt-2">
        {/* Cover + avatar */}
        <Stagger.Item>
          <Card className="overflow-visible !bg-transparent !border-0 !shadow-none">
            <div className="relative h-[150px] overflow-hidden rounded-3xl">
              <Img src={img(t.coverId, { w: 900, q: 70 })} className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-black/20" />
              <button
                className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[12px] font-semibold text-fg backdrop-blur active:bg-black/70"
              >
                <Camera size={14} strokeWidth={2.4} /> Изменить обложку
              </button>
            </div>
            {/* Avatar overlapping the cover */}
            <div className="relative -mt-9 ml-4 inline-block">
              <Avatar id={t.avatarId} size={76} className="ring-4 ring-ink-950" online={t.online} />
              <button
                aria-label="Сменить фото"
                className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink-950 bg-volt text-ink-950 active:bg-volt-300"
              >
                <Pencil size={13} strokeWidth={2.6} />
              </button>
            </div>
          </Card>
        </Stagger.Item>

        {/* Verification */}
        <Stagger.Item>
          <div className="card flex items-center gap-3 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-aqua/15">
              <BadgeCheck size={22} className="text-aqua" strokeWidth={2.4} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-bold text-fg">Квалификация подтверждена</div>
              <div className="truncate text-[12px] text-mut">Документы и сертификаты проверены FORMA</div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-1 text-[11px] font-semibold text-mint">
              <Check size={12} strokeWidth={3} /> Активен
            </span>
          </div>
        </Stagger.Item>

        {/* Basic fields */}
        <Stagger.Item>
          <div className="space-y-3.5">
            <Field label="Имя">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" />
            </Field>
            <Field label="Заголовок" hint="Коротко о вашей специализации — это видят клиенты в каталоге">
              <Input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Например: Сила и гипертрофия"
              />
            </Field>
            <Field label="О себе">
              <Textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Расскажите о подходе, опыте и результатах"
              />
            </Field>
          </div>
        </Stagger.Item>

        {/* Specializations */}
        <Stagger.Item>
          <div>
            <SectionHeader title="Специализации" />
            <div className="flex flex-wrap gap-2">
              {specs.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] py-2 pl-3.5 pr-2 text-[13px] font-medium text-fg"
                >
                  {s}
                  <button
                    onClick={() => removeSpec(s)}
                    aria-label={'Убрать ' + s}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.08] text-mut active:bg-coral/20 active:text-coral"
                  >
                    <X size={12} strokeWidth={2.6} />
                  </button>
                </span>
              ))}
              <Chip icon={Plus}>Добавить</Chip>
            </div>
          </div>
        </Stagger.Item>

        {/* Certifications */}
        <Stagger.Item>
          <div>
            <SectionHeader title="Сертификаты" />
            <div className="card divide-y divide-white/[0.06] overflow-hidden">
              {t.certifications.map((c) => (
                <div key={c} className="flex items-center gap-3 px-4 py-3.5">
                  <BadgeCheck size={18} className="shrink-0 text-aqua" strokeWidth={2.4} />
                  <span className="flex-1 text-[14px] font-medium text-fg">{c}</span>
                  <button aria-label="Изменить" className="text-mut active:text-fg">
                    <Pencil size={15} strokeWidth={2.4} />
                  </button>
                </div>
              ))}
              <button className="flex w-full items-center gap-2 px-4 py-3.5 text-[14px] font-semibold text-volt active:bg-white/[0.03]">
                <Plus size={17} strokeWidth={2.6} /> Добавить сертификат
              </button>
            </div>
          </div>
        </Stagger.Item>

        {/* Plans */}
        <Stagger.Item>
          <div>
            <SectionHeader title="Тарифы" />
            <div className="card divide-y divide-white/[0.06] overflow-hidden">
              {t.plans.map((p) => (
                <div key={p.id} className="flex items-center gap-3 px-4 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-fg">{p.name}</span>
                      {p.popular && (
                        <span className="rounded-md bg-volt/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-volt">
                          Хит
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-[13px] text-mut">
                      <span className="font-semibold text-fg/90 nums">{sum(p.price)}</span> / {p.period}
                    </div>
                  </div>
                  <button aria-label="Изменить тариф" className="text-mut active:text-fg">
                    <Pencil size={16} strokeWidth={2.4} />
                  </button>
                </div>
              ))}
              <button className="flex w-full items-center gap-2 px-4 py-3.5 text-[14px] font-semibold text-volt active:bg-white/[0.03]">
                <Plus size={17} strokeWidth={2.6} /> Добавить тариф
              </button>
            </div>
          </div>
        </Stagger.Item>

        {/* Portfolio */}
        <Stagger.Item>
          <div>
            <SectionHeader title="Портфолио" action="Управлять" />
            <div className="grid grid-cols-3 gap-2.5">
              {t.reels.map((r) => (
                <button
                  key={r.id}
                  className="relative aspect-square overflow-hidden rounded-2xl"
                >
                  <Img src={img(r.imageId, { w: 400, q: 65 })} className="absolute inset-0 h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute left-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 backdrop-blur">
                    <Play size={13} className="fill-white text-white" />
                  </span>
                  <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold backdrop-blur nums">
                    {r.durationLabel}
                  </span>
                </button>
              ))}
              <button className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-white/15 text-mut active:bg-white/[0.03]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06]">
                  <Plus size={18} strokeWidth={2.4} />
                </div>
                <span className="text-[11px] font-semibold">Видео</span>
              </button>
            </div>
          </div>
        </Stagger.Item>

        {/* Stat row */}
        <Stagger.Item>
          <div className="card grid grid-cols-3 divide-x divide-white/[0.06] p-1">
            {[
              { icon: Star, value: t.rating, label: 'рейтинг', decimals: 1, accent: 'text-amber' },
              { icon: Users, value: t.clients, label: 'клиентов', decimals: 0, accent: 'text-volt' },
              { icon: MessageSquare, value: t.reviewsCount, label: 'отзывов', decimals: 0, accent: 'text-aqua' },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="flex flex-col items-center py-3.5">
                  <Icon size={16} className={s.accent} strokeWidth={2.4} />
                  <div className="mt-1.5 font-display text-xl font-extrabold leading-none nums">
                    <CountUp to={s.value} decimals={s.decimals} />
                  </div>
                  <div className="mt-1 text-[11px] text-mut">{s.label}</div>
                </div>
              )
            })}
          </div>
        </Stagger.Item>
      </Stagger>

      {/* Save */}
      <div className="pt-6">
        <Button full size="lg" icon={Check}>
          Сохранить изменения
        </Button>
      </div>
    </Screen>
  )
}
