import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package, DollarSign, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function BestSellers() {
  const { t } = useTranslation();

  const bestSellers = [
    { rank: 1, product: "Mouse Gamer Logitech G502", category: "Electronics", sales: 156, revenue: 45224.40, growth: 23.5, rating: 4.8 },
    { rank: 2, product: "JBL Fone de Ouvido Bluetooth", category: "Audio", sales: 78, revenue: 23392.20, growth: 18.2, rating: 4.6 },
    { rank: 3, product: "Smartphone Samsung Galaxy S23", category: "Smartphones", sales: 45, revenue: 130495.50, growth: 15.7, rating: 4.9 },
    { rank: 4, product: "Smart TV LG 55\" 4K", category: "TVs", sales: 23, revenue: 57477.00, growth: 12.1, rating: 4.7 },
    { rank: 5, product: "Notebook Dell Inspiron 15", category: "Computers", sales: 12, revenue: 43188.00, growth: 8.3, rating: 4.5 },
  ];

  const monthlySales = [
    { month: "May", sales: 234 },
    { month: "Jun", sales: 289 },
    { month: "Jul", sales: 314 },
    { month: "Aug", sales: 356 },
    { month: "Sep", sales: 412 },
    { month: "Oct", sales: 478 },
    { month: "Nov", sales: 523 },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title={t('bestSellers.title')}
        description={t('bestSellers.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('bestSellers.topProductSales')}</span>
              <Award className="h-5 w-5 text-warning" />
            </div>
            <p className="text-2xl font-bold">156</p>
            <p className="text-xs text-muted-foreground mt-1">Logitech G502</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('bestSellers.topRevenue')}</span>
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <p className="text-2xl font-bold">R$ 130K</p>
            <p className="text-xs text-muted-foreground mt-1">Samsung Galaxy S23</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('bestSellers.fastestGrowing')}</span>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">+23.5%</p>
            <p className="text-xs text-muted-foreground mt-1">Logitech G502</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('bestSellers.totalProducts')}</span>
              <Package className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">314</p>
            <p className="text-xs text-success mt-1">68 {t('bestSellers.topPerformers')}</p>
          </Card>
        </div>

        {/* Sales Trend */}
        <Card className="p-6 shadow-soft mb-8">
          <h3 className="text-lg font-semibold mb-4">{t('bestSellers.monthlySalesTrend')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Bar dataKey="sales" fill="hsl(var(--primary))" name={t('bestSellers.totalSales')} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Best Sellers Table */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">{t('bestSellers.top5Products')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('bestSellers.rank')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.product')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('bestSellers.category')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('bestSellers.unitsSold')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('profit.revenue')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('bestSellers.growth')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('bestSellers.rating')}</th>
                </tr>
              </thead>
              <tbody>
                {bestSellers.map((item) => (
                  <tr key={item.rank} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                        item.rank === 1 ? "bg-warning/20 text-warning" :
                        item.rank === 2 ? "bg-muted/50 text-foreground" :
                        item.rank === 3 ? "bg-orange-500/20 text-orange-600" :
                        "bg-muted/30 text-muted-foreground"
                      }`}>
                        {item.rank}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{item.product}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">{item.sales}</td>
                    <td className="py-3 px-4 text-right font-medium">R$ {item.revenue.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-success font-medium flex items-center justify-end gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {item.growth}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-medium">{item.rating} ★</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Insights */}
        <Card className="p-6 shadow-soft mt-6 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2">{t('bestSellers.performanceInsights')}</h4>
          <p className="text-sm text-muted-foreground">
            {t('bestSellers.insightsDescription')}
          </p>
        </Card>
      </div>
    </div>
  );
}
