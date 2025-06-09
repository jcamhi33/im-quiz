'use client'

import { QuizQuestion as QuizQuestionType } from '@/types/quiz'

interface QuizQuestionProps {
  question: QuizQuestionType
  selectedAnswer: number | null
  onAnswerSelect: (answerIndex: number) => void
  currentQuestionIndex: number
  totalQuestions: number
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
  currentQuestionIndex,
  totalQuestions
}: QuizQuestionProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              selectedAnswer === index
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">{String.fromCharCode(65 + index)}.</span>{' '}
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}