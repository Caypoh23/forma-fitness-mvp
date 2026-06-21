import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Screen } from '../../components/layout/Screen'
import { Avatar, Input, Divider } from '../../components/ui'
import { Stagger, Press } from '../../components/motion'
import { trainerInbox } from '../../data/mock'

export function TrainerInbox() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const filtered = q
    ? trainerInbox.filter(
        (item) =>
          item.name.toLowerCase().includes(q) || item.preview.toLowerCase().includes(q),
      )
    : trainerInbox

  const totalUnread = trainerInbox.reduce((acc, item) => acc + item.unread, 0)

  return (
    <Screen>
      <div className="pb-5 pt-3">
        <h1 className="font-display text-[26px] font-extrabold tracking-tight">Сообщения</h1>
        <p className="text-[13px] text-mut">
          {totalUnread > 0
            ? `${totalUnread} непрочитанных · клиенты ждут ответа`
            : 'Все клиенты на связи'}
        </p>
      </div>

      <div className="mb-4">
        <Input
          icon={Search}
          placeholder="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/[0.06] bg-ink-850 px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-mut">
            <Search size={24} strokeWidth={2.2} />
          </div>
          <p className="mt-4 font-display text-[15px] font-bold text-fg">Ничего не найдено</p>
          <p className="mt-1 text-[13px] text-mut">Попробуй изменить запрос</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <Stagger>
            {filtered.map((item, i) => (
              <Stagger.Item key={item.id}>
                {i > 0 && <Divider className="mx-4 w-auto" />}
                <Press
                  onClick={() => navigate('/trainer/chat/' + item.clientId)}
                  className="flex w-full cursor-pointer items-center gap-3.5 px-4 py-3.5 active:bg-ink-800"
                >
                  <Avatar id={item.avatarId} size={52} online={item.online} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-[15px] font-semibold text-fg">
                      {item.name}
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-[13px] text-mut">{item.preview}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 self-stretch pt-0.5">
                    <span
                      className={
                        'shrink-0 text-[11px] font-medium nums ' +
                        (item.unread > 0 ? 'text-volt' : 'text-mut')
                      }
                    >
                      {item.time}
                    </span>
                    {item.unread > 0 ? (
                      <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-volt px-1.5 text-[11px] font-bold text-ink-950 nums">
                        {item.unread}
                      </span>
                    ) : (
                      <span className="h-[18px]" />
                    )}
                  </div>
                </Press>
              </Stagger.Item>
            ))}
          </Stagger>
        </div>
      )}
    </Screen>
  )
}
