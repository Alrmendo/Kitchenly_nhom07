"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export const useSlideInAnimation = (trigger = true) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && trigger) {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        },
      )
    }
  }, [trigger])

  return ref
}

export const useFadeInAnimation = (trigger = true) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && trigger) {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
      )
    }
  }, [trigger])

  return ref
}

export const useStaggerAnimation = (trigger = true) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && trigger) {
      const children = ref.current.children
      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      )
    }
  }, [trigger])

  return ref
}

export const useButtonHover = () => {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => {
      gsap.to(element, { scale: 1.05, duration: 0.2, ease: "power2.out" })
    }

    const handleMouseLeave = () => {
      gsap.to(element, { scale: 1, duration: 0.2, ease: "power2.out" })
    }

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return ref
}
