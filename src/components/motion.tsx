import { animate, useInView, type Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'

/* Shared spring used everywhere for a cohesive feel */
export const spring = { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.9 }
export const softSpring = { type: 'spring' as const, stiffness: 260, damping: 28 }

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 14, scale: 0.992 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, scale: 0.992, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="min-h-full"
    >
      {children}
    </motion.div>
  )
}

/** Staggered list container — wrap items in <Stagger.Item> */
function StaggerRoot({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerParent} initial="hidden" animate="show" className={className}>
      {children}
    </motion.div>
  )
}
function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}
export const Stagger = Object.assign(StaggerRoot, { Item: StaggerItem })

/** Reveal on scroll into view */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Tap-scale press wrapper */
export function Press({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.div whileTap={{ scale: 0.97 }} transition={spring} className={className} onClick={onClick}>
      {children}
    </motion.div>
  )
}

/** Animated number that counts up when scrolled into view */
export function CountUp({
  to,
  from = 0,
  duration = 1.1,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: {
  to: number
  from?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        node.textContent = prefix + v.toLocaleString('ru-RU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix
      },
    })
    return () => controls.stop()
  }, [inView, to, from, duration, decimals, prefix, suffix])
  return <span ref={ref} className={className}>{prefix}{from.toFixed(decimals)}{suffix}</span>
}
