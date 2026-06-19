import { useEffect } from 'react'
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'
import './Toast.css'

const ICONS = {
  warning: FiAlertTriangle,
  success: FiCheckCircle,
}

function Toast({ message, visible, onClose, variant = 'warning' }) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onClose, 3500)
    return () => clearTimeout(timer)
  }, [visible, onClose])

  const Icon = ICONS[variant] || ICONS.warning

  return (
    <div className={`toast toast--${variant} ${visible ? 'toast--visible' : ''}`}>
      <Icon className="toast__icon" size={20} />
      <p className="toast__message">{message}</p>
    </div>
  )
}

export default Toast
