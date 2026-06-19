import { useState } from 'react'

const ALL_PLACES = ['Primer', 'Segundo', 'Tercer']

const createStudent = (place, conducta = 'S') => ({
  studentName: '',
  place,
  aprovechamiento: '',
  conducta,
})

const initialState = {
  certificateType: 'elemental',
  grade: '',
  parallel: '',
  schoolYear: '2025 - 2026',
  directoraName: 'MSC. SUSANA CANENCIA',
  subdirectoraName: 'MSC. YOLANDA ALQUINGA',
  docenteName: '',
  students: [createStudent('Primer')],
  activeStudent: 0,
  multiMode: false,
}

export function getMergedFormData(formData, studentIndex) {
  const student = formData.students[studentIndex]
  return {
    certificateType: formData.certificateType,
    studentName: student.studentName,
    place: student.place,
    grade: formData.grade,
    parallel: formData.parallel,
    aprovechamiento: student.aprovechamiento,
    conducta: student.conducta,
    schoolYear: formData.schoolYear,
    directoraName: formData.directoraName,
    subdirectoraName: formData.subdirectoraName,
    docenteName: formData.docenteName,
  }
}

export function getAvailablePlaces(students, currentIndex) {
  const usedPlaces = students
    .filter((_, i) => i !== currentIndex)
    .map((s) => s.place)
  return ALL_PLACES.filter((p) => !usedPlaces.includes(p))
}

export function useCertificateForm() {
  const [formData, setFormData] = useState(initialState)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleStudentChange = (index, field, value) => {
    setFormData((prev) => {
      const students = prev.students.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      )
      return { ...prev, students }
    })
  }

  const addStudent = () => {
    setFormData((prev) => {
      if (prev.students.length >= 3) return prev
      const usedPlaces = prev.students.map((s) => s.place)
      const nextPlace = ALL_PLACES.find((p) => !usedPlaces.includes(p)) || 'Primer'
      const conducta = prev.certificateType === 'elemental' ? 'S' : ''
      return {
        ...prev,
        students: [...prev.students, createStudent(nextPlace, conducta)],
        activeStudent: prev.students.length,
      }
    })
  }

  const removeStudent = (index) => {
    setFormData((prev) => {
      if (prev.students.length <= 1) return prev
      const students = prev.students.filter((_, i) => i !== index)
      const active = prev.activeStudent >= students.length
        ? students.length - 1
        : prev.activeStudent > index
          ? prev.activeStudent - 1
          : prev.activeStudent
      return { ...prev, students, activeStudent: active }
    })
  }

  const setActiveStudent = (index) => {
    setFormData((prev) => ({ ...prev, activeStudent: index }))
  }

  const resetWithType = (type) => {
    const conducta = type === 'elemental' ? 'S' : ''
    setFormData({
      ...initialState,
      certificateType: type,
      students: [createStudent('Primer', conducta)],
      activeStudent: 0,
    })
  }

  const hasUserData = () => {
    return formData.students.some((s) => s.studentName !== '' || s.aprovechamiento !== '') ||
      formData.grade !== '' ||
      formData.parallel !== '' ||
      formData.docenteName !== ''
  }

  const toggleMultiMode = () => {
    setFormData((prev) => {
      if (prev.multiMode) {
        return {
          ...prev,
          multiMode: false,
          students: [prev.students[prev.activeStudent]],
          activeStudent: 0,
        }
      }
      return { ...prev, multiMode: true }
    })
  }

  const reset = () => setFormData(initialState)

  return {
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
  }
}
