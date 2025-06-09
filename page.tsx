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
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-propertyradar shadow-2xl p-12 border border-propertyradar-200">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-propertyradar-blue to-propertyradar-lightblue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-propertyradar-darkblue mb-6 leading-tight">
                Hyperlocal Marketing Quiz
              </h1>
              <p className="text-xl text-propertyradar-600 mb-8 max-w-2xl mx-auto">
                Test your knowledge of hyperlocal marketing strategies and direct mail campaigns. 
                See how well you understand the tactics that drive real results.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-propertyradar-50 to-propertyradar-100 border-2 border-propertyradar-lightblue rounded-propertyradar p-6 mb-8">
              <div className="flex items-center justify-center mb-3">
                <span className="text-3xl mr-3">🎁</span>
                <span className="text-propertyradar-darkblue font-bold text-xl">
                  Score 80% or higher and earn $50 in free PropertyRadar direct mail credits!
                </span>
              </div>
              <p className="text-propertyradar-600">
                Put your expertise to the test and get rewarded for your knowledge
              </p>
            </div>
            
            <div className="flex justify-center items-center space-x-8 text-propertyradar-500 mb-10">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                10 questions
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                5 minutes
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Multiple choice
              </div>
            </div>
            
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-gradient-to-r from-propertyradar-blue to-propertyradar-lightblue text-white px-12 py-4 rounded-propertyradar text-xl font-bold hover:from-propertyradar-darkblue hover:to-propertyradar-blue transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
      <main className="min-h-screen flex items-center justify-center p-4">
        <LeadCaptureForm onSubmit={handleLeadSubmit} score={quizState.score} />
      </main>
    )
  }

  if (showResults) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-propertyradar shadow-2xl p-12 border border-propertyradar-200">
            <h1 className="text-4xl font-bold text-propertyradar-darkblue mb-8">Quiz Complete!</h1>
            <div className="text-8xl font-bold mb-6">
              <span className={quizState.score >= 80 ? 'text-propertyradar-blue' : 'text-red-500'}>
                {quizState.score}%
              </span>
            </div>
            <p className="text-xl text-propertyradar-600 mb-8">
              You scored {quizState.score}% ({quizState.answers.filter((answer, index) => 
                answer === quizQuestions[index].correctAnswer
              ).length} out of {quizQuestions.length} correct)
            </p>
            
            {quizState.score >= 80 ? (
              <div className="bg-gradient-to-r from-propertyradar-50 to-propertyradar-100 border-2 border-propertyradar-lightblue rounded-propertyradar p-6 mb-8">
                <p className="text-propertyradar-darkblue font-bold text-lg">
                  🎉 Congratulations! Your PropertyRadar credits are being processed.
                </p>
                <p className="text-propertyradar-600 mt-2">
                  You'll receive an email with instructions on how to redeem your $50 credit.
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-propertyradar p-6 mb-8">
                <p className="text-yellow-800 font-medium">
                  Keep learning about hyperlocal marketing to improve your results!
                </p>
                <p className="text-yellow-700 mt-2">
                  You need 80% or higher to qualify for PropertyRadar credits.
                </p>
              </div>
            )}
            
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-propertyradar-blue to-propertyradar-lightblue text-white px-8 py-3 rounded-propertyradar font-bold text-lg hover:from-propertyradar-darkblue hover:to-propertyradar-blue transition-all duration-300 shadow-lg hover:shadow-xl"
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
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <QuizQuestion
          question={currentQuestion}
          selectedAnswer={selectedAnswer ?? null}
          onAnswerSelect={handleAnswerSelect}
          currentQuestionIndex={quizState.currentQuestion}
          totalQuestions={quizQuestions.length}
        />
        
        <div className="flex justify-center mt-8">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === undefined}
            className="bg-gradient-to-r from-propertyradar-blue to-propertyradar-lightblue text-white px-8 py-4 rounded-propertyradar font-bold text-lg hover:from-propertyradar-darkblue hover:to-propertyradar-blue disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl disabled:transform-none transform hover:scale-105"
          >
            {quizState.currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </main>
  )
}