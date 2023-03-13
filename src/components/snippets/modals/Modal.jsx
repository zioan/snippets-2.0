import React, { useEffect, useState } from 'react'

export function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        onClose()
      }
    }

    if (isOpen) {
      // TODO prevent body to scroll when modal is open
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 bg-black bg-opacity-60 w-screen h-screen z-[9998] overflow-hidden">
          <div className="flex items-center justify-center w-full h-full overscroll-contain">
            <div className="relative w-full max-w-[600px] p-4 m-4 bg-base-200 rounded-2xl">
              <button
                className="absolute text-xl text-white top-2 right-4"
                onClick={onClose}
              >
                &times;
              </button>
              <div className="px-3 py-6 text-left">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function ModalButton({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <button onClick={handleOpen}>{title}</button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        {children}
      </Modal>
    </>
  )
}
