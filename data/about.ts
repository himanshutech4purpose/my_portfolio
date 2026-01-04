import { Code, Palette, Zap, Database, Globe, Smartphone } from 'lucide-react'

export interface Skill {
  name: string
  icon: typeof Code
  description: string
}

export interface Stat {
  number: string
  label: string
}

export const skills: Skill[] = [
  { name: 'Frontend Development', icon: Code, description: 'React, Next.js, TypeScript, JavaScript' },
  { name: 'Backend Development', icon: Database, description: 'Node.js, Express.js, Python, Java' },
  { name: 'Mobile Development', icon: Smartphone, description: 'React Native, Flutter, Android' },
  { name: 'Cloud & DevOps', icon: Zap, description: 'AWS, Docker, Kubernetes, CI/CD' },
  { name: 'UI/UX Design', icon: Palette, description: 'Figma, Tailwind CSS, Material-UI' },
  { name: 'Web Technologies', icon: Globe, description: 'HTML5, CSS3, REST APIs, GraphQL' },
]

export const stats: Stat[] = [
  { number: '3+', label: 'Years Experience' },
  { number: '50+', label: 'Projects Completed' },
  { number: '15+', label: 'Technologies' },
  { number: '100%', label: 'Client Satisfaction' },
]

export const aboutText = {
  title: 'About Me',
  subtitle: 'I\'m a passionate Full Stack Developer with expertise in modern web technologies and a love for creating innovative digital solutions.',
  heading: 'Turning Ideas Into Reality',
  paragraphs: [
    'I\'m a dedicated Full Stack Developer with over 4 years of experience in building scalable web applications and mobile solutions. My journey in technology started with a curiosity to understand how things work, which has evolved into a passion for creating meaningful digital experiences.',
    'I specialize in React, Node.js, and cloud technologies, with a strong foundation in both frontend and backend development. I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and best practices.',
    'When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I\'m always excited to take on new challenges and learn from every project.'
  ]
}

