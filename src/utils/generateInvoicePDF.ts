import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Invoice {
  id: string;
  type: string;
  customer: string;
  value: string;
  status: string;
  date: string;
  taxId: string;
}

export function generateInvoicePDF(invoice: Invoice) {
  const doc = new jsPDF();

  // Parse the value
  const numericValue = parseFloat(invoice.value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
  const subtotal = numericValue / 1.2;
  const icms = subtotal * 0.18;
  const pisCofins = subtotal * 0.0365;
  const iss = invoice.type.includes('NFS-e') ? subtotal * 0.05 : 0;

  // Set colors
  const primaryColor: [number, number, number] = [99, 102, 241]; // Indigo
  const textColor: [number, number, number] = [31, 41, 55]; // Gray-800
  const mutedColor: [number, number, number] = [107, 114, 128]; // Gray-500

  // Header with company name and logo area
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Zenith Seller Flow', 15, 20);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('E-commerce Management Platform', 15, 28);
  doc.text('CNPJ: 12.345.678/0001-90', 15, 34);

  // Invoice title and number
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('NOTA FISCAL ELETRÔNICA', 105, 55, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${invoice.type} - ${invoice.id}`, 105, 63, { align: 'center' });

  // Status badge
  let statusColor: [number, number, number];
  let statusText: string;
  switch (invoice.status.toLowerCase()) {
    case 'issued':
    case 'emitida':
      statusColor = [34, 197, 94]; // Green
      statusText = 'EMITIDA';
      break;
    case 'processing':
    case 'processando':
      statusColor = [234, 179, 8]; // Yellow
      statusText = 'PROCESSANDO';
      break;
    case 'error':
    case 'erro':
      statusColor = [239, 68, 68]; // Red
      statusText = 'ERRO';
      break;
    default:
      statusColor = mutedColor;
      statusText = invoice.status.toUpperCase();
  }

  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.roundedRect(160, 50, 35, 8, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, 177.5, 55.5, { align: 'center' });

  // Customer information section
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(15, 75, 180, 35, 3, 3, 'F');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DADOS DO CLIENTE', 20, 83);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Nome:', 20, 91);
  doc.text('CPF/CNPJ:', 20, 98);
  doc.text('Data de Emissão:', 120, 91);
  doc.text('Tipo:', 120, 98);

  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(invoice.customer, 45, 91);
  doc.text(invoice.taxId, 45, 98);
  doc.text(invoice.date, 160, 91);
  doc.text(invoice.type, 160, 98);

  // Financial details section
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(15, 120, 180, 60, 3, 3, 'F');

  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DETALHES FINANCEIROS', 20, 128);

  // Financial table
  const financialData = [
    ['Subtotal', `R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
    ['ICMS (18%)', `R$ ${icms.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
    ['PIS/COFINS (3.65%)', `R$ ${pisCofins.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
  ];

  if (iss > 0) {
    financialData.push(['ISS (5%)', `R$ ${iss.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]);
  }

  autoTable(doc, {
    startY: 133,
    head: [],
    body: financialData,
    theme: 'plain',
    margin: { left: 20, right: 20 },
    columnStyles: {
      0: { cellWidth: 130, fontStyle: 'normal', textColor: mutedColor },
      1: { cellWidth: 50, halign: 'right', fontStyle: 'normal', textColor: textColor },
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
  });

  // Total value
  const finalY = (doc as any).lastAutoTable.finalY || 163;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, finalY + 3, 190, finalY + 3);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('VALOR TOTAL', 20, finalY + 12);

  doc.setFontSize(14);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(invoice.value, 190, finalY + 12, { align: 'right' });

  // SEFAZ Information
  const sefazY = finalY + 25;
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(15, sefazY, 180, 45, 3, 3, 'F');

  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMAÇÕES SEFAZ', 20, sefazY + 8);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);

  const accessKey = Math.random().toString(36).substring(2, 15).toUpperCase() +
                   Math.random().toString(36).substring(2, 15).toUpperCase() +
                   Math.random().toString(36).substring(2, 9).toUpperCase();
  const protocol = String(Math.floor(Math.random() * 900000000000000 + 100000000000000));

  doc.text('Chave de Acesso:', 20, sefazY + 18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(accessKey, 50, sefazY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Protocolo de Autorização:', 20, sefazY + 26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(protocol, 65, sefazY + 26);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Status:', 20, sefazY + 34);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(34, 197, 94);
  doc.text('AUTORIZADA', 35, sefazY + 34);

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Este documento foi gerado eletronicamente pela plataforma Zenith Seller Flow', 105, 280, { align: 'center' });
  doc.text(`Emitido em ${new Date().toLocaleString('pt-BR')}`, 105, 285, { align: 'center' });

  // Save the PDF
  doc.save(`Nota_Fiscal_${invoice.id}.pdf`);
}
