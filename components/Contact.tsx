"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Send, Mail, MapPin, Phone, Sparkles, MessageCircle, Rocket, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useLocale } from '@/i18n/useLocale'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const { t, locale } = useLocale()
  const contactRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Email.js configuration from environment variables
  const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ''
  }

  // Mouse effects for background
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 30 })
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 30 })

  const backgroundX = useTransform(cursorX, [0, 1920], [-60, 60])
  const backgroundY = useTransform(cursorY, [0, 1080], [-60, 60])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (contactRef.current) {
        const rect = contactRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    const contactElement = contactRef.current
    if (contactElement) {
      contactElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (contactElement) {
        contactElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [mouseX, mouseY])

  // Initialize EmailJS
  useEffect(() => {
    if (EMAILJS_CONFIG.PUBLIC_KEY) {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
    }
  }, [])

  // Auto-hide alerts after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null)
        setSuccess(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error, success])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError(t('contact.required', 'Please fill in all fields'))
      setIsLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError(t('contact.emailInvalid', 'Please enter a valid email address'))
      setIsLoading(false)
      return
    }

    // Check if EmailJS is configured
    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
      setError(t('contact.error', 'Email service is not configured properly. Please contact me directly at moesam1456@gmail.com'))
      setIsLoading(false)
      return
    }

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        message: locale === 'ar'
          ? `من: ${formData.name} <${formData.email}>\n\nالرسالة:\n${formData.message}`
          : `From: ${formData.name} <${formData.email}>\n\nMessage:\n${formData.message}`,
        to_name: 'Moesam',
        reply_to: formData.email,
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      if (result.status === 200) {
        setSuccess(t('contact.success', 'Your message has been sent successfully! I will get back to you soon.'))
        setFormData({ name: '', email: '', message: '' })
        setIsSubmitted(true)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (err) {
      console.error('EmailJS Error:', err)
      setError(t('contact.error', 'Failed to send message. Please try again or contact me directly at moesam1456@gmail.com.'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Clear errors when user starts typing
    if (error) setError(null)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email', 'Email'),
      value: "moesam1456@gmail.com",
      description: t('contact.sendEmail', 'Send me an email anytime'),
      color: "from-blue-500 to-cyan-500",
      action: () => window.open('mailto:moesam1456@gmail.com')
    },
    {
      icon: Phone,
      title: t('contact.phone', 'Phone'),
      value: "+20 1220527301",
      color: "from-purple-500 to-pink-500",
      action: () => window.open('tel:+201220527301')
    },
    {
      icon: Phone,
      title: t('contact.whatsapp', 'WhatsApp'),
      value: "+20 1220527301",
      color: "from-green-500 to-emerald-500",
      action: () => window.open('https://wa.me/201220527301', '_blank')
    },
    {
      icon: MapPin,
      title: t('contact.location', 'Location'),
      value: locale === 'ar' ? "مصر" : "Egypt",
      description: t('contact.availableRemote', 'Available for remote work'),
      color: "from-green-500 to-emerald-500",
      action: null
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

  return (
    <section
      ref={contactRef}
      id="contact"
      className="py-28 relative overflow-hidden bg-gradient-to-br from-background via-blue-50/5 to-purple-50/5 dark:from-background dark:via-blue-950/5 dark:to-purple-950/5"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"
        style={{
          x: backgroundX,
          y: backgroundY,
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

      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"
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
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-xl shadow-lg shadow-primary/10 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <MessageCircle className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-lg font-semibold text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('contact.letsConnect', "Let's Connect")}
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
              {t('contact.title')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light"
          >
            {t('contact.description')}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {t('contact.getInTouch', 'Get in touch')}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('contact.descriptionText')}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-card to-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl shadow-black/5 hover:shadow-3xl hover:shadow-primary/5 transition-all duration-500 group cursor-pointer"
                  onClick={info.action || undefined}
                >
                  <div className={`flex items-start gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-lg mb-1">{info.title}</h4>
                      <p className="text-foreground font-semibold mb-1">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-xl border border-primary/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">
                  {t('contact.quickResponse', 'Quick Response')}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('contact.responseText')}
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-gradient-to-br from-card to-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl shadow-black/5"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {t('contact.messageSent', 'Message Sent!')}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t('contact.thankYou', 'Thank you for reaching out. I will get back to you as soon as possible.')}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="rounded-xl"
                    >
                      {t('contact.sendAnother', 'Send Another Message')}
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Inline Form Error Message (for immediate feedback) */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Alert variant="destructive" className="rounded-xl">
                        <AlertCircle className="w-4 h-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="name" className="text-sm font-semibold">
                      {t('contact.name')}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={locale === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      className="rounded-xl border-2 bg-background/50 backdrop-blur-sm focus:border-primary transition-all duration-300 h-12"
                      disabled={isLoading}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email" className="text-sm font-semibold">
                      {t('contact.email')}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={locale === 'ar' ? 'بريدك@example.com' : 'your.email@example.com'}
                      className="rounded-xl border-2 bg-background/50 backdrop-blur-sm focus:border-primary transition-all duration-300 h-12"
                      disabled={isLoading}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="message" className="text-sm font-semibold">
                      {t('contact.message')}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={locale === 'ar' ? 'أخبرني عن مشروعك، أفكارك، أو أي أسئلة لديك...' : 'Tell me about your project, ideas, or any questions you have...'}
                      rows={6}
                      className="rounded-xl border-2 bg-background/50 backdrop-blur-sm focus:border-primary transition-all duration-300 resize-none"
                      disabled={isLoading}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-2xl h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 hover:shadow-3xl hover:shadow-purple-500/30 border-0 font-bold relative overflow-hidden group"
                      size="lg"
                    >
                      {isLoading ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center gap-3"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          {t('contact.sending')}
                        </motion.div>
                      ) : (
                        <>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.8 }}
                          />
                          <span className="relative z-10 flex items-center gap-3">
                            <Send className="w-5 h-5" />
                            {t('contact.sendMessage')}
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Rocket className="w-4 h-4" />
                            </motion.span>
                          </span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>

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
            className="text-muted-foreground text-lg mb-6"
          >
            {t('contact.preferDirect', 'Prefer a more direct approach?')}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex gap-4 flex-wrap justify-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl px-8 py-6 border-2 backdrop-blur-sm"
              onClick={() => window.open('mailto:moesam1456@gmail.com')}
            >
              <Mail className={`w-5 h-5 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {t('contact.sendDirectEmail', 'Send Direct Email')}
            </Button>
            <Button
              size="lg"
              className="rounded-2xl px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl shadow-green-500/25 hover:shadow-3xl hover:shadow-emerald-500/30 border-0"
              onClick={() => window.open('tel:+201220527301')}
            >
              <Phone className={`w-5 h-5 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {t('contact.callNow', 'Call Now')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
