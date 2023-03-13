import React, { useState, useEffect } from 'react'
import { BsArrowUpCircleFill } from 'react-icons/bs'

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'instant',
  })
}

export function scroolToTopSmooth() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > window.innerHeight / 2) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button
      className="fixed p-2 bottom-10 right-2 btn btn-ghost btn-circle"
      style={{ display: showButton ? 'block' : 'none' }}
      onClick={scroolToTopSmooth}
    >
      <BsArrowUpCircleFill size={30} className="fill-accent" />
    </button>
  )
}
