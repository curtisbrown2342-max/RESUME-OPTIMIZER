'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Zap, BarChart3, ArrowRight, Loader2 } from 'lucide-react'

export default function Home() {
  const [resumeText, setResumeText] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'landing' | 'analyzer'>('landing')

  // Handle resume analysis
  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume text')
      return
    }

    setLoading(true)
    try {
      // Call API to analyze resume
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: resumeText }),
      })

      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error('Error analyzing resume:', error)
      alert('Error analyzing resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Landing page section
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">ResumeAI</span>
            </div>
            <Button
              onClick={() => setActiveTab('analyzer')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Now
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              ✨ Powered by Advanced AI
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Land More Interviews with an AI-Optimized Resume
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Get instant AI-powered feedback on your resume. Improve ATS compatibility, enhance impact, and stand out to recruiters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setActiveTab('analyzer')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Analyze Your Resume <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
              Why Choose ResumeAI?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="p-8 border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Instant AI Analysis
                </h3>
                <p className="text-slate-600">
                  Get comprehensive feedback in seconds. Our AI analyzes every aspect of your resume.
                </p>
              </Card>

              {/* Feature 2 */}
              <Card className="p-8 border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  ATS Optimization
                </h3>
                <p className="text-slate-600">
                  Improve your resume's compatibility with Applicant Tracking Systems to get past the first filter.
                </p>
              </Card>

              {/* Feature 3 */}
              <Card className="p-8 border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Actionable Insights
                </h3>
                <p className="text-slate-600">
                  Get specific, actionable recommendations to improve your resume and increase interview chances.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
              Simple, Transparent Pricing
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <Card className="p-8 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
                <p className="text-slate-600 mb-6">Get started with basic analysis</p>
                <div className="text-4xl font-bold text-slate-900 mb-6">$0</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    1 resume analysis
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Basic feedback
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-slate-300" />
                    ATS score
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Card>

              {/* Pro Plan */}
              <Card className="p-8 border-blue-300 bg-gradient-to-br from-blue-50 to-slate-50 relative">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600">Popular</Badge>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
                <p className="text-slate-600 mb-6">For serious job seekers</p>
                <div className="text-4xl font-bold text-slate-900 mb-6">$9<span className="text-lg text-slate-600">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Unlimited analyses
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Detailed feedback
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ATS score & tips
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Free Trial
                </Button>
              </Card>

              {/* Enterprise Plan */}
              <Card className="p-8 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
                <p className="text-slate-600 mb-6">For teams and organizations</p>
                <div className="text-4xl font-bold text-slate-900 mb-6">Custom</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Team accounts
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    API access
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Priority support
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Optimize Your Resume?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of job seekers who've improved their resumes with ResumeAI
            </p>
            <Button
              size="lg"
              onClick={() => setActiveTab('analyzer')}
              className="bg-white text-blue-600 hover:bg-slate-100"
            >
              Start Free Analysis <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-white">ResumeAI</span>
                </div>
                <p className="text-sm">AI-powered resume optimization for job seekers.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">Features</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-sm">
              <p>&copy; 2025 ResumeAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Resume Analyzer Tab
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">ResumeAI</span>
          </button>
          <Button variant="ghost">Sign In</Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Analyze Your Resume
            </h1>
            <p className="text-lg text-slate-600">
              Paste your resume below and get instant AI-powered feedback
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div>
              <Card className="p-6 border-slate-200">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Paste Your Resume
                </label>
                <Textarea
                  placeholder="Paste your resume text here... (copy from Word, PDF, or any document)"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-96 resize-none"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={loading || !resumeText.trim()}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </Card>
            </div>

            {/* Results Section */}
            <div>
              {!analysis ? (
                <Card className="p-8 border-slate-200 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600">
                    Paste your resume and click "Analyze Resume" to get started
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* ATS Score */}
                  <Card className="p-6 border-slate-200 bg-gradient-to-br from-green-50 to-slate-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">ATS Score</h3>
                      <div className="text-4xl font-bold text-green-600">
                        {analysis.atsScore}%
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${analysis.atsScore}%` }}
                      />
                    </div>
                  </Card>

                  {/* Strengths */}
                  <Card className="p-6 border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      ✅ Strengths
                    </h3>
                    <ul className="space-y-2">
                      {analysis.strengths?.map((strength: string, i: number) => (
                        <li key={i} className="flex gap-2 text-slate-700">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Improvements */}
                  <Card className="p-6 border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      💡 Improvements
                    </h3>
                    <ul className="space-y-2">
                      {analysis.improvements?.map((improvement: string, i: number) => (
                        <li key={i} className="flex gap-2 text-slate-700">
                          <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
