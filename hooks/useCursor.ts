"use client"

import { useState, useEffect, useCallback } from 'react'

type CursorState = 'default' | 'hover'

export function useCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [state, setState] = useState<CursorState>('default')
  const [isOnInteractive, setIsOnInteractive] = useState(false)

  // دالة لاكتشاف العناصر التفاعلية
  const isInteractiveElement = useCallback((element: Element): boolean => {
    const tagName = element.tagName.toLowerCase()
    const interactiveTags = ['button', 'a', 'input', 'textarea', 'select', 'label']

    // التحقق من العناصر التفاعلية بالعلامات
    if (interactiveTags.includes(tagName)) {
      return true
    }

    // التحقق من العناصر التي لديها event listeners
    if (element instanceof HTMLElement) {
      const hasClickHandler = element.onclick !== null
      const hasPointerCursor = window.getComputedStyle(element).cursor === 'pointer'
      const hasButtonRole = element.getAttribute('role') === 'button'
      const hasTabIndex = element.hasAttribute('tabindex')

      if (hasClickHandler || hasPointerCursor || hasButtonRole || hasTabIndex) {
        return true
      }
    }

    // التحقق من العناصر التي تحتوي على classes معينة
    const interactiveClasses = [
      'cursor-pointer',
      'btn',
      'button',
      'interactive',
      'clickable'
    ]

    const hasInteractiveClass = interactiveClasses.some(className =>
      element.classList.contains(className)
    )

    return hasInteractiveClass
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as Element

    // التحقق من العنصر الحالي وأسلافه
    let currentElement: Element | null = target
    let isInteractive = false

    while (currentElement && currentElement !== document.body) {
      if (isInteractiveElement(currentElement)) {
        isInteractive = true
        break
      }
      currentElement = currentElement.parentElement
    }

    setIsOnInteractive(isInteractive)
    setState(isInteractive ? 'hover' : 'default')
  }, [isInteractiveElement])

  const handleMouseOut = useCallback((e: MouseEvent) => {
    // التحقق إذا كان المؤشر يخرج من العنصر التفاعلي
    const relatedTarget = e.relatedTarget as Element
    let isStillOnInteractive = false

    if (relatedTarget) {
      let currentElement: Element | null = relatedTarget
      while (currentElement && currentElement !== document.body) {
        if (isInteractiveElement(currentElement)) {
          isStillOnInteractive = true
          break
        }
        currentElement = currentElement.parentElement
      }
    }

    if (!isStillOnInteractive) {
      setIsOnInteractive(false)
      setState('default')
    }
  }, [isInteractiveElement])

  // دالة لإضافة event listeners ديناميكية للعناصر الجديدة
  const observeInteractiveElements = useCallback(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // إضافة event listeners للعناصر الجديدة
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              const interactiveElements = node.querySelectorAll(
                'button, a, input, textarea, select, [role="button"], [tabindex], .cursor-pointer, .btn, .button'
              )

              interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                  setIsOnInteractive(true)
                  setState('hover')
                })
                el.addEventListener('mouseleave', () => {
                  setIsOnInteractive(false)
                  setState('default')
                })
              })

              // التحقق من العنصر نفسه إذا كان تفاعلياً
              if (isInteractiveElement(node)) {
                node.addEventListener('mouseenter', () => {
                  setIsOnInteractive(true)
                  setState('hover')
                })
                node.addEventListener('mouseleave', () => {
                  setIsOnInteractive(false)
                  setState('default')
                })
              }
            }
          })
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return observer
  }, [isInteractiveElement])

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsOnInteractive(true)
      setState('hover')
    }

    const handleMouseLeave = () => {
      setIsOnInteractive(false)
      setState('default')
    }

    // إضافة event listeners أساسية
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // إضافة event listeners للعناصر الحالية
    const interactiveSelectors = [
      'button',
      'a',
      'input',
      'textarea',
      'select',
      '[role="button"]',
      '[tabindex]',
      '.cursor-pointer',
      '.btn',
      '.button',
      '.interactive'
    ]

    const interactiveElements = document.querySelectorAll(interactiveSelectors.join(', '))

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // مراقبة العناصر الجديدة
    const observer = observeInteractiveElements()

    // التحقق من حالة المؤشر الأولية
    const checkInitialState = () => {
      const elementUnderCursor = document.elementFromPoint(position.x, position.y)
      if (elementUnderCursor) {
        let currentElement: Element | null = elementUnderCursor
        let isInteractive = false

        while (currentElement && currentElement !== document.body) {
          if (isInteractiveElement(currentElement)) {
            isInteractive = true
            break
          }
          currentElement = currentElement.parentElement
        }

        setIsOnInteractive(isInteractive)
        setState(isInteractive ? 'hover' : 'default')
      }
    }

    // تأخير قليل لضمان تحميل الصفحة بالكامل
    setTimeout(checkInitialState, 100)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })

      observer.disconnect()
    }
  }, [handleMouseMove, handleMouseOver, handleMouseOut, isInteractiveElement, observeInteractiveElements, position.x, position.y])

  return {
    position,
    state,
    isOnInteractive
  }
}
