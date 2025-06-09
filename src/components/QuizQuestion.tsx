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
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-propertyradar shadow-xl border border-propertyradar-200">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-propertyradar-600">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <div className="w-40 bg-propertyradar-100 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-propertyradar-blue to-propertyradar-lightblue h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-propertyradar-darkblue mb-2 leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full p-5 text-left rounded-propertyradar border-2 transition-all duration-300 font-medium ${
              selectedAnswer === index
                ? 'border-propertyradar-blue bg-gradient-to-r from-propertyradar-50 to-propertyradar-100 text-propertyradar-darkblue shadow-lg transform scale-[1.02]'
                : 'border-propertyradar-200 hover:border-propertyradar-lightblue hover:bg-propertyradar-50 hover:shadow-md'
            }`}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-propertyradar-blue text-white text-sm font-bold mr-4">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}