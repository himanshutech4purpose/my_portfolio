'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye, Globe, Smartphone, Database } from 'lucide-react'

const Portfolio = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration, admin dashboard, and inventory management.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
      icon: Globe
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express.js'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
      icon: Globe
    },
    {
      title: 'Mobile Fitness App',
      description: 'A React Native fitness tracking app with workout plans, progress monitoring, and social features.',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Redux', 'Native Base', 'Expo'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'mobile',
      icon: Smartphone
    },
    {
      title: 'API Management System',
      description: 'A comprehensive API management platform with authentication, rate limiting, and analytics dashboard.',
      image: '/api/placeholder/400/300',
      technologies: ['Node.js', 'Express.js', 'JWT', 'Redis', 'Swagger'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'backend',
      icon: Database
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website with animations and interactive elements.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
      icon: Globe
    },
    {
      title: 'Cloud Infrastructure Dashboard',
      description: 'A real-time dashboard for monitoring cloud resources, costs, and performance metrics.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'AWS SDK', 'Chart.js', 'Docker', 'Kubernetes'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'devops',
      icon: Database
    }
  ]

  const categories = ['all', 'web', 'mobile', 'backend', 'devops']

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my latest projects and see how I bring ideas to life with modern technologies and creative solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                  <project.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex space-x-4">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye size={16} />
                    <span>Live Demo</span>
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              I'm always excited to work on new and challenging projects. Let's discuss your ideas and create something amazing together.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start a Project</span>
              <ExternalLink className="ml-2 w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Portfolio