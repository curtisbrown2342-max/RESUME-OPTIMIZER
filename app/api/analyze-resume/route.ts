import { NextResponse } from 'next/server'

/**
 * POST /api/analyze-resume
 * Analyzes a resume and provides AI-powered feedback
 * 
 * Request body:
 * - resume: string (the resume text to analyze)
 * 
 * Response:
 * - atsScore: number (0-100 ATS compatibility score)
 * - strengths: string[] (list of resume strengths)
 * - improvements: string[] (list of recommended improvements)
 */
export async function POST(request: Request) {
  try {
    const { resume } = await request.json()

    if (!resume || typeof resume !== 'string') {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    // Analyze the resume using simple heuristics
    // In production, this would call an AI API like Gemini, OpenAI, etc.
    const analysis = analyzeResume(resume)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error analyzing resume:', error)
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    )
  }
}

/**
 * Analyzes resume content and provides feedback
 * This is a demo implementation using heuristics
 * In production, integrate with Gemini API or similar
 */
function analyzeResume(resume: string) {
  const lowerResume = resume.toLowerCase()
  let atsScore = 50 // Start with base score

  // Check for key sections
  const hasExperience = /experience|employment|work history/.test(lowerResume)
  const hasEducation = /education|degree|university|college/.test(lowerResume)
  const hasSkills = /skills|technical|proficiency|expertise/.test(lowerResume)
  const hasContact = /email|phone|linkedin|github/.test(lowerResume)

  // Calculate ATS score based on sections
  if (hasExperience) atsScore += 15
  if (hasEducation) atsScore += 10
  if (hasSkills) atsScore += 15
  if (hasContact) atsScore += 10

  // Check for action verbs (good for ATS)
  const actionVerbs = [
    'achieved', 'managed', 'led', 'developed', 'designed', 'implemented',
    'improved', 'increased', 'reduced', 'created', 'built', 'launched'
  ]
  const actionVerbCount = actionVerbs.filter(verb =>
    lowerResume.includes(verb)
  ).length
  atsScore += Math.min(actionVerbCount * 2, 15)

  // Check for quantifiable results
  const hasNumbers = /\d+%|\$\d+|increased by \d+|grew \d+/.test(lowerResume)
  if (hasNumbers) atsScore += 10

  // Cap score at 100
  atsScore = Math.min(atsScore, 100)

  // Generate strengths
  const strengths: string[] = []
  if (hasContact) strengths.push('Contact information is clearly visible')
  if (hasExperience) strengths.push('Work experience section is included')
  if (hasEducation) strengths.push('Education background is documented')
  if (hasSkills) strengths.push('Skills section is present')
  if (actionVerbCount > 5) strengths.push('Good use of action verbs throughout')
  if (hasNumbers) strengths.push('Includes quantifiable achievements and metrics')

  // Generate improvements
  const improvements: string[] = []
  if (!hasContact) improvements.push('Add contact information (email, phone, LinkedIn)')
  if (!hasExperience) improvements.push('Include a dedicated work experience section')
  if (!hasEducation) improvements.push('Add your educational background')
  if (!hasSkills) improvements.push('Create a skills section highlighting key competencies')
  if (actionVerbCount < 5) improvements.push('Use more action verbs to describe accomplishments')
  if (!hasNumbers) improvements.push('Add quantifiable metrics and results to your achievements')
  if (resume.length < 300) improvements.push('Expand your resume with more detailed descriptions')
  if (resume.split('\n').length < 10) improvements.push('Add more content and structure to your resume')

  // Ensure we have at least some feedback
  if (strengths.length === 0) {
    strengths.push('Resume has basic structure')
  }
  if (improvements.length === 0) {
    improvements.push('Consider adding more specific metrics and achievements')
  }

  return {
    atsScore,
    strengths: strengths.slice(0, 5),
    improvements: improvements.slice(0, 5),
  }
}
