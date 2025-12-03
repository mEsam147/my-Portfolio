'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useLocale } from '@/i18n/useLocale'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { locale } = useLocale()
  const isRtl = locale === 'ar'

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      setIsVisible(scrollTop > 300)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const buttonPositionClass = isRtl
    ? 'left-4 sm:left-6 md:left-8'
    : 'right-4 sm:right-6 md:right-8'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.3
          }}
          className={`fixed bottom-6 sm:bottom-8 ${buttonPositionClass} z-50`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* Glowing background effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
              }}
            />

            {/* Progress Ring - Centered and subtle */}
            <div className="absolute inset-0 -m-1">
              <svg
                className="w-16 h-16 sm:w-18 sm:h-18"
                viewBox="0 0 100 100"
              >
                {/* Static background ring */}
                <circle
                  cx="45"
                  cy="45"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-gray-300/30 dark:text-gray-600/30"
                  strokeDasharray="4 4"
                />

                {/* Animated progress ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="url(#progress-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - scrollProgress}
                  transform="rotate(-90 50 50)"
                  className="drop-shadow-lg"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 1 - scrollProgress }}
                  transition={{ duration: 0.3 }}
                />

                {/* Inner glowing ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#glow-gradient)"
                  strokeWidth="1"
                  opacity="0.5"
                  animate={{
                    strokeWidth: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <radialGradient id="glow-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Main Button */}
            <Button
              onClick={scrollToTop}
              size="icon"
              className={`
                relative
                rounded-full
                w-12 h-12 sm:w-14 sm:h-14
                bg-gradient-to-br from-gray-900 to-gray-800
                dark:from-gray-800 dark:to-gray-900
                hover:from-gray-800 hover:to-gray-700
                dark:hover:from-gray-700 dark:hover:to-gray-800
                text-white
                shadow-2xl shadow-black/20 dark:shadow-black/40
                hover:shadow-3xl hover:shadow-blue-500/20
                dark:hover:shadow-blue-500/30
                border border-gray-700/50 dark:border-gray-600/50
                hover:border-blue-500/50 dark:hover:border-blue-400/50
                overflow-hidden
                transition-all duration-300
                backdrop-blur-md
                group
              `}
              aria-label={isRtl ? "الرجوع للأعلى" : "Scroll to top"}
            >
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-white/5 dark:bg-white/3 rounded-full" />

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Particle sparkles */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Icon container */}
              <motion.div
                className="relative z-20"
                animate={{
                  y: scrollProgress > 0 ? [0, -4, 0] : 0
                }}
                transition={{
                  y: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                {/* Main arrow */}
                <motion.div
                  animate={{
                    scale: scrollProgress > 0.9 ? [1, 1.2, 1] : 1,
                    rotate: scrollProgress > 0.9 ? [0, 5, -5, 0] : 0
                  }}
                  transition={{
                    scale: {
                      duration: 0.5,
                      repeat: scrollProgress > 0.9 ? Infinity : 0,
                      repeatType: "reverse"
                    },
                    rotate: {
                      duration: 0.5,
                      repeat: scrollProgress > 0.9 ? Infinity : 0
                    }
                  }}
                >
                  <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-blue-300 transition-colors" />
                </motion.div>

                {/* Floating sparkles on hover */}
                <AnimatePresence>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      className="absolute"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-2 h-2 text-blue-300" />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: isRtl ? '100%' : '-100%' }}
                whileHover={{ x: isRtl ? '-100%' : '100%' }}
                transition={{ duration: 0.5 }}
              />

              {/* Progress indicator dots */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {[0.25, 0.5, 0.75].map((threshold) => (
                  <motion.div
                    key={threshold}
                    className={`w-1 h-1 rounded-full ${
                      scrollProgress >= threshold
                        ? 'bg-blue-500 dark:bg-blue-400'
                        : 'bg-gray-400/30 dark:bg-gray-600/30'
                    }`}
                    animate={{
                      scale: scrollProgress >= threshold ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </Button>

            {/* Tooltip for larger screens */}
            <motion.div
              className={`
                absolute top-1/2 -translate-y-1/2
                ${isRtl ? 'left-full ml-3' : 'right-full mr-3'}
                px-3 py-2
                bg-gray-900/90 dark:bg-gray-800/90
                backdrop-blur-sm
                text-white text-xs font-medium
                rounded-lg
                whitespace-nowrap
                hidden sm:block
                shadow-xl
                border border-gray-700/50
              `}
              initial={{ opacity: 0, x: isRtl ? -10 : 10, scale: 0.9 }}
              whileHover={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {isRtl ? "الرجوع للأعلى" : "Scroll to top"}
              </span>
              <div className={`
                absolute top-1/2 -translate-y-1/2
                ${isRtl ? 'right-full' : 'left-full'}
                w-0 h-0
                border-t-[6px] border-b-[6px] border-transparent
                ${isRtl
                  ? 'border-l-0 border-r-[6px] border-r-gray-900/90 dark:border-r-gray-800/90'
                  : 'border-r-0 border-l-[6px] border-l-gray-900/90 dark:border-l-gray-800/90'
                }
              `} />
            </motion.div>

            {/* Mobile label */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 sm:hidden">
              <span className="text-[10px] text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
                {isRtl ? "أعلى" : "Top"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
