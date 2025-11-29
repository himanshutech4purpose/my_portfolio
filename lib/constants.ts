// Site configuration constants
export const SITE_CONFIG = {
  name: 'Himanshu',
  title: 'Himanshu - Full Stack Developer',
  description: 'Full Stack Developer | Tech Enthusiast | Creating innovative digital solutions with modern technologies',
  url: 'https://himanshu-portfolio.vercel.app',
  email: 'himanshutech4purpose@gmail.com',
  linkedin: 'https://www.linkedin.com/in/himanshutech4purpose/',
  github: 'https://github.com/himanshutech4purpose',
} as const

// Navigation items
export const NAV_ITEMS = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'about', name: 'About', href: '#about' },
  { id: 'services', name: 'Services', href: '#services' },
  { id: 'portfolio', name: 'Portfolio', href: '#portfolio' },
  { id: 'contact', name: 'Contact', href: '#contact' },
] as const

// Social links
export const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: SITE_CONFIG.linkedin, icon: 'Linkedin' },
  { name: 'GitHub', url: SITE_CONFIG.github, icon: 'Github' },
] as const

