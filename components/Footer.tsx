"use client"

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart, Sparkles, ArrowUp, Code2, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle theme mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // تأثيرات الماوس للخلفية
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const cursorY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const backgroundX = useTransform(cursorX, [0, 1920], [-30, 30])
  const backgroundY = useTransform(cursorY, [0, 1080], [-30, 30])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    const footerElement = footerRef.current
    if (footerElement) {
      footerElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (footerElement) {
        footerElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [mouseX, mouseY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
  }

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/yourusername",
      name: "GitHub",
      color: resolvedTheme === 'dark' ? "hover:bg-gray-800" : "hover:bg-gray-900 hover:text-white"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/yourusername",
      name: "LinkedIn",
      color: resolvedTheme === 'dark' ? "hover:bg-blue-700" : "hover:bg-blue-600 hover:text-white"
    },
    {
      icon: Twitter,
      href: "https://twitter.com/yourusername",
      name: "Twitter",
      color: resolvedTheme === 'dark' ? "hover:bg-sky-700" : "hover:bg-sky-500 hover:text-white"
    },
    {
      icon: Mail,
      href: "mailto:hello@example.com",
      name: "Email",
      color: resolvedTheme === 'dark' ? "hover:bg-red-700" : "hover:bg-red-500 hover:text-white"
    }
  ]

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ]

  const technologies = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'MongoDB']

  if (!mounted) {
    return (
      <footer className="relative overflow-hidden bg-gradient-to-br from-background via-purple-50/5 to-blue-50/5 dark:from-background dark:via-purple-950/5 dark:to-blue-950/5 border-t border-border/50 py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 bg-primary/20 rounded w-32 mb-4"></div>
            <div className="h-4 bg-primary/20 rounded w-48 mb-8"></div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-br from-background via-purple-50/5 to-blue-50/5 dark:from-background dark:via-purple-950/5 dark:to-blue-950/5 border-t border-border/50 transition-colors duration-300"
    >
      {/* خلفية متحركة */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/3 to-pink-500/3"
        style={{
          x: backgroundX,
          y: backgroundY,
        }}
      />

      {/* أشكال عائمة */}
      <motion.div
        className="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-3xl"
        style={{
          backgroundColor: resolvedTheme === 'dark' ? 'rgba(147, 51, 234, 0.05)' : 'rgba(147, 51, 234, 0.03)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-48 h-48 rounded-full blur-3xl"
        style={{
          backgroundColor: resolvedTheme === 'dark' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.03)'
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

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <motion.div
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Code2 className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Portfolio
                </h3>
              </motion.div>

              <p className="text-muted-foreground leading-relaxed">
                Crafting digital experiences with modern technologies and innovative solutions.
              </p>

              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <Coffee className="w-4 h-4" />
                <span>Fueled by coffee and passion</span>
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg text-foreground">Quick Links</h4>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="block text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer group text-left w-full"
                    whileHover={{ x: 5 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="flex items-center gap-2">
                      <motion.span
                        className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                        animate={{ scale: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      {link.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg text-foreground">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Connect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg text-foreground">Let's Connect</h4>
              <p className="text-muted-foreground text-sm">
                Interested in collaborating? Feel free to reach out for projects, opportunities, or just to say hello!
              </p>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-xl transition-all duration-300 ${social.color} relative overflow-hidden group border-2`}
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <motion.div
                          className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                          initial={false}
                        />
                        <social.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl backdrop-blur-sm cursor-pointer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('contact')}
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Ready to start your next project?
                <span className="text-primary font-semibold ml-1 hover:underline">
                  Let's talk →
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-border/50 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.div
              className="flex items-center gap-2 text-muted-foreground text-sm"
              whileHover={{ scale: 1.02 }}
            >
              <span>&copy; {currentYear} Portfolio. All rights reserved.</span>
              <motion.span
                className="flex items-center gap-1 text-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 fill-current" />
              </motion.span>
            </motion.div>

            {/* Made with love */}
            <motion.div
              className="flex items-center gap-2 text-muted-foreground text-sm"
              whileHover={{ scale: 1.02 }}
            >
              <span>Made with</span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💙
              </motion.span>
              <span>by Your Name</span>
            </motion.div>

            {/* Back to Top */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                className="rounded-xl gap-2 group border-2"
              >
                <span className="text-sm">Back to Top</span>
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowUp className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: resolvedTheme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.4)'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  )
}
