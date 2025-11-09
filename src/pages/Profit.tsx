import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Percent, Package } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

export default function Profit() {
  const { t } = useTranslation();

  const profitByProduct = [
    { product: "Samsung S23", channel: t('sales.mercadoLivre'), sales: 45, revenue: 130495.50, costs: 94500.00, fees: 19574.33, profit: 16421.17, margin: 12.59 },
    { product: "JBL Bluetooth", channel: t('sales.shopee'), sales: 78, revenue: 23392.20, costs: 14040.00, fees: 2339.22, profit: 7012.98, margin: 29.98 },
    { product: "LG TV 55\"", channel: t('sales.amazon'), sales: 23, revenue: 57477.00, costs: 42550.00, fees: 8621.55, profit: 6305.45, margin: 10.97 },
    { product: "Dell Inspiron", channel: t('ads.magalu'), sales: 12, revenue: 43188.00, costs: 33600.00, fees: 5178.56, profit: 4409.44, margin: 10.21 },
    { product: "Logitech G502", channel: t('sales.mercadoLivre'), sales: 156, revenue: 45224.40, costs: 25740.00, fees: 6783.66, profit: 12700.74, margin: 28.09 },
  ];

  const dailyProfit = [
    { date: "Nov 02", profit: 3245.50, orders: 34 },
    { date: "Nov 03", profit: 4567.80, orders: 42 },
    { date: "Nov 04", profit: 3890.20, orders: 38 },
    { date: "Nov 05", profit: 5234.60, orders: 51 },
    { date: "Nov 06", profit: 4123.90, orders: 45 },
    { date: "Nov 07", profit: 5678.30, orders: 58 },
    { date: "Nov 08", profit: 6234.50, orders: 63 },
  ];

  const channelProfit = [
    { channel: t('sales.mercadoLivre'), profit: 28421.91, percentage: 43.5 },
    { channel: t('sales.shopee'), profit: 17234.56, percentage: 26.4 },
    { channel: t('sales.amazon'), profit: 13456.78, percentage: 20.6 },
    { channel: t('ads.magalu'), profit: 6234.89, percentage: 9.5 },
  ];

  const totalProfit = profitByProduct.reduce((acc, item) => acc + item.profit, 0);
  const totalRevenue = profitByProduct.reduce((acc, item) => acc + item.revenue, 0);
  const averageMargin = (totalProfit / totalRevenue) * 100;

  return (
    <div className="min-h-screen">
      <PageHeader
        title={t('profit.title')}
        description={t('profit.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-soft border-l-4 border-l-success">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('profit.totalProfitToday')}</span>
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <p className="text-2xl font-bold text-success">R$ {totalProfit.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">+18.3% {t('profit.fromYesterday')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('profit.totalRevenue')}</span>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">314 {t('profit.ordersCompleted')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('profit.averageMargin')}</span>
              <Percent className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">{averageMargin.toFixed(2)}%</p>
            <p className="text-xs text-muted-foreground mt-1">{t('profit.afterAllFees')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('profit.productsSold')}</span>
              <Package className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">{profitByProduct.reduce((acc, p) => acc + p.sales, 0)}</p>
            <p className="text-xs text-success mt-1">{t('profit.acrossAllChannels')}</p>
          </Card>
        </div>

        {/* Daily Profit Chart */}
        <Card className="p-6 shadow-soft mb-8">
          <h3 className="text-lg font-semibold mb-4">{t('profit.dailyProfitTrend')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyProfit}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profit" stroke="hsl(var(--success))" strokeWidth={2} name={t('reports.profit')} />
              <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} name={t('reports.orders')} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Profit by Channel */}
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">{t('profit.profitByChannel')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelProfit}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="channel" className="text-xs" angle={-15} textAnchor="end" height={80} />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="profit" fill="hsl(var(--success))" name={t('reports.profit')} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Channel Distribution */}
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">{t('profit.channelDistribution')}</h3>
            <div className="space-y-4 mt-8">
              {channelProfit.map((channel) => (
                <div key={channel.channel}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{channel.channel}</span>
                    <span className="text-sm font-bold text-success">R$ {channel.profit.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-success rounded-full h-2 transition-all"
                      style={{ width: `${channel.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{channel.percentage.toFixed(1)}% {t('profit.ofTotal')}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Profit by Product Table */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">{t('profit.profitByProduct')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.product')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('profit.channel')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.sales')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('profit.revenue')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('profit.costs')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('profit.fees')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.netProfit')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.margin')}</th>
                </tr>
              </thead>
              <tbody>
                {profitByProduct.map((item, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{item.product}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{item.channel}</Badge>
                    </td>
                    <td className="py-3 px-4 text-center">{item.sales}</td>
                    <td className="py-3 px-4 text-right font-medium">R$ {item.revenue.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">R$ {item.costs.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">R$ {item.fees.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-bold text-success">R$ {item.profit.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`font-medium ${
                        item.margin > 25 ? "text-success" :
                        item.margin > 15 ? "text-primary" :
                        "text-warning"
                      }`}>
                        {item.margin.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border font-bold">
                  <td className="py-3 px-4" colSpan={2}>{t('common.total')}</td>
                  <td className="py-3 px-4 text-center">{profitByProduct.reduce((acc, p) => acc + p.sales, 0)}</td>
                  <td className="py-3 px-4 text-right">R$ {totalRevenue.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">R$ {profitByProduct.reduce((acc, p) => acc + p.costs, 0).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">R$ {profitByProduct.reduce((acc, p) => acc + p.fees, 0).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-success">R$ {totalProfit.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-success">{averageMargin.toFixed(2)}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 shadow-soft mt-6 bg-success/5 border-success/20">
          <h4 className="font-semibold mb-2 text-success">{t('profit.realTimeUpdates')}</h4>
          <p className="text-sm text-muted-foreground">
            {t('profit.realTimeDescription')}
          </p>
        </Card>
      </div>
    </div>
  );
}
