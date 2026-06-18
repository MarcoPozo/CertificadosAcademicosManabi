import { forwardRef } from 'react'
import logoManabi from '../../assets/images/logo-manabi.png'
import bgCertificate from '../../assets/images/bg-certificate.png'
import currentYear from '../../assets/images/current-year.png'
import './CertificatePreview.css'

const PLACE_LABEL = {
  Primer: 'Primer Puesto',
  Segundo: 'Segundo Puesto',
  Tercer: 'Tercer Puesto',
}

const CertificatePreview = forwardRef(function CertificatePreview({ formData }, ref) {
  const {
    studentName,
    place,
    grade,
    parallel,
    aprovechamiento,
    conducta,
    schoolYear,
    directoraName,
    subdirectoraName,
    docenteName,
  } = formData

  const gradeText =
    grade && parallel ? `${grade} año paralelo "${parallel}"` : grade || '___________'
  const placeText = PLACE_LABEL[place] || 'Primer Puesto'

  return (
    <div className="certificate-preview" ref={ref}>
      <img className="certificate-preview__bg" src={bgCertificate} alt="" aria-hidden="true" />

      <div className="certificate-preview__content">
        {/* Header */}
        <header className="certificate-preview__header">
          <img src={logoManabi} alt="Logo Escuela Manabí" className="certificate-preview__logo" />

          <div className="certificate-preview__school-info">
            <p className="certificate-preview__school-sub">ESCUELA DE EDUCACIÓN BÁSICA</p>
            <h1 className="certificate-preview__school-name">"MANABÍ"</h1>
            <div className="certificate-preview__divider" />
          </div>

          <img src={currentYear} alt={`Año lectivo ${schoolYear}`} className="certificate-preview__year-badge" />
        </header>

        {/* Title */}
        <h2 className="certificate-preview__title">OTORGA EL PRESENTE CERTIFICADO</h2>

        {/* Student name */}
        <div className="certificate-preview__name-section">
          <p className="certificate-preview__to">A:</p>
          <p className="certificate-preview__student-name">
            {studentName || 'Nombre del Estudiante'}
          </p>
          <div className="certificate-preview__name-line" />
        </div>

        {/* Body narrative */}
        <p className="certificate-preview__body-text">
          Que le acredita el <strong>{placeText}</strong> del {gradeText} por haberse destacado en
          su puntaje académico durante el año lectivo{' '}
          <strong>{schoolYear || '2025 - 2026'}</strong>.
        </p>

        {/* Scores + Date row */}
        <div className="certificate-preview__info-row">
          <div className="certificate-preview__scores">
            <p className="certificate-preview__score-item">
              <strong>APROVECHAMIENTO:</strong> {aprovechamiento || '____'}
            </p>
            <p className="certificate-preview__score-item">
              <strong>CONDUCTA:</strong> {conducta || 'A'}
            </p>
          </div>
          <p className="certificate-preview__date">
            Pifo, 26 de junio del 2026
          </p>
        </div>

        {/* Signatures */}
        <div className="certificate-preview__signatures">
          <div className="certificate-preview__signature">
            <div className="certificate-preview__signature-line" />
            <p className="certificate-preview__signature-name">
              {directoraName || 'MSC. NOMBRE APELLIDO'}
            </p>
            <p className="certificate-preview__signature-role">DIRECTORA</p>
          </div>
          <div className="certificate-preview__signature">
            <div className="certificate-preview__signature-line" />
            <p className="certificate-preview__signature-name">
              {subdirectoraName || 'MSC. NOMBRE APELLIDO'}
            </p>
            <p className="certificate-preview__signature-role">SUBDIRECTORA</p>
          </div>
          <div className="certificate-preview__signature">
            <div className="certificate-preview__signature-line" />
            <p className="certificate-preview__signature-name">
              {docenteName || 'PROF. NOMBRE APELLIDO'}
            </p>
            <p className="certificate-preview__signature-role">DOCENTE</p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CertificatePreview
