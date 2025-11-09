import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";

export default function Reports() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden bg-gradient-success">
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-white mb-2">Performance Reports</h1>
            <p className="text-white/90 text-lg">Comprehensive analytics and insights</p>
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
              <select className="px-4 py-2 rounded-lg border border-input bg-background">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This month</option>
                <option>Last month</option>
                <option>This quarter</option>
                <option>This year</option>
                <option>Custom range</option>
              </select>
            </div>
            <select className="px-4 py-2 rounded-lg border border-input bg-background">
              <option>All Marketplaces</option>
              <option>Mercado Livre</option>
              <option>Shopee</option>
              <option>Amazon</option>
              <option>Magalu</option>
            </select>
            <Button className="ml-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-success shadow-medium">
            <p className="text-sm font-medium text-white/90 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-white mb-2">R$ 125,430</p>
            <p className="text-sm text-white/80">+12.5% from previous period</p>
          </Card>
          <Card className="p-6 bg-gradient-primary shadow-medium">
            <p className="text-sm font-medium text-white/90 mb-1">Net Profit</p>
            <p className="text-3xl font-bold text-white mb-2">R$ 45,230</p>
            <p className="text-sm text-white/80">+8.2% from previous period</p>
          </Card>
          <Card className="p-6 bg-gradient-card border border-border shadow-medium">
            <p className="text-sm font-medium text-muted-foreground mb-1">Profit Margin</p>
            <p className="text-3xl font-bold text-foreground mb-2">36.1%</p>
            <p className="text-sm text-muted-foreground">-1.2% from previous period</p>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">Revenue by Marketplace</h3>
            <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Pie chart - Revenue distribution</p>
            </div>
          </Card>
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">Profit Trend</h3>
            <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Line chart - Profit over time</p>
            </div>
          </Card>
        </div>

        {/* Top Products */}
        <Card className="p-6 mb-8 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">Best Selling Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Units Sold</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Profit</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Margin</th>
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
          <h3 className="text-lg font-semibold mb-4">Marketplace Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Marketplace</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Orders</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Avg. Order</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Commission</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Net Profit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { marketplace: "Mercado Livre", orders: 543, revenue: "R$ 55,230", avg: "R$ 101.70", commission: "R$ 8,284.50", profit: "R$ 18,765.20" },
                  { marketplace: "Shopee", orders: 412, revenue: "R$ 38,450", avg: "R$ 93.32", commission: "R$ 5,767.50", profit: "R$ 13,054.30" },
                  { marketplace: "Amazon", orders: 198, revenue: "R$ 24,120", avg: "R$ 121.82", commission: "R$ 3,618.00", profit: "R$ 8,195.40" },
                  { marketplace: "Magalu", orders: 81, revenue: "R$ 7,630", avg: "R$ 94.20", commission: "R$ 1,144.50", profit: "R$ 2,592.10" },
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
    </div>
  );
}
