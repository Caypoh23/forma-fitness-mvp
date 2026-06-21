import { useOutlet, useLocation } from 'react-router-dom'
import { cloneElement, useEffect, useRef } from 'react'
import { CalendarCheck, Users, MessageSquare, User } from 'lucide-react'
import { StatusBar } from '../components/layout/StatusBar'
import { BottomNav, type NavItem } from '../components/layout/BottomNav'

// 4 tabs (Everfit/Freeletics pattern). Content + Finance live inside Profile,
// not as top-level tabs — the bar stays calm and thumb-reachable.
const items: NavItem[] = [
  { to: '/trainer', label: 'Сегодня', icon: CalendarCheck, end: true },
  { to: '/trainer/clients', label: 'Клиенты', icon: Users },
  { to: '/trainer/inbox', label: 'Чат', icon: MessageSquare },
  { to: '/trainer/profile', label: 'Профиль', icon: User },
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
