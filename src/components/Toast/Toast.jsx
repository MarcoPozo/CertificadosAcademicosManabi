import { useEffect } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import './Toast.css'

function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onClose, 3500)
    return () => clearTimeout(timer)
  }, [visible, onClose])

  return (
    <div className={`toast ${visible ? 'toast--visible' : ''}`}>
      <FiAlertTriangle className="toast__icon" size={20} />
      <p className="toast__message">{message}</p>
    </div>
  )
}

export default Toast
