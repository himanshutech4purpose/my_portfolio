import { notFound } from 'next/navigation'
import { projects, Project } from '@/lib/projects'
import ProjectDetailPage from '@/components/ProjectDetailPage'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  // Only generate static params for projects that have detailed pages
  return projects
    .filter(project => project.hasDetailedPage)
    .map(project => ({
      id: project.id,
    }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const project = projects.find(p => p.id === id)

  if (!project || !project.hasDetailedPage) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - Detailed Overview`,
    description: project.longDescription,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params
  const project = projects.find(p => p.id === id)

  if (!project || !project.hasDetailedPage) {
    notFound()
  }

  // Remove icon function to avoid serialization issues
  const { icon, ...projectData } = project

  return <ProjectDetailPage project={projectData as Project} />
}

