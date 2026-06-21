// Verified Unsplash photo IDs (all return 200). We build sized URLs on demand.
const BASE = 'https://images.unsplash.com/photo-'

type ImgOpts = { w?: number; h?: number; q?: number; face?: boolean }

export function img(id: string, opts: ImgOpts = {}) {
  const { w = 800, h, q = 70, face } = opts
  const p = ['auto=format', 'fit=crop', `w=${w}`]
  if (h) p.push(`h=${h}`)
  p.push(`q=${q}`)
  if (face) p.push('crop=faces,edges')
  return `${BASE}${id}?${p.join('&')}`
}

// Curated, role-tagged pools of real photo IDs.
export const PHOTOS = {
  // All verified by eye: face-forward portraits, gender matched to the names in mock data.
  trainersMale: [
    '1500648767791-00dcc994a43e',
    '1568602471122-7832951cc4c5',
    '1599566150163-29194dcaad36',
    '1539571696357-5a69c17a67c6',
    '1438761681033-6461ffad8d80',
    '1564564321837-a57b7070ac4f',
    '1547425260-76bcadfb4f2c',
  ],
  trainersFemale: [
    '1494790108377-be9c29b29330',
    '1593104547489-5cfb3839a3b5',
    '1554151228-14d9def656e4',
    '1524504388940-b1c1722653e1',
    '1487412720507-e7ab37603c6f',
    '1544005313-94ddf0286df2',
  ],
  training: [
    '1534438327276-14e5300c3a48',
    '1517836357463-d25dfeac3438',
    '1571019613454-1cb2f99b2d8b',
    '1518611012118-696072aa579a',
    '1583454110551-21f2fa2afe61',
    '1534258936925-c58bed479fcb',
    '1574680096145-d05b474e2155',
    '1599058917765-a780eda07a3e',
    '1540497077202-7c8a3999166f',
    '1549060279-7e168fcee0c2',
    '1546483875-ad9014c88eba',
    '1571902943202-507ec2618e8f',
    '1605296867304-46d5465a13f1',
    '1599058945522-28d584b6f0ff',
  ],
  food: [
    '1490645935967-10de6ba17061',
    '1512621776951-a57141f2eefd',
    '1546069901-ba9599a7e63c',
    '1467003909585-2f8a72700288',
    '1540420773420-3366772f4999',
    '1504674900247-0877df9cc836',
    '1455619452474-d2be8b1e70cd',
    '1484723091739-30a097e8f929',
  ],
}

export const avatar = (id: string, size = 160) =>
  img(id, { w: size, h: size, q: 75, face: true })
