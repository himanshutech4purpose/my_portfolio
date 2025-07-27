'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Briefcase, FolderOpen, FileText, Mail, Heart, Music, Menu, X } from 'lucide-react'

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'about', name: 'About', icon: User },
    { id: 'services', name: 'Services', icon: Briefcase },
    { id: 'portfolio', name: 'Portfolio', icon: FolderOpen },
    { id: 'blog', name: 'Blog', icon: FileText },
    { id: 'contact', name: 'Contact', icon: Mail },
  ]

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false) // Close mobile menu when item is clicked
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="sidebar hidden lg:block"
      >
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="profile-circle mb-4">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                <div className="text-2xl">🌸</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-800">Himanshu</h3>
              <p className="text-sm text-gray-600">Passionate Human Being</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Credits */}
          <div className="p-6 border-t border-gray-200">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center text-sm text-gray-500 space-y-1"
            >
              <div className="flex items-center justify-center gap-1">
                <span>Created with</span>
                <Heart size={12} className="text-red-400" />
                <span>By Himanshu</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <span>Music played</span>
                <Music size={12} className="text-blue-400" />
                <span>By ❤️ </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 hover:bg-white transition-colors duration-200"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleMobileMenu}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md border-r border-gray-200 shadow-xl z-50"
            >
              <div className="flex flex-col h-full">
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Profile Section */}
                <div className="px-6 pb-6 border-b border-gray-200">
                  <div className="profile-circle mb-4">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                      <div className="text-2xl">🌸</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-gray-800">John Doe</h3>
                    <p className="text-sm text-gray-600">Full Stack Developer</p>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 py-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div
                        className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                        onClick={() => handleNavClick(item.id)}
                      >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Credits */}
                <div className="p-6 border-t border-gray-200">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center text-sm text-gray-500 space-y-1"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Created with</span>
                      <Heart size={12} className="text-red-400" />
                      <span>By Himanshu</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span>Music played</span>
                      <Music size={12} className="text-blue-400" />
                      <span>By ❤️ </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Navigation