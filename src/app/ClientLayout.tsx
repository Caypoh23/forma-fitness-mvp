import { useOutlet, useLocation } from 'react-router-dom'
import { cloneElement, useEffect, useRef } from 'react'
import { Home, Search, Dumbbell, TrendingUp, MessageCircle } from 'lucide-react'
import { StatusBar } from '../components/layout/StatusBar'
import { BottomNav, type NavItem } from '../components/layout/BottomNav'

const items: NavItem[] = [
  { to: '/client', label: 'Главная', icon: Home, end: true },
  { to: '/client/discover', label: 'Тренеры', icon: Search },
  { to: '/client/program', label: 'Тренировка', icon: Dumbbell, center: true },
  { to: '/client/progress', label: 'Прогресс', icon: TrendingUp },
  { to: '/client/chats', label: 'Чат', icon: MessageCircle },
]

export function ClientLayout() {
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
