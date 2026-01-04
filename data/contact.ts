import { Mail, Linkedin, Github, Twitter } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export interface ContactInfo {
  icon: typeof Mail
  title: string
  value: string
  link: string
}

export interface SocialLink {
  icon: typeof Linkedin
  href: string
  label: string
}

export const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: 'Email',
    value: SITE_CONFIG.email,
    link: `mailto:${SITE_CONFIG.email}`
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: 'himanshutech4purpose',
    link: SITE_CONFIG.linkedin
  },
  {
    icon: Github,
    title: 'GitHub',
    value: 'himanshutech4purpose',
    link: SITE_CONFIG.github
  }
]

export const socialLinks: SocialLink[] = [
  { icon: Linkedin, href: SITE_CONFIG.linkedin, label: 'LinkedIn' },
  { icon: Github, href: SITE_CONFIG.github, label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' }
]

