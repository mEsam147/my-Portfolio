"use client"

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useLocale } from '@/i18n/useLocale'
import { useRef, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  Code2,
  Palette,
  Database,
  Server,
  Smartphone,
  Cloud,
  GitBranch,
  Cpu,
  Sparkles,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react'

export const skills = [
  { name: "WebXR", level: 85 },
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Tailwind CSS", level: 90 },
];

export default function Skills() {
  const { t } = useLocale()
  const { theme, resolvedTheme } = useTheme()
  const skillsRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 100, mass: 0.1 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Transform hooks - all at top level
  const floatingElementsX = useTransform(cursorX, [0, 1920], [-50, 50])
  const floatingElementsY = useTransform(cursorY, [0, 1080], [-50, 50])

  const backgroundX = useTransform(floatingElementsX, (x) => x * 0.3)
  const backgroundY = useTransform(floatingElementsY, (y) => y * 0.3)

  const gridX = useTransform(floatingElementsX, (x) => x * 0.2)
  const gridY = useTransform(floatingElementsY, (y) => y * 0.2)

  const shape1X = useTransform(floatingElementsX, (x) => x * 0.4)
  const shape1Y = useTransform(floatingElementsY, (y) => y * 0.4)

  const shape2X = useTransform(floatingElementsX, (x) => x * 0.5)
  const shape2Y = useTransform(floatingElementsY, (y) => y * 0.5)

  // Get theme-aware colors
  const getThemeColors = () => {
    if (!mounted || resolvedTheme === 'dark') {
      return {
        background: {
          from: 'rgb(2, 6, 23)',
          via: 'rgb(15, 23, 42)',
          to: 'rgb(30, 41, 59)'
        },
        card: 'rgba(30, 41, 59, 0.8)',
        border: 'rgba(71, 85, 105, 0.5)',
        primary: 'rgb(59, 130, 246)',
        muted: 'rgba(148, 163, 184, 0.3)',
        foreground: 'rgb(248, 250, 252)'
      }
    } else {
      return {
        background: {
          from: 'rgb(248, 250, 252)',
          via: 'rgb(241, 245, 249)',
          to: 'rgb(226, 232, 240)'
        },
        card: 'rgba(255, 255, 255, 0.8)',
        border: 'rgba(203, 213, 225, 0.5)',
        primary: 'rgb(59, 130, 246)',
        muted: 'rgba(148, 163, 184, 0.3)',
        foreground: 'rgb(15, 23, 42)'
      }
    }
  }

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mouseX.set(x)
        mouseY.set(y)
        setCursorPosition({ x: e.clientX, y: e.clientY })

        // إنشاء فقاعات جديدة عند حركة الماوس
        if (Math.random() > 0.8) {
          createBubble(e.clientX, e.clientY)
        }
      }
    }

    const skillsElement = skillsRef.current
    if (skillsElement) {
      skillsElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (skillsElement) {
        skillsElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [mouseX, mouseY, mounted])

  // إنشاء فقاعات مضيئة
  const createBubble = (x: number, y: number) => {
    const newBubble = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 30 + 15
    }

    setBubbles(prev => [...prev.slice(-8), newBubble])
  }

  // إزالة الفقاعات تلقائياً
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setBubbles(prev => prev.slice(1))
    }, 150)

    return () => clearInterval(interval)
  }, [mounted])

  const skillsData = t('skills.items')

  const skillCategories = [
    {
      title: t('skills.categories.frontend'),
      icon: Palette,
      skills: ["React", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "GSAP", "Shaders", "Canvas API"]
    },
    {
      title: t('skills.categories.backend'),
      icon: Server,
      skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "GraphQL", "JWT", "Socket.io", "Redis", "PostgreSQL", "MySQL"]
    },
    {
      title: t('skills.categories.devops'),
      icon: Cloud,
      skills: ["AWS", "Vercel", "Netlify", "GitHub Actions", "Linux"]
    }
  ]

  const techStack = [
    {
      name: "React",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
      level: 95
    },
    {
      name: "Next.js",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original-wordmark.svg",
      level: 90
    },
    {
      name: "TypeScript",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
      level: 88
    },
    {
      name: "Node.js",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
      level: 85
    },
    {
      name: "MongoDB",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
      level: 82
    },
    {
      name: "Tailwind CSS",
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      level: 92
    },
    {
      name: "Express",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
      level: 85
    },
    {
      name: "AWS",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      level: 75
    }
  ]

  const mernStack = [
    {
      technology: "MongoDB",
      description: "NoSQL Database",
      level: 85,
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"
    },
    {
      technology: "Express.js",
      description: "Backend Framework",
      level: 88,
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg"
    },
    {
      technology: "React",
      description: "Frontend Library",
      level: 95,
      image: "https://raw.githubusercontent.com/github/explore/main/topics/react/react.png"
    },
    {
      technology: "Node.js",
      description: "Runtime Environment",
      level: 90,
      image: "https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const colors = getThemeColors()

  if (!mounted) {
    return (
      <section
        ref={skillsRef}
        id="skills"
        className="py-28 relative overflow-hidden min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${colors.background.from}, ${colors.background.via}, ${colors.background.to})`
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-primary/20 rounded-full mx-auto mb-8"></div>
            <div className="h-20 bg-secondary/20 rounded-lg mx-auto mb-6 max-w-2xl"></div>
            <div className="h-6 bg-primary/20 rounded mx-auto mb-12 max-w-lg"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={skillsRef}
      id="skills"
      className="py-28 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.background.from}, ${colors.background.via}, ${colors.background.to})`
      }}
    >
      {/* تأثير الفقاعات المضيئة */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
          }}
          initial={{
            scale: 0,
            opacity: 0.8,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)',
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* تأثير التوهج حول المؤشر */}
      {mounted && (
        <motion.div
          className="fixed pointer-events-none z-50 rounded-full"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            width: 80,
            height: 80,
          }}
          animate={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 30%, transparent 70%)',
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        />
      )}

      {/* خلفية متحركة */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: backgroundX,
          y: backgroundY,
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(219, 39, 119, 0.05))'
        }}
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(219, 39, 119, 0.05))',
            'linear-gradient(135deg, rgba(219, 39, 119, 0.05), rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))',
            'linear-gradient(225deg, rgba(147, 51, 234, 0.05), rgba(219, 39, 119, 0.05), rgba(59, 130, 246, 0.05))',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* شبكة متحركة */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
        style={{
          x: gridX,
          y: gridY,
        }}
      />

      {/* أشكال عائمة */}
      <motion.div
        className="absolute top-20 right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
        style={{
          x: shape1X,
          y: shape1Y,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
        style={{
          x: shape2X,
          y: shape2Y,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl shadow-lg shadow-blue-500/10 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-5 h-5 text-blue-500" />
            </motion.div>
            <span className="text-lg font-semibold text-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              {t('skills.badge')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('skills.title')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {t('skills.subtitle')}
          </motion.p>
        </motion.div>

        {/* MERN Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3 text-gray-900 dark:text-white"
          >
            <Server className="w-8 h-8 text-blue-500" />
            {t('skills.mern')}
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mernStack.map((tech, index) => (
              <motion.div
                key={tech.technology}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center shadow-2xl shadow-black/5 hover:shadow-3xl hover:shadow-blue-500/10 transition-all duration-500 group"
              >
                <motion.div
                  className="mb-3 w-16 h-16 mx-auto"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <img
                    src={tech.image}
                    alt={tech.technology}
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{tech.technology}</h4>
                <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">{tech.description}</p>

                <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{
                      delay: 0.7 + index * 0.1,
                      duration: 1.5,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                  />
                </div>

                <motion.span
                  className="text-xs font-bold text-blue-500 mt-2 block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                >
                  {tech.level}%
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Progress Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
            >
              <Target className="w-6 h-6 text-blue-500" />
              {t('skills.core')}
            </motion.h3>

            {skillsData.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl shadow-black/5 hover:shadow-3xl hover:shadow-blue-500/5 transition-all duration-500 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                    {skill.name}
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      className="text-blue-500"
                    >
                      •
                    </motion.span>
                  </span>
                  <motion.span
                    className="text-sm font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>

                <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25 relative overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{
                      delay: 0.7 + index * 0.1,
                      duration: 1.5,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: [-100, 100],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
            >
              <TrendingUp className="w-6 h-6 text-blue-500" />
              {t('skills.techStack')}
            </motion.h3>

            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-4 text-center shadow-2xl shadow-black/5 hover:shadow-3xl hover:shadow-blue-500/5 transition-all duration-500 group"
                >
                  <motion.div
                    className="mb-2 flex justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-10 h-10 object-contain"
                    />
                  </motion.div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{tech.name}</h4>
                    <div className="w-full bg-gray-200/30 dark:bg-gray-700/30 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        transition={{
                          delay: 0.8 + index * 0.1,
                          duration: 1,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Categories Marquees */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + categoryIndex * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                className="flex items-center gap-3 mb-4"
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <category.icon className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
              </motion.div>

              {/* Dual Marquee Effect */}
              <div className="space-y-4">
                {/* Marquee 1 - Left to Right */}
                <div className="relative overflow-hidden">
                  <motion.div
                    className="flex gap-4"
                    animate={{
                      x: [0, -1032],
                    }}
                    transition={{
                      duration: 25 + categoryIndex * 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {[...category.skills, ...category.skills].map((skill, index) => (
                      <motion.span
                        key={`${category.title}-1-${index}`}
                        className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl text-gray-900 dark:text-white font-medium whitespace-nowrap shadow-lg shadow-black/5 hover:shadow-blue-500/10 transition-all duration-300 cursor-default flex items-center gap-2 group"
                        whileHover={{
                          scale: 1.05,
                          y: -2,
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
                        }}
                      >
                        {skill}
                        <motion.span
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Sparkles className="w-4 h-4 text-blue-500" />
                        </motion.span>
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Gradient Overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent" />
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent" />
                </div>

                {/* Marquee 2 - Right to Left (Reverse) */}
                <div className="relative overflow-hidden">
                  <motion.div
                    className="flex gap-4"
                    animate={{
                      x: [-1032, 0],
                    }}
                    transition={{
                      duration: 30 + categoryIndex * 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {[...category.skills, ...category.skills].map((skill, index) => (
                      <motion.span
                        key={`${category.title}-2-${index}`}
                        className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl text-gray-900 dark:text-white font-medium whitespace-nowrap shadow-lg shadow-black/5 hover:shadow-purple-500/10 transition-all duration-300 cursor-default flex items-center gap-2 group"
                        whileHover={{
                          scale: 1.05,
                          y: -2,
                          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(219, 39, 119, 0.1))'
                        }}
                      >
                        {skill}
                        <motion.span
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ rotate: [0, -360] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Sparkles className="w-4 h-4 text-purple-500" />
                        </motion.span>
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Gradient Overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent" />
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300 mb-6 text-lg"
          >
            Ready to bring your ideas to life with cutting-edge technology?
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.button
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-3xl hover:shadow-purple-500/30 transition-all duration-500 relative overflow-hidden group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                {t('skills.cta')}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Code2 className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
