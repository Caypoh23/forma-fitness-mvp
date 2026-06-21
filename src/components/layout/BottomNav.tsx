import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
  center?: boolean
}

export function BottomNav({ items }: { items: NavItem[] }) {
  return (
    <nav className="relative z-30 flex-none border-t border-white/[0.06] glass pb-[max(10px,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-3 pt-2">
        {items.map((item) => {
          if (item.center) {
            return (
              <NavLink key={item.to} to={item.to} className="relative -mt-7 flex w-16 flex-col items-center">
                {() => (
                  <>
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-grad text-ink-950 shadow-[0_10px_30px_-6px_rgba(212,255,62,0.5)]"
                    >
                      <item.icon size={26} strokeWidth={2.4} />
                    </motion.div>
                    <span className="mt-1 text-[10px] font-semibold text-mut">{item.label}</span>
                  </>
                )}
              </NavLink>
            )
          }
          return (
            <NavLink key={item.to} to={item.to} end={item.end} className="relative flex flex-1 flex-col items-center gap-1 py-1.5">
              {({ isActive }) => (
                <>
                  <item.icon
                    size={23}
                    strokeWidth={isActive ? 2.6 : 2}
                    className={cn('transition-colors', isActive ? 'text-volt' : 'text-mut')}
                  />
                  <span className={cn('text-[10px] font-medium transition-colors', isActive ? 'text-fg' : 'text-mut')}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div layoutId="nav-dot" className="absolute -top-0.5 h-1 w-1 rounded-full bg-volt" />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
