import { FiX, FiMail, FiCode } from 'react-icons/fi'
import './CreditsModal.css'

function CreditsModal({ visible, onClose }) {
  if (!visible) return null

  return (
    <div className="credits-modal__overlay" onClick={onClose}>
      <div className="credits-modal" onClick={(e) => e.stopPropagation()}>
        <button className="credits-modal__close" onClick={onClose}>
          <FiX size={20} />
        </button>

        <div className="credits-modal__icon-wrapper">
          <FiCode size={32} />
        </div>

        <h3 className="credits-modal__title">Sobre este sistema</h3>

        <p className="credits-modal__description">
          Sistema de generación de certificados académicos desarrollado para la
          Escuela de Educación Básica <strong>"Manabí"</strong>, Pifo - Ecuador.
        </p>

        <div className="credits-modal__divider" />

        <div className="credits-modal__info">
          <p className="credits-modal__label">Desarrollado por</p>
          <p className="credits-modal__value">Marco Pozo</p>
        </div>

        <div className="credits-modal__info">
          <p className="credits-modal__label">
            <FiMail size={14} />
            Contacto
          </p>
          <a className="credits-modal__link" href="mailto:marco10011111@gmail.com">
            marco10011111@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default CreditsModal
