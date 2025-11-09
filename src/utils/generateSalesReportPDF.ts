import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Order {
  id: string;
  date: string;
  customer: string;
  marketplace: string;
  items: number;
  subtotal: number;
  shipping: number;
  commission: number;
  profit: number;
  status: string;
}

interface SalesReportOptions {
  orders: Order[];
  filters: {
    marketplace: string;
    dateRange: string;
    status: string;
  };
  stats: {
    totalSales: number;
    totalOrders: number;
    avgOrderValue: number;
    totalProfit: number;
  };
  language: string;
}

const translations = {
  en: {
    title: 'Sales Analysis Report',
    generatedOn: 'Generated on',
    filters: 'Applied Filters',
    marketplace: 'Marketplace',
    dateRange: 'Date Range',
    status: 'Status',
    summary: 'Summary Statistics',
    totalSales: 'Total Sales',
    totalOrders: 'Total Orders',
    avgOrderValue: 'Average Order Value',
    totalProfit: 'Total Profit',
    orderDetails: 'Order Details',
    orderId: 'Order ID',
    date: 'Date',
    customer: 'Customer',
    items: 'Items',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    commission: 'Commission',
    profit: 'Net Profit',
    statusLabel: 'Status',
    all: 'All',
    last30Days: 'Last 30 days',
    last7Days: 'Last 7 days',
    thisMonth: 'This month',
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    page: 'Page',
    of: 'of',
  },
  'pt-BR': {
    title: 'Relatório de Análise de Vendas',
    generatedOn: 'Gerado em',
    filters: 'Filtros Aplicados',
    marketplace: 'Marketplace',
    dateRange: 'Período',
    status: 'Status',
    summary: 'Estatísticas Resumidas',
    totalSales: 'Total de Vendas',
    totalOrders: 'Total de Pedidos',
    avgOrderValue: 'Valor Médio do Pedido',
    totalProfit: 'Lucro Total',
    orderDetails: 'Detalhes dos Pedidos',
    orderId: 'ID do Pedido',
    date: 'Data',
    customer: 'Cliente',
    items: 'Itens',
    subtotal: 'Subtotal',
    shipping: 'Frete',
    commission: 'Comissão',
    profit: 'Lucro Líquido',
    statusLabel: 'Status',
    all: 'Todos',
    last30Days: 'Últimos 30 dias',
    last7Days: 'Últimos 7 dias',
    thisMonth: 'Este mês',
    pending: 'Pendente',
    processing: 'Processando',
    shipped: 'Enviado',
    delivered: 'Entregue',
    page: 'Página',
    of: 'de',
  },
};

export function generateSalesReportPDF(options: SalesReportOptions) {
  const { orders, filters, stats, language } = options;
  const t = translations[language as keyof typeof translations] || translations.en;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Colors
  const primaryColor: [number, number, number] = [99, 102, 241]; // Indigo
  const textColor: [number, number, number] = [31, 41, 55]; // Gray-800
  const mutedColor: [number, number, number] = [107, 114, 128]; // Gray-500

  let yPosition = 20;

  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(t.title, pageWidth / 2, 15, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const generatedDate = new Date().toLocaleString(language === 'pt-BR' ? 'pt-BR' : 'en-US');
  doc.text(`${t.generatedOn}: ${generatedDate}`, pageWidth / 2, 25, { align: 'center' });

  yPosition = 45;

  // Filters Section
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(t.filters, 15, yPosition);

  yPosition += 7;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);

  const filterText = `${t.marketplace}: ${filters.marketplace === 'all' ? t.all : filters.marketplace} | ${t.dateRange}: ${getFilterLabel(filters.dateRange, t)} | ${t.status}: ${getStatusLabel(filters.status, t)}`;
  doc.text(filterText, 15, yPosition);

  yPosition += 10;

  // Summary Statistics
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(15, yPosition, pageWidth - 30, 35, 3, 3, 'F');

  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(t.summary, 20, yPosition + 8);

  yPosition += 15;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  const summaryData = [
    [t.totalSales, `R$ ${stats.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
    [t.totalOrders, stats.totalOrders.toString()],
    [t.avgOrderValue, `R$ ${stats.avgOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
    [t.totalProfit, `R$ ${stats.totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
  ];

  const colWidth = (pageWidth - 40) / 2;
  summaryData.forEach(([label, value], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 20 + (col * colWidth);
    const y = yPosition + (row * 7);

    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text(label, x, y);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(value, x + colWidth - 10, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');
  });

  yPosition += 25;

  // Orders Table
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(t.orderDetails, 15, yPosition);

  yPosition += 5;

  const tableData = orders.map(order => [
    order.id,
    order.date,
    order.customer,
    order.marketplace,
    order.items.toString(),
    `R$ ${order.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    `R$ ${order.shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    `R$ ${order.commission.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    `R$ ${order.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    getStatusLabel(order.status, t),
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [[
      t.orderId,
      t.date,
      t.customer,
      t.marketplace,
      t.items,
      t.subtotal,
      t.shipping,
      t.commission,
      t.profit,
      t.statusLabel,
    ]],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 7,
      textColor: textColor,
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    columnStyles: {
      0: { cellWidth: 20 }, // Order ID
      1: { cellWidth: 18 }, // Date
      2: { cellWidth: 25 }, // Customer
      3: { cellWidth: 22 }, // Marketplace
      4: { cellWidth: 12, halign: 'center' }, // Items
      5: { cellWidth: 20, halign: 'right' }, // Subtotal
      6: { cellWidth: 18, halign: 'right' }, // Shipping
      7: { cellWidth: 20, halign: 'right' }, // Commission
      8: { cellWidth: 20, halign: 'right' }, // Profit
      9: { cellWidth: 20 }, // Status
    },
    margin: { left: 15, right: 15 },
    didDrawPage: (data) => {
      // Footer
      const pageCount = (doc as any).internal.getNumberOfPages();
      const currentPage = (doc as any).internal.getCurrentPageInfo().pageNumber;

      doc.setFontSize(8);
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text(
        `${t.page} ${currentPage} ${t.of} ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );

      doc.text(
        'Zenith Seller Flow',
        15,
        pageHeight - 10
      );
    },
  });

  // Save the PDF
  const filename = `Sales_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}

function getFilterLabel(filter: string, t: any): string {
  const labels: Record<string, string> = {
    all: t.all,
    last30Days: t.last30Days,
    last7Days: t.last7Days,
    thisMonth: t.thisMonth,
  };
  return labels[filter] || filter;
}

function getStatusLabel(status: string, t: any): string {
  const labels: Record<string, string> = {
    all: t.all,
    pending: t.pending,
    processing: t.processing,
    shipped: t.shipped,
    delivered: t.delivered,
  };
  return labels[status] || status;
}
