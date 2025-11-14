// "use client"

// import { useEffect, useState } from 'react'
// import { motion, useMotionValue, useSpring } from 'framer-motion'
// import { useCursor } from '@/hooks/useCursor'

// interface Particle {
//   id: number
//   x: number
//   y: number
//   size: number
//   color: string
//   life: number
// }

// export default function Cursor() {
//   const { position, state } = useCursor()
//   const [isVisible, setIsVisible] = useState(false)
//   const [isPointer, setIsPointer] = useState(false)
//   const [particles, setParticles] = useState<Particle[]>([])
//   const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })

//   // قيم الحركة السلسة
//   const cursorX = useSpring(position.x, {
//     stiffness: 800,
//     damping: 35,
//     mass: 0.1
//   })
//   const cursorY = useSpring(position.y, {
//     stiffness: 800,
//     damping: 35,
//     mass: 0.1
//   })

//   useEffect(() => {
//     setIsVisible(true)

//     // اكتشاف نوع العنصر تحت المؤشر
//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement
//       const isClickable = target.tagName === 'BUTTON' ||
//                          target.tagName === 'A' ||
//                          target.onclick !== null ||
//                          target.style.cursor === 'pointer' ||
//                          target.closest('button') !== null ||
//                          target.closest('a') !== null

//       setIsPointer(isClickable)
//     }

//     document.addEventListener('mouseover', handleMouseOver)
//     return () => document.removeEventListener('mouseover', handleMouseOver)
//   }, [])

//   // إنشاء جسيمات التريل
//   useEffect(() => {
//     const distance = Math.sqrt(
//       Math.pow(position.x - lastPosition.x, 2) +
//       Math.pow(position.y - lastPosition.y, 2)
//     )

//     if (distance > 5) {
//       // إنشاء جسيمات جديدة عند الحركة
//       const newParticles: Particle[] = []
//       const particleCount = Math.min(Math.floor(distance / 10), 3)

//       for (let i = 0; i < particleCount; i++) {
//         newParticles.push({
//           id: Date.now() + i,
//           x: position.x - (position.x - lastPosition.x) * (i / particleCount),
//           y: position.y - (position.y - lastPosition.y) * (i / particleCount),
//           size: Math.random() * 3 + 1,
//           color: isPointer ? '#ec4899' : '#3b82f6',
//           life: 1
//         })
//       }

//       setParticles(prev => [...prev, ...newParticles])
//       setLastPosition(position)
//     }

//     // تحديث وتقليل عمر الجسيمات
//     const interval = setInterval(() => {
//       setParticles(prev =>
//         prev
//           .map(particle => ({
//             ...particle,
//             life: particle.life - 0.05
//           }))
//           .filter(particle => particle.life > 0)
//       )
//     }, 50)

//     return () => clearInterval(interval)
//   }, [position, lastPosition, isPointer])

//   if (!isVisible) return null

//   return (
//     <>
//       {/* الحلقة الخارجية الرئيسية */}
//       <motion.div
//         className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 border-2 backdrop-blur-sm ${
//           isPointer
//             ? 'bg-pink-500/20 border-pink-500 shadow-lg shadow-pink-500/25'
//             : 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/25'
//         }`}
//         style={{
//           x: cursorX,
//           y: cursorY,
//         }}
//         animate={{
//           scale: isPointer ? 1.5 : 1,
//           opacity: isPointer ? 0.8 : 0.6,
//           borderWidth: isPointer ? '3px' : '2px',
//         }}
//         transition={{
//           type: 'spring',
//           stiffness: 500,
//           damping: 28
//         }}
//       />

//       {/* تأثير توسع عند Hover */}
//       <motion.div
//         className={`fixed rounded-full pointer-events-none z-50 ${
//           isPointer
//             ? 'bg-pink-500/10 border border-pink-500/30'
//             : 'bg-blue-500/5 border border-blue-500/20'
//         }`}
//         style={{
//           x: cursorX,
//           y: cursorY,
//         }}
//         animate={{
//           width: isPointer ? 60 : 40,
//           height: isPointer ? 60 : 40,
//           opacity: isPointer ? 0.4 : 0.2,
//         }}
//         transition={{
//           type: 'spring',
//           stiffness: 300,
//           damping: 20
//         }}
//       />

//       {/* جسيمات التريل */}
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className="fixed rounded-full pointer-events-none z-40"
//           style={{
//             x: particle.x,
//             y: particle.y,
//             width: particle.size,
//             height: particle.size,
//             backgroundColor: particle.color,
//             opacity: particle.life * 0.8,
//           }}
//           initial={{
//             scale: 1,
//             opacity: 0.8
//           }}
//           animate={{
//             scale: 0,
//             opacity: 0
//           }}
//           transition={{
//             duration: 0.6,
//             ease: "easeOut"
//           }}
//         />
//       ))}

//       {/* جسيمات إضافية عند Hover */}
//       {isPointer && (
//         <>
//           {[...Array(4)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="fixed w-2 h-2 rounded-full pointer-events-none z-50 bg-pink-400"
//               style={{
//                 x: cursorX,
//                 y: cursorY,
//               }}
//               animate={{
//                 x: cursorX.get() + (Math.cos((i * 90 * Math.PI) / 180) * 30),
//                 y: cursorY.get() + (Math.sin((i * 90 * Math.PI) / 180) * 30),
//                 scale: [0, 1, 0],
//                 opacity: [0, 0.8, 0],
//               }}
//               transition={{
//                 duration: 1.2,
//                 delay: i * 0.1,
//                 repeat: Infinity,
//                 repeatDelay: 1,
//               }}
//             />
//           ))}
//         </>
//       )}

//       {/* تأثير النبض عند Hover */}
//       {isPointer && (
//         <motion.div
//           className="fixed w-16 h-16 rounded-full pointer-events-none z-50 border-2 border-pink-400/50"
//           style={{
//             x: cursorX,
//             y: cursorY,
//           }}
//           animate={{
//             scale: [1, 1.5, 1],
//             opacity: [0.5, 0, 0],
//           }}
//           transition={{
//             duration: 1.5,
//             repeat: Infinity,
//           }}
//         />
//       )}

//       {/* خطوط متصلة عند Hover */}
//       {isPointer && (
//         <>
//           {[...Array(6)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="fixed w-1 h-8 rounded-full pointer-events-none z-50 bg-gradient-to-b from-pink-400 to-transparent"
//               style={{
//                 x: cursorX,
//                 y: cursorY,
//               }}
//               animate={{
//                 rotate: i * 60,
//                 y: cursorY.get() - 20,
//                 opacity: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 1,
//                 delay: i * 0.1,
//                 repeat: Infinity,
//               }}
//             />
//           ))}
//         </>
//       )}

//       {/* تأثير النجوم عند الحركة السريعة */}
//       <motion.div
//         className="fixed pointer-events-none z-50"
//         style={{
//           x: cursorX,
//           y: cursorY,
//         }}
//       >
//         {particles.filter(p => p.life > 0.7).map((particle, index) => (
//           <motion.div
//             key={particle.id + '-star'}
//             className="absolute w-1 h-1 bg-white rounded-full"
//             style={{
//               x: (Math.random() - 0.5) * 20,
//               y: (Math.random() - 0.5) * 20,
//             }}
//             animate={{
//               scale: [0, 1, 0],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: 0.3,
//               delay: index * 0.05,
//             }}
//           />
//         ))}
//       </motion.div>
//     </>
//   )
// }

"use client"

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isText, setIsText] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const cursorX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.1 })
  const cursorY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.1 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.onclick !== null ||
        target.style.cursor === 'pointer' ||
        target.closest('button') !== null ||
        target.closest('a') !== null

      const isTextElement =
        target.tagName === 'P' ||
        target.tagName === 'SPAN' ||
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'LABEL'

      setIsPointer(isInteractive)
      setIsText(isTextElement)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!isVisible) return null

  return (
    <>
      {/* النقطة المركزية */}
      <motion.div
        className={`fixed w-3 h-3 rounded-full pointer-events-none z-50 ${
          isPointer
            ? 'bg-pink-500'
            : isText
            ? 'bg-green-400'
            : 'bg-blue-500'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isPointer ? 1.8 : isText ? 1.3 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28
        }}
      />

      {/* تأثير الـ Glow الرئيسي */}
      <motion.div
        className={`fixed rounded-full pointer-events-none z-50 ${
          isPointer
            ? 'bg-pink-500/20'
            : isText
            ? 'bg-green-400/20'
            : 'bg-blue-500/20'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: isPointer ? 80 : isText ? 60 : 50,
          height: isPointer ? 80 : isText ? 60 : 50,
          opacity: isPointer ? 0.4 : isText ? 0.3 : 0.2,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      />

      {/* تأثير الـ Glow الخارجي */}
      <motion.div
        className={`fixed rounded-full pointer-events-none z-50 ${
          isPointer
            ? 'bg-pink-500/10'
            : isText
            ? 'bg-green-400/10'
            : 'bg-blue-500/10'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: isPointer ? 120 : isText ? 90 : 70,
          height: isPointer ? 120 : isText ? 90 : 70,
          opacity: isPointer ? 0.2 : isText ? 0.15 : 0.1,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}
      />

      {/* تأثير النبض */}
      {isPointer && (
        <motion.div
          className="fixed rounded-full pointer-events-none z-50 bg-pink-500/30"
          style={{
            x: cursorX,
            y: cursorY,
          }}
          animate={{
            width: [0, 100, 0],
            height: [0, 100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      )}
    </>
  )
}
