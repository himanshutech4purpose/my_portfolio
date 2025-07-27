'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Zap, Database, Globe, Smartphone } from 'lucide-react'

const About = () => {
  const skills = [
    { name: 'Frontend Development', icon: Code, description: 'React, Next.js, TypeScript, JavaScript' },
    { name: 'Backend Development', icon: Database, description: 'Node.js, Express.js, Python, Java' },
    { name: 'Mobile Development', icon: Smartphone, description: 'React Native, Flutter, Android' },
    { name: 'Cloud & DevOps', icon: Zap, description: 'AWS, Docker, Kubernetes, CI/CD' },
    { name: 'UI/UX Design', icon: Palette, description: 'Figma, Tailwind CSS, Material-UI' },
    { name: 'Web Technologies', icon: Globe, description: 'HTML5, CSS3, REST APIs, GraphQL' },
  ]

  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '15+', label: 'Technologies' },
    { number: '100%', label: 'Client Satisfaction' },
  ]

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
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm a passionate Full Stack Developer with expertise in modern web technologies and a love for creating innovative digital solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Turning Ideas Into Reality
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                I'm a dedicated Full Stack Developer with over 3 years of experience in building scalable web applications and mobile solutions. My journey in technology started with a curiosity to understand how things work, which has evolved into a passion for creating meaningful digital experiences.
              </p>
              <p>
                I specialize in React, Node.js, and cloud technologies, with a strong foundation in both frontend and backend development. I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and best practices.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I'm always excited to take on new challenges and learn from every project.
              </p>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <skill.icon className="text-white" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-800">{skill.name}</h4>
                </div>
                <p className="text-sm text-gray-600">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default About