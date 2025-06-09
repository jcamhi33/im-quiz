export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface QuizState {
  currentQuestion: number
  answers: number[]
  score: number
  completed: boolean
}

export interface LeadData {
  name: string
  email: string
  company?: string
  phone?: string
}