import { Globe, Smartphone, Palette, Database, Cloud, Shield } from 'lucide-react'

export interface Service {
  icon: typeof Globe
  title: string
  description: string
  features: string[]
}

export const services: Service[] = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Full-stack web applications with modern technologies and responsive design.',
    features: ['React & Next.js', 'TypeScript', 'RESTful APIs', 'Responsive Design']
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications that work seamlessly across devices.',
    features: ['React Native', 'Flutter', 'Native Performance', 'Offline Support']
  },
  {
    icon: Database,
    title: 'Backend Development',
    description: 'Robust server-side solutions with scalable architecture and security.',
    features: ['Node.js & Express', 'Python & Django', 'Database Design', 'API Development']
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Cloud infrastructure setup and deployment automation for optimal performance.',
    features: ['AWS Services', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Server Management']
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces that enhance user experience.',
    features: ['Figma Design', 'User Research', 'Prototyping', 'Design Systems']
  },
  {
    icon: Shield,
    title: 'Technical Consulting',
    description: 'Expert guidance on technology choices and architecture decisions.',
    features: ['Architecture Review', 'Performance Optimization', 'Security Audits', 'Best Practices']
  }
]

