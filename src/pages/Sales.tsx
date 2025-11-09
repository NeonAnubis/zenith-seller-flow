import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Eye, TrendingUp, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import salesBg from "@/assets/sales-bg.jpg";
import { OrderDetailModal } from "@/components/sales/OrderDetailModal";
import { generateSalesReportPDF } from "@/utils/generateSalesReportPDF";
import { toast } from "sonner";

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

export default function Sales() {
  const { t, i18n } = useTranslation();

  const [marketplaceFilter, setMarketplaceFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("last30Days");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

  // Sample orders data
  const allOrders: Order[] = [
    { id: "#ORD-1234", date: "2025-01-08", customer: "João Silva", marketplace: "Mercado Livre", items: 2, subtotal: 299.90, shipping: 15.00, commission: 44.99, profit: 80.00, status: "shipped" },
    { id: "#ORD-1235", date: "2025-01-08", customer: "Maria Santos", marketplace: "Shopee", items: 1, subtotal: 459.50, shipping: 20.00, commission: 68.93, profit: 120.50, status: "processing" },
    { id: "#ORD-1236", date: "2025-01-07", customer: "Pedro Costa", marketplace: "Amazon", items: 3, subtotal: 199.00, shipping: 12.00, commission: 29.85, profit: 65.00, status: "delivered" },
    { id: "#ORD-1237", date: "2025-01-07", customer: "Ana Oliveira", marketplace: "Mercado Livre", items: 1, subtotal: 349.90, shipping: 18.00, commission: 52.49, profit: 95.30, status: "processing" },
    { id: "#ORD-1238", date: "2025-01-06", customer: "Carlos Ferreira", marketplace: "Shopee", items: 2, subtotal: 599.00, shipping: 25.00, commission: 89.85, profit: 150.00, status: "delivered" },
    { id: "#ORD-1239", date: "2025-01-06", customer: "Juliana Lima", marketplace: "Amazon", items: 1, subtotal: 129.90, shipping: 10.00, commission: 19.49, profit: 45.00, status: "shipped" },
    { id: "#ORD-1240", date: "2025-01-05", customer: "Roberto Souza", marketplace: "Mercado Livre", items: 4, subtotal: 899.00, shipping: 30.00, commission: 134.85, profit: 280.00, status: "delivered" },
    { id: "#ORD-1241", date: "2025-01-05", customer: "Fernanda Costa", marketplace: "Shopee", items: 2, subtotal: 249.90, shipping: 15.00, commission: 37.49, profit: 70.00, status: "pending" },
    { id: "#ORD-1242", date: "2025-01-04", customer: "Lucas Alves", marketplace: "Amazon", items: 1, subtotal: 379.00, shipping: 20.00, commission: 56.85, profit: 110.00, status: "shipped" },
    { id: "#ORD-1243", date: "2025-01-04", customer: "Patricia Rocha", marketplace: "Mercado Livre", items: 3, subtotal: 549.90, shipping: 22.00, commission: 82.49, profit: 145.00, status: "processing" },
  ];

  // Filtered orders based on selected filters
  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      const matchesMarketplace = marketplaceFilter === "all" || order.marketplace === marketplaceFilter;
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      return matchesMarketplace && matchesStatus;
    });
  }, [marketplaceFilter, statusFilter]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const totalSales = filteredOrders.reduce((sum, order) => sum + order.subtotal + order.shipping, 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    const totalProfit = filteredOrders.reduce((sum, order) => sum + order.profit, 0);
    return { totalSales, totalOrders, avgOrderValue, totalProfit };
  }, [filteredOrders]);

  // Chart data - Sales by marketplace
  const marketplaceData = useMemo(() => {
    const grouped = filteredOrders.reduce((acc, order) => {
      if (!acc[order.marketplace]) {
        acc[order.marketplace] = 0;
      }
      acc[order.marketplace] += order.subtotal + order.shipping;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2)),
    }));
  }, [filteredOrders]);

  // Chart data - Daily sales trend
  const dailySalesData = useMemo(() => {
    const grouped = filteredOrders.reduce((acc, order) => {
      if (!acc[order.date]) {
        acc[order.date] = { sales: 0, profit: 0, orders: 0 };
      }
      acc[order.date].sales += order.subtotal + order.shipping;
      acc[order.date].profit += order.profit;
      acc[order.date].orders += 1;
      return acc;
    }, {} as Record<string, { sales: number; profit: number; orders: number }>);

    return Object.entries(grouped)
      .map(([date, data]) => ({
        date,
        sales: Number(data.sales.toFixed(2)),
        profit: Number(data.profit.toFixed(2)),
        orders: data.orders,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredOrders]);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: t('sales.pending'),
      processing: t('dashboard.processing'),
      shipped: t('sales.shipped'),
      delivered: t('sales.delivered'),
    };
    return statusMap[status] || status;
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  const handleExportReport = () => {
    try {
      generateSalesReportPDF({
        orders: filteredOrders,
        filters: {
          marketplace: marketplaceFilter,
          dateRange: dateRangeFilter,
          status: statusFilter,
        },
        stats,
        language: i18n.language,
      });
      toast.success(t('sales.exportingReport'));
    } catch (error) {
      toast.error('Error generating PDF');
      console.error('PDF generation error:', error);
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('sales.marketplace')}</label>
              <Select value={marketplaceFilter} onValueChange={setMarketplaceFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('sales.allMarketplaces')}</SelectItem>
                  <SelectItem value="Mercado Livre">{t('sales.mercadoLivre')}</SelectItem>
                  <SelectItem value="Shopee">{t('sales.shopee')}</SelectItem>
                  <SelectItem value="Amazon">{t('sales.amazon')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('sales.dateRange')}</label>
              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30Days">{t('sales.last30Days')}</SelectItem>
                  <SelectItem value="last7Days">{t('sales.last7Days')}</SelectItem>
                  <SelectItem value="thisMonth">{t('sales.thisMonth')}</SelectItem>
                  <SelectItem value="customRange">{t('sales.customRange')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('common.status')}</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('sales.allStatus')}</SelectItem>
                  <SelectItem value="pending">{t('sales.pending')}</SelectItem>
                  <SelectItem value="processing">{t('dashboard.processing')}</SelectItem>
                  <SelectItem value="shipped">{t('sales.shipped')}</SelectItem>
                  <SelectItem value="delivered">{t('sales.delivered')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Sales Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-success shadow-medium">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white/90">{t('sales.totalSales')}</p>
              <DollarSign className="h-5 w-5 text-white/80" />
            </div>
            <p className="text-3xl font-bold text-white">
              R$ {stats.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-white/70 mt-1">{filteredOrders.length} {t('sales.ordersFiltered')}</p>
          </Card>
          <Card className="p-6 bg-gradient-primary shadow-medium">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white/90">{t('sales.totalOrders')}</p>
              <ShoppingCart className="h-5 w-5 text-white/80" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
            <p className="text-xs text-white/70 mt-1">{t('sales.fromTotal')} {allOrders.length}</p>
          </Card>
          <Card className="p-6 bg-gradient-card border border-border shadow-medium">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">{t('sales.avgOrderValue')}</p>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              R$ {stats.avgOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-medium">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white/90">{t('sales.totalProfit')}</p>
              <TrendingUp className="h-5 w-5 text-white/80" />
            </div>
            <p className="text-3xl font-bold text-white">
              R$ {stats.totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Sales Trend */}
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">{t('sales.dailySalesTrend')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#6366f1" name={t('sales.sales')} strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#10b981" name={t('sales.profit')} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Sales by Marketplace */}
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">{t('sales.salesByMarketplace')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketplaceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketplaceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">{t('sales.recentOrders')}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t('sales.showing')} {filteredOrders.length} {t('sales.of')} {allOrders.length} {t('sales.orders')}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportReport}>
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
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.items')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.subtotal')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.shipping')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.commission')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.netProfit')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.status')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-12 text-center text-muted-foreground">
                      {t('sales.noOrdersFound')}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4 text-sm">{order.date}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4 text-sm">{order.marketplace}</td>
                      <td className="py-3 px-4 text-center">{order.items}</td>
                      <td className="py-3 px-4 font-medium text-right">
                        R$ {order.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-sm text-right">
                        R$ {order.shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-sm text-destructive text-right">
                        R$ {order.commission.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 font-semibold text-success text-right">
                        R$ {order.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? "bg-success/10 text-success" :
                          order.status === 'shipped' ? "bg-primary/10 text-primary" :
                          order.status === 'pending' ? "bg-muted text-muted-foreground" :
                          "bg-warning/10 text-warning"
                        }`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        open={isOrderDetailOpen}
        onOpenChange={setIsOrderDetailOpen}
      />
    </div>
  );
}
