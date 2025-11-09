import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import salesBg from "@/assets/sales-bg.jpg";

export default function Sales() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={salesBg}
          alt="Sales Analytics"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-white mb-2">{t('sales.title')}</h1>
            <p className="text-white/90 text-lg">{t('sales.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="p-6 mb-6 shadow-soft">
          <div className="flex flex-wrap gap-4">
            <select className="px-4 py-2 rounded-lg border border-input bg-background">
              <option>{t('sales.allMarketplaces')}</option>
              <option>{t('sales.mercadoLivre')}</option>
              <option>{t('sales.shopee')}</option>
              <option>{t('sales.amazon')}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-input bg-background">
              <option>{t('sales.last30Days')}</option>
              <option>{t('sales.last7Days')}</option>
              <option>{t('sales.thisMonth')}</option>
              <option>{t('sales.customRange')}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-input bg-background">
              <option>{t('sales.allStatus')}</option>
              <option>{t('sales.pending')}</option>
              <option>{t('dashboard.processing')}</option>
              <option>{t('sales.shipped')}</option>
              <option>{t('sales.delivered')}</option>
            </select>
          </div>
        </Card>

        {/* Sales Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-success shadow-medium">
            <p className="text-sm font-medium text-white/90 mb-1">{t('sales.totalSales')}</p>
            <p className="text-3xl font-bold text-white">R$ 125,430</p>
          </Card>
          <Card className="p-6 bg-gradient-primary shadow-medium">
            <p className="text-sm font-medium text-white/90 mb-1">{t('sales.totalOrders')}</p>
            <p className="text-3xl font-bold text-white">1,234</p>
          </Card>
          <Card className="p-6 bg-gradient-card border border-border shadow-medium">
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('sales.avgOrderValue')}</p>
            <p className="text-3xl font-bold text-foreground">R$ 101.62</p>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t('sales.recentOrders')}</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t('common.export')}
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('dashboard.orderId')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.date')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.customer')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.marketplace')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.items')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.subtotal')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.shipping')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.commission')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.netProfit')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.status')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "#ORD-1234", date: "2025-01-08", customer: "João Silva", marketplace: "Mercado Livre", items: 2, subtotal: "R$ 299.90", shipping: "R$ 15.00", commission: "R$ 44.99", profit: "R$ 80.00", status: t('sales.shipped') },
                  { id: "#ORD-1235", date: "2025-01-08", customer: "Maria Santos", marketplace: "Shopee", items: 1, subtotal: "R$ 459.50", shipping: "R$ 20.00", commission: "R$ 68.93", profit: "R$ 120.50", status: t('dashboard.processing') },
                  { id: "#ORD-1236", date: "2025-01-07", customer: "Pedro Costa", marketplace: "Amazon", items: 3, subtotal: "R$ 199.00", shipping: "R$ 12.00", commission: "R$ 29.85", profit: "R$ 65.00", status: t('sales.delivered') },
                  { id: "#ORD-1237", date: "2025-01-07", customer: "Ana Oliveira", marketplace: "Mercado Livre", items: 1, subtotal: "R$ 349.90", shipping: "R$ 18.00", commission: "R$ 52.49", profit: "R$ 95.30", status: t('dashboard.processing') },
                ].map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4 text-sm">{order.date}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4 text-sm">{order.marketplace}</td>
                    <td className="py-3 px-4 text-center">{order.items}</td>
                    <td className="py-3 px-4 font-medium">{order.subtotal}</td>
                    <td className="py-3 px-4 text-sm">{order.shipping}</td>
                    <td className="py-3 px-4 text-sm text-destructive">{order.commission}</td>
                    <td className="py-3 px-4 font-semibold text-success">{order.profit}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === t('sales.delivered') ? "bg-success/10 text-success" :
                        order.status === t('sales.shipped') ? "bg-primary/10 text-primary" :
                        "bg-warning/10 text-warning"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
