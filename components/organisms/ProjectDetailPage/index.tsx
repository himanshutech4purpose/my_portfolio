'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Brain, Globe, Database } from 'lucide-react'
import Link from 'next/link'
import { Project } from '@/data/projects'

interface ProjectDetailPageProps {
  project: Omit<Project, 'icon'>
}

// Icon mapping
const iconMap: Record<string, typeof Brain> = {
  Brain,
  Globe,
  Database,
}

const ProjectDetailPage = ({ project }: ProjectDetailPageProps) => {
  const IconComponent = iconMap[project.iconName] || Brain

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/#portfolio"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span>Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                {project.title}
              </h1>
              <p className="text-lg text-gray-600 capitalize">{project.category}</p>
            </div>
          </div>

          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
            {project.longDescription}
          </p>
        </motion.div>

        {/* System Design Section */}
        {project.systemDesign && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              System Design & Architecture
            </h2>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 space-y-6">
              {/* Architecture Overview */}
              {project.systemDesign.architecture && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Architecture Overview</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {project.systemDesign.architecture}
                  </p>
                </div>
              )}

              {/* Components */}
              {project.systemDesign.components && project.systemDesign.components.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Components</h3>
                  <ul className="space-y-2">
                    {project.systemDesign.components.map((component, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-gray-600">{component}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Data Flow */}
              {project.systemDesign.dataFlow && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Flow</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {project.systemDesign.dataFlow}
                  </p>
                </div>
              )}

              {/* Technologies */}
              {project.systemDesign.technologies && project.systemDesign.technologies.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.systemDesign.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Architecture References */}
        {project.architectureReferences && project.architectureReferences.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Architecture References
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {project.architectureReferences.map((ref, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {ref.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {ref.description}
                  </p>
                  {ref.link && (
                    <a
                      href={ref.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary hover:text-secondary transition-colors duration-300"
                    >
                      <span>Learn More</span>
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Key Features */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Key Features
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <ul className="space-y-3">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-600 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}

        {/* Responsibilities */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              My Responsibilities
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <ul className="space-y-3">
                {project.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}

        {/* Technologies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-base rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Links */}
        {(project.liveUrl || project.githubUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {project.liveUrl && project.liveUrl !== '#' && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live demo of ${project.title}`}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} aria-hidden="true" />
                <span>Live Demo</span>
              </motion.a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${project.title}`}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} aria-hidden="true" />
                <span>View Code</span>
              </motion.a>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetailPage

