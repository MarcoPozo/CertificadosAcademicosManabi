import { FiRefreshCw, FiDownload } from 'react-icons/fi'
import FormField from '../FormField/FormField'
import './CertificateForm.css'

const PLACE_OPTIONS = [
  { value: 'Primer', label: '1er Lugar' },
  { value: 'Segundo', label: '2do Lugar' },
  { value: 'Tercer', label: '3er Lugar' },
]

const CONDUCTA_OPTIONS = [
  { value: 'S', label: 'S' },
  { value: 'F', label: 'F' },
  { value: 'O', label: 'O' },
  { value: 'N', label: 'N' },
]

function CertificateForm({ formData, onChange, onReset, onDownload }) {
  return (
    <aside className="certificate-form">
      <div className="certificate-form__header">
        <h2 className="certificate-form__title">Datos del Certificado</h2>
        <button className="certificate-form__reset-btn" onClick={onReset} title="Limpiar formulario">
          <FiRefreshCw size={16} />
        </button>
      </div>

      <div className="certificate-form__body">
        <section className="certificate-form__section">
          <h3 className="certificate-form__section-title">Estudiante</h3>
          <FormField
            label="Nombre completo"
            id="studentName"
            value={formData.studentName}
            onChange={(v) => onChange('studentName', v)}
            placeholder="Apellidos y Nombres"
          />
          <div className="certificate-form__row">
            <FormField
              label="Lugar obtenido"
              id="place"
              type="select"
              value={formData.place}
              onChange={(v) => onChange('place', v)}
              options={PLACE_OPTIONS}
            />
            <FormField
              label="Conducta"
              id="conducta"
              type="select"
              value={formData.conducta}
              onChange={(v) => onChange('conducta', v)}
              options={CONDUCTA_OPTIONS}
            />
          </div>
          <div className="certificate-form__row">
            <FormField
              label="Grado / Año"
              id="grade"
              value={formData.grade}
              onChange={(v) => onChange('grade', v)}
              placeholder="Ej: Tercer"
            />
            <FormField
              label="Paralelo"
              id="parallel"
              value={formData.parallel}
              onChange={(v) => onChange('parallel', v)}
              placeholder='Ej: "B"'
            />
          </div>
          <FormField
            label="Aprovechamiento"
            id="aprovechamiento"
            value={formData.aprovechamiento}
            onChange={(v) => onChange('aprovechamiento', v)}
            placeholder="Ej: 9,84 A+"
          />
          <FormField
            label="Año lectivo"
            id="schoolYear"
            value={formData.schoolYear}
            onChange={(v) => onChange('schoolYear', v)}
            placeholder="2025 - 2026"
          />
        </section>

        <section className="certificate-form__section">
          <h3 className="certificate-form__section-title">Firmas</h3>
          <FormField
            label="Directora"
            id="directoraName"
            value={formData.directoraName}
            onChange={(v) => onChange('directoraName', v)}
            placeholder="MSC. NOMBRE APELLIDO"
          />
          <FormField
            label="Subdirectora"
            id="subdirectoraName"
            value={formData.subdirectoraName}
            onChange={(v) => onChange('subdirectoraName', v)}
            placeholder="MSC. NOMBRE APELLIDO"
          />
          <FormField
            label="Docente"
            id="docenteName"
            value={formData.docenteName}
            onChange={(v) => onChange('docenteName', v)}
            placeholder="PROF. NOMBRE APELLIDO"
          />
        </section>
      </div>

      <div className="certificate-form__footer">
        <button className="certificate-form__download-btn" onClick={onDownload}>
          <FiDownload size={18} />
          Descargar PDF
        </button>
      </div>
    </aside>
  )
}

export default CertificateForm
