# ResumeAI - AI-Powered Resume Optimizer

A modern SaaS application that helps job seekers optimize their resumes using AI-powered analysis.

## 🚀 Features

- **Instant AI Analysis**: Get comprehensive feedback on your resume in seconds
- **ATS Score**: Check your resume's compatibility with Applicant Tracking Systems
- **Actionable Insights**: Receive specific recommendations to improve your resume
- **Beautiful UI**: Modern, professional design built with Next.js and shadcn/ui
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 💰 Monetization Ready

### Pricing Tiers
- **Free**: 1 resume analysis with basic feedback
- **Pro**: $9/month - Unlimited analyses with detailed feedback and ATS score tips
- **Enterprise**: Custom pricing for teams and organizations

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Next.js API Routes

## 📁 Project Structure

```
app/
  ├── layout.tsx           # Root layout with metadata
  ├── page.tsx             # Main page (landing + analyzer)
  ├── globals.css          # Global styles
  └── api/
      └── analyze-resume/
          └── route.ts     # Resume analysis API endpoint

components/
  └── ui/                  # shadcn/ui components

public/
  ├── images/
  │   └── logo.png         # ResumeAI logo
  └── og-image.png         # Social media preview image
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm or bun package manager

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 API Endpoints

### POST /api/analyze-resume

Analyzes a resume and provides AI-powered feedback.

**Request:**
```json
{
  "resume": "Your resume text here..."
}
```

**Response:**
```json
{
  "atsScore": 85,
  "strengths": [
    "Contact information is clearly visible",
    "Work experience section is included",
    "Good use of action verbs throughout"
  ],
  "improvements": [
    "Add quantifiable metrics to achievements",
    "Expand your resume with more detailed descriptions"
  ]
}
```

## 🎨 Design

- **Style**: Apple Minimalist - Clean, professional, minimal design
- **Color Scheme**: Blue gradient (primary), slate grays (neutral)
- **Typography**: Inter font family
- **Components**: Built with shadcn/ui for consistency and accessibility

## 📊 SEO & Metadata

- Comprehensive metadata for search engines
- Open Graph tags for social media sharing
- Twitter Card support
- Semantic HTML structure
- Proper heading hierarchy

## 🔐 Security

- Environment variables for sensitive data
- No API keys exposed in client-side code
- Input validation on API endpoints
- CORS protection

## 📈 Future Enhancements

- Integration with Gemini API for advanced AI analysis
- User authentication and account management
- Resume templates and examples
- Comparison with job descriptions
- Export to PDF functionality
- Email notifications
- Analytics dashboard

## 💳 Monetization Strategy

1. **Free Tier**: Limited analyses to drive conversions
2. **Pro Tier**: Unlimited access at $9/month
3. **Enterprise**: Custom pricing for HR departments and recruitment agencies
4. **API Access**: Charge for programmatic access
5. **White Label**: License to other platforms

## 📞 Support

For questions or issues, please contact support@resumeai.app

## 📄 License

MIT License - feel free to use this project as a starting point for your own SaaS.

---

**Built with ❤️ using Next.js, TypeScript, and shadcn/ui**
