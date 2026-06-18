import { useRef } from 'react'
import CertificateForm from '../../components/CertificateForm/CertificateForm'
import CertificatePreview from '../../components/CertificatePreview/CertificatePreview'
import { useCertificateForm } from '../../hooks/useCertificateForm'
import { generatePdf } from '../../utils/generatePdf'
import './Home.css'

function Home() {
  const { formData, handleChange, reset } = useCertificateForm()
  const previewRef = useRef(null)

  const handleDownload = () => {
    generatePdf(previewRef, formData.studentName)
  }

  return (
    <main className="home">
      <CertificateForm
        formData={formData}
        onChange={handleChange}
        onReset={reset}
        onDownload={handleDownload}
      />
      <section className="home__preview-area">
        <div className="home__preview-scaler">
          <CertificatePreview ref={previewRef} formData={formData} />
        </div>
      </section>
    </main>
  )
}

export default Home
