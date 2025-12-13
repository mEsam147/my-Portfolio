'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, Sparkles, Eye, Code2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/i18n/useLocale'
import { useRef, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

// export const projects = [
//   {
//     title: 'Eramo Store',
//     description:
//       'Advanced e-commerce web application with full-featured cart & wishlist. Supports guest checkout, user authentication, and smart merging of carts and wishlists across devices. Packed with modern UI and seamless performance for an outstanding shopping experience.',
//     image: '/pro1.png',
//     link: 'https://eramostore.com/en',
//     tags: ['Next.js', 'React', 'Node.js', 'RestApi', 'Tailwind', 'Auth'],
//     hasGithub: false,
//   },
//   {
//     title: 'Eramo Portfolio',
//     description:
//       'Comprehensive online marketplace and SaaS platform with robust features like guest mode, authenticated sessions, wishlist & cart merging, and dynamic content management. Designed for high scalability and seamless multi-device user experience.',
//     image: '/pro2.png',
//     link: 'https://www.e-ramo.net/en',
//     tags: ['Next.js', 'React', 'RestApi', 'Tailwind', 'Node.js', 'Auth'],
//     hasGithub: false,
//   },
//   {
//     title: 'Threads Clone',
//     description:
//       'A real-time chat application built with the MERN stack and Socket.IO. Supports instant messaging, live updates, multiple chat rooms, and responsive design. Includes user authentication, dynamic conversations, and smooth real-time interactions for an authentic chat experience.',
//     image: '/threads.png',
//     link: 'https://new-threads-clone-production.up.railway.app',
//     tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.IO', 'Tailwind', 'Realtime', 'Auth'],
//     hasGithub: true,
//   },
//   {
//     title: 'Slack Clone',
//     description:
//       'A real-time team communication platform with instant messaging, live video calls, multiple channels, and user authentication. Built for seamless collaboration and responsive design.',
//     image: '/projects/slack-clone.png',
//     link: 'https://slackclone.example.com',
//     tags: [
//       'MongoDB',
//       'Express',
//       'React',
//       'Node.js',
//       'Stream Chat',
//       'Stream Video',
//       'Tailwind',
//       'Realtime',
//       'Auth',
//     ],
//     hasGithub: true,
//   },
//   {
//     title: 'Udemy Clone',
//     description:
//       'Full-stack online learning platform replicating Udemy. Features include course management, video streaming, payments, user authentication, and role-based dashboards for students, instructors, and admins with proper permissions. Designed for seamless interaction and responsive UI.',
//     image: '/udemy.png',
//     link: 'https://udemy-clone-sigma.vercel.app',
//     tags: [
//       'Next.js',
//       'React',
//       'Node.js',
//       'Express',
//       'MongoDB',
//       'Stripe',
//       'Cloudinary',
//       'Tailwind CSS',
//       'JWT',
//       'Passport.js',
//       'Admin Dashboard',
//       'Instructor Dashboard',
//       'Student Dashboard',
//       'Role-Based Access',
//     ],
//     hasGithub: true,
//   },
//   {
//     title: 'NextMart',
//     description:
//       'Full-stack e-commerce platform built with Next.js and MERN stack. Features include product catalog, shopping cart, wishlist, secure checkout, user authentication, and an admin dashboard for managing products, orders, and users. Designed with modern UI and seamless multi-device experience.',
//     image: '/nextmart.png',
//     link: 'https://new-ecommerce-5j95.vercel.app',
//     tags: [
//       'Next.js',
//       'React',
//       'Node.js',
//       'Express',
//       'MongoDB',
//       'Tailwind CSS',
//       'Stripe',
//       'JWT',
//       'Admin Dashboard',
//       'Auth',
//       'E-Commerce',
//     ],
//     hasGithub: true,
//   },
//   {
//     title: 'LinkedIn Clone',
//     description:
//       'Full-stack professional networking platform replicating LinkedIn. Includes user authentication, profile management, post creation, real-time feed updates, connections, messaging, and responsive design. Built with modern MERN stack architecture for a seamless user experience.',
//     image: '/linkedin.png',
//     link: 'https://new-linkedin-clone-production.up.railway.app',
//     tags: [
//       'React',
//       'Node.js',
//       'Express',
//       'MongoDB',
//       'Tailwind CSS',
//       'JWT',
//       'Authentication',
//       'Messaging',
//       'Social Network',
//       'Responsive UI',
//     ],
//     hasGithub: true,
//   },
//   {
//     title: 'Airbnb Clone',
//     description:
//       'Full-stack Airbnb clone featuring real-time chat, booking management, user authentication, property listings, and email notifications. Built with Socket.IO for live messaging, Express and Node.js for the backend, MongoDB with Mongoose for data storage, and responsive design using Tailwind CSS.',
//     image: '/airbnb-clone.png', // ضع صورة المشروع هنا
//     link: 'https://your-airbnb-clone-link.com', // ضع رابط المشروع المباشر هنا
//     tags: [
//       'React',
//       'Node.js',
//       'Express',
//       'MongoDB',
//       'Mongoose',
//       'Socket.IO',
//       'Email Services',
//       'Tailwind CSS',
//       'Authentication',
//       'Booking System',
//       'Real-time Chat',
//       'Responsive UI',
//     ],
//     hasGithub: true, // ضع false إذا لم يكن هناك رابط GitHub
//   },
// ]

// Predefined positions for stars

export const projects = [
  {
    title: 'Eramo Store',
    description:
      'Advanced e-commerce web application with full-featured cart & wishlist. Supports guest checkout, user authentication, and smart merging of carts and wishlists across devices. Packed with modern UI and seamless performance for an outstanding shopping experience.',
    image: '/pro1.png',
    link: 'https://eramostore.com/en',
    github: '', // لا يوجد GitHub
    tags: ['Next.js', 'React', 'Node.js', 'RestApi', 'Tailwind', 'Auth'],
    hasGithub: false,
  },
  {
    title: 'Eramo Portfolio',
    description:
      'Comprehensive online marketplace and SaaS platform with robust features like guest mode, authenticated sessions, wishlist & cart merging, and dynamic content management. Designed for high scalability and seamless multi-device user experience.',
    image: '/pro2.png',
    link: 'https://www.e-ramo.net/en',
    github: '', // لا يوجد GitHub
    tags: ['Next.js', 'React', 'RestApi', 'Tailwind', 'Node.js', 'Auth'],
    hasGithub: false,
  },
  {
    title: 'Threads Clone',
    description:
      'A real-time chat application built with the MERN stack and Socket.IO. Supports instant messaging, live updates, multiple chat rooms, and responsive design. Includes user authentication, dynamic conversations, and smooth real-time interactions for an authentic chat experience.',
    image: '/threads.png',
    link: 'https://new-threads-clone-production.up.railway.app',
    github: 'https://github.com/mEsam147/new-threads-clone', // ضع رابط GitHub
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.IO', 'Tailwind', 'Realtime', 'Auth'],
    hasGithub: true,
  },
  {
    title: 'Slack Clone',
    description:
      'A real-time team communication platform with instant messaging, live video calls, multiple channels, and user authentication. Built for seamless collaboration and responsive design.',
    image: '/projects/slack-clone.png',
    link: 'https://slack-clone-9iyk.vercel.app/auth',
    github: 'https://github.com/mEsam147/slack-clone',
    tags: [
      'MongoDB',
      'Express',
      'React',
      'Node.js',
      'Stream Chat',
      'Stream Video',
      'Tailwind',
      'Realtime',
      'Auth',
    ],
    hasGithub: true,
  },
  {
    title: 'Udemy Clone',
    description:
      'Full-stack online learning platform replicating Udemy. Features include course management, video streaming, payments, user authentication, and role-based dashboards for students, instructors, and admins with proper permissions. Designed for seamless interaction and responsive UI.',
    image: '/udemy.png',
    link: 'https://udemy-clone-sigma.vercel.app',
    github: 'https://github.com/username/udemy-clone',
    tags: [
      'Next.js',
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Stripe',
      'Cloudinary',
      'Tailwind CSS',
      'JWT',
      'Passport.js',
      'Admin Dashboard',
      'Instructor Dashboard',
      'Student Dashboard',
      'Role-Based Access',
    ],
    hasGithub: true,
  },
  {
    title: 'NextMart',
    description:
      'Full-stack e-commerce platform built with Next.js and MERN stack. Features include product catalog, shopping cart, wishlist, secure checkout, user authentication, and an admin dashboard for managing products, orders, and users. Designed with modern UI and seamless multi-device experience.',
    image: '/nextmart.png',
    link: 'https://new-ecommerce-5j95.vercel.app',
    github: 'https://github.com/mEsam147/new-Ecommerce',
    tags: [
      'Next.js',
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Tailwind CSS',
      'Stripe',
      'JWT',
      'Admin Dashboard',
      'Auth',
      'E-Commerce',
    ],
    hasGithub: true,
  },
  {
    title: 'LinkedIn Clone',
    description:
      'Full-stack professional networking platform replicating LinkedIn. Includes user authentication, profile management, post creation, real-time feed updates, connections, messaging, and responsive design. Built with modern MERN stack architecture for a seamless user experience.',
    image: '/linkedin.png',
    link: 'https://new-linkedin-clone-production.up.railway.app',
    github: 'https://github.com/mEsam147/new-linkedin-clone',
    tags: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Tailwind CSS',
      'JWT',
      'Authentication',
      'Messaging',
      'Social Network',
      'Responsive UI',
    ],
    hasGithub: true,
  },
  {
    title: 'Airbnb Clone',
    description:
      'Full-stack Airbnb clone featuring real-time chat, booking management, user authentication, property listings, and email notifications. Built with Socket.IO for live messaging, Express and Node.js for the backend, MongoDB with Mongoose for data storage, and responsive design using Tailwind CSS.',
    image: '/airbnb.png',
    link: 'https://airbnb-clone-o9d8.vercel.app/en',
    github: 'https://github.com/mEsam147/airbnb-clone',
    tags: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'Socket.IO',
      'Email Services',
      'Tailwind CSS',
      'Authentication',
      'Booking System',
      'Real-time Chat',
      'Responsive UI',
    ],
    hasGithub: true,
  },
]

const STAR_POSITIONS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 8.3) % 100}%`,
  top: `${(i * 8.3) % 100}%`,
  duration: (i % 3) + 2,
  delay: i % 4,
}))

export default function Projects() {
  const { t } = useLocale()
  const { theme, resolvedTheme } = useTheme()
  const projectsRef = useRef<HTMLElement>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>(
    []
  )

  // Handle theme mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // تأثيرات الماوس للخلفية
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

  // Theme-aware colors
  const getGradientColors = () => {
    // Default light theme for SSR
    if (!mounted) {
      return {
        background: {
          from: 'hsl(210 40% 98%)',
          via: 'hsl(210 40% 96%)',
          to: 'hsl(214 32% 91%)',
        },
        accents: {
          cyan: 'hsl(186 100% 40%)',
          purple: 'hsl(270 100% 55%)',
          pink: 'hsl(330 100% 55%)',
          blue: 'hsl(217 100% 55%)',
          green: 'hsl(142 100% 40%)',
        },
      }
    }

    if (resolvedTheme === 'dark') {
      return {
        background: {
          from: 'hsl(222 84% 5%)',
          via: 'hsl(270 84% 6%)',
          to: 'hsl(222 84% 8%)',
        },
        accents: {
          cyan: 'hsl(186 100% 50%)',
          purple: 'hsl(270 100% 65%)',
          pink: 'hsl(330 100% 65%)',
          blue: 'hsl(217 100% 65%)',
          green: 'hsl(142 100% 50%)',
        },
      }
    } else {
      return {
        background: {
          from: 'hsl(210 40% 98%)',
          via: 'hsl(210 40% 96%)',
          to: 'hsl(214 32% 91%)',
        },
        accents: {
          cyan: 'hsl(186 100% 40%)',
          purple: 'hsl(270 100% 55%)',
          pink: 'hsl(330 100% 55%)',
          blue: 'hsl(217 100% 55%)',
          green: 'hsl(142 100% 40%)',
        },
      }
    }
  }

  const getBubbleColor = () => {
    const colors = getGradientColors()
    if (!mounted) return 'transparent'
    return resolvedTheme === 'dark'
      ? `radial-gradient(circle, ${colors.accents.cyan}20 0%, ${colors.accents.purple}15 50%, transparent 70%)`
      : `radial-gradient(circle, ${colors.accents.cyan}15 0%, ${colors.accents.purple}10 50%, transparent 70%)`
  }

  const getCursorGlow = () => {
    const colors = getGradientColors()
    if (!mounted) return 'transparent'
    return resolvedTheme === 'dark'
      ? `radial-gradient(circle, ${colors.accents.cyan}10 0%, ${colors.accents.purple}8 30%, transparent 70%)`
      : `radial-gradient(circle, ${colors.accents.cyan}8 0%, ${colors.accents.purple}5 30%, transparent 70%)`
  }

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (projectsRef.current) {
        const rect = projectsRef.current.getBoundingClientRect()
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

    const projectsElement = projectsRef.current
    if (projectsElement) {
      projectsElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (projectsElement) {
        projectsElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [mouseX, mouseY, mounted])

  // إنشاء فقاعات مضيئة
  const createBubble = (x: number, y: number) => {
    const newBubble = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 30 + 15,
    }

    setBubbles((prev) => [...prev.slice(-8), newBubble])
  }

  // إزالة الفقاعات تلقائياً
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setBubbles((prev) => prev.slice(1))
    }, 150)

    return () => clearInterval(interval)
  }, [mounted])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const colors = getGradientColors()

  if (!mounted) {
    return (
      <section
        ref={projectsRef}
        id="projects"
        className="py-28 relative overflow-hidden min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${colors.background.from}, ${colors.background.via}, ${colors.background.to})`,
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
      ref={projectsRef}
      id="projects"
      className="py-28 relative overflow-hidden transition-colors duration-300"
      style={{
        background: `linear-gradient(135deg, ${colors.background.from}, ${colors.background.via}, ${colors.background.to})`,
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
            opacity: resolvedTheme === 'dark' ? 0.8 : 0.6,
            background: getBubbleColor(),
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [resolvedTheme === 'dark' ? 0.8 : 0.6, 0.4, 0],
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
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
            background: getCursorGlow(),
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        />
      )}

      {/* خلفية متحركة */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          x: backgroundX,
          y: backgroundY,
          background: `linear-gradient(45deg, ${colors.accents.cyan}10, ${colors.accents.purple}10, ${colors.accents.pink}10)`,
        }}
        animate={{
          background: [
            `linear-gradient(45deg, ${colors.accents.cyan}10, ${colors.accents.purple}10, ${colors.accents.pink}10)`,
            `linear-gradient(135deg, ${colors.accents.pink}10, ${colors.accents.cyan}10, ${colors.accents.purple}10)`,
            `linear-gradient(225deg, ${colors.accents.purple}10, ${colors.accents.pink}10, ${colors.accents.cyan}10)`,
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
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"
        style={{
          x: gridX,
          y: gridY,
        }}
      />

      {/* أشكال عائمة */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
        style={{
          backgroundColor: colors.accents.cyan,
          opacity: 0.1,
          x: shape1X,
          y: shape1Y,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
        style={{
          backgroundColor: colors.accents.purple,
          opacity: 0.1,
          x: shape2X,
          y: shape2Y,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.1, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      {/* جسيمات نجوم متحركة - استخدام المواقع المحددة مسبقاً */}
      <div className="absolute inset-0">
        {STAR_POSITIONS.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: star.left,
              top: star.top,
              backgroundColor: resolvedTheme === 'dark' ? 'white' : 'hsl(var(--foreground))',
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

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
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-background/10 border border-foreground/20 backdrop-blur-xl shadow-lg shadow-primary/10 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5" style={{ color: colors.accents.cyan }} />
            </motion.div>
            <span
              className="text-lg font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.accents.cyan}, ${colors.accents.purple})`,
              }}
            >
              {t('projects.badge')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.accents.blue}, ${colors.accents.purple}, ${colors.accents.pink})`,
              }}
            >
              {t('projects.title')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl max-w-2xl mx-auto leading-relaxed font-light"
            style={{
              color: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
            }}
          >
            {t('projects.subtitle')}
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {projects.map((project, index) => (
            // <motion.div
            //   key={index}
            //   variants={itemVariants}
            //   whileHover={{
            //     y: -12,
            //     scale: 1.02,
            //     transition: { type: 'spring', stiffness: 300, damping: 25 },
            //   }}
            //   onMouseEnter={() => setHoveredProject(index)}
            //   onMouseLeave={() => setHoveredProject(null)}
            //   className="relative group"
            // >
            //   <Card className="h-full relative overflow-hidden border-0 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group">
            //     {/* Project Image */}
            //     <motion.div
            //       className="relative h-56 overflow-hidden rounded-t-lg"
            //       whileHover={{ scale: 1.05 }}
            //       transition={{ duration: 0.5 }}
            //     >
            //       <Image
            //         src={project.image}
            //         alt={project.title}
            //         fill
            //         className="object-cover transition-transform duration-500 group-hover:scale-110"
            //       />
            //       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            //     </motion.div>

            //     <CardHeader className="pb-4 relative z-10">
            //       <CardTitle className="text-xl font-bold transition-colors duration-300 flex items-center gap-2">
            //         {project.title}
            //         <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            //       </CardTitle>
            //       <CardDescription className="leading-relaxed text-sm text-muted-foreground">
            //         {project.description}
            //       </CardDescription>
            //     </CardHeader>

            //     <CardContent className="space-y-6 relative z-10">
            //       {/* Tags */}
            //       <div className="flex flex-wrap gap-2">
            //         {project.tags.map((tag, tagIndex) => (
            //           <span
            //             key={tagIndex}
            //             className="px-3 py-1.5 text-xs font-medium rounded-full text-white shadow-lg cursor-default"
            //             style={{
            //               background: `linear-gradient(to right, ${colors.accents.cyan}, ${colors.accents.purple})`,
            //             }}
            //           >
            //             {tag}
            //           </span>
            //         ))}
            //       </div>

            //       {/* Buttons */}
            //       <div className="flex gap-3">
            //         {project.hasGithub && project.github && (
            //           <Button
            //             asChild
            //             variant="outline"
            //             size="sm"
            //             className="w-full rounded-xl backdrop-blur-sm border-2 flex items-center justify-center gap-2"
            //           >
            //             <a href={project.github} target="_blank" rel="noopener noreferrer">
            //               <Github className="h-4 w-4" /> {t('projects.sourceCode')}
            //             </a>
            //           </Button>
            //         )}

            //         <Button
            //           asChild
            //           size="sm"
            //           className="w-full rounded-xl text-white shadow-lg border-0 flex items-center justify-center gap-2"
            //           style={{
            //             background: `linear-gradient(to right, ${colors.accents.blue}, ${colors.accents.purple})`,
            //           }}
            //         >
            //           <a href={project.link} target="_blank">
            //             <ExternalLink className="h-4 w-4" /> {t('projects.liveDemo')}
            //           </a>
            //         </Button>
            //       </div>
            //     </CardContent>
            //   </Card>
            // </motion.div>

            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 25 },
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative group"
            >
              <Card className="flex flex-col h-full relative overflow-hidden border-0 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                {/* صورة المشروع */}
                <motion.div
                  className="relative h-56 overflow-hidden rounded-t-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                </motion.div>

                {/* محتوى البطاقة */}
                <CardHeader className="pb-4 relative z-10">
                  <CardTitle className="text-xl font-bold transition-colors duration-300 flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </CardTitle>
                  <CardDescription className="leading-relaxed text-sm text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col mt-auto space-y-6 relative z-10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1.5 text-xs font-medium rounded-full text-white shadow-lg cursor-default"
                        style={{ background: `linear-gradient(to right, #06b6d4, #a855f7)` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-auto">
                    {project.hasGithub && project.github && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full rounded-xl backdrop-blur-sm border-2 flex items-center justify-center gap-2"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" /> Source Code
                        </a>
                      </Button>
                    )}

                    <Button
                      asChild
                      size="sm"
                      className="w-full rounded-xl text-white shadow-lg border-0 flex items-center justify-center gap-2"
                      style={{ background: `linear-gradient(to right, #3b82f6, #8b5cf6)` }}
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="rounded-2xl px-12 py-6 text-lg text-white shadow-2xl border-0 font-bold relative overflow-hidden group"
              style={{
                background: `linear-gradient(to right, ${colors.accents.blue}, ${colors.accents.purple})`,
                boxShadow:
                  resolvedTheme === 'dark'
                    ? `0 25px 50px -12px ${colors.accents.blue}25`
                    : `0 25px 50px -12px ${colors.accents.blue}40`,
              }}
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                {t('projects.cta')}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Eye className="w-5 h-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-4 text-sm"
            style={{
              color: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
            }}
          >
            {t('projects.description')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
