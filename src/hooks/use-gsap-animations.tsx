"use client"

import { useRef } from "react"
import { gsap } from "gsap"

export const useGSAPAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<(HTMLElement | null)[]>([])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }

  const animateStepEntry = () => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
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
  }

  const animateStepExit = (direction: "left" | "right" = "left") => {
    if (containerRef.current) {
      return gsap.to(containerRef.current, {
        opacity: 0,
        x: direction === "left" ? -50 : 50,
        duration: 0.4,
        ease: "power2.in",
      })
    }
    return Promise.resolve()
  }

  const animateGridItems = (delay = 0) => {
    gsap.fromTo(
      elementsRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        delay,
        ease: "back.out(1.7)",
      },
    )
  }

  const animateSelection = (element: HTMLElement, selected: boolean) => {
    gsap.to(element, {
      scale: selected ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
    })

    if (selected) {
      gsap.to(element, {
        rotationY: 360,
        duration: 0.6,
        ease: "power2.out",
      })
    }
  }

  const animateButton = (element: HTMLElement, type: "hover" | "click" | "reset") => {
    switch (type) {
      case "hover":
        gsap.to(element, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out",
        })
        break
      case "click":
        gsap.to(element, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        })
        break
      case "reset":
        gsap.to(element, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        })
        break
    }
  }

  const animateProgress = (progress: number) => {
    gsap.to(".progress-bar", {
      width: `${progress}%`,
      duration: 0.8,
      ease: "power2.out",
    })
  }

  const pulseAnimation = (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    })
  }

  return {
    containerRef,
    addToRefs,
    animateStepEntry,
    animateStepExit,
    animateGridItems,
    animateSelection,
    animateButton,
    animateProgress,
    pulseAnimation,
  }
}
