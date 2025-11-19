"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, Globe, Sparkles, Home, User, Folder, Code, MessageCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/i18n/useLocale'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useRouter, usePathname } from 'next/navigation'

const navItems = [
  { id: 'home', icon: Home },
  { id: 'about', icon: User },
  { id: 'projects', icon: Folder },
  { id: 'skills', icon: Code },
  { id: 'contact', icon: MessageCircle }
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isThemeChanging, setIsThemeChanging] = useState(false)
  const [isLanguageChanging, setIsLanguageChanging] = useState(false)
  const { theme, setTheme } = useTheme()
  const { locale, t } = useLocale()
  const activeSection = useScrollSpy(navItems.map(item => item.id))
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = async () => {
    setIsThemeChanging(true)
    await setTheme(theme === 'dark' ? 'light' : 'dark')
    setTimeout(() => setIsThemeChanging(false), 300)
  }

  const toggleLanguage = async () => {
    setIsLanguageChanging(true)
    const newLocale = locale === 'en' ? 'ar' : 'en'
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    router.push(newPath)

    // Reset loading state after navigation
    setTimeout(() => setIsLanguageChanging(false), 1000)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsOpen(false)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
        backgroundColor: scrolled ? 'hsl(var(--background) / 0.95)' : 'hsl(var(--background) / 0.85)',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
        borderColor: scrolled ? 'hsl(var(--border) / 0.3)' : 'hsl(var(--border) / 0.1)'
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        backgroundColor: { duration: 0.2 }
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Your Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="text-white font-bold text-lg"
                whileHover={{ scale: 1.1 }}
              >
                ME
              </motion.span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight">
                Mohamed Essam
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {t('footer.description', 'Full Stack Developer')}
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map(({ id, icon: Icon }) => (
              <motion.div
                key={id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <button
                  onClick={() => scrollToSection(id)}
                  className={`relative px-4 py-3 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 min-w-[100px] justify-center group ${
                    activeSection === id
                      ? 'text-primary shadow-lg shadow-primary/20'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <motion.div
                    animate={{
                      scale: activeSection === id ? 1.2 : 1,
                      rotate: activeSection === id ? [0, -10, 10, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>
                  <span className="font-semibold">{t(`Navigation.${id}`)}</span>

                  {/* Active background effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl -z-10 ${
                      activeSection === id
                        ? 'bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-primary/20'
                        : 'group-hover:bg-accent/30 border border-transparent'
                    }`}
                    layoutId="nav-background"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  {/* Active indicator */}
                  {activeSection === id && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </motion.nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                disabled={isThemeChanging}
                className="rounded-xl relative overflow-hidden group w-10 h-10"
              >
                <AnimatePresence mode="wait">
                  {isThemeChanging ? (
                    <motion.div
                      key="loading"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-180 dark:scale-0" />
                      <Moon className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-180 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Theme change indicator */}
                {isThemeChanging && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring" }}
                  />
                )}
              </Button>
            </motion.div>

            {/* Language Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                disabled={isLanguageChanging}
                className="rounded-xl gap-2 relative overflow-hidden group px-4 h-10 min-w-[80px]"
              >
                <AnimatePresence mode="wait">
                  {isLanguageChanging ? (
                    <motion.div
                      key="loading"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-xs font-medium">
                        {locale === 'en' ? 'AR' : 'EN'}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: locale === 'ar' ? [0, 360] : 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Globe className="h-4 w-4" />
                      </motion.div>
                      <motion.span
                        className="font-semibold"
                        key={locale}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {locale.toUpperCase()}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Language indicator */}
                {!isLanguageChanging && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Loading overlay */}
                {isLanguageChanging && (
                  <motion.div
                    className="absolute inset-0 bg-background/80 rounded-xl flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-xl relative overflow-hidden w-10 h-10 border-2"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Menu open indicator */}
                {isOpen && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  />
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden mt-4 border-t border-border/40 pt-4"
            >
              <motion.div
                className="flex flex-col space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {navItems.map(({ id, icon: Icon }) => (
                  <motion.button
                    key={id}
                    variants={mobileItemVariants}
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(id)}
                    className={`px-4 py-4 rounded-xl text-left transition-all duration-300 font-medium relative overflow-hidden group flex items-center gap-3 ${
                      activeSection === id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-primary border border-primary/20 shadow-lg shadow-primary/10'
                        : 'bg-accent/30 hover:bg-accent/50 text-foreground border border-transparent'
                    }`}
                  >
                    <motion.div
                      animate={{
                        scale: activeSection === id ? 1.3 : 1,
                        rotate: activeSection === id ? [0, -5, 5, 0] : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className={`h-5 w-5 ${activeSection === id ? 'text-primary' : 'text-muted-foreground'}`} />
                    </motion.div>
                    <span className="font-semibold text-base">{t(`Navigation.${id}`)}</span>

                    {/* Slide effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Mobile active indicator */}
                    {activeSection === id && (
                      <motion.div
                        className="absolute right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
