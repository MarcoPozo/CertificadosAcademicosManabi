import { FiAlertCircle } from 'react-icons/fi'
import './ConfirmModal.css'

function ConfirmModal({ visible, onConfirm, onCancel }) {
  if (!visible) return null

  return (
    <div className="confirm-modal__overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal__icon-wrapper">
          <FiAlertCircle className="confirm-modal__icon" size={40} />
        </div>
        <h3 className="confirm-modal__title">Cambiar tipo de certificado</h3>
        <p className="confirm-modal__message">
          Al cambiar el tipo de certificado, los datos ingresados se eliminarán
          y deberá completar el formulario nuevamente.
        </p>
        <div className="confirm-modal__actions">
          <button className="confirm-modal__btn confirm-modal__btn--cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="confirm-modal__btn confirm-modal__btn--confirm" onClick={onConfirm}>
            Sí, cambiar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
