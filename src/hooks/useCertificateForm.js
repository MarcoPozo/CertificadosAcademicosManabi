import { useState } from 'react'

const PLACES = ['Primer', 'Segundo', 'Tercer']

const createStudent = (index) => ({
  studentName: '',
  place: PLACES[index],
  aprovechamiento: '',
  conducta: 'S',
})

const initialState = {
  certificateType: 'elemental',
  grade: '',
  parallel: '',
  schoolYear: '2025 - 2026',
  directoraName: 'MSC. SUSANA CANENCIA',
  subdirectoraName: 'MSC. YOLANDA ALQUINGA',
  docenteName: '',
  students: [createStudent(0)],
  activeStudent: 0,
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
      const newStudent = createStudent(prev.students.length)
      if (prev.certificateType !== 'elemental') {
        newStudent.conducta = ''
      }
      return {
        ...prev,
        students: [...prev.students, newStudent],
        activeStudent: prev.students.length,
      }
    })
  }

  const removeStudent = (index) => {
    setFormData((prev) => {
      if (prev.students.length <= 1) return prev
      const students = prev.students
        .filter((_, i) => i !== index)
        .map((s, i) => ({ ...s, place: PLACES[i] }))
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
    const student = createStudent(0)
    if (type !== 'elemental') student.conducta = ''
    setFormData({
      ...initialState,
      certificateType: type,
      students: [student],
      activeStudent: 0,
    })
  }

  const hasUserData = () => {
    return formData.students.some((s) => s.studentName !== '' || s.aprovechamiento !== '') ||
      formData.grade !== '' ||
      formData.parallel !== '' ||
      formData.docenteName !== ''
  }

  const reset = () => setFormData(initialState)

  return {
    formData,
    handleChange,
    handleStudentChange,
    addStudent,
    removeStudent,
    setActiveStudent,
    resetWithType,
    hasUserData,
    reset,
  }
}
