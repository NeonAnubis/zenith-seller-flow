import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function Reports() {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState(t('reports.last7Days'));
  const [marketplace, setMarketplace] = useState(t('reports.allMarketplaces'));
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

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

  const handleExport = () => {
    setExportSuccess(true);
    setTimeout(() => {
      setExportSuccess(false);
      setExportDialogOpen(false);
    }, 2000);
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
              <select
                className="px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>{t('reports.last7Days')}</option>
                <option>{t('reports.last30Days')}</option>
                <option>{t('reports.thisMonth')}</option>
                <option>{t('reports.lastMonth')}</option>
                <option>{t('reports.thisQuarter')}</option>
                <option>{t('reports.thisYear')}</option>
                <option>{t('reports.customRange')}</option>
              </select>
            </div>
            <select
              className="px-4 py-2 rounded-lg border border-input bg-background text-foreground"
              value={marketplace}
              onChange={(e) => setMarketplace(e.target.value)}
            >
              <option>{t('reports.allMarketplaces')}</option>
              <option>{t('reports.mercadoLivre')}</option>
              <option>{t('reports.shopee')}</option>
              <option>{t('reports.amazon')}</option>
              <option>{t('reports.magalu')}</option>
            </select>
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
                {[
                  { product: "Bluetooth Speaker Mini", units: 456, revenue: "R$ 68,371.20", profit: "R$ 36,442.40", margin: "53.3%" },
                  { product: "USB-C Cable 2m", units: 892, revenue: "R$ 26,670.80", profit: "R$ 15,966.80", margin: "59.9%" },
                  { product: "Phone Case Premium", units: 321, revenue: "R$ 25,647.90", profit: "R$ 14,415.90", margin: "56.2%" },
                  { product: "Portable Charger 10000mAh", units: 567, revenue: "R$ 84,993.30", profit: "R$ 48,154.30", margin: "56.7%" },
                  { product: "Wireless Headphones Pro", units: 234, revenue: "R$ 70,156.60", profit: "R$ 35,076.60", margin: "50.0%" },
                ].map((item, index) => (
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
                {[
                  { marketplace: t('sales.mercadoLivre'), orders: 543, revenue: "R$ 55,230", avg: "R$ 101.70", commission: "R$ 8,284.50", profit: "R$ 18,765.20" },
                  { marketplace: t('sales.shopee'), orders: 412, revenue: "R$ 38,450", avg: "R$ 93.32", commission: "R$ 5,767.50", profit: "R$ 13,054.30" },
                  { marketplace: t('sales.amazon'), orders: 198, revenue: "R$ 24,120", avg: "R$ 121.82", commission: "R$ 3,618.00", profit: "R$ 8,195.40" },
                  { marketplace: t('ads.magalu'), orders: 81, revenue: "R$ 7,630", avg: "R$ 94.20", commission: "R$ 1,144.50", profit: "R$ 2,592.10" },
                ].map((item) => (
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {exportSuccess ? (
                <>
                  <CheckCircle className="h-5 w-5 text-success" />
                  {t('reports.exportSuccessful')}
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  {t('reports.exportReportDialog')}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {exportSuccess ? (
                t('reports.reportGenerated')
              ) : (
                `${t('common.export')} ${dateRange} - ${marketplace}`
              )}
            </DialogDescription>
          </DialogHeader>
          {!exportSuccess && (
            <>
              <div className="py-4 space-y-3">
                <p className="text-sm text-muted-foreground">{t('reports.selectExportFormat')}</p>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    {t('reports.pdf')}
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    {t('reports.excel')}
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    {t('reports.csv')}
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  {t('common.export')}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
