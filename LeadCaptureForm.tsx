'use client'

import { useState } from 'react'
import { LeadData } from '@/types/quiz'

interface LeadCaptureFormProps {
  onSubmit: (leadData: LeadData) => void
  score: number
}

export default function LeadCaptureForm({ onSubmit, score }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.industry) {
      setIsSubmitting(true)
      setSubmitStatus('idle')
      
      try {
        // Submit to HubSpot
        const hubspotResponse = await fetch('/api/hubspot-submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            quiz_score: score,
            lead_source: 'Hyperlocal Marketing Quiz'
          }),
        })

        if (hubspotResponse.ok) {
          console.log('Lead submitted to HubSpot successfully')
          setSubmitStatus('success')
          
          // Wait 2 seconds to show success message, then continue
          setTimeout(() => {
            onSubmit(formData)
          }, 2000)
        } else {
          const errorData = await hubspotResponse.json()
          console.error('Failed to submit to HubSpot:', errorData)
          setSubmitStatus('error')
          setIsSubmitting(false)
        }
      } catch (error) {
        console.error('Error submitting to HubSpot:', error)
        setSubmitStatus('error')
        setIsSubmitting(false)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-propertyradar shadow-xl border border-propertyradar-200">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-propertyradar-blue to-propertyradar-lightblue rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-propertyradar-darkblue mb-3">Congratulations!</h2>
        <p className="text-propertyradar-600 mb-6 text-lg">
          You scored <span className="font-bold text-propertyradar-blue">{score}%</span> and qualified for <span className="font-bold text-propertyradar-blue">$50</span> in free PropertyRadar direct mail credits!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-propertyradar-darkblue mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-propertyradar-200 rounded-propertyradar focus:outline-none focus:border-propertyradar-blue transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-propertyradar-darkblue mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-propertyradar-200 rounded-propertyradar focus:outline-none focus:border-propertyradar-blue transition-colors"
          />
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-propertyradar-darkblue mb-2">
            Industry *
          </label>
          <select
            id="industry"
            name="industry"
            required
            value={formData.industry}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-propertyradar-200 rounded-propertyradar focus:outline-none focus:border-propertyradar-blue transition-colors bg-white"
          >
            <option value="">Select your industry</option>
            <option value="Real Estate Agent">Real Estate Agent</option>
            <option value="Real Estate Investor">Real Estate Investor</option>
            <option value="Home + Property Services">Home + Property Services</option>
            <option value="Mortgage">Mortgage</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-propertyradar-darkblue mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-propertyradar-200 rounded-propertyradar focus:outline-none focus:border-propertyradar-blue transition-colors"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-propertyradar-darkblue mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-propertyradar-200 rounded-propertyradar focus:outline-none focus:border-propertyradar-blue transition-colors"
          />
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-propertyradar p-4 mb-4">
            <p className="text-green-800 font-medium text-center">
              ✅ Successfully submitted! Redirecting you to results...
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-propertyradar p-4 mb-4">
            <p className="text-red-800 font-medium text-center">
              ❌ Submission failed. Please try again or contact support.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!formData.name || !formData.email || !formData.industry || isSubmitting}
          className="w-full bg-gradient-to-r from-propertyradar-blue to-propertyradar-lightblue text-white py-4 px-6 rounded-propertyradar font-bold text-lg hover:from-propertyradar-darkblue hover:to-propertyradar-blue disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Claim Your $50 PropertyRadar Credit'
          )}
        </button>
      </form>
    </div>
  )
}