// Data-model types mirror the entities in the tech spec:
// User, TrainerProfile, Subscription, Transaction, WorkoutProgram/Exercise,
// MealPlan, ChatThread/Message, FormSession, ProgressMetric, Review, Notification.

export type Plan = {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  popular?: boolean
}

export type Review = {
  id: string
  author: string
  avatarId: string
  rating: number
  date: string
  text: string
  result?: string
}

export type Reel = {
  id: string
  title: string
  imageId: string
  views: string
  durationLabel: string
}

export type Trainer = {
  id: string
  name: string
  avatarId: string
  coverId: string
  headline: string
  city: string
  rating: number
  reviewsCount: number
  clients: number
  experienceYears: number
  verified: boolean
  online: boolean
  specializations: string[]
  tags: string[]
  languages: string[]
  priceFrom: number
  successRate: number
  bio: string
  certifications: string[]
  galleryIds: string[]
  reels: Reel[]
  reviews: Review[]
  plans: Plan[]
}

export type Exercise = {
  id: string
  name: string
  muscle: string
  imageId: string
  sets: number
  reps: string
  rest: string
  hasAI: boolean
  tips: string[]
}

export type WorkoutDay = {
  id: string
  day: string
  title: string
  focus: string
  durationMin: number
  kcal: number
  done: boolean
  exercises: Exercise[]
}

export type Program = {
  id: string
  title: string
  level: string
  weeks: number
  perWeek: number
  coverId: string
  progressPct: number
  days: WorkoutDay[]
}

export type Meal = {
  id: string
  type: string
  title: string
  imageId: string
  kcal: number
  protein: number
  carbs: number
  fat: number
  items: string[]
  done: boolean
}

export type MealPlan = {
  dayLabel: string
  target: { kcal: number; protein: number; carbs: number; fat: number }
  meals: Meal[]
}

export type FormSession = {
  id: string
  exercise: string
  date: string
  reps: number
  formScore: number
  durationMin: number
  issues: string[]
  wins: string[]
}

export type ChatMessage = {
  id: string
  from: 'me' | 'trainer' | 'ai' | 'client'
  kind: 'text' | 'video' | 'image' | 'voice'
  text?: string
  time: string
  videoThumbId?: string
  durationLabel?: string
  disclaimer?: boolean
  quickReplies?: string[]
}

export type Notification = {
  id: string
  icon: 'dumbbell' | 'message' | 'star' | 'card' | 'bell' | 'trophy' | 'user'
  title: string
  body: string
  time: string
  unread: boolean
  accent?: 'volt' | 'iris' | 'coral' | 'amber'
}

export type Transaction = {
  id: string
  kind: 'subscription' | 'payout' | 'tip' | 'refund'
  title: string
  sub: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed'
}

export type TrainerClientRow = {
  id: string
  name: string
  avatarId: string
  plan: string
  adherence: number
  progressPct: number
  streak: number
  lastActive: string
  status: 'active' | 'attention' | 'new'
  nextSession?: string
  goal: string
  weightDelta: string
  lastFormScore: number
}

export type PaymentMethod = {
  id: string
  name: string
  type: 'wallet' | 'card'
  hint: string
  color: string
}
