import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Check,
  BadgeCheck,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import {
  useState,
  type ReactNode,
  type CSSProperties,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { cn } from '../lib/cn'
import { avatar } from '../lib/images'
import { spring } from './motion'

/* ───────────────────────── Image with shimmer ───────────────────────── */

export function Img({
  src,
  alt = '',
  className,
  imgClassName,
  style,
}: {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  style?: CSSProperties
}) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={cn('relative overflow-hidden bg-ink-800', className)} style={style}>
      {!loaded && <div className="absolute inset-0 shimmer bg-ink-750" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}

/* ───────────────────────── Avatar ───────────────────────── */

export function Avatar({
  id,
  size = 44,
  ring,
  online,
  className,
}: {
  id: string
  size?: number
  ring?: boolean
  online?: boolean
  className?: string
}) {
  return (
    <div className={cn('relative shrink-0', className)} style={{ width: size, height: size }}>
      <img
        src={avatar(id, Math.round(size * 2))}
        alt=""
        className={cn(
          'h-full w-full rounded-full object-cover',
          ring && 'ring-2 ring-volt ring-offset-2 ring-offset-ink-900',
        )}
      />
      {online && (
        <span
          className="absolute bottom-0 right-0 block rounded-full border-2 border-ink-900 bg-mint"
          style={{ width: size * 0.26, height: size * 0.26 }}
        />
      )}
    </div>
  )
}

/* ───────────────────────── Button ───────────────────────── */

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'ai' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  icon?: LucideIcon
  iconRight?: LucideIcon
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  full,
  icon: Icon,
  iconRight: IconRight,
  onClick,
  className,
  disabled,
  type = 'button',
}: ButtonProps) {
  const variants: Record<string, string> = {
    primary: 'bg-volt text-ink-950 font-semibold hover:bg-volt-300 shadow-[0_8px_24px_-10px_rgba(212,255,62,0.6)]',
    ai: 'bg-ai-grad text-white font-semibold shadow-glow-iris',
    secondary: 'bg-white/[0.07] text-fg border border-white/10 hover:bg-white/[0.1]',
    outline: 'bg-transparent text-fg border border-white/15 hover:bg-white/[0.05]',
    ghost: 'bg-transparent text-mut hover:text-fg',
    danger: 'bg-coral/15 text-coral hover:bg-coral/25',
  }
  const sizes: Record<string, string> = {
    sm: 'h-9 px-4 text-sm gap-1.5 rounded-xl',
    md: 'h-12 px-5 text-[15px] gap-2 rounded-2xl',
    lg: 'h-14 px-6 text-base gap-2.5 rounded-2xl',
  }
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={spring}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex select-none items-center justify-center whitespace-nowrap transition-colors',
        sizes[size],
        variants[variant],
        full && 'w-full',
        disabled && 'opacity-40',
        className,
      )}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : 18} strokeWidth={2.4} />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 16 : 18} strokeWidth={2.4} />}
    </motion.button>
  )
}

export function IconButton({
  icon: Icon,
  onClick,
  className,
  variant = 'glass',
  size = 40,
  label,
}: {
  icon: LucideIcon
  onClick?: () => void
  className?: string
  variant?: 'glass' | 'solid' | 'ghost'
  size?: number
  label?: string
}) {
  const v: Record<string, string> = {
    glass: 'glass border border-white/10 text-fg',
    solid: 'bg-white/[0.07] text-fg',
    ghost: 'text-mut hover:text-fg',
  }
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={spring}
      onClick={onClick}
      aria-label={label}
      className={cn('inline-flex items-center justify-center rounded-full', v[variant], className)}
      style={{ width: size, height: size }}
    >
      <Icon size={size * 0.45} strokeWidth={2.2} />
    </motion.button>
  )
}

/* ───────────────────────── Card ───────────────────────── */

export function Card({
  children,
  className,
  onClick,
  interactive,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  interactive?: boolean
}) {
  const Comp = onClick ? motion.button : motion.div
  return (
    <Comp
      onClick={onClick}
      whileTap={onClick || interactive ? { scale: 0.985 } : undefined}
      transition={spring}
      className={cn(
        'card w-full overflow-hidden text-left shadow-soft',
        (onClick || interactive) && 'active:bg-ink-800',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

/* ───────────────────────── Chip ───────────────────────── */

export function Chip({
  children,
  active,
  onClick,
  icon: Icon,
}: {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  icon?: LucideIcon
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      transition={spring}
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors',
        active
          ? 'border-volt bg-volt text-ink-950'
          : 'border-white/10 bg-white/[0.04] text-mut hover:text-fg',
      )}
    >
      {Icon && <Icon size={14} strokeWidth={2.4} />}
      {children}
    </motion.button>
  )
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-lg bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-mut', className)}>
      {children}
    </span>
  )
}

export function VerifiedBadge({ className }: { className?: string }) {
  return <BadgeCheck size={16} className={cn('text-aqua', className)} strokeWidth={2.4} />
}

/* ───────────────────────── Rating ───────────────────────── */

export function RatingStars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(value) ? 'fill-amber text-amber' : 'text-white/20'}
          strokeWidth={2}
        />
      ))}
    </span>
  )
}

/* ───────────────────────── Progress bar ───────────────────────── */

export function ProgressBar({
  value,
  className,
  accent = 'volt',
  height = 8,
}: {
  value: number
  className?: string
  accent?: 'volt' | 'ai' | 'mint' | 'amber' | 'coral'
  height?: number
}) {
  const colors: Record<string, string> = {
    volt: 'bg-volt',
    ai: 'bg-ai-grad',
    mint: 'bg-mint',
    amber: 'bg-amber',
    coral: 'bg-coral',
  }
  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-white/[0.08]', className)} style={{ height }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={cn('h-full rounded-full', colors[accent])}
      />
    </div>
  )
}

/* ───────────────────────── Section header ───────────────────────── */

export function SectionHeader({
  title,
  action,
  onAction,
  className,
}: {
  title: string
  action?: string
  onAction?: () => void
  className?: string
}) {
  return (
    <div className={cn('mb-3 flex items-center justify-between', className)}>
      <h2 className="font-display text-[17px] font-bold tracking-tight text-fg">{title}</h2>
      {action && (
        <button onClick={onAction} className="flex items-center gap-0.5 text-[13px] font-medium text-mut active:text-fg">
          {action}
          <ChevronRight size={15} />
        </button>
      )}
    </div>
  )
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px w-full bg-white/[0.06]', className)} />
}

/* ───────────────────────── List row ───────────────────────── */

export function ListRow({
  title,
  sub,
  left,
  right,
  onClick,
  className,
}: {
  title: ReactNode
  sub?: ReactNode
  left?: ReactNode
  right?: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <motion.button
      whileTap={onClick ? { scale: 0.99 } : undefined}
      transition={spring}
      onClick={onClick}
      className={cn('flex w-full items-center gap-3 text-left', className)}
    >
      {left}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-semibold text-fg">{title}</div>
        {sub && <div className="truncate text-[13px] text-mut">{sub}</div>}
      </div>
      {right ?? (onClick && <ChevronRight size={18} className="text-white/30" />)}
    </motion.button>
  )
}

/* ───────────────────────── Toggle ───────────────────────── */

export function Toggle({ checked, onChange }: { checked: boolean; onChange?: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange?.(!checked)}
      className={cn('relative h-7 w-12 rounded-full transition-colors', checked ? 'bg-volt' : 'bg-white/15')}
    >
      <motion.span
        layout
        transition={spring}
        className={cn('absolute top-1 block h-5 w-5 rounded-full bg-white shadow', checked ? 'right-1' : 'left-1')}
      />
    </button>
  )
}

/* ───────────────────────── Segmented control ───────────────────────── */

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  className?: string
}) {
  return (
    <div className={cn('relative flex rounded-2xl bg-white/[0.05] p-1', className)}>
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className="relative flex-1 rounded-xl px-3 py-2 text-[13px] font-semibold"
          >
            {active && (
              <motion.div
                layoutId="seg-active"
                transition={spring}
                className="absolute inset-0 rounded-xl bg-white/[0.1] shadow-sm ring-1 ring-white/10"
              />
            )}
            <span className={cn('relative z-10', active ? 'text-fg' : 'text-mut')}>{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ───────────────────────── Bottom Sheet ───────────────────────── */

export function Sheet({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose()
            }}
            className="absolute inset-x-0 bottom-0 z-50 max-h-[88%] overflow-hidden rounded-t-4xl border-t border-white/10 bg-ink-850"
          >
            <div className="flex justify-center pt-3">
              <div className="h-1.5 w-10 rounded-full bg-white/20" />
            </div>
            {title && <div className="px-5 pt-3 font-display text-lg font-bold">{title}</div>}
            <div className="max-h-[78vh] overflow-y-auto overscroll-contain px-5 pb-8 pt-4 no-scrollbar">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ───────────────────────── Skeleton ───────────────────────── */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-xl bg-ink-750', className)} />
}

/* ───────────────────────── Inputs (unified style) ───────────────────────── */

export function Field({ label, hint, children }: { label?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-[13px] font-semibold text-mut">{label}</span>}
      {children}
      {hint && <span className="mt-1 block text-[11px] text-mut">{hint}</span>}
    </label>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { icon?: LucideIcon }

export function Input({ icon: Icon, className, ...props }: InputProps) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] px-4 transition-colors focus-within:border-volt/50">
      {Icon && <Icon size={18} className="shrink-0 text-mut" />}
      <input
        className={cn('h-12 w-full bg-transparent text-[15px] text-fg placeholder:text-mut focus:outline-none', className)}
        {...props}
      />
    </div>
  )
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-[15px] text-fg placeholder:text-mut transition-colors focus:border-volt/50 focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}

/* ───────────────────────── Small check pill ───────────────────────── */

export function CheckDot({ done }: { done?: boolean }) {
  return (
    <span
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full border-2',
        done ? 'border-volt bg-volt text-ink-950' : 'border-white/20 text-transparent',
      )}
    >
      <Check size={14} strokeWidth={3} />
    </span>
  )
}
