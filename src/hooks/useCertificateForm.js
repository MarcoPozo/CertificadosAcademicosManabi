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
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetWithType = (type) => {
    setFormData({
      ...initialState,
      certificateType: type,
      conducta: type === 'elemental' ? 'S' : '',
    })
  }

  const hasUserData = () => {
    return formData.studentName !== '' ||
      formData.grade !== '' ||
      formData.parallel !== '' ||
      formData.aprovechamiento !== '' ||
      formData.docenteName !== ''
  }

  const reset = () => setFormData(initialState)

  return { formData, handleChange, resetWithType, hasUserData, reset }
}
