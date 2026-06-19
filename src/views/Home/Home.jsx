import { useCallback, useRef, useState } from 'react'
import CertificateForm from '../../components/CertificateForm/CertificateForm'
import CertificatePreview from '../../components/CertificatePreview/CertificatePreview'
import Toast from '../../components/Toast/Toast'
import { useCertificateForm } from '../../hooks/useCertificateForm'
import { generatePdf } from '../../utils/generatePdf'
import './Home.css'

function Home() {
  const { formData, handleChange, reset } = useCertificateForm()
  const previewRef = useRef(null)
  const [toast, setToast] = useState(false)

  const handleFieldChange = useCallback((field, value) => {
    const didReset = handleChange(field, value)
    if (didReset) setToast(true)
  }, [handleChange])

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
      <Toast
        message="Usted ha cambiado el tipo de certificado"
        visible={toast}
        onClose={() => setToast(false)}
      />
    </main>
  )
}

export default Home
