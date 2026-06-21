// Money is shown in Uzbek so'm (region per the spec). Grouped with thin spaces.
export function sum(value: number) {
  return value.toLocaleString('ru-RU').replace(/,/g, ' ') + ' сум'
}

export function sumShort(value: number) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1) + ' млн'
  if (value >= 1_000) return Math.round(value / 1_000) + 'k'
  return String(value)
}

export function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few
  return many
}
