'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import * as Tone from 'tone'
import { Code, Database, Laptop, Mail, Github, Linkedin, ExternalLink, Terminal, Cpu } from 'lucide-react'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolling, setIsScrolling] = useState(false)
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  const navRef = useRef<HTMLDivElement>(null)
  const selectorRef = useRef<HTMLDivElement>(null)

  const isHeroInView = useInView(heroRef, { once: true })
  const isAboutInView = useInView(aboutRef, { once: true })
  const isSkillsInView = useInView(skillsRef, { once: true })
  const isProjectsInView = useInView(projectsRef, { once: true })
  const isContactInView = useInView(contactRef, { once: true })

  // Enhanced mouse tracking for liquid glass effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const cards = document.querySelectorAll('.glass-card')
    const time = Date.now() * 0.001
    
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      // Calculate rotation based on mouse position
      const rotation = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI
      
      if (e.clientX >= rect.left - 50 && e.clientX <= rect.right + 50 && 
          e.clientY >= rect.top - 50 && e.clientY <= rect.bottom + 50) {
        ;(card as HTMLElement).style.setProperty('--mouse-x', `${x}%`)
        ;(card as HTMLElement).style.setProperty('--mouse-y', `${y}%`)
        ;(card as HTMLElement).style.setProperty('--mouse-rotation', `${rotation + time * 20}deg`)
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Matrix Effect
  useEffect(() => {
    const createMatrixRain = () => {
      const matrixContainer = document.querySelector('.matrix-rain')
      if (!matrixContainer) return

      const codeStrings = [
        '$ sudo systemctl start matrix\n[OK] Matrix Protocol initialized\n> Wake up, Neo...',
        'PS C:\\> Get-Process | Where-Object {$_.CPU -gt 0}\nProcessName: matrix.exe\nCPU: 99.9%',
        '#!/bin/bash\necho "The Matrix has you..."\nfor i in {1..∞}; do\n  echo $RANDOM\ndone',
        'const reality = {\n  isReal: false,\n  redPill: () => {\n    return truth;\n  }\n};',
        '> ssh neo@matrix.local\nAuthentication successful\nWelcome to Zion Terminal\nlast login: Never',
        'class Agent {\n  constructor() {\n    this.target = "Neo";\n    this.purpose = "eliminate";\n  }\n}',
        'SELECT * FROM humans\nWHERE awakened = false\nAND pod_id IS NOT NULL;\n-- 6 billion rows',
        '0x7C4A8D0B: MOV EAX, [EBP+8]\n0x7C4A8D0E: CMP EAX, 0x12345\n0x7C4A8D13: JE  0x7C4A8D20\n// Blue pill subroutine',
        'import { Matrix } from "./reality";\nif (Matrix.isSimulation()) {\n  console.log("I know kung fu");\n}',
        'root@nebuchadnezzar:~# ./the-one\nLoading Zion coordinates...\n[████████████████] 100%\nJacking out...',
        '$> cat /proc/version\nLinux version 3.14.159 (morpheus@zion)\n#1 SMP Reality is an illusion',
        'function followWhiteRabbit() {\n  const choice = prompt("Red or Blue?");\n  return choice === "red" ? truth : illusion;\n}',
        '// There is no spoon\nconst spoon = null;\nif (!spoon) {\n  bend(reality);\n}',
        'Query: How deep does the rabbit hole go?\nResult: Deeper than you think\n> Continue? [Y/n]'
      ]

      const createColumn = () => {
        const column = document.createElement('div')
        column.className = 'matrix-column'
        column.textContent = codeStrings[Math.floor(Math.random() * codeStrings.length)]
        column.style.left = Math.random() * 98 + '%' // Use full width
        column.style.animationDelay = Math.random() * 1 + 's' // Faster start
        
        // Add 3D depth variation with more variety
        const zDepth = Math.random() * 120
        column.style.setProperty('--z-depth', `${zDepth}px`)
        
        // Vary opacity and size for density effect
        const opacity = 0.7 + (zDepth / 120) * 0.3
        column.style.opacity = opacity.toString()
        
        // Vary font size for depth perception
        const fontSize = 10 + (zDepth / 120) * 6
        column.style.fontSize = `${fontSize}px`
        
        matrixContainer.appendChild(column)

        setTimeout(() => {
          if (column.parentNode) {
            column.remove()
          }
        }, 10000) // Optimized lifespan
      }

      // Create controlled initial columns 
      for (let i = 0; i < 8; i++) {
        setTimeout(createColumn, i * 200)
      }

      const interval = setInterval(createColumn, 300) // Balanced frequency
      return () => clearInterval(interval)
    }

    const cleanup = createMatrixRain()
    return cleanup
  }, [])

  // Sound System
  const playSound = useCallback(async (type: 'hover' | 'click' | 'whoosh') => {
    try {
      await Tone.start()
      const synth = new Tone.Synth().toDestination()
      synth.volume.value = -25
      
      if (type === 'hover') {
        synth.triggerAttackRelease('G4', '0.1')
      } else if (type === 'click') {
        synth.triggerAttackRelease('C5', '0.2')
      } else if (type === 'whoosh') {
        synth.triggerAttackRelease('C3', '0.3')
      }
    } catch {}
  }, [])

  // Navigation slider with smooth animations
  const updateLiquidSelector = useCallback((target: HTMLElement, anticipate: boolean = false) => {
    if (!selectorRef.current || !navRef.current || !target) return
    
    // Validate target element
    if (!target.closest('.nav-items')) return
    
    const navItemsContainer = navRef.current.querySelector('.nav-items')
    if (!navItemsContainer) return
    
    const targetRect = target.getBoundingClientRect()
    const navItemsRect = navItemsContainer.getBoundingClientRect()
    
    // Check element dimensions
    if (!targetRect.width || !targetRect.height || !navItemsRect.width) return
    
    // Calculate position
    const left = Math.max(0, targetRect.left - navItemsRect.left - 4)
    const width = Math.min(targetRect.width + 8, navItemsRect.width - left)
    
    // Keep within bounds
    if (left < 0 || left + width > navItemsRect.width) return
    
    // Smooth animation frame updates
    requestAnimationFrame(() => {
      if (!selectorRef.current) return
      
      if (anticipate) {
        // Quick anticipation effect
        const currentLeft = parseFloat(selectorRef.current.style.transform?.match(/translateX\(([^)]+)\)/)?.[1] || '0')
        const overshoot = left > currentLeft ? Math.min(8, navItemsRect.width - left - width) : Math.max(-8, -left)
        
        selectorRef.current.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.15s ease-out'
        selectorRef.current.style.transform = `translateX(${left + overshoot}px) translateZ(0)`
        
        // Quick settle animation
        setTimeout(() => {
          if (selectorRef.current) {
            selectorRef.current.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s ease-out'
            selectorRef.current.style.transform = `translateX(${left}px) translateZ(0)`
            selectorRef.current.style.width = `${width}px`
          }
        }, 100)
      } else {
        selectorRef.current.style.transform = `translateX(${left}px) translateZ(0)`
        selectorRef.current.style.width = `${width}px`
      }
    })
  }, [])

  const handleNavClick = useCallback((sectionId: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setActiveSection(sectionId)
    
    // Add morph animation effect
    if (selectorRef.current) {
      selectorRef.current.style.animationDuration = '0.4s'
      setTimeout(() => {
        if (selectorRef.current) {
          selectorRef.current.style.animationDuration = '4s'
        }
      }, 400)
    }
    
    // Smooth click animation
    updateLiquidSelector(e.currentTarget, true)
    playSound('click')
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [updateLiquidSelector, playSound])

  // Auto section detection on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    let debounceTimer: NodeJS.Timeout

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Smooth section detection
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (sectionId && sectionId !== activeSection) {
              // Smooth state update
              requestAnimationFrame(() => {
                setActiveSection(sectionId)
              })
            }
          }
        })
      }, 16)
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    const sections = ['hero', 'about', 'skills', 'projects', 'contact']
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
      clearTimeout(debounceTimer)
    }
  }, [activeSection])

  // Track scroll state
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout
    
    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        setIsScrolling(false)
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimer)
    }
  }, [])

  // Update selector position
  useEffect(() => {
    const updateSelector = () => {
      if (!navRef.current) return
      
      const activeNavItem = navRef.current.querySelector('.nav-item.active') as HTMLElement
      if (activeNavItem) {
        // Smooth selector movement
        updateLiquidSelector(activeNavItem, false)
      }
    }

    // Quick update timing
    const timer = setTimeout(updateSelector, 50)
    
    return () => clearTimeout(timer)
  }, [activeSection, updateLiquidSelector])

  // Handle window resize
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout
    
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (navRef.current) {
          const activeNavItem = navRef.current.querySelector('.nav-item.active') as HTMLElement
          if (activeNavItem) {
            updateLiquidSelector(activeNavItem)
          }
        }
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [updateLiquidSelector])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`)
      document.documentElement.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const projects = [
    {
      id: 1,
      title: "Braineath",
      description: "Application iOS native développée en Swift pour la méditation et le bien-être mental. Interface intuitive avec widgets personnalisés et expérience utilisateur optimisée.",
      tech: ["Swift", "Xcode", "iOS", "UIKit", "Core Data"],
      color: "neon-purple",
      icon: <Cpu className="w-8 h-8" />,
      githubUrl: "https://github.com/Ryaaaaaaan/Braineath",
      demoUrl: "https://braineath.vercel.app"
    },
    {
      id: 2,
      title: "Promptly",
      description: "Téléprompter moderne avec reconnaissance vocale en temps réel. Performance optimisée à 60fps avec surlignage séquentiel des mots et raccourcis clavier avancés.",
      tech: ["TypeScript", "Vite", "Speech Recognition", "CSS", "Vercel"],
      color: "neon-cyan",
      icon: <Terminal className="w-8 h-8" />,
      githubUrl: "https://github.com/Ryaaaaaaan/Promptly",
      demoUrl: "https://promptly-five-pi.vercel.app"
    },
    {
      id: 3,
      title: "Braineath Website",
      description: "Site web vitrine pour l'application Braineath. Design moderne et responsive avec galerie de captures d'écran et intégration de services de communication.",
      tech: ["HTML5", "CSS3", "JavaScript", "Vercel", "Responsive Design"],
      color: "neon-green",
      icon: <Code className="w-8 h-8" />,
      githubUrl: "https://github.com/Ryaaaaaaan/Braineath_Website",
      demoUrl: "https://braineath.vercel.app/"
    }
  ]

  const skills = [
    { 
      name: "Frontend Development", 
      icon: <Laptop />, 
      color: "neon-purple", 
      proficiency: 95,
      details: ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      experience: "5+ years"
    },
    { 
      name: "Backend Architecture", 
      icon: <Database />, 
      color: "neon-cyan", 
      proficiency: 90,
      details: ["Node.js", "PostgreSQL", "REST/GraphQL", "Microservices"],
      experience: "4+ years"
    },
    { 
      name: "DevOps & Infrastructure", 
      icon: <Terminal />, 
      color: "neon-green", 
      proficiency: 85,
      details: ["Docker", "Kubernetes", "AWS/Azure", "CI/CD"],
      experience: "3+ years"
    },
    { 
      name: "System Engineering", 
      icon: <Code />, 
      color: "neon-pink", 
      proficiency: 88,
      details: ["Windows Server", "SCCM", "PowerShell", "Active Directory"],
      experience: "3+ years"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Matrix Digital Rain */}
      <div className="matrix-rain"></div>
      
      {/* Liquid Glass Header Pill */}
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <nav className="liquid-header-pill">
          <div className="liquid-nav-content" ref={navRef}>
            <div className="nav-items">
              <a 
                href="#hero" 
                className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('hero', e)}
                onMouseEnter={(e) => {
                  playSound('hover')
                  updateLiquidSelector(e.currentTarget, false)
                }}
                onMouseLeave={() => {
                  if (navRef.current) {
                    const activeNavItem = navRef.current.querySelector('.nav-item.active') as HTMLElement
                    if (activeNavItem) {
                      updateLiquidSelector(activeNavItem, false)
                    }
                  }
                }}
              >
                <span>Accueil</span>
              </a>
              <a 
                href="#about" 
                className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('about', e)}
                onMouseEnter={(e) => {
                  playSound('hover')
                  updateLiquidSelector(e.currentTarget, false)
                }}
                onMouseLeave={() => {
                  if (navRef.current) {
                    const activeNavItem = navRef.current.querySelector('.nav-item.active') as HTMLElement
                    if (activeNavItem) {
                      updateLiquidSelector(activeNavItem, false)
                    }
                  }
                }}
              >
                <span>À propos</span>
              </a>
              <a 
                href="#skills" 
                className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('skills', e)}
                onMouseEnter={(e) => {
                  playSound('hover')
                  updateLiquidSelector(e.currentTarget, false)
                }}
                onMouseLeave={() => {
                  if (navRef.current) {
                    const activeNavItem = navRef.current.querySelector('.nav-item.active') as HTMLElement
                    if (activeNavItem) {
                      updateLiquidSelector(activeNavItem, false)
                    }
                  }
                }}
              >
                <span>Skills</span>
              </a>
              <a 
                href="#projects" 
                className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('projects', e)}
                onMouseEnter={(e) => {
                  playSound('hover')
                  updateLiquidSelector(e.currentTarget, false)
                }}
                onMouseLeave={() => {
                  if (navRef.current) {
                    const activeNavItem = navRef.current.querySelector('.nav-item.active') as HTMLElement
                    if (activeNavItem) {
                      updateLiquidSelector(activeNavItem, false)
                    }
                  }
                }}
              >
                <span>Projets</span>
              </a>
              <a 
                href="#contact" 
                className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('contact', e)}
                onMouseEnter={(e) => {
                  playSound('hover')
                  updateLiquidSelector(e.currentTarget, false)
                }}
                onMouseLeave={() => {
                  if (navRef.current) {
                    const activeNavItem = navRef.current.querySelector('.nav-item.active') as HTMLElement
                    if (activeNavItem) {
                      updateLiquidSelector(activeNavItem, false)
                    }
                  }
                }}
              >
                <span>Contact</span>
              </a>
            </div>
            <div className="liquid-selector" ref={selectorRef}></div>
            <div className="header-glow"></div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Terminal Welcome */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="liquid-terminal-pill cursor-pointer max-w-md mx-auto mb-8"
            onClick={() => {
              playSound('click')
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            onMouseEnter={() => playSound('hover')}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = ((e.clientX - rect.left) / rect.width) * 100
              const y = ((e.clientY - rect.top) / rect.height) * 100
              e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
              e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
            }}
          >
            <div className="liquid-terminal-content">
              <div className="terminal-glow"></div>
              <p className="terminal-text text-sm relative z-10">
                <span className="text-green-400">{'>'}</span> whoami<br />
                <span className="text-white font-semibold">Ryan Zemri - System Engineer & Creative Developer</span><br />
                <span className="text-green-400">{'>'}</span> status: <span className="text-cyan-400 animate-pulse">online ●</span><br />
                <span className="text-purple-400 text-xs">{'>'}</span> <span className="text-gray-400 text-xs">click to connect...</span>
              </p>
              <div className="terminal-particles"></div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="hero-title mb-6"
            onMouseEnter={() => playSound('hover')}
          >
            Ryan Zemri
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hero-tagline mb-12"
          >
            Creative System Engineer • Digital Architect • Code Artist
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSound('whoosh')
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="glass-card neon-glow-purple px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300"
            >
              Découvrir mes projets
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSound('whoosh')
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="glass-card neon-glow-cyan px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300"
            >
              Me contacter
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 hero-tagline"
          >
            À propos
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="glass-card p-8"
            >
              <div className="w-48 h-48 mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-cyan-400 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-6xl font-bold text-white">
                    R
                  </div>
                </div>
                <div className="absolute -inset-4 rounded-full bg-cyan-400 opacity-30 animate-pulse"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6">Ingénieur Système Créatif</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Passionné par l&apos;intersection entre technologie et créativité, je transforme 
                des concepts complexes en expériences digitales élégantes et performantes.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Spécialisé dans les infrastructures modernes, l&apos;automatisation intelligente 
                et les interfaces utilisateur innovantes qui repoussent les limites du possible.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: "Projets", value: "50+" },
                  { label: "Expérience", value: "3 ans" },
                  { label: "Technologies", value: "25+" },
                  { label: "Café/jour", value: "∞" }
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 hero-tagline"
          >
            Compétences
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={isSkillsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.03 }}
                className={`glass-card p-8 text-center group cursor-pointer neon-glow-${skill.color.split('-')[1]}`}
                onMouseEnter={(e) => {
                  playSound('hover')
                  updateLiquidSelector(e.currentTarget, false)
                }}
                onMouseLeave={() => {
                  if (navRef.current) {
                    const activeNavItem = navRef.current.querySelector('.nav-item.active') as HTMLElement
                    if (activeNavItem) {
                      updateLiquidSelector(activeNavItem, false)
                    }
                  }
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="skill-icon-container relative">
                    <div className="text-3xl text-white group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {skill.icon}
                    </div>
                    <div className="skill-icon-glow absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-bold text-white mb-1">{skill.name}</h3>
                    <p className="text-xs text-gray-400">{skill.experience} experience</p>
                  </div>
                </div>
                
                {/* Advanced Progress Bar */}
                <div className="relative mb-4">
                  <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden backdrop-blur border border-gray-700/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isSkillsInView ? { width: `${skill.proficiency}%` } : {}}
                      transition={{ delay: index * 0.2 + 0.5, duration: 1.5, ease: "easeOut" }}
                      className={`skill-progress-bar h-3 rounded-full relative overflow-hidden ${
                        skill.color === 'neon-purple' ? 'from-purple-400 to-pink-400' :
                        skill.color === 'neon-cyan' ? 'from-cyan-400 to-blue-400' :
                        skill.color === 'neon-green' ? 'from-green-400 to-teal-400' :
                        'from-pink-400 to-rose-400'
                      }`}
                      style={{
                        background: `linear-gradient(90deg, ${
                          skill.color === 'neon-purple' ? 'rgb(147 51 234), rgb(236 72 153)' :
                          skill.color === 'neon-cyan' ? 'rgb(34 211 238), rgb(59 130 246)' :
                          skill.color === 'neon-green' ? 'rgb(52 211 153), rgb(20 184 166)' :
                          'rgb(236 72 153), rgb(251 113 133)'
                        })`
                      }}
                    >
                    </motion.div>
                  </div>
                  <span className="absolute right-0 -top-1 text-xs font-bold text-white bg-gray-900/80 px-2 py-1 rounded-full backdrop-blur border border-gray-700/30">
                    {skill.proficiency}%
                  </span>
                </div>
                
                {/* Skill Details */}
                <div className="space-y-2 text-left">
                  <div className="flex flex-wrap gap-1">
                    {skill.details.map((detail, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-full border border-gray-700/30 backdrop-blur hover:bg-gray-700/50 transition-colors"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 hero-tagline"
          >
            Projets
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                animate={isProjectsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 5, 
                  rotateX: 5,
                  z: 50 
                }}
                className={`glass-card p-8 group cursor-pointer neon-glow-${project.color.split('-')[1]}`}
                onMouseEnter={(e) => {
                  playSound('hover')
                  updateLiquidSelector(e.currentTarget, false)
                }}
                onMouseLeave={() => {
                  if (navRef.current) {
                    const activeNavItem = navRef.current.querySelector('.nav-item.active') as HTMLElement
                    if (activeNavItem) {
                      updateLiquidSelector(activeNavItem, false)
                    }
                  }
                }}
                onClick={() => {
                  playSound('click')
                  window.open(project.githubUrl, '_blank')
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-white group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <div className="ml-auto flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {project.demoUrl && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          playSound('click')
                          window.open(project.demoUrl, '_blank')
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="glass-card px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/30 hover:border-cyan-400/50 rounded-xl transition-all duration-300 backdrop-blur-sm group/btn"
                        title="Voir le site web"
                      >
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                          <span className="text-sm font-semibold text-white">Site Web</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      </motion.button>
                    )}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        playSound('click')
                        window.open(project.githubUrl, '_blank')
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass-card px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-400/30 hover:border-purple-400/50 rounded-xl transition-all duration-300 backdrop-blur-sm group/btn"
                      title="Voir le code source"
                    >
                      <div className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-purple-400 group-hover/btn:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-white">GitHub</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </motion.button>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 group-hover:text-white transition-colors duration-300">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 group-hover:bg-white/20 transition-colors duration-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="w-full h-1 bg-cyan-500/20 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 hero-tagline"
          >
            Contact
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isContactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8"
            >
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  Restons connectés
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 backdrop-blur">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-white font-semibold">Email</p>
                      <a href="mailto:Raykosama.pro@icloud.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        Raykosama.pro@icloud.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 backdrop-blur">
                    <Github className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-semibold">GitHub</p>
                      <a href="https://github.com/Ryaaaaaaan" className="text-purple-400 hover:text-purple-300 transition-colors">
                        github.com/Ryaaaaaaan
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 backdrop-blur">
                    <Linkedin className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-semibold">LinkedIn</p>
                      <a href="https://linkedin.com/in/ryan-zemri" className="text-blue-400 hover:text-blue-300 transition-colors">
                        ryan zemri
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Status */}
              <div className="glass-card p-6">
                <div className="terminal-text text-sm">
                  <span className="text-green-400">{'>'}</span> ping rze-portfolio.dev<br />
                  <span className="text-white">PING rze-portfolio.dev: 64 bytes from server</span><br />
                  <span className="text-cyan-400">time=42ms TTL=255</span><br />
                  <span className="text-green-400">{'>'}</span> status: <span className="text-green-400 animate-pulse">● AVAILABLE FOR OPPORTUNITIES</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isContactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Envoyez-moi un message</h3>
                
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault()
                  playSound('click')
                  alert('Merci pour votre message ! Je vous répondrai bientôt.')
                }}>
                  <div>
                    <label className="block text-white font-semibold mb-2">Nom</label>
                    <input
                      type="text"
                      required
                      className="w-full p-4 bg-gray-800/60 border border-gray-700/60 rounded-lg text-white placeholder-gray-300 backdrop-blur focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all"
                      placeholder="Votre nom..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full p-4 bg-gray-800/60 border border-gray-700/60 rounded-lg text-white placeholder-gray-300 backdrop-blur focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Message</label>
                    <textarea
                      required
                      rows={6}
                      className="w-full p-4 bg-gray-800/60 border border-gray-700/60 rounded-lg text-white placeholder-gray-300 backdrop-blur focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all resize-none"
                      placeholder="Votre message..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-cyan-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 backdrop-blur border border-cyan-400/30"
                    onMouseEnter={(e) => {
                  playSound('hover')
                  updateLiquidSelector(e.currentTarget, false)
                }}
                onMouseLeave={() => {
                  if (navRef.current) {
                    const activeNavItem = navRef.current.querySelector('.nav-item.active') as HTMLElement
                    if (activeNavItem) {
                      updateLiquidSelector(activeNavItem, false)
                    }
                  }
                }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Mail className="w-5 h-5" />
                      Envoyer le message
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-8">
            <p className="terminal-text text-center">
              {'>'} Portfolio créé avec passion<br />
              <span className="text-gray-400">© 2025 • Built with Next.js, Framer Motion & lots of ☕</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}