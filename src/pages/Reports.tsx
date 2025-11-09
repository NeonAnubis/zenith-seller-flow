import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Calendar, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { generateReportPDF } from "@/utils/generateReportPDF";
import { toast } from "sonner";

export default function Reports() {
  const { t, i18n } = useTranslation();
  const [dateRange, setDateRange] = useState("last7Days");
  const [marketplace, setMarketplace] = useState("all");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  // Revenue by Marketplace data
  const revenueData = [
    { name: t('sales.mercadoLivre'), value: 55230, color: "hsl(var(--chart-1))" },
    { name: t('sales.shopee'), value: 38450, color: "hsl(var(--chart-2))" },
    { name: t('sales.amazon'), value: 24120, color: "hsl(var(--chart-3))" },
    { name: t('ads.magalu'), value: 7630, color: "hsl(var(--chart-4))" },
  ];

  // Profit Trend data
  const profitTrendData = [
    { date: "Jan 1", profit: 3200 },
    { date: "Jan 2", profit: 3800 },
    { date: "Jan 3", profit: 3500 },
    { date: "Jan 4", profit: 4200 },
    { date: "Jan 5", profit: 3900 },
    { date: "Jan 6", profit: 4500 },
    { date: "Jan 7", profit: 4800 },
  ];

  const topProducts = [
    { product: "Bluetooth Speaker Mini", units: 456, revenue: "R$ 68,371.20", profit: "R$ 36,442.40", margin: "53.3%" },
    { product: "USB-C Cable 2m", units: 892, revenue: "R$ 26,670.80", profit: "R$ 15,966.80", margin: "59.9%" },
    { product: "Phone Case Premium", units: 321, revenue: "R$ 25,647.90", profit: "R$ 14,415.90", margin: "56.2%" },
    { product: "Portable Charger 10000mAh", units: 567, revenue: "R$ 84,993.30", profit: "R$ 48,154.30", margin: "56.7%" },
    { product: "Wireless Headphones Pro", units: 234, revenue: "R$ 70,156.60", profit: "R$ 35,076.60", margin: "50.0%" },
  ];

  const marketplacePerformance = [
    { marketplace: t('sales.mercadoLivre'), orders: 543, revenue: "R$ 55,230", avg: "R$ 101.70", commission: "R$ 8,284.50", profit: "R$ 18,765.20" },
    { marketplace: t('sales.shopee'), orders: 412, revenue: "R$ 38,450", avg: "R$ 93.32", commission: "R$ 5,767.50", profit: "R$ 13,054.30" },
    { marketplace: t('sales.amazon'), orders: 198, revenue: "R$ 24,120", avg: "R$ 121.82", commission: "R$ 3,618.00", profit: "R$ 8,195.40" },
    { marketplace: t('ads.magalu'), orders: 81, revenue: "R$ 7,630", avg: "R$ 94.20", commission: "R$ 1,144.50", profit: "R$ 2,592.10" },
  ];

  const getDateRangeLabel = (value: string) => {
    const labels: Record<string, string> = {
      last7Days: t('reports.last7Days'),
      last30Days: t('reports.last30Days'),
      thisMonth: t('reports.thisMonth'),
      lastMonth: t('reports.lastMonth'),
      thisQuarter: t('reports.thisQuarter'),
      thisYear: t('reports.thisYear'),
      customRange: t('reports.customRange'),
    };
    return labels[value] || value;
  };

  const getMarketplaceLabel = (value: string) => {
    const labels: Record<string, string> = {
      all: t('reports.allMarketplaces'),
      mercadoLivre: t('sales.mercadoLivre'),
      shopee: t('sales.shopee'),
      amazon: t('sales.amazon'),
      magalu: t('ads.magalu'),
    };
    return labels[value] || value;
  };

  const handleExportPDF = () => {
    try {
      generateReportPDF({
        dateRange: getDateRangeLabel(dateRange),
        marketplace: getMarketplaceLabel(marketplace),
        language: i18n.language,
        metrics: {
          totalRevenue: "R$ 125,430",
          revenueGrowth: "+12.5%",
          netProfit: "R$ 45,230",
          profitGrowth: "+8.2%",
          profitMargin: "36.1%",
          marginChange: "-1.2%",
        },
        revenueByMarketplace: revenueData,
        profitTrend: profitTrendData,
        topProducts,
        marketplacePerformance,
      });
      toast.success(t('reports.reportGenerated'));
      setExportDialogOpen(false);
    } catch (error) {
      toast.error('Error generating PDF');
      console.error('PDF generation error:', error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden bg-gradient-success">
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-white mb-2">{t('reports.title')}</h1>
            <p className="text-white/90 text-lg">{t('reports.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Report Controls */}
        <Card className="p-6 mb-8 shadow-soft">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7Days">{t('reports.last7Days')}</SelectItem>
                  <SelectItem value="last30Days">{t('reports.last30Days')}</SelectItem>
                  <SelectItem value="thisMonth">{t('reports.thisMonth')}</SelectItem>
                  <SelectItem value="lastMonth">{t('reports.lastMonth')}</SelectItem>
                  <SelectItem value="thisQuarter">{t('reports.thisQuarter')}</SelectItem>
                  <SelectItem value="thisYear">{t('reports.thisYear')}</SelectItem>
                  <SelectItem value="customRange">{t('reports.customRange')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={marketplace} onValueChange={setMarketplace}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('reports.allMarketplaces')}</SelectItem>
                <SelectItem value="mercadoLivre">{t('sales.mercadoLivre')}</SelectItem>
                <SelectItem value="shopee">{t('sales.shopee')}</SelectItem>
                <SelectItem value="amazon">{t('sales.amazon')}</SelectItem>
                <SelectItem value="magalu">{t('ads.magalu')}</SelectItem>
              </SelectContent>
            </Select>
            <Button className="ml-auto" onClick={() => setExportDialogOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              {t('reports.exportReport')}
            </Button>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-success shadow-medium">
            <p className="text-sm font-medium text-white/90 mb-1">{t('reports.totalRevenue')}</p>
            <p className="text-3xl font-bold text-white mb-2">R$ 125,430</p>
            <p className="text-sm text-white/80">+12.5% {t('reports.fromPreviousPeriod')}</p>
          </Card>
          <Card className="p-6 bg-gradient-primary shadow-medium">
            <p className="text-sm font-medium text-white/90 mb-1">{t('reports.netProfit')}</p>
            <p className="text-3xl font-bold text-white mb-2">R$ 45,230</p>
            <p className="text-sm text-white/80">+8.2% {t('reports.fromPreviousPeriod')}</p>
          </Card>
          <Card className="p-6 bg-gradient-card border border-border shadow-medium">
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('reports.profitMargin')}</p>
            <p className="text-3xl font-bold text-foreground mb-2">36.1%</p>
            <p className="text-sm text-muted-foreground">-1.2% {t('reports.fromPreviousPeriod')}</p>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">{t('reports.revenueByMarketplace')}</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">{t('reports.profitTrend')}</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `R$ ${value}`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, t('reports.profit')]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Top Products */}
        <Card className="p-6 mb-8 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">{t('reports.bestSellingProducts')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.product')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('reports.unitsSold')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('profit.revenue')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('reports.profit')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('reports.margin')}</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((item, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{item.product}</td>
                    <td className="py-3 px-4">{item.units}</td>
                    <td className="py-3 px-4 font-medium">{item.revenue}</td>
                    <td className="py-3 px-4 font-semibold text-success">{item.profit}</td>
                    <td className="py-3 px-4">{item.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Marketplace Performance */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">{t('reports.marketplacePerformance')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.marketplace')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('reports.orders')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('profit.revenue')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('reports.avgOrder')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.commission')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.netProfit')}</th>
                </tr>
              </thead>
              <tbody>
                {marketplacePerformance.map((item) => (
                  <tr key={item.marketplace} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{item.marketplace}</td>
                    <td className="py-3 px-4">{item.orders}</td>
                    <td className="py-3 px-4 font-medium">{item.revenue}</td>
                    <td className="py-3 px-4">{item.avg}</td>
                    <td className="py-3 px-4 text-destructive">{item.commission}</td>
                    <td className="py-3 px-4 font-semibold text-success">{item.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('reports.exportReportDialog')}
            </DialogTitle>
            <DialogDescription>
              {getDateRangeLabel(dateRange)} - {getMarketplaceLabel(marketplace)}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="bg-muted/20 rounded-lg p-6 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold mb-2">{t('reports.pdfReport')}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {t('reports.pdfReportDescription')}
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-success" />
                  {t('reports.includesCharts')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-success" />
                  {t('reports.includesTables')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-success" />
                  {t('reports.professionalLayout')}
                </li>
              </ul>
              <Button onClick={handleExportPDF} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                {t('reports.downloadPDF')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
