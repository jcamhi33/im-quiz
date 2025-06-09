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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.industry) {
      onSubmit(formData)
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

        <button
          type="submit"
          disabled={!formData.name || !formData.email || !formData.industry}
          className="w-full bg-gradient-to-r from-propertyradar-blue to-propertyradar-lightblue text-white py-4 px-6 rounded-propertyradar font-bold text-lg hover:from-propertyradar-darkblue hover:to-propertyradar-blue disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Claim Your $50 PropertyRadar Credit
        </button>
      </form>
    </div>
  )
}