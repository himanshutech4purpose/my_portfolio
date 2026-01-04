import { Home, User, Briefcase, FolderOpen, FileText, Mail } from 'lucide-react'

export interface NavItem {
  id: string
  name: string
  icon: typeof Home
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'about', name: 'About', icon: User },
  { id: 'services', name: 'Services', icon: Briefcase },
  { id: 'portfolio', name: 'Portfolio', icon: FolderOpen },
  { id: 'blog', name: 'Blog', icon: FileText },
  { id: 'contact', name: 'Contact', icon: Mail },
]

export const PROFILE_IMAGES = [
  'https://res.cloudinary.com/dleou9lwe/image/upload/v1764590593/ropar_forest_ovu4ab.jpg',
  'https://res.cloudinary.com/dleou9lwe/image/upload/v1764590590/chopta_vgftig.jpg'
]

