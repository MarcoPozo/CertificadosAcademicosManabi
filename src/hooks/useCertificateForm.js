import { useState } from 'react'

const initialState = {
  certificateType: 'elemental',
  studentName: '',
  place: 'Primer',
  grade: '',
  parallel: '',
  aprovechamiento: '',
  conducta: 'S',
  schoolYear: '2025 - 2026',
  city: 'Pifo',
  day: '',
  month: '',
  year: '2026',
  directoraName: 'MSC. SUSANA CANENCIA',
  subdirectoraName: 'MSC. YOLANDA ALQUINGA',
  docenteName: '',
}

export function useCertificateForm() {
  const [formData, setFormData] = useState(initialState)

  const handleChange = (field, value) => {
    if (field === 'certificateType' && value !== formData.certificateType) {
      setFormData({
        ...initialState,
        certificateType: value,
        conducta: value === 'elemental' ? 'S' : '',
      })
      return true
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
    return false
  }

  const reset = () => setFormData(initialState)

  return { formData, handleChange, reset }
}
