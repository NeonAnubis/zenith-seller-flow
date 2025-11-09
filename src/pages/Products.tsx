import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, TrendingUp } from "lucide-react";
import productsBg from "@/assets/products-bg.jpg";

export default function Products() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={productsBg}
          alt="Products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-white mb-2">Products</h1>
            <p className="text-white/90 text-lg">Manage your inventory across all marketplaces</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-4">
            <select className="px-4 py-2 rounded-lg border border-input bg-background">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Garden</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-input bg-background">
              <option>All Marketplaces</option>
              <option>Mercado Livre</option>
              <option>Shopee</option>
              <option>Amazon</option>
            </select>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4 shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">Total Products</p>
            <p className="text-2xl font-bold">456</p>
          </Card>
          <Card className="p-4 shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">Active Listings</p>
            <p className="text-2xl font-bold text-success">423</p>
          </Card>
          <Card className="p-4 shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">Low Stock</p>
            <p className="text-2xl font-bold text-warning">18</p>
          </Card>
          <Card className="p-4 shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">Out of Stock</p>
            <p className="text-2xl font-bold text-destructive">15</p>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { name: "Wireless Headphones Pro", sku: "WH-PRO-001", price: "R$ 299.90", cost: "R$ 150.00", stock: 45, sales: 234, profit: "R$ 149.90" },
            { name: "Smart Watch Series 5", sku: "SW-S5-001", price: "R$ 899.90", cost: "R$ 450.00", stock: 28, sales: 189, profit: "R$ 449.90" },
            { name: "Bluetooth Speaker Mini", sku: "BS-MINI-001", price: "R$ 149.90", cost: "R$ 70.00", stock: 12, sales: 456, profit: "R$ 79.90" },
            { name: "USB-C Cable 2m", sku: "CAB-USBC-2M", price: "R$ 29.90", cost: "R$ 12.00", stock: 156, sales: 892, profit: "R$ 17.90" },
            { name: "Phone Case Premium", sku: "PC-PREM-001", price: "R$ 79.90", cost: "R$ 35.00", stock: 3, sales: 321, profit: "R$ 44.90" },
            { name: "Portable Charger 10000mAh", sku: "PC-10K-001", price: "R$ 149.90", cost: "R$ 65.00", stock: 67, sales: 567, profit: "R$ 84.90" },
          ].map((product, index) => (
            <Card key={index} className="p-6 shadow-soft hover:shadow-medium transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.sku}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="font-semibold">{product.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cost</span>
                  <span className="text-sm">{product.cost}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Net Profit</span>
                  <span className="font-semibold text-success">{product.profit}</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Stock</span>
                    <span className={`font-medium ${
                      product.stock < 10 ? "text-destructive" :
                      product.stock < 30 ? "text-warning" :
                      "text-success"
                    }`}>
                      {product.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Sales</span>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <span>{product.sales}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
