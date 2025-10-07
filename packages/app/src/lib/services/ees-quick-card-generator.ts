/**
 * EES Quick Card PDF Generator
 * Generates the £7.99 EES Readiness Guide product
 * Compact 4-page printable guide for border crossing
 */

'use client'

import { EES_QUICK_CARD_CONTENT } from '../content/ees-quick-card-content'

// Dynamic imports for better Next.js compatibility
let jsPDF: any
let autoTable: any

const loadPDFLibraries = async () => {
  if (!jsPDF) {
    const jsPDFModule = await import('jspdf')
    jsPDF = jsPDFModule.jsPDF
    await import('jspdf-autotable')
  }
  return jsPDF
}

interface jsPDFWithPlugin {
  autoTable: (options: any) => void
  lastAutoTable?: { finalY: number }
  setFontSize: (size: number) => void
  setTextColor: (...args: any[]) => void
  setFillColor: (...args: any[]) => void
  setDrawColor: (...args: any[]) => void
  setFont: (font: string, style?: string) => void
  text: (text: string | string[], x: number, y: number, options?: any) => void
  rect: (x: number, y: number, width: number, height: number, style?: string) => void
  addPage: () => void
  setPage: (page: number) => void
  output: (type: string) => Blob
  internal: any
}

export interface QuickCardOptions {
  purchasedBy?: string
  purchaseDate?: Date
  includeQRCodes?: boolean
}

export class EESQuickCardGenerator {
  private static readonly COLORS = {
    primary: '#2563eb', // Blue-600
    secondary: '#64748b', // Slate-500
    accent: '#7c3aed', // Purple-600
    success: '#16a34a', // Green-600
    muted: '#94a3b8', // Slate-400
    background: '#f8fafc', // Slate-50
  }

  private static readonly FONTS = {
    title: 20,
    heading: 14,
    subheading: 12,
    body: 10,
    caption: 8,
  }

  /**
   * Generate the EES Quick Card PDF
   */
  static async generateQuickCard(options: QuickCardOptions = {}): Promise<Blob> {
    const jsPDFClass = await loadPDFLibraries()
    const doc = new jsPDFClass({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    }) as jsPDFWithPlugin

    // Add pages
    this.addPage1_Checklist(doc)
    this.addPage2_BiometricsProcess(doc)
    this.addPage3_CountryTips(doc)
    this.addPage4_Resources(doc, options)

    return doc.output('blob')
  }

  /**
   * Page 1: Essential Border Checklist
   */
  private static addPage1_Checklist(doc: jsPDFWithPlugin): void {
    let y = 15

    // Header
    y = this.addHeader(doc, y, '📋 EES Border Checklist')

    // Subtitle
    doc.setFontSize(this.FONTS.caption)
    doc.setTextColor(this.COLORS.muted)
    doc.text('Essential items for smooth biometric registration', 105, y, { align: 'center' })
    y += 12

    const content = EES_QUICK_CARD_CONTENT.borderChecklist

    // Render each section
    content.sections.forEach((section) => {
      // Section title with icon
      doc.setFillColor(248, 250, 252) // bg-slate-50
      doc.rect(15, y - 2, 180, 8, 'F')

      doc.setFontSize(this.FONTS.subheading)
      doc.setTextColor(this.COLORS.primary)
      doc.text(`${section.icon} ${section.title}`, 18, y + 4)
      y += 12

      // Items
      doc.setFontSize(this.FONTS.body)
      doc.setTextColor(this.COLORS.secondary)
      section.items.forEach((item) => {
        doc.text(`• ${item}`, 20, y)
        y += 6
      })

      y += 5 // spacing between sections
    })

    // Footer
    this.addPageFooter(doc, 1)
  }

  /**
   * Page 2: Biometric Registration Process
   */
  private static addPage2_BiometricsProcess(doc: jsPDFWithPlugin): void {
    doc.addPage()
    let y = 15

    // Header
    y = this.addHeader(doc, y, '🤝 Biometric Registration')

    doc.setFontSize(this.FONTS.caption)
    doc.setTextColor(this.COLORS.muted)
    doc.text('Step-by-step first-time enrollment', 105, y, { align: 'center' })
    y += 12

    const content = EES_QUICK_CARD_CONTENT.biometricsProcess

    // Render each step
    content.steps.forEach((step, index) => {
      // Step number circle
      doc.setFillColor(37, 99, 235) // primary color
      doc.circle(22, y + 2, 4, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(this.FONTS.caption)
      doc.text(step.number.toString(), 22, y + 3, { align: 'center' })

      // Step title
      doc.setFontSize(this.FONTS.subheading)
      doc.setTextColor(this.COLORS.primary)
      doc.text(step.title, 30, y + 4)
      y += 8

      // Description
      doc.setFontSize(this.FONTS.body)
      doc.setTextColor(this.COLORS.secondary)
      const descLines = doc.splitTextToSize(step.description, 165)
      doc.text(descLines, 20, y)
      y += descLines.length * 5

      // Tips
      doc.setFontSize(this.FONTS.caption)
      doc.setTextColor(this.COLORS.muted)
      step.tips.slice(0, 2).forEach((tip) => {
        // Only show first 2 tips for space
        doc.text(`  ✓ ${tip}`, 22, y)
        y += 4
      })

      y += 6 // spacing between steps
    })

    this.addPageFooter(doc, 2)
  }

  /**
   * Page 3: Country-Specific Tips
   */
  private static addPage3_CountryTips(doc: jsPDFWithPlugin): void {
    doc.addPage()
    let y = 15

    // Header
    y = this.addHeader(doc, y, '🌍 Country Quick Tips')

    doc.setFontSize(this.FONTS.caption)
    doc.setTextColor(this.COLORS.muted)
    doc.text('Major entry points and procedures', 105, y, { align: 'center' })
    y += 12

    const content = EES_QUICK_CARD_CONTENT.countryTips

    content.countries.forEach((country, index) => {
      // Country header with flag
      doc.setFillColor(248, 250, 252)
      doc.rect(15, y - 2, 180, 7, 'F')

      doc.setFontSize(this.FONTS.subheading)
      doc.setTextColor(this.COLORS.primary)
      doc.text(`${country.flag} ${country.country} - ${country.airport}`, 18, y + 3)
      y += 10

      // Tips in two columns
      doc.setFontSize(this.FONTS.caption)
      doc.setTextColor(this.COLORS.secondary)

      const tipsPerColumn = 2
      country.tips.slice(0, 4).forEach((tip, tipIndex) => {
        const xPos = tipIndex < tipsPerColumn ? 20 : 105
        const yOffset = (tipIndex % tipsPerColumn) * 5
        doc.text(`• ${tip}`, xPos, y + yOffset)
      })

      y += 15 // spacing between countries
    })

    this.addPageFooter(doc, 3)
  }

  /**
   * Page 4: Resources & Emergency Contacts
   */
  private static addPage4_Resources(doc: jsPDFWithPlugin, options: QuickCardOptions): void {
    doc.addPage()
    let y = 15

    // Header
    y = this.addHeader(doc, y, '📞 Resources & Support')

    doc.setFontSize(this.FONTS.caption)
    doc.setTextColor(this.COLORS.muted)
    doc.text('Additional help and information', 105, y, { align: 'center' })
    y += 12

    const content = EES_QUICK_CARD_CONTENT.resources

    // Online Resources
    doc.setFontSize(this.FONTS.subheading)
    doc.setTextColor(this.COLORS.primary)
    doc.text('Online Resources', 15, y)
    y += 8

    content.links.forEach((link) => {
      doc.setFontSize(this.FONTS.body)
      doc.setTextColor(this.COLORS.primary)
      doc.text(`• ${link.title}`, 18, y)
      y += 5

      doc.setFontSize(this.FONTS.caption)
      doc.setTextColor(this.COLORS.muted)
      doc.text(`  ${link.description}`, 20, y)
      y += 4
      doc.text(`  ${link.url}`, 20, y)
      y += 8
    })

    y += 5

    // Emergency Contacts
    doc.setFontSize(this.FONTS.subheading)
    doc.setTextColor(this.COLORS.primary)
    doc.text('Emergency Contacts', 15, y)
    y += 8

    content.emergencyContacts.forEach((contact) => {
      doc.setFontSize(this.FONTS.body)
      doc.setTextColor(this.COLORS.secondary)
      doc.text(`• ${contact.title}`, 18, y)
      y += 5

      doc.setFontSize(this.FONTS.caption)
      doc.setTextColor(this.COLORS.muted)
      doc.text(`  ${contact.contact}`, 20, y)
      y += 4
      doc.text(`  ${contact.hours}`, 20, y)
      y += 8
    })

    y += 10

    // Purchase info (if provided)
    if (options.purchasedBy || options.purchaseDate) {
      doc.setFillColor(240, 240, 255)
      doc.rect(15, y, 180, 15, 'F')

      doc.setFontSize(this.FONTS.caption)
      doc.setTextColor(this.COLORS.muted)
      if (options.purchasedBy) {
        doc.text(`Licensed to: ${options.purchasedBy}`, 18, y + 5)
      }
      if (options.purchaseDate) {
        const dateStr = options.purchaseDate.toLocaleDateString('en-GB')
        doc.text(`Purchase Date: ${dateStr}`, 18, y + 10)
      }
      y += 20
    }

    // Legal Disclaimer
    doc.setFontSize(this.FONTS.caption - 1)
    doc.setTextColor(this.COLORS.muted)
    const disclaimerLines = doc.splitTextToSize(content.legalDisclaimer, 180)
    doc.text(disclaimerLines, 15, y)

    this.addPageFooter(doc, 4)
  }

  /**
   * Add page header
   */
  private static addHeader(doc: jsPDFWithPlugin, y: number, pageTitle: string): number {
    // Background bar
    doc.setFillColor(37, 99, 235) // primary color
    doc.rect(0, 0, 210, 10, 'F')

    // Title
    doc.setFontSize(this.FONTS.title)
    doc.setTextColor(255, 255, 255)
    doc.text('EU Border Authority', 15, 7)

    // Product name
    doc.setFontSize(this.FONTS.caption)
    doc.text('EES Readiness Quick Card', 160, 7)

    y = 15

    // Page title
    doc.setFontSize(this.FONTS.heading)
    doc.setTextColor(this.COLORS.primary)
    doc.text(pageTitle, 105, y, { align: 'center' })

    return y + 5
  }

  /**
   * Add page footer
   */
  private static addPageFooter(doc: jsPDFWithPlugin, pageNum: number): void {
    const pageHeight = doc.internal.pageSize.height

    // Footer line
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.5)
    doc.line(15, pageHeight - 15, 195, pageHeight - 15)

    // Page number
    doc.setFontSize(this.FONTS.caption)
    doc.setTextColor(this.COLORS.muted)
    doc.text(`Page ${pageNum} of 4`, 105, pageHeight - 10, { align: 'center' })

    // Product info
    const metadata = EES_QUICK_CARD_CONTENT.metadata
    doc.text(`${metadata.title} v${metadata.version} | ${metadata.updated}`, 15, pageHeight - 10)
    doc.text('euborder.com', 188, pageHeight - 10, { align: 'right' })
  }

  /**
   * Helper to draw a circle (not built into jsPDF by default)
   */
  private static circle(this: jsPDFWithPlugin, x: number, y: number, r: number, style?: string): void {
    // Circle approximation using arc
    const k = (4 * (Math.sqrt(2) - 1)) / 3
    const rx = r
    const ry = r

    this.internal.write(
      [
        (x + rx).toFixed(2),
        (this.internal.pageSize.height - y).toFixed(2),
        'm',
        (x + rx).toFixed(2),
        (this.internal.pageSize.height - (y - k * ry)).toFixed(2),
        (x + k * rx).toFixed(2),
        (this.internal.pageSize.height - (y - ry)).toFixed(2),
        x.toFixed(2),
        (this.internal.pageSize.height - (y - ry)).toFixed(2),
        'c',
      ].join(' ')
    )

    this.internal.write(
      [
        (x - k * rx).toFixed(2),
        (this.internal.pageSize.height - (y - ry)).toFixed(2),
        (x - rx).toFixed(2),
        (this.internal.pageSize.height - (y - k * ry)).toFixed(2),
        (x - rx).toFixed(2),
        (this.internal.pageSize.height - y).toFixed(2),
        'c',
      ].join(' ')
    )

    this.internal.write(
      [
        (x - rx).toFixed(2),
        (this.internal.pageSize.height - (y + k * ry)).toFixed(2),
        (x - k * rx).toFixed(2),
        (this.internal.pageSize.height - (y + ry)).toFixed(2),
        x.toFixed(2),
        (this.internal.pageSize.height - (y + ry)).toFixed(2),
        'c',
      ].join(' ')
    )

    this.internal.write(
      [
        (x + k * rx).toFixed(2),
        (this.internal.pageSize.height - (y + ry)).toFixed(2),
        (x + rx).toFixed(2),
        (this.internal.pageSize.height - (y + k * ry)).toFixed(2),
        (x + rx).toFixed(2),
        (this.internal.pageSize.height - y).toFixed(2),
        'c',
      ].join(' ')
    )

    if (style === 'F') {
      this.internal.write('f')
    } else if (style === 'FD' || style === 'DF') {
      this.internal.write('B')
    } else {
      this.internal.write('S')
    }
  }
}

// Extend jsPDF prototype with circle method
if (typeof window !== 'undefined') {
  // Only in browser context
  ;(async () => {
    const jsPDFClass = await loadPDFLibraries()
    if (jsPDFClass && jsPDFClass.API) {
      jsPDFClass.API.circle = EESQuickCardGenerator['circle']
    }
  })()
}
