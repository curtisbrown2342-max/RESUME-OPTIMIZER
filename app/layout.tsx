import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'ResumeAI - AI-Powered Resume Optimizer',
    template: '%s | ResumeAI',
  },
  description: 'Transform your resume with AI-powered optimization. Get instant feedback, improve ATS compatibility, and land more interviews.',
  keywords: ['resume', 'AI', 'job search', 'career', 'ATS', 'optimization'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resumeai.app',
    siteName: 'ResumeAI',
    title: 'ResumeAI - AI-Powered Resume Optimizer',
    description: 'Transform your resume with AI-powered optimization. Get instant feedback, improve ATS compatibility, and land more interviews.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ResumeAI Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeAI - AI-Powered Resume Optimizer',
    description: 'Transform your resume with AI-powered optimization.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
