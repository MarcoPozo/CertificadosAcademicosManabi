import { useCallback, useRef, useState } from 'react'
import CertificateForm from '../../components/CertificateForm/CertificateForm'
import CertificatePreview from '../../components/CertificatePreview/CertificatePreview'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import Toast from '../../components/Toast/Toast'
import { useCertificateForm } from '../../hooks/useCertificateForm'
import { generatePdf } from '../../utils/generatePdf'
import './Home.css'

function Home() {
  const { formData, handleChange, resetWithType, hasUserData, reset } = useCertificateForm()
  const previewRef = useRef(null)
  const [toast, setToast] = useState(false)
  const [pendingType, setPendingType] = useState(null)

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

  const handleDownload = () => {
    generatePdf(previewRef, formData.studentName)
  }

  return (
    <main className="home">
      <CertificateForm
        formData={formData}
        onChange={handleFieldChange}
        onReset={reset}
        onDownload={handleDownload}
      />
      <section className="home__preview-area">
        <div className="home__preview-scaler">
          <CertificatePreview ref={previewRef} formData={formData} />
        </div>
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
