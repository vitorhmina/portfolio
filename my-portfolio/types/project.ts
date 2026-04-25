export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  category: string
  year: string
  status: string
  githubUrl?: string
  liveUrl?: string
}
