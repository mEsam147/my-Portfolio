"use client"

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useLocale } from '@/i18n/useLocale'
import { useRef, useEffect, useState } from 'react'
import { Code, Palette, Database, Rocket, Sparkles, Award, User, Heart, Clock, Zap } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  const { t } = useLocale()
  const aboutRef = useRef<HTMLElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // تأثيرات الماوس للخلفية
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 30 })
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 30 })

  const backgroundX = useTransform(cursorX, [0, 1920], [-50, 50])
  const backgroundY = useTransform(cursorY, [0, 1080], [-50, 50])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    const aboutElement = aboutRef.current
    if (aboutElement) {
      aboutElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (aboutElement) {
        aboutElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [mouseX, mouseY])

  const skills = [
    {
      category: "Frontend Development",
      icon: Palette,
      items: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
      color: "from-blue-500 to-cyan-500",
      progress: 90
    },
    {
      category: "Backend Development",
      icon: Database,
      items: ["Node.js", "Express", "Prisma", "Supabase", "REST APIs"],
      color: "from-purple-500 to-pink-500",
      progress: 85
    },
    {
      category: "DevOps & Tools",
      icon: Code,
      items: ["Git", "AWS", "Figma", "VS Code", "Postman"],
      color: "from-green-500 to-emerald-500",
      progress: 80
    },
    // {
    //   category: "Mobile Development",
    //   icon: Rocket,
    //   items: ["React Native", "Flutter", "iOS", "Android", "Expo"],
    //   color: "from-orange-500 to-red-500",
    //   progress: 75
    // }
  ]

  const stats = [
    { number: "50+", label: "Projects Completed", icon: Award, color: "from-yellow-500 to-orange-500" },
    { number: "3+", label: "Years Experience", icon: Clock, color: "from-blue-500 to-purple-500" },
    { number: "100%", label: "Client Satisfaction", icon: Heart, color: "from-pink-500 to-rose-500" },
    { number: "24/7", label: "Fast Support", icon: Zap, color: "from-green-500 to-teal-500" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section ref={aboutRef} id="about" className="py-28 relative overflow-hidden bg-gradient-to-br from-background via-blue-50/5 to-purple-50/5 dark:from-background dark:via-blue-950/5 dark:to-purple-950/5">
      {/* خلفية متحركة متقدمة */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
        style={{
          x: backgroundX,
          y: backgroundY,
        }}
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(219, 39, 119, 0.1))',
            'linear-gradient(135deg, rgba(219, 39, 119, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
            'linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(219, 39, 119, 0.1), rgba(59, 130, 246, 0.1))',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* شبكة متحركة */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
        style={{
          x: useTransform(backgroundX, (x) => x * 0.5),
          y: useTransform(backgroundY, (y) => y * 0.5),
        }}
      />

      {/* أشكال عائمة متقدمة */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
        style={{
          x: useTransform(backgroundX, (x) => x * 0.3),
          y: useTransform(backgroundY, (y) => y * 0.3),
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
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
        style={{
          x: useTransform(backgroundX, (x) => x * 0.4),
          y: useTransform(backgroundY, (y) => y * 0.4),
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

      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-400/15 to-emerald-500/15 rounded-full blur-3xl"
        style={{
          x: useTransform(backgroundX, (x) => x * 0.6),
          y: useTransform(backgroundY, (y) => y * 0.6),
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-xl shadow-lg shadow-primary/10 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-lg font-semibold text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('about.title')}
              </span>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Crafting digital experiences that blend <span className="font-semibold text-primary">innovation</span> with{' '}
              <span className="font-semibold text-purple-500">functionality</span> to create exceptional web solutions
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 text-center shadow-2xl shadow-black/5 hover:shadow-3xl hover:shadow-primary/10 transition-all duration-500">
                <motion.div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <motion.h3
                  className="text-3xl font-bold text-foreground mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>

                {/* تأثير التوهج */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Profile Image Section - Simplified */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring" }}
            viewport={{ once: true }}
            className="relative flex justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="relative w-96 h-96 rounded-full overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Gradient Border */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full p-1"
                animate={{
                  rotate: isHovered ? [0, 360] : 0,
                }}
                transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "linear" }}
              >
                <div className="absolute inset-1 bg-background rounded-full" />
              </motion.div>

              {/* Profile Image */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/personal.jpg"
                  alt="Mohamed Essam"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>

              {/* Floating Elements */}
              {isHovered && (
                <>
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <motion.div
                    className="absolute -top-2 -left-2 w-5 h-5 bg-pink-500 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                </>
              )}
            </motion.div>
          </motion.div>

          {/* المحتوى */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                {t('about.description')}
              </p>
            </motion.div>

            {/* المهارات المتقدمة */}
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-card to-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <skill.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-foreground text-lg">{skill.category}</h4>
                        <motion.div
                          className="w-24 h-2 bg-muted rounded-full overflow-hidden mt-2"
                          initial={{ width: 0 }}
                          whileInView={{ width: 96 }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                        >
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.progress}%` }}
                            transition={{ delay: 0.9 + index * 0.1, duration: 1.5, ease: "easeOut" }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + itemIndex * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r ${skill.color} text-white shadow-lg cursor-default`}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* زر CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-3xl hover:shadow-purple-500/30 transition-all duration-500 relative overflow-hidden group"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Let's Create Something Amazing
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Rocket className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
