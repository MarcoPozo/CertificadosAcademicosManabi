import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function generatePdf(elementRef, studentName = 'certificado') {
  const element = elementRef.current
  if (!element) return

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    onclone: (clonedDoc) => {
      const clonedEl = clonedDoc.querySelector('.certificate-preview')
      if (clonedEl) {
        clonedEl.style.transform = 'none'
        clonedEl.style.scale = 'none'
        const allText = clonedEl.querySelectorAll('*')
        allText.forEach((el) => {
          el.style.wordSpacing = 'normal'
          el.style.letterSpacing = 'normal'
        })
      }
    },
  })

  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

  const fileName = `certificado_${studentName.replace(/\s+/g, '_').toLowerCase()}.pdf`
  pdf.save(fileName)
}
