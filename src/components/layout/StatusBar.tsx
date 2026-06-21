import { Signal, Wifi, BatteryFull } from 'lucide-react'

export function StatusBar() {
  return (
    <div className="relative z-30 flex h-11 flex-none items-center justify-between bg-ink-950 px-6 pt-1 text-fg">
      <span className="font-display text-[15px] font-bold tracking-tight nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={15} strokeWidth={2.5} className="text-fg" />
        <Wifi size={15} strokeWidth={2.5} className="text-fg" />
        <BatteryFull size={20} strokeWidth={2} className="text-fg" />
      </div>
    </div>
  )
}
