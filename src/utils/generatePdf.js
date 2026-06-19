import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function captureElement(element) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    onclone: (clonedDoc, clonedEl) => {
      clonedEl.style.transform = 'none'
      clonedEl.style.scale = 'none'
      const allText = clonedEl.querySelectorAll('*')
      allText.forEach((el) => {
        el.style.wordSpacing = 'normal'
        el.style.letterSpacing = 'normal'
      })
    },
  })
  return canvas.toDataURL('image/png')
}

export function buildPdf(imageDataArray, fileName) {
  if (imageDataArray.length === 0) return

  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  imageDataArray.forEach((imgData, i) => {
    if (i > 0) pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  })

  pdf.save(fileName)
}
