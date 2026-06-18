import { useState } from 'react'

const initialState = {
  studentName: '',
  place: '1er',
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

  const reset = () => setFormData(initialState)

  return { formData, handleChange, reset }
}
