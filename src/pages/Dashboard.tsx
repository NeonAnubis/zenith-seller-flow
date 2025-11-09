import { KPICard } from "@/components/KPICard";
import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, ShoppingBag, Package } from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={dashboardHero}
          alt="Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/90 text-lg">Welcome back! Here's your business overview</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value="R$ 125,430"
            change="+12.5% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <KPICard
            title="Net Profit"
            value="R$ 45,230"
            change="+8.2% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
          <KPICard
            title="Orders"
            value="1,234"
            change="+15.3% from last month"
            changeType="positive"
            icon={ShoppingBag}
          />
          <KPICard
            title="Products"
            value="456"
            change="12 new this week"
            changeType="neutral"
            icon={Package}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">Sales Performance</h3>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Chart placeholder - Sales trends over time</p>
            </div>
          </Card>
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">Top Products</h3>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Chart placeholder - Best selling products</p>
            </div>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "#ORD-1234", customer: "João Silva", status: "Shipped", total: "R$ 299.90" },
                  { id: "#ORD-1235", customer: "Maria Santos", status: "Processing", total: "R$ 459.50" },
                  { id: "#ORD-1236", customer: "Pedro Costa", status: "Delivered", total: "R$ 199.00" },
                  { id: "#ORD-1237", customer: "Ana Oliveira", status: "Processing", total: "R$ 349.90" },
                ].map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "Delivered" ? "bg-success/10 text-success" :
                        order.status === "Shipped" ? "bg-primary/10 text-primary" :
                        "bg-warning/10 text-warning"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{order.total}</td>
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
