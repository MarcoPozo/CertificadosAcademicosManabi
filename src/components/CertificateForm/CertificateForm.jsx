import { FiRefreshCw, FiDownload, FiFileText, FiUser, FiSmile, FiBookOpen, FiColumns, FiStar, FiCalendar, FiEdit3, FiPlus, FiX } from 'react-icons/fi'
import FormField from '../FormField/FormField'
import './CertificateForm.css'

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

const PLACE_LABELS = { Primer: '1°', Segundo: '2°', Tercer: '3°' }

function CertificateForm({
  formData,
  onChange,
  onStudentChange,
  onAddStudent,
  onRemoveStudent,
  onSetActiveStudent,
  onReset,
  onDownload,
}) {
  const { students, activeStudent } = formData
  const student = students[activeStudent]

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
          <h3 className="certificate-form__section-title">General</h3>
          <FormField
            label="Tipo de certificado"
            id="certificateType"
            type="select"
            value={formData.certificateType}
            onChange={(v) => onChange('certificateType', v)}
            options={TYPE_OPTIONS}
            icon={FiFileText}
          />
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
            label="Año lectivo"
            id="schoolYear"
            value={formData.schoolYear}
            onChange={(v) => onChange('schoolYear', v)}
            placeholder="2025 - 2026"
            icon={FiCalendar}
          />
        </section>

        <section className="certificate-form__section">
          <h3 className="certificate-form__section-title">Estudiantes</h3>
          <div className="certificate-form__tabs">
            {students.map((s, i) => (
              <button
                key={i}
                className={`certificate-form__tab ${i === activeStudent ? 'certificate-form__tab--active' : ''}`}
                onClick={() => onSetActiveStudent(i)}
                title={s.studentName || `Estudiante ${i + 1}`}
              >
                <span className="certificate-form__tab-place">{PLACE_LABELS[s.place]}</span>
                <span className="certificate-form__tab-name">
                  {s.studentName ? s.studentName.split(' ')[0] : `Est. ${i + 1}`}
                </span>
                {students.length > 1 && (
                  <FiX
                    className="certificate-form__tab-remove"
                    size={13}
                    onClick={(e) => { e.stopPropagation(); onRemoveStudent(i) }}
                  />
                )}
              </button>
            ))}
            {students.length < 3 && (
              <button className="certificate-form__tab certificate-form__tab--add" onClick={onAddStudent} title="Agregar estudiante">
                <FiPlus size={14} />
              </button>
            )}
          </div>

          <FormField
            label="Nombre completo"
            id={`studentName-${activeStudent}`}
            value={student.studentName}
            onChange={(v) => onStudentChange(activeStudent, 'studentName', v)}
            placeholder="Apellidos y Nombres"
            icon={FiUser}
          />
          <div className="certificate-form__row">
            <FormField
              label="Aprovechamiento"
              id={`aprovechamiento-${activeStudent}`}
              value={student.aprovechamiento}
              onChange={(v) => onStudentChange(activeStudent, 'aprovechamiento', v)}
              placeholder="Ej: 9,84 A+"
              icon={FiStar}
            />
            {formData.certificateType === 'elemental' ? (
              <FormField
                label="Conducta"
                id={`conducta-${activeStudent}`}
                type="select"
                value={student.conducta}
                onChange={(v) => onStudentChange(activeStudent, 'conducta', v)}
                options={CONDUCTA_OPTIONS}
                icon={FiSmile}
              />
            ) : (
              <FormField
                label="Conducta"
                id={`conducta-${activeStudent}`}
                value={student.conducta}
                onChange={(v) => onStudentChange(activeStudent, 'conducta', v)}
                placeholder="Ej: EP"
                icon={FiSmile}
              />
            )}
          </div>
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
          Descargar PDF {students.length > 1 ? `(${students.length})` : ''}
        </button>
      </div>
    </aside>
  )
}

export default CertificateForm
