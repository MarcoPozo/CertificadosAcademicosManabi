import { useCallback, useRef, useState } from 'react'
import { FiInfo } from 'react-icons/fi'
import CertificateForm from '../../components/CertificateForm/CertificateForm'
import CertificatePreview from '../../components/CertificatePreview/CertificatePreview'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import CreditsModal from '../../components/CreditsModal/CreditsModal'
import Toast from '../../components/Toast/Toast'
import { useCertificateForm, getMergedFormData } from '../../hooks/useCertificateForm'
import { captureElement, buildPdf } from '../../utils/generatePdf'
import './Home.css'

function Home() {
  const {
    formData,
    handleChange,
    handleStudentChange,
    addStudent,
    removeStudent,
    setActiveStudent,
    toggleMultiMode,
    resetWithType,
    hasUserData,
    reset,
  } = useCertificateForm()

  const previewRef = useRef(null)
  const [toastData, setToastData] = useState({ visible: false, message: '', variant: 'warning' })
  const [pendingType, setPendingType] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [showCredits, setShowCredits] = useState(false)

  const showToast = useCallback((message, variant = 'warning') => {
    setToastData({ visible: true, message, variant })
  }, [])

  const handleFieldChange = useCallback((field, value) => {
    if (field === 'certificateType' && value !== formData.certificateType) {
      if (hasUserData()) {
        setPendingType(value)
        return
      }
      resetWithType(value)
      showToast('Se cambió el tipo de certificado')
      return
    }
    handleChange(field, value)
  }, [formData.certificateType, handleChange, hasUserData, resetWithType, showToast])

  const handleConfirm = useCallback(() => {
    resetWithType(pendingType)
    setPendingType(null)
    showToast('Se cambió el tipo de certificado')
  }, [pendingType, resetWithType, showToast])

  const handleCancel = useCallback(() => {
    setPendingType(null)
  }, [])

  const waitForRender = () =>
    new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 150))))

  const handleDownload = async () => {
    const { students } = formData
    const originalActive = formData.activeStudent
    setGenerating(true)
    await waitForRender()

    const captures = []
    for (let i = 0; i < students.length; i++) {
      setActiveStudent(i)
      await waitForRender()
      const imgData = await captureElement(previewRef.current)
      captures.push(imgData)
    }

    const sanitize = (s) => s.replace(/\s+/g, '_').toLowerCase()
    let fileName
    if (students.length === 1) {
      const name = students[0].studentName || 'estudiante'
      fileName = `Certificado_${sanitize(name)}.pdf`
    } else {
      const grade = formData.grade || 'grado'
      const parallel = formData.parallel || ''
      const suffix = parallel ? `${grade}_${parallel}` : grade
      fileName = `Certificados_${sanitize(suffix)}.pdf`
    }
    buildPdf(captures, fileName)

    setActiveStudent(originalActive)
    setGenerating(false)
    showToast('PDF descargado correctamente', 'success')
  }

  const mergedData = getMergedFormData(formData, formData.activeStudent)
  const totalStudents = formData.students.length

  return (
    <main className="home">
      <CertificateForm
        formData={formData}
        onChange={handleFieldChange}
        onStudentChange={handleStudentChange}
        onAddStudent={addStudent}
        onRemoveStudent={removeStudent}
        onSetActiveStudent={setActiveStudent}
        onToggleMulti={toggleMultiMode}
        onReset={reset}
        onDownload={handleDownload}
      />
      <section className="home__preview-area">
        <button className="home__credits-btn" onClick={() => setShowCredits(true)} title="Acerca de">
          <FiInfo size={20} />
        </button>
        {totalStudents > 1 && (
          <div className="home__preview-badge">
            {formData.activeStudent + 1} / {totalStudents}
          </div>
        )}
        <div className="home__preview-scaler">
          <div className="home__preview-fade" key={formData.activeStudent}>
            <CertificatePreview ref={previewRef} formData={mergedData} />
          </div>
        </div>
        {generating && <div className="home__generating-overlay">Generando PDF...</div>}
      </section>
      <ConfirmModal
        visible={pendingType !== null}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <CreditsModal
        visible={showCredits}
        onClose={() => setShowCredits(false)}
      />
      <Toast
        message={toastData.message}
        visible={toastData.visible}
        variant={toastData.variant}
        onClose={() => setToastData((prev) => ({ ...prev, visible: false }))}
      />
    </main>
  )
}

export default Home
