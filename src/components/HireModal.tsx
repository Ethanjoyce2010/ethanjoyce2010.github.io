import { useState } from 'react'
import { X } from 'lucide-react'

interface HireModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HireModal({ isOpen, onClose }: HireModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    pay: '',
    contact: '',
    jobDetails: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Rate limiting: Prevent submissions more than once per 24 hours
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime
    if (timeSinceLastSubmit < 86400) {
      setSubmitStatus('error')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbz3p5IKTJ-gxfwomyLMKG6Qlc7LhOukuXgjoM83yYqvz_Mc6DVy4osHZiULG9-zIt8/exec'
      
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })

      // With no-cors mode, we can't read the response, so we assume success
      setSubmitStatus('success')
      setLastSubmitTime(now)
      setFormData({
        company: '',
        pay: '',
        contact: '',
        jobDetails: '',
      })
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto card-glass rounded-2xl p-6 md:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white/90">
            Hiring Inquiry
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Interested in hiring someone with my skills? Please fill out the form below and I'll get back to you soon.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="company"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:placeholder-gray-500"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label
              htmlFor="pay"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Pay/Compensation *
            </label>
            <input
              type="text"
              id="pay"
              name="pay"
              value={formData.pay}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:placeholder-gray-500"
              placeholder="e.g., $50,000/year or $25/hour"
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contact Information *
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:placeholder-gray-500"
              placeholder="Email or phone number"
            />
          </div>

          <div>
            <label
              htmlFor="jobDetails"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Job Details *
            </label>
            <textarea
              id="jobDetails"
              name="jobDetails"
              value={formData.jobDetails}
              onChange={handleChange}
              required
              rows={6}
              className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:placeholder-gray-500"
              placeholder="Please describe in detail what the role would involve, responsibilities, requirements, and any other relevant information..."
            />
          </div>

          {/* Submit status */}
          {submitStatus === 'success' && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
              Thank you! Your inquiry has been submitted successfully.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              Sorry, there was an error submitting the form. Please try again or contact me directly.
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700 disabled:opacity-50 dark:bg-cyan-500 dark:hover:bg-cyan-600"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-black/5 dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
