import type { ReactNode } from 'react'

/**
 * On desktop: a centered device with bezel + dynamic island on a soft stage.
 * On mobile: fills the viewport edge-to-edge.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="stage-bg flex min-h-[100dvh] w-full items-center justify-center md:p-5">
      <div
        className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-ink-950 md:h-[calc(100dvh-2.5rem)] md:max-h-[880px] md:w-[396px] md:rounded-[3.2rem] md:border-[11px] md:border-[#0b0b0d] md:shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9),0_0_0_2px_rgba(255,255,255,0.04)]"
      >
        {/* Dynamic island (desktop frame only) */}
        <div className="pointer-events-none absolute left-1/2 top-2.5 z-40 hidden h-7 w-[110px] -translate-x-1/2 rounded-full bg-black md:block" />
        {children}
      </div>
    </div>
  )
}
