import { FiRefreshCw, FiDownload, FiFileText, FiUser, FiAward, FiSmile, FiBookOpen, FiColumns, FiStar, FiCalendar, FiEdit3 } from 'react-icons/fi'
import FormField from '../FormField/FormField'
import './CertificateForm.css'

const PLACE_OPTIONS = [
  { value: 'Primer', label: '1er Lugar' },
  { value: 'Segundo', label: '2do Lugar' },
  { value: 'Tercer', label: '3er Lugar' },
]

const TYPE_OPTIONS = [
  { value: 'elemental', label: 'Elemental y Media' },
  { value: 'inicial', label: 'Inicial y Preparatoria' },
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
            label="Tipo de certificado"
            id="certificateType"
            type="select"
            value={formData.certificateType}
            onChange={(v) => onChange('certificateType', v)}
            options={TYPE_OPTIONS}
            icon={FiFileText}
          />
          <FormField
            label="Nombre completo"
            id="studentName"
            value={formData.studentName}
            onChange={(v) => onChange('studentName', v)}
            placeholder="Apellidos y Nombres"
            icon={FiUser}
          />
          <div className="certificate-form__row">
            <FormField
              label="Lugar obtenido"
              id="place"
              type="select"
              value={formData.place}
              onChange={(v) => onChange('place', v)}
              options={PLACE_OPTIONS}
              icon={FiAward}
            />
            {formData.certificateType === 'elemental' ? (
              <FormField
                label="Conducta"
                id="conducta"
                type="select"
                value={formData.conducta}
                onChange={(v) => onChange('conducta', v)}
                options={CONDUCTA_OPTIONS}
                icon={FiSmile}
              />
            ) : (
              <FormField
                label="Conducta"
                id="conducta"
                value={formData.conducta}
                onChange={(v) => onChange('conducta', v)}
                placeholder="Ej: EP"
                icon={FiSmile}
              />
            )}
          </div>
          <div className="certificate-form__row">
            <FormField
              label={formData.certificateType === 'elemental' ? 'Grado / Año' : 'Nivel'}
              id="grade"
              value={formData.grade}
              onChange={(v) => onChange('grade', v)}
              placeholder={formData.certificateType === 'elemental' ? 'Ej: Tercer' : 'Ej: Inicial 1'}
              icon={FiBookOpen}
            />
            <FormField
              label="Paralelo"
              id="parallel"
              value={formData.parallel}
              onChange={(v) => onChange('parallel', v)}
              placeholder='Ej: "B"'
              icon={FiColumns}
            />
          </div>
          <FormField
            label="Aprovechamiento"
            id="aprovechamiento"
            value={formData.aprovechamiento}
            onChange={(v) => onChange('aprovechamiento', v)}
            placeholder="Ej: 9,84 A+"
            icon={FiStar}
          />
          <FormField
            label="Año lectivo"
            id="schoolYear"
            value={formData.schoolYear}
            onChange={(v) => onChange('schoolYear', v)}
            placeholder="2025 - 2026"
            icon={FiCalendar}
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
            icon={FiEdit3}
          />
          <FormField
            label="Subdirectora"
            id="subdirectoraName"
            value={formData.subdirectoraName}
            onChange={(v) => onChange('subdirectoraName', v)}
            placeholder="MSC. NOMBRE APELLIDO"
            icon={FiEdit3}
          />
          <FormField
            label="Docente"
            id="docenteName"
            value={formData.docenteName}
            onChange={(v) => onChange('docenteName', v)}
            placeholder="PROF. NOMBRE APELLIDO"
            icon={FiEdit3}
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
