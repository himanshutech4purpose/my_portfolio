'use client'

import { motion } from 'framer-motion'
import { Twitter, Github, Send, Mail, Linkedin } from 'lucide-react'
import { useEffect, useRef } from 'react'

const Hero = () => {
  const rainbowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rainbowRef.current) {
        const rect = rainbowRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        
        rainbowRef.current.style.setProperty('--mouse-x', `${x}%`)
        rainbowRef.current.style.setProperty('--mouse-y', `${y}%`)
      }
    }

    const element = rainbowRef.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
      return () => element.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffb3d9' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Floating Cherry Blossoms */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-soft-pink rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Himanshu
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6">
            Full Stack Developer & Tech Enthusiast
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Passionate about creating innovative web solutions and exploring cutting-edge technologies. 
            Specialized in React, Node.js, and cloud technologies.
          </p>
        </motion.div>

        {/* Rainbow Color Mixing Area */}
        <motion.div
          ref={rainbowRef}
          className="relative w-full h-32 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 via-purple-400 to-pink-400 rounded-2xl mb-8 overflow-hidden cursor-none"
          style={{
            '--mouse-x': '50%',
            '--mouse-y': '50%',
          } as React.CSSProperties}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="absolute w-32 h-32 rounded-full pointer-events-none mix-blend-multiply opacity-70"
            style={{
              left: 'var(--mouse-x)',
              top: 'var(--mouse-y)',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              filter: 'blur(20px)',
            }}
          />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center space-x-6 mb-8"
        >
          <motion.a
            href="https://www.linkedin.com/in/himanshutech4purpose/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:text-secondary transition-colors duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            href="https://github.com/himanshutech4purpose"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:text-secondary transition-colors duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            href="mailto:himanshutech4purpose@gmail.com"
            className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:text-secondary transition-colors duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={24} />
          </motion.a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#portfolio"
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View My Work</span>
            <Send size={20} />
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-3 bg-white/80 backdrop-blur-sm text-primary border-2 border-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero 