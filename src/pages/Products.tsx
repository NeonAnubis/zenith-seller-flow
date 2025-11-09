import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, TrendingUp } from "lucide-react";
import productsBg from "@/assets/products-bg.jpg";
import { ProductModal, Product } from "@/components/products/ProductModal";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { toast } from "sonner";

export default function Products() {
  const { t } = useTranslation();

  const [products, setProducts] = useState<Product[]>([
    { name: "Wireless Headphones Pro", sku: "WH-PRO-001", category: "Electronics", price: 299.90, cost: 150.00, stock: 45, sales: 234, profit: 149.90 },
    { name: "Smart Watch Series 5", sku: "SW-S5-001", category: "Electronics", price: 899.90, cost: 450.00, stock: 28, sales: 189, profit: 449.90 },
    { name: "Bluetooth Speaker Mini", sku: "BS-MINI-001", category: "Electronics", price: 149.90, cost: 70.00, stock: 12, sales: 456, profit: 79.90 },
    { name: "USB-C Cable 2m", sku: "CAB-USBC-2M", category: "Electronics", price: 29.90, cost: 12.00, stock: 156, sales: 892, profit: 17.90 },
    { name: "Phone Case Premium", sku: "PC-PREM-001", category: "Electronics", price: 79.90, cost: 35.00, stock: 3, sales: 321, profit: 44.90 },
    { name: "Portable Charger 10000mAh", sku: "PC-10K-001", category: "Electronics", price: 149.90, cost: 65.00, stock: 67, sales: 567, profit: 84.90 },
  ]);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [marketplaceFilter, setMarketplaceFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      // Marketplace filter not implemented since products don't have marketplace field
      return matchesCategory;
    });
  }, [products, categoryFilter]);

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const activeListings = products.filter(p => p.stock > 0).length;
    const lowStockItems = products.filter(p => p.stock > 0 && p.stock < 30).length;
    const outOfStockItems = products.filter(p => p.stock === 0).length;
    return { totalProducts, activeListings, lowStockItems, outOfStockItems };
  }, [products]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, "sales" | "profit">) => {
    const profit = productData.price - productData.cost;

    const newProduct: Product = {
      ...productData,
      sales: 0,
      profit,
    };

    if (selectedProduct) {
      // Edit existing
      setProducts(prev => prev.map(p =>
        p.sku === selectedProduct.sku ? { ...newProduct, sales: selectedProduct.sales } : p
      ));
      toast.success(t('products.productUpdated'));
    } else {
      // Add new
      setProducts(prev => [newProduct, ...prev]);
      toast.success(t('products.productAdded'));
    }

    setIsModalOpen(false);
  };

  const handleDeleteClick = (sku: string) => {
    setProductToDelete(sku);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts(prev => prev.filter(p => p.sku !== productToDelete));
      toast.success(t('products.productDeleted'));
    }
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

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
            <h1 className="text-4xl font-bold text-white mb-2">{t('products.title')}</h1>
            <p className="text-white/90 text-lg">{t('products.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('products.allCategories')}</SelectItem>
                <SelectItem value="Electronics">{t('products.electronics')}</SelectItem>
                <SelectItem value="Fashion">{t('products.fashion')}</SelectItem>
                <SelectItem value="Home & Garden">{t('products.homeGarden')}</SelectItem>
                <SelectItem value="Sports">{t('products.sports')}</SelectItem>
                <SelectItem value="Books">{t('products.books')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={marketplaceFilter} onValueChange={setMarketplaceFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('products.allMarketplaces')}</SelectItem>
                <SelectItem value="Mercado Livre">{t('products.mercadoLivre')}</SelectItem>
                <SelectItem value="Shopee">{t('products.shopee')}</SelectItem>
                <SelectItem value="Amazon">{t('products.amazon')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddProduct}>
            <Plus className="h-4 w-4 mr-2" />
            {t('products.addProduct')}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4 shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">{t('products.totalProducts')}</p>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
          </Card>
          <Card className="p-4 shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">{t('products.activeListings')}</p>
            <p className="text-2xl font-bold text-success">{stats.activeListings}</p>
          </Card>
          <Card className="p-4 shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">{t('products.lowStock')}</p>
            <p className="text-2xl font-bold text-warning">{stats.lowStockItems}</p>
          </Card>
          <Card className="p-4 shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">{t('products.outOfStock')}</p>
            <p className="text-2xl font-bold text-destructive">{stats.outOfStockItems}</p>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <Card key={product.sku} className="p-6 shadow-soft hover:shadow-medium transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.sku}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(product.sku)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('common.price')}</span>
                  <span className="font-semibold">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('products.cost')}</span>
                  <span className="text-sm">
                    R$ {product.cost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('products.netProfit')}</span>
                  <span className="font-semibold text-success">
                    R$ {product.profit.toFixed(2)}
                  </span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">{t('products.stock')}</span>
                    <span className={`font-medium ${
                      product.stock < 10 ? "text-destructive" :
                      product.stock < 30 ? "text-warning" :
                      "text-success"
                    }`}>
                      {product.stock} {t('products.units')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t('products.totalSales')}</span>
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

      {/* Product Modal */}
      <ProductModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title={t('products.deleteProduct')}
        description={t('products.deleteConfirmation')}
      />
    </div>
  );
}
