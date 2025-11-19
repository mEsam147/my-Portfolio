"use client"

import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/i18n/useLocale'
import { useRef, useEffect, useState } from 'react'
import { ArrowDown, Sparkles, Code, Palette, Server } from 'lucide-react'
import { useTheme } from 'next-themes'
import en from '@/messages/en.json'
import ar from '@/messages/ar.json'

// Data structure for hero section
// export const heroData = {
//   titles: [
//     "Mohamed Essam",
//     "Frontend Developer",
//     "FullStack Developer",
//     "Problem Solver"
//   ],
//   subtitle: "I craft engaging web experiences using React, Next.js, and MERN stack solutions. I have 1 year of professional experience building scalable web apps in a company environment.",
//   badge: {
//     text: "Frontend & FullStack Developer",
//     icon: "Sparkles"
//   },
//   stats: [
//     { number: "1+", label: "Year Experience" },
//     { number: "1", label: "Company Worked" },
//     { number: "20+", label: "Projects Completed" }
//   ],
//   cta: [
//     {
//       text: "See Projects",
//       target: "projects",
//       icon: "ArrowDown"
//     },
//     {
//       text: "Get In Touch",
//       target: "contact"
//     }
//   ]
// }

// Predefined positions for stars to avoid Math.random() during SSR
const STAR_POSITIONS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 5) % 100}%`,
  top: `${(i * 7) % 100}%`,
  duration: (i % 3) + 2,
  delay: (i % 5)
}))

export default function Hero() {
    const { locale } = useLocale() // "en" أو "ar"
  const heroData = locale === 'ar' ? ar.hero : en.hero
  const { theme, resolvedTheme } = useTheme()
  const heroRef = useRef<HTMLElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)

  // استخدام البيانات من heroData
  const texts = heroData.titles
  const subtitle = heroData.subtitle
  const badge = heroData.badge
  const stats = heroData.stats
  const ctaButtons = heroData.cta

  // Handle theme mounting - only run on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // قيم الحركة للخلفية المتحركة
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // تأثير spring لجعل الحركة أكثر سلاسة
  const springConfig = { damping: 25, stiffness: 100, mass: 0.1 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // تأثيرات إضافية للعناصر الأخرى
  const floatingElementsX = useTransform(cursorX, [0, 1920], [-50, 50])
  const floatingElementsY = useTransform(cursorY, [0, 1080], [-50, 50])

  // تأثيرات نصية متقدمة
  const textGlow = useTransform(cursorX, [0, 1920], [0, 1])
  const textShadow = useTransform(textGlow, [0, 1], [
    '0 0 0px hsl(var(--primary) / 0)',
    '0 0 40px hsl(var(--primary) / 0.3)'
  ])

  // Additional transform hooks for specific elements
  const gridX = useTransform(floatingElementsX, (x) => x * 0.2)
  const gridY = useTransform(floatingElementsY, (y) => y * 0.2)

  const shape1X = useTransform(floatingElementsX, (x) => x * 0.3)
  const shape1Y = useTransform(floatingElementsY, (y) => y * 0.3)

  const shape2X = useTransform(floatingElementsX, (x) => x * 0.25)
  const shape2Y = useTransform(floatingElementsY, (y) => y * 0.25)

  const shape3X = useTransform(floatingElementsX, (x) => x * 0.4)
  const shape3Y = useTransform(floatingElementsY, (y) => y * 0.4)

  const icon1X = useTransform(floatingElementsX, (x) => x * 0.15)
  const icon1Y = useTransform(floatingElementsY, (y) => y * 0.15)

  const icon2X = useTransform(floatingElementsX, (x) => x * 0.2)
  const icon2Y = useTransform(floatingElementsY, (y) => y * 0.2)

  const icon3X = useTransform(floatingElementsX, (x) => x * 0.1)
  const icon3Y = useTransform(floatingElementsY, (y) => y * 0.1)

  const textX = useTransform(floatingElementsX, (x) => x * 0.01)
  const textY = useTransform(floatingElementsY, (y) => y * 0.01)

  const scrollIndicatorX = useTransform(floatingElementsX, (x) => x * 0.005)

  // Theme-aware colors using your existing variables
  const getBubbleColor = () => {
    if (!mounted) return 'transparent'
    return resolvedTheme === 'dark'
      ? 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, hsl(var(--secondary) / 0.15) 50%, transparent 70%)'
      : 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--secondary) / 0.1) 50%, transparent 70%)'
  }

  const getCursorGlow = () => {
    if (!mounted) return 'transparent'
    return resolvedTheme === 'dark'
      ? 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, hsl(var(--secondary) / 0.08) 30%, transparent 70%)'
      : 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, hsl(var(--secondary) / 0.05) 30%, transparent 70%)'
  }

  const getGradientColors = () => {
    // Default light theme colors for SSR
    if (!mounted) {
      return {
        from: 'hsl(210 40% 98%)',
        via: 'hsl(210 40% 96%)',
        to: 'hsl(214 32% 91%)'
      }
    }

    if (resolvedTheme === 'dark') {
      return {
        from: 'hsl(222 84% 5%)',
        via: 'hsl(270 84% 6%)',
        to: 'hsl(222 84% 8%)'
      }
    } else {
      return {
        from: 'hsl(210 40% 98%)',
        via: 'hsl(210 40% 96%)',
        to: 'hsl(214 32% 91%)'
      }
    }
  }

  const getAccentColors = () => {
    // Default light theme colors for SSR
    if (!mounted) {
      return {
        cyan: 'hsl(186 100% 40%)',
        purple: 'hsl(270 100% 55%)',
        pink: 'hsl(330 100% 55%)'
      }
    }

    if (resolvedTheme === 'dark') {
      return {
        cyan: 'hsl(186 100% 50%)',
        purple: 'hsl(270 100% 65%)',
        pink: 'hsl(330 100% 65%)'
      }
    } else {
      return {
        cyan: 'hsl(186 100% 40%)',
        purple: 'hsl(270 100% 55%)',
        pink: 'hsl(330 100% 55%)'
      }
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        mouseX.set(x)
        mouseY.set(y)
        setCursorPosition({ x: e.clientX, y: e.clientY })

        // إنشاء فقاعات جديدة عند حركة الماوس
        if (Math.random() > 0.7) {
          createBubble(e.clientX, e.clientY)
        }
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      heroElement.addEventListener('mouseenter', handleMouseEnter)
      heroElement.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove)
        heroElement.removeEventListener('mouseenter', handleMouseEnter)
        heroElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [mouseX, mouseY])

  // تأثير الكتابة المتقدمة والسلاسة
  useEffect(() => {
    if (isPaused || !mounted) return

    const currentTextFull = texts[currentTextIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      // الكتابة
      if (currentText.length < currentTextFull.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentTextFull.substring(0, currentText.length + 1))
        }, 80 + Math.random() * 40)
      } else {
        // الانتظار بعد اكتمال الكتابة
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 1500)
      }
    } else {
      // المسح
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1))
        }, 40 + Math.random() * 30)
      } else {
        // الانتقال للنص التالي
        timeout = setTimeout(() => {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }, 500)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, isPaused, mounted])

  // إيقاف الكتابة عند التمرير أو التفاعل
  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => setIsPaused(true)
    const handleInteraction = () => setIsPaused(false)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleInteraction)
    window.addEventListener('click', handleInteraction)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleInteraction)
      window.removeEventListener('click', handleInteraction)
    }
  }, [mounted])

  // إنشاء فقاعات مضيئة
  const createBubble = (x: number, y: number) => {
    const newBubble = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 40 + 20
    }

    setBubbles(prev => [...prev.slice(-15), newBubble])
  }

  // إزالة الفقاعات تلقائياً
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setBubbles(prev => prev.slice(1))
    }, 100)

    return () => clearInterval(interval)
  }, [mounted])

  // دالة للحصول على الأيقونة بناءً على الاسم
  const getIcon = (iconName: string) => {
    const accentColors = getAccentColors()
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" style={{ color: accentColors.cyan }} />
      case 'ArrowDown':
        return <ArrowDown className="w-5 h-5" />
      default:
        return null
    }
  }

  const gradientColors = getGradientColors()
  const accentColors = getAccentColors()

  if (!mounted) {
    return (
      <section
        ref={heroRef}
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`
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
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300"
      style={{
        background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`
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
            width: 100,
            height: 100,
          }}
          animate={{
            background: getCursorGlow(),
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        />
      )}

      {/* شبكة متحركة خفيفة */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20"
        style={{
          x: gridX,
          y: gridY,
        }}
      />

      {/* أشكال هندسية عائمة */}
      <motion.div
        className="absolute top-20 left-20 w-80 h-80 rounded-full blur-3xl"
        style={{
          backgroundColor: accentColors.cyan,
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
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
        style={{
          backgroundColor: accentColors.purple,
          opacity: 0.1,
          x: shape2X,
          y: shape2Y,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.05, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-3xl"
        style={{
          backgroundColor: accentColors.cyan,
          opacity: 0.1,
          x: shape3X,
          y: shape3Y,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      />

      {/* أيقونات تقنية عائمة */}
      <motion.div
        className="absolute top-32 right-32 opacity-20"
        style={{
          color: accentColors.cyan,
          x: icon1X,
          y: icon1Y,
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Code size={48} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-32 opacity-20"
        style={{
          color: accentColors.purple,
          x: icon2X,
          y: icon2Y,
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Palette size={42} />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 opacity-20"
        style={{
          color: accentColors.cyan,
          x: icon3X,
          y: icon3Y,
        }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, 0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      >
        <Server size={36} />
      </motion.div>

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

      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 border border-foreground/20 backdrop-blur-sm"
          >
            {getIcon(badge.icon)}
            <span className="text-sm font-medium" style={{ color: accentColors.cyan }}>
              {badge.text}
            </span>
          </motion.div>

          {/* العنوان الرئيسي مع تأثير الكتابة */}
          <motion.div className="space-y-6">
            <motion.div
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight min-h-[1.2em] flex items-center justify-center"
              style={{
                textShadow: textShadow,
              }}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${accentColors.cyan}, ${accentColors.purple}, ${accentColors.pink})`
                }}
              >
                {currentText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ color: accentColors.cyan }}
                  className="ml-1"
                >
                  |
                </motion.span>
              </span>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed font-light"
              style={{
                color: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
                x: textX,
                y: textY,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          {/* الإحصائيات */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <div className="text-2xl font-bold" style={{ color: accentColors.cyan }}>
                  {stat.number}
                </div>
                <div
                  className="text-sm"
                  style={{ color: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* أزرار CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {ctaButtons.map((button, index) => (
              <motion.div
                key={button.text}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className={`rounded-full px-8 py-6 text-lg relative overflow-hidden group transition-all duration-300 ${
                    index === 0
                      ? 'border-0 shadow-2xl text-white'
                      : 'border-2 backdrop-blur-sm'
                  }`}
                  style={{
                    background: index === 0
                      ? `linear-gradient(to right, ${accentColors.cyan}, ${accentColors.purple})`
                      : 'transparent',
                    borderColor: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                    color: index === 0 ? 'white' : resolvedTheme === 'dark' ? 'white' : 'black'
                  }}
                  onClick={() => document.getElementById(button.target)?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {index === 0 && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {button.text}
                    {button.icon && (
                      <motion.div
                        animate={button.icon === 'ArrowDown' ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {getIcon(button.icon)}
                      </motion.div>
                    )}
                  </span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* مؤشر التمرير المتقدم */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          x: scrollIndicatorX,
        }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-6 h-10 border-2 rounded-full flex justify-center backdrop-blur-sm"
            style={{
              borderColor: resolvedTheme === 'dark' ? 'rgba(34, 211, 238, 0.5)' : 'rgba(34, 211, 238, 0.7)'
            }}
            whileHover={{ borderColor: accentColors.cyan }}
          >
            <motion.div
              className="w-1 h-3 rounded-full mt-2"
              style={{ backgroundColor: accentColors.cyan }}
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <motion.p
            className="text-xs"
            style={{ color: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll Down
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}
