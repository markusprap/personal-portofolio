"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  texts?: string[]
  text?: string // backward compatibility
  className?: string
  speed?: number
  pauseTime?: number
}

export function TypingAnimation({ 
  texts, 
  text, 
  className = "", 
  speed = 80, 
  pauseTime = 2000 
}: TypingAnimationProps) {
  const textArray = texts || [text || ""]
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentText = textArray[currentTextIndex]
    
    if (!isDeleting && currentIndex < currentText.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && currentIndex === currentText.length) {
      // Pause before deleting (only for multiple texts)
      if (textArray.length > 1) {
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseTime)
        return () => clearTimeout(timeout)
      }
    } else if (isDeleting && currentIndex > 0) {
      // Deleting backward
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
        setCurrentIndex((prev) => prev - 1)
      }, speed / 2) // Delete faster
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex === 0) {
      // Move to next text
      setIsDeleting(false)
      setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
    }
  }, [currentIndex, currentTextIndex, isDeleting, textArray, speed, pauseTime])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
    </span>
  )
}
