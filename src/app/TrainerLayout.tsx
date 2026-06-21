import { useOutlet, useLocation } from 'react-router-dom'
import { cloneElement, useEffect, useRef } from 'react'
import { LayoutGrid, Users, ClipboardList, Wallet, MessageSquare } from 'lucide-react'
import { StatusBar } from '../components/layout/StatusBar'
import { BottomNav, type NavItem } from '../components/layout/BottomNav'

const items: NavItem[] = [
  { to: '/trainer', label: 'Главная', icon: LayoutGrid, end: true },
  { to: '/trainer/clients', label: 'Клиенты', icon: Users },
  { to: '/trainer/programs', label: 'Контент', icon: ClipboardList, center: true },
  { to: '/trainer/finance', label: 'Финансы', icon: Wallet },
  { to: '/trainer/inbox', label: 'Чат', icon: MessageSquare },
]

export function TrainerLayout() {
  const location = useLocation()
  const element = useOutlet()
  const mainRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <>
      <StatusBar />
      <main ref={mainRef} className="relative flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        {element && cloneElement(element, { key: location.pathname })}
      </main>
      <BottomNav items={items} />
    </>
  )
}
