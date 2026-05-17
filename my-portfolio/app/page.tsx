'use client'

import { Button } from '@/components/ui/button'
import {
  ArrowUpRight,
  ArrowDown,
  Search,
  ExternalLink,
  Download,
  Building2,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { useState, useMemo } from 'react'
import projectsData from '@/data/projects.json'
import { Project } from '@/types/project'
import rawExperiences from '@/data/experiences.json'
import { Experience } from '@/types/experience'

export default function Home() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const technologies = [
    { name: 'Java' },
    { name: 'Spring Boot' },
    { name: 'Python' },
    { name: 'PostgreSQL' },
    { name: 'Kafka' },
    { name: 'Docker' },
    { name: 'Node.js' },
    { name: 'C' },
  ]

  const projects: Project[] = projectsData
  const experiences = rawExperiences as Experience[]
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const ITEMS_PER_PAGE = 4

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        category === 'All' || project.category === category

      const searchText = search.toLowerCase()

      const matchesSearch =
        project.title.toLowerCase().includes(searchText) ||
        project.category.toLowerCase().includes(searchText) ||
        project.tech.some((t) => t.toLowerCase().includes(searchText))

      return matchesCategory && matchesSearch
    })
  }, [search, category])

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)

  const paginatedProjects = filteredProjects.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  return (
    <>
      {/* HERO */}
      <main className="h-[calc(100vh-4rem)] flex flex-col text-center px-6">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
            Software Engineer
          </h1>

          <h2 className="mt-6 max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
            Building scalable systems and extracting insights from complex data
            to solve real-world problems.
          </h2>

          <div className="mt-10 flex items-center gap-4">
            <Button
              onClick={() => scrollToSection('work')}
              className="text-base px-6 py-5 bg-foreground text-background hover:opacity-90 hover:scale-[1.10] transition-all duration-200 flex items-center gap-2"
            >
              View Work
              <ArrowUpRight className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="text-base px-6 py-5 hover:scale-[1.10] transition-all duration-200"
            >
              Get in Touch
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-muted-foreground">
            <a
              href="https://github.com/vitorhmina"
              className="hover:text-foreground transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>

            <a
              href="https://linkedin.com"
              className="hover:text-foreground transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>

            <a
              href="mailto:vitorhmina@gmail.com"
              className="hover:text-foreground transition-colors"
            >
              <HiOutlineMail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="pb-6 self-center text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </main>

      {/* ABOUT */}
      <section
        id="about"
        className="min-h-screen flex items-center px-6 md:px-20"
      >
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              About
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Hi, I'm Vítor Mina, a software engineer focused on backend
                development with Java and Spring Boot. I enjoy building scalable
                systems and working with distributed architectures, including
                message-driven communication and data processing pipelines.
              </p>

              <p>
                I have hands-on experience developing microservices, integrating
                APIs, and working with technologies like Kafka, RabbitMQ, and
                Docker to build reliable and maintainable systems.
              </p>

              <p>
                I'm actively looking for opportunities where I can contribute to
                real-world backend systems, continue learning from experienced
                engineers, and grow as a developer.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center h-full">
            <h3 className="text-lg font-medium mb-4">Core Technologies</h3>

            <div className="mt-6 grid grid-cols-2 gap-y-4 text-muted-foreground text-base">
              {technologies.map(({ name }) => (
                <div
                  key={name}
                  className="hover:text-foreground transition-colors"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section
        id="work"
        className="min-h-screen flex flex-col justify-center px-6 md:px-20"
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Selected Work
            </h2>

            <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              A collection of projects that showcase my skills in software
              engineering and data science.
            </p>
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-2 flex-wrap">
              {['All', 'Web Development', 'Data/ML', 'Mobile'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat)
                    setPage(1)
                  }}
                  className={`px-4 py-2 text-sm rounded-md border transition hover:scale-[1.07] ${
                    category === cat
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:bg-muted dark:hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-100">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden border border-border rounded-xl p-6 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="transition duration-200 group-hover:blur-sm">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{project.year}</span>
                    <span className="px-2 py-1 rounded-md border">
                      {project.category}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="
                          text-xs px-2 py-1 rounded-md
                          bg-zinc-200/70 text-zinc-800
                          dark:bg-white/10 dark:text-white/80
                          border border-white/10
                          shadow-sm
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {(project.githubUrl || project.liveUrl) && (
                  <div
                    className="
                    absolute inset-0
                    m-auto w-fit h-fit

                    flex items-center gap-3

                    opacity-0 group-hover:opacity-100
                    transition
                  "
                  >
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                        flex items-center gap-2
                        text-base px-4 py-2 rounded-md border
                        bg-background/80 backdrop-blur
                        hover:bg-muted dark:hover:bg-white/10
                        transition
                      "
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                        flex items-center gap-2
                        text-base px-4 py-2 rounded-md border
                        bg-background/80 backdrop-blur
                        hover:bg-muted dark:hover:bg-white/10
                        transition
                      "
                      >
                        <FaGithub className="w-5 h-5" />
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="
                p-2 rounded-md border
                text-muted-foreground
                hover:bg-white hover:text-black
                dark:hover:bg-white dark:hover:text-black
                transition
                disabled:opacity-40 disabled:cursor-not-allowed
              "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="
                p-2 rounded-md border
                text-muted-foreground
                hover:bg-white hover:text-black
                dark:hover:bg-white dark:hover:text-black
                transition
                disabled:opacity-40 disabled:cursor-not-allowed
              "
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="min-h-screen flex items-center px-6 md:px-20"
      >
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Experience
          </h2>

          <div className="mt-12 space-y-14">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-6 border-l border-border"
              >
                <div className="absolute -left-[6px] top-1 w-3 h-3 rounded-full bg-foreground" />

                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">{exp.title}</h4>
                  <span className="text-xs text-muted-foreground">
                    {exp.startYear} - {exp.endYear ?? 'Present'}
                  </span>
                </div>

                <div className="mt-2 flex gap-4 text-xs text-muted-foreground items-center">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {exp.company}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            ))}

            <h2 className="text-2xl md:text-5xl font-semibold tracking-tight">
              Education
            </h2>

            <div className="relative pl-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">BSc Computer Science</h4>
                <span className="text-xs text-muted-foreground">
                  2021 - 2024
                </span>
              </div>

              <div className="mt-2 flex gap-4 text-xs text-muted-foreground items-center">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  Viana do Castelo Polytechnic Institute
                </span>

                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Viana do Castelo, Portugal
                </span>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                Built a strong foundation in computer science, focusing on
                algorithms, data structures, databases, and software engineering
                principles, with practical experience in full-stack development
                and system design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="
        min-h-[60vh]
        flex items-center
        px-6 md:px-20

        bg-[#101826]
        dark:bg-[#010001]
        text-white
      "
      >
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-8">Let's Work Together</h2>

          <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
            I'm always interested in new opportunities and challenging projects.
            Let's discuss how we can build something great together.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:vitorhmina@gmail.com"
              className="
              px-6 py-3 text-sm rounded-md
              bg-white text-black
              hover:opacity-90 transition
              flex items-center gap-2
            "
            >
              <HiOutlineMail className="w-4 h-4 text-black" />
              Get in Touch
            </a>

            <a
              href="/resume.pdf"
              download
              className="
                px-6 py-3 text-sm rounded-md border
                hover:bg-muted transition dark:border-white
                flex items-center gap-2 dark:hover:bg-white/10
              "
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-muted-foreground">
            <a
              href="https://github.com/vitorhmina"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>

            <a
              href="mailto:vitorhmina@gmail.com"
              className="hover:text-foreground transition-colors"
            >
              <HiOutlineMail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-6 px-6">
        <div className="mx-auto text-center text-sm">
          © {new Date().getFullYear()} Vítor Mina. All rights reserved.
        </div>
      </footer>
    </>
  )
}
