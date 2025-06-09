'use client'

import { useState } from 'react'
import QuizQuestion from '@/components/QuizQuestion'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { quizQuestions } from '@/lib/quiz-data'
import { QuizState, LeadData } from '@/types/quiz'

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    score: 0,
    completed: false
  })
  
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...quizState.answers]
    newAnswers[quizState.currentQuestion] = answerIndex
    
    setQuizState(prev => ({
      ...prev,
      answers: newAnswers
    }))
  }

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }))
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = () => {
    const correctAnswers = quizState.answers.filter((answer, index) => 
      answer === quizQuestions[index].correctAnswer
    ).length
    
    const score = Math.round((correctAnswers / quizQuestions.length) * 100)
    
    setQuizState(prev => ({
      ...prev,
      score,
      completed: true
    }))

    if (score >= 80) {
      setShowLeadForm(true)
    } else {
      setShowResults(true)
    }
  }

  const handleLeadSubmit = (leadData: LeadData) => {
    console.log('Lead data:', leadData, 'Score:', quizState.score)
    setShowLeadForm(false)
    setShowResults(true)
  }

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: [],
      score: 0,
      completed: false
    })
    setShowLeadForm(false)
    setShowResults(false)
    setQuizStarted(false)
  }

  if (!quizStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Hyperlocal Marketing Quiz
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Test your knowledge of hyperlocal marketing strategies and direct mail campaigns.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium">
                🎁 Score 80% or higher and earn $50 in free PropertyRadar direct mail credits!
              </p>
            </div>
            <p className="text-gray-500 mb-8">
              10 questions • 5 minutes • Multiple choice
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (showLeadForm) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <LeadCaptureForm onSubmit={handleLeadSubmit} score={quizState.score} />
      </main>
    )
  }

  if (showResults) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h1>
            <div className="text-6xl font-bold mb-4">
              <span className={quizState.score >= 80 ? 'text-green-500' : 'text-red-500'}>
                {quizState.score}%
              </span>
            </div>
            <p className="text-xl text-gray-600 mb-6">
              You scored {quizState.score}% ({quizState.answers.filter((answer, index) => 
                answer === quizQuestions[index].correctAnswer
              ).length} out of {quizQuestions.length} correct)
            </p>
            
            {quizState.score >= 80 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  🎉 Congratulations! Your PropertyRadar credits are being processed.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800">
                  Keep learning about hyperlocal marketing to improve your results!
                </p>
              </div>
            )}
            
            <button
              onClick={resetQuiz}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </main>
    )
  }

  const currentQuestion = quizQuestions[quizState.currentQuestion]
  const selectedAnswer = quizState.answers[quizState.currentQuestion]

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <QuizQuestion
          question={currentQuestion}
          selectedAnswer={selectedAnswer ?? null}
          onAnswerSelect={handleAnswerSelect}
          currentQuestionIndex={quizState.currentQuestion}
          totalQuestions={quizQuestions.length}
        />
        
        <div className="flex justify-center mt-6">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === undefined}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {quizState.currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </main>
  )
}