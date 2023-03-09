import { useState, useRef } from 'react'
import useEventListener from '../hooks/useEventListener'

function Modal({ buttonName, children }) {
  const [open, setOpen] = useState(false)
  const modalRef = useRef()

  useEventListener('mousedown', (e) => {
    if (!open) return
    if (e.defaultPrevented) return
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      console.log('clicked outside')
      setOpen(false)
    }
  })

  const openHandler = () => {
    setOpen(true)
  }

  const modalStyle = {
    display: open ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: '#2A303C',
    // width: 'calc(100% - 100px)',
    zIndex: '100',
    // color: 'white',
    margin: '2rem',
    border: '2px solid black',
    padding: '1rem',
  }

  return (
    <>
      <button className="block my-2 btn btn-success" onClick={openHandler}>
        {buttonName}
      </button>
      <div ref={modalRef} style={modalStyle} className="bg-">
        {children}
      </div>
    </>
  )
}

export default Modal
