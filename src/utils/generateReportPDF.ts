import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReportData {
  dateRange: string;
  marketplace: string;
  language: string;
  metrics: {
    totalRevenue: string;
    revenueGrowth: string;
    netProfit: string;
    profitGrowth: string;
    profitMargin: string;
    marginChange: string;
  };
  revenueByMarketplace: Array<{ name: string; value: number; color: string }>;
  profitTrend: Array<{ date: string; profit: number }>;
  topProducts: Array<{
    product: string;
    units: number;
    revenue: string;
    profit: string;
    margin: string;
  }>;
  marketplacePerformance: Array<{
    marketplace: string;
    orders: number;
    revenue: string;
    avg: string;
    commission: string;
    profit: string;
  }>;
}

const translations = {
  en: {
    title: 'Performance Report',
    period: 'Period',
    marketplace: 'Marketplace',
    generatedOn: 'Generated on',
    keyMetrics: 'Key Metrics',
    totalRevenue: 'Total Revenue',
    netProfit: 'Net Profit',
    profitMargin: 'Profit Margin',
    fromPreviousPeriod: 'from previous period',
    revenueByMarketplace: 'Revenue by Marketplace',
    profitTrend: 'Profit Trend',
    bestSellingProducts: 'Best Selling Products',
    product: 'Product',
    unitsSold: 'Units Sold',
    revenue: 'Revenue',
    profit: 'Profit',
    margin: 'Margin',
    marketplacePerformance: 'Marketplace Performance',
    orders: 'Orders',
    avgOrder: 'Avg Order',
    commission: 'Commission',
    page: 'Page',
  },
  'pt-BR': {
    title: 'Relatório de Desempenho',
    period: 'Período',
    marketplace: 'Marketplace',
    generatedOn: 'Gerado em',
    keyMetrics: 'Métricas Principais',
    totalRevenue: 'Receita Total',
    netProfit: 'Lucro Líquido',
    profitMargin: 'Margem de Lucro',
    fromPreviousPeriod: 'do período anterior',
    revenueByMarketplace: 'Receita por Marketplace',
    profitTrend: 'Tendência de Lucro',
    bestSellingProducts: 'Produtos Mais Vendidos',
    product: 'Produto',
    unitsSold: 'Unidades Vendidas',
    revenue: 'Receita',
    profit: 'Lucro',
    margin: 'Margem',
    marketplacePerformance: 'Desempenho por Marketplace',
    orders: 'Pedidos',
    avgOrder: 'Pedido Médio',
    commission: 'Comissão',
    page: 'Página',
  },
};

export function generateReportPDF(data: ReportData) {
  const doc = new jsPDF();
  const t = translations[data.language as keyof typeof translations] || translations.en;
  let yPosition = 20;

  // Header with gradient background (simulated with rectangle)
  doc.setFillColor(34, 197, 94); // Green color
  doc.rect(0, 0, 210, 35, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(t.title, 20, 20);

  // Period and Marketplace info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${t.period}: ${data.dateRange}`, 20, 28);
  doc.text(`${t.marketplace}: ${data.marketplace}`, 120, 28);

  // Generated date
  doc.setFontSize(8);
  doc.text(
    `${t.generatedOn}: ${new Date().toLocaleString(data.language === 'pt-BR' ? 'pt-BR' : 'en-US')}`,
    20,
    32
  );

  yPosition = 45;

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Key Metrics Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(t.keyMetrics, 20, yPosition);
  yPosition += 10;

  // Metrics boxes
  const metricsData = [
    [t.totalRevenue, data.metrics.totalRevenue, data.metrics.revenueGrowth],
    [t.netProfit, data.metrics.netProfit, data.metrics.profitGrowth],
    [t.profitMargin, data.metrics.profitMargin, data.metrics.marginChange],
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [[t.keyMetrics, 'Value', 'Change']],
    body: metricsData,
    theme: 'grid',
    headStyles: {
      fillColor: [99, 102, 241],
      fontSize: 10,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 9,
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { fontSize: 11, fontStyle: 'bold' },
      2: { textColor: [34, 197, 94] },
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Revenue by Marketplace Chart (as table)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t.revenueByMarketplace, 20, yPosition);
  yPosition += 5;

  const revenueTableData = data.revenueByMarketplace.map(item => [
    item.name,
    `R$ ${item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    `${((item.value / data.revenueByMarketplace.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1)}%`,
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [[t.marketplace, t.revenue, 'Share']],
    body: revenueTableData,
    theme: 'striped',
    headStyles: {
      fillColor: [99, 102, 241],
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 9,
    },
    columnStyles: {
      1: { fontStyle: 'bold' },
      2: { fontStyle: 'bold', textColor: [99, 102, 241] },
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Profit Trend Chart (as table)
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t.profitTrend, 20, yPosition);
  yPosition += 5;

  const profitTrendTableData = data.profitTrend.map(item => [
    item.date,
    `R$ ${item.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [['Date', t.profit]],
    body: profitTrendTableData,
    theme: 'striped',
    headStyles: {
      fillColor: [99, 102, 241],
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 9,
    },
    columnStyles: {
      1: { fontStyle: 'bold', textColor: [34, 197, 94] },
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Best Selling Products
  if (yPosition > 200) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t.bestSellingProducts, 20, yPosition);
  yPosition += 5;

  const productsTableData = data.topProducts.map(item => [
    item.product,
    item.units.toString(),
    item.revenue,
    item.profit,
    item.margin,
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [[t.product, t.unitsSold, t.revenue, t.profit, t.margin]],
    body: productsTableData,
    theme: 'striped',
    headStyles: {
      fillColor: [99, 102, 241],
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 8,
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { halign: 'center' },
      2: { fontStyle: 'bold' },
      3: { fontStyle: 'bold', textColor: [34, 197, 94] },
      4: { halign: 'center' },
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Marketplace Performance
  if (yPosition > 200) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t.marketplacePerformance, 20, yPosition);
  yPosition += 5;

  const marketplaceTableData = data.marketplacePerformance.map(item => [
    item.marketplace,
    item.orders.toString(),
    item.revenue,
    item.avg,
    item.commission,
    item.profit,
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [[t.marketplace, t.orders, t.revenue, t.avgOrder, t.commission, t.profit]],
    body: marketplaceTableData,
    theme: 'striped',
    headStyles: {
      fillColor: [99, 102, 241],
      fontSize: 8,
    },
    bodyStyles: {
      fontSize: 8,
    },
    columnStyles: {
      0: { cellWidth: 35, fontStyle: 'bold' },
      1: { halign: 'center', cellWidth: 20 },
      2: { cellWidth: 30 },
      3: { cellWidth: 25 },
      4: { cellWidth: 30, textColor: [239, 68, 68] },
      5: { cellWidth: 30, fontStyle: 'bold', textColor: [34, 197, 94] },
    },
  });

  // Footer with page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `${t.page} ${i} / ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `report_${data.dateRange.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
  doc.save(fileName);
}
