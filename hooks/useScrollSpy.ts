// import { useState, useEffect } from 'react'

// export function useScrollSpy(sections: string[]) {
//   const [activeSection, setActiveSection] = useState<string>('')

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.id)
//           }
//         })
//       },
//       { threshold: 0.5 }
//     )

//     sections.forEach((id) => {
//       const element = document.getElementById(id)
//       if (element) observer.observe(element)
//     })

//     return () => observer.disconnect()
//   }, [sections])

//   return activeSection
// }

"use client"

import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for header

      // Find the current active section
      let currentActive = 'home'

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentActive = sectionId
            break
          }
        }
      }

      // If we're at the bottom of the page, make sure the last section is active
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        currentActive = sectionIds[sectionIds.length - 1]
      }

      setActiveSection(currentActive)
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds])

  return activeSection
}
