import { useCallback, useRef, useState } from 'react'
import CertificateForm from '../../components/CertificateForm/CertificateForm'
import CertificatePreview from '../../components/CertificatePreview/CertificatePreview'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
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
    resetWithType,
    hasUserData,
    reset,
  } = useCertificateForm()

  const previewRef = useRef(null)
  const [toast, setToast] = useState(false)
  const [pendingType, setPendingType] = useState(null)
  const [generating, setGenerating] = useState(false)

  const handleFieldChange = useCallback((field, value) => {
    if (field === 'certificateType' && value !== formData.certificateType) {
      if (hasUserData()) {
        setPendingType(value)
        return
      }
      resetWithType(value)
      setToast(true)
      return
    }
    handleChange(field, value)
  }, [formData.certificateType, handleChange, hasUserData, resetWithType])

  const handleConfirm = useCallback(() => {
    resetWithType(pendingType)
    setPendingType(null)
    setToast(true)
  }, [pendingType, resetWithType])

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
  }

  const mergedData = getMergedFormData(formData, formData.activeStudent)

  return (
    <main className="home">
      <CertificateForm
        formData={formData}
        onChange={handleFieldChange}
        onStudentChange={handleStudentChange}
        onAddStudent={addStudent}
        onRemoveStudent={removeStudent}
        onSetActiveStudent={setActiveStudent}
        onReset={reset}
        onDownload={handleDownload}
      />
      <section className="home__preview-area">
        <div className="home__preview-scaler">
          <CertificatePreview ref={previewRef} formData={mergedData} />
        </div>
        {generating && <div className="home__generating-overlay">Generando PDF...</div>}
      </section>
      <ConfirmModal
        visible={pendingType !== null}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Toast
        message="Se cambió el tipo de certificado"
        visible={toast}
        onClose={() => setToast(false)}
      />
    </main>
  )
}

export default Home
