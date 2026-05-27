'use client'

import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'
import { Download, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const yOffset = -80
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset

    window.scrollTo({ top: y, behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full backdrop-blur-md bg-background transition-all',
        scrolled && 'border-b border-border/60'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <div className="font-semibold text-lg md:text-xl tracking-tight leading-none">
          Vítor Mina
        </div>

        <nav className="hidden md:flex items-center gap-8 text-base">
          <button
            onClick={() => scrollToSection('about')}
            className="nav-link-animated"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection('work')}
            className="nav-link-animated"
          >
            Work
          </button>

          <button
            onClick={() => scrollToSection('experience')}
            className="nav-link-animated"
          >
            Experience
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="nav-link-animated"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          <a href="/CV-ENG.PDF" download>
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex gap-2 text-base transition-colors hover:bg-muted dark:hover:bg-white/10 px-4 py-4"
            >
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md hover:bg-muted dark:hover:bg-white/10 transition"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 bg-background border-b border-border">
          <button
            onClick={() => scrollToSection('about')}
            className="text-left text-muted-foreground hover:text-foreground transition"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection('work')}
            className="text-left text-muted-foreground hover:text-foreground transition"
          >
            Work
          </button>

          <button
            onClick={() => scrollToSection('experience')}
            className="text-left text-muted-foreground hover:text-foreground transition"
          >
            Experience
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="text-left text-muted-foreground hover:text-foreground transition"
          >
            Contact
          </button>

          <Button variant="outline" className="mt-2 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Resume
          </Button>
        </div>
      </div>
    </header>
  )
}
