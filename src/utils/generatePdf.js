import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function captureElement(element) {
  const scaler = element.closest('.home__preview-scaler')
  const fade = element.closest('.home__preview-fade')

  const savedScaler = scaler ? scaler.style.cssText : ''
  const savedFade = fade ? fade.style.cssText : ''

  if (scaler) {
    scaler.style.transform = 'none'
    scaler.style.scale = 'none'
  }
  if (fade) {
    fade.style.transform = 'none'
    fade.style.scale = 'none'
    fade.style.animation = 'none'
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: 960,
    windowHeight: 680,
    onclone: (clonedDoc) => {
      const all = clonedDoc.querySelectorAll('.home__preview-scaler, .home__preview-scaler > *, .home__preview-fade, .certificate-preview')
      all.forEach((el) => {
        el.style.transform = 'none'
        el.style.scale = 'none'
        el.style.animation = 'none'
      })
      const clonedEl = clonedDoc.querySelector('.certificate-preview')
      if (clonedEl) {
        const allText = clonedEl.querySelectorAll('*')
        allText.forEach((el) => {
          el.style.wordSpacing = '0px'
          el.style.letterSpacing = 'normal'
        })
      }
    },
  })

  if (scaler) scaler.style.cssText = savedScaler
  if (fade) fade.style.cssText = savedFade

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
