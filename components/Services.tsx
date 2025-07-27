'use client'

import { motion } from 'framer-motion'
import { Globe, Smartphone, Palette, Code, Database, Zap, Cloud, Shield } from 'lucide-react'

const Services = () => {
  const services = [
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

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Services I Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to deployment, I provide comprehensive development services to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Let's Work Together</span>
            <Zap className="ml-2 w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 