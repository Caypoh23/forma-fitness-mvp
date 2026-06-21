import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { PageTransition } from '../motion'

/**
 * Standard screen wrapper. Every routed screen should return:
 *   <Screen>...</Screen>
 * It applies the page-enter transition and a consistent bottom gutter.
 * Pass `gutter={false}` for full-bleed screens (hero images, chat).
 */
export function Screen({
  children,
  className,
  gutter = true,
  padBottom = true,
}: {
  children: ReactNode
  className?: string
  gutter?: boolean
  padBottom?: boolean
}) {
  return (
    <PageTransition>
      <div className={cn(gutter && 'px-5', padBottom && 'pb-8', className)}>{children}</div>
    </PageTransition>
  )
}
