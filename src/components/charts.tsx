import { motion } from 'framer-motion'
import { useId, type ReactNode } from 'react'
import { cn } from '../lib/cn'

const PALETTE: Record<string, string> = {
  volt: '#D4FF3E',
  iris: '#7C5CFF',
  aqua: '#22D3EE',
  mint: '#34D399',
  amber: '#FBBF24',
  coral: '#FB7185',
}

/* ───────────────────────── Progress ring ───────────────────────── */

export function ProgressRing({
  value,
  size = 88,
  stroke = 9,
  color = 'volt',
  trackOpacity = 0.1,
  children,
}: {
  value: number
  size?: number
  stroke?: number
  color?: keyof typeof PALETTE | string
  trackOpacity?: number
  children?: ReactNode
}) {
  const id = useId()
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.min(100, Math.max(0, value))
  const hex = PALETTE[color] ?? color
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`ring-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={hex} />
            <stop offset="100%" stopColor={color === 'volt' ? '#A9D81C' : hex} stopOpacity={0.85} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#fff" strokeOpacity={trackOpacity} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#ring-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - clamped / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}

/* ───────────────────────── Line / area chart ───────────────────────── */

export function LineChart({
  data,
  color = 'volt',
  height = 120,
  className,
  showDots = true,
  fill = true,
}: {
  data: number[]
  color?: keyof typeof PALETTE | string
  height?: number
  className?: string
  showDots?: boolean
  fill?: boolean
}) {
  const id = useId()
  const W = 320
  const H = height
  const pad = 14
  const hex = PALETTE[color] ?? color
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const stepX = (W - pad * 2) / (data.length - 1)
  const pts = data.map((v, i) => {
    const x = pad + i * stepX
    const y = pad + (1 - (v - min) / span) * (H - pad * 2)
    return [x, y] as const
  })
  const line = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ')
  const area = `${line} L ${pts[pts.length - 1][0]} ${H} L ${pts[0][0]} ${H} Z`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn('w-full', className)} preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hex} stopOpacity={0.28} />
          <stop offset="100%" stopColor={hex} stopOpacity={0} />
        </linearGradient>
      </defs>
      {fill && <motion.path d={area} fill={`url(#area-${id})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} />}
      <motion.path
        d={line}
        fill="none"
        stroke={hex}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        vectorEffect="non-scaling-stroke"
      />
      {showDots && (
        <motion.circle
          cx={pts[pts.length - 1][0]}
          cy={pts[pts.length - 1][1]}
          r={4.5}
          fill={hex}
          stroke="#070809"
          strokeWidth={2.5}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 400, damping: 18 }}
        />
      )}
    </svg>
  )
}

/* ───────────────────────── Bar chart ───────────────────────── */

export function BarChart({
  data,
  labels,
  color = 'iris',
  height = 130,
  highlightLast = true,
  className,
}: {
  data: number[]
  labels?: string[]
  color?: keyof typeof PALETTE | string
  height?: number
  highlightLast?: boolean
  className?: string
}) {
  const hex = PALETTE[color] ?? color
  const max = Math.max(...data) || 1
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-end gap-1.5" style={{ height }}>
        {data.map((v, i) => {
          const active = highlightLast && i === data.length - 1
          return (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(v / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-md"
                style={{ background: active ? hex : 'rgba(255,255,255,0.12)' }}
              />
            </div>
          )
        })}
      </div>
      {labels && (
        <div className="mt-2 flex gap-1.5">
          {labels.map((l, i) => (
            <div key={i} className="flex-1 text-center text-[10px] font-medium text-mut">{l}</div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ───────────────────────── Sparkline ───────────────────────── */

export function Sparkline({ data, color = 'volt', className }: { data: number[]; color?: keyof typeof PALETTE | string; className?: string }) {
  const hex = PALETTE[color] ?? color
  const W = 100
  const H = 32
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const stepX = W / (data.length - 1)
  const line = data
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${(1 - (v - min) / span) * H}`)
    .join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn('w-full', className)} preserveAspectRatio="none" style={{ height: H }}>
      <motion.path
        d={line}
        fill="none"
        stroke={hex}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
