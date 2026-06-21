import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function AppHeader({
  title,
  subtitle,
  onBack,
  back,
  right,
  transparent,
  className,
}: {
  title?: ReactNode
  subtitle?: ReactNode
  onBack?: () => void
  back?: boolean
  right?: ReactNode
  transparent?: boolean
  className?: string
}) {
  const navigate = useNavigate()
  const showBack = back || onBack
  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-14 items-center gap-2 px-4',
        transparent ? 'bg-transparent' : 'glass border-b border-white/[0.06]',
        className,
      )}
    >
      {showBack && (
        <button
          onClick={() => (onBack ? onBack() : navigate(-1))}
          className="-ml-1.5 flex h-9 w-9 items-center justify-center rounded-full text-fg active:bg-white/10"
        >
          <ChevronLeft size={24} strokeWidth={2.4} />
        </button>
      )}
      <div className="min-w-0 flex-1">
        {title && <div className="truncate font-display text-[17px] font-bold leading-tight tracking-tight">{title}</div>}
        {subtitle && <div className="truncate text-xs text-mut">{subtitle}</div>}
      </div>
      {right && <div className="flex items-center gap-1.5">{right}</div>}
    </header>
  )
}
