import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Himanshu - Full Stack Developer',
  description: 'Full Stack Developer | Tech Enthusiast | Creating innovative digital solutions with modern technologies',
  keywords: ['Full Stack Developer', 'Web Development', 'React', 'Next.js', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Himanshu' }],
  creator: 'Himanshu',
  openGraph: {
    title: 'Himanshu - Full Stack Developer',
    description: 'Full Stack Developer | Tech Enthusiast | Creating innovative digital solutions with modern technologies',
    type: 'website',
    url: 'https://himanshu-portfolio.vercel.app',
    siteName: 'Himanshu Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himanshu - Full Stack Developer',
    description: 'Full Stack Developer | Tech Enthusiast | Creating innovative digital solutions with modern technologies',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 