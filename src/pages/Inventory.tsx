import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, AlertTriangle, TrendingDown, TrendingUp, Edit, Trash2 } from "lucide-react";
import { InventoryModal, InventoryItem } from "@/components/inventory/InventoryModal";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { toast } from "sonner";

export default function Inventory() {
  const { t } = useTranslation();

  const [inventory, setInventory] = useState<InventoryItem[]>([
    { sku: "SAMS23-128", product: "Samsung Galaxy S23", stock: 45, reserved: 12, available: 33, minStock: 10, location: t('inventory.warehouseA'), status: "ok" },
    { sku: "JBL-BT-500", product: "JBL Bluetooth Headset", stock: 120, reserved: 25, available: 95, minStock: 50, location: t('inventory.warehouseA'), status: "ok" },
    { sku: "LG-55-4K", product: "LG 55\" 4K TV", stock: 8, reserved: 5, available: 3, minStock: 10, location: t('inventory.warehouseB'), status: "low" },
    { sku: "DELL-I15-512", product: "Dell Inspiron 15", stock: 0, reserved: 0, available: 0, minStock: 5, location: t('inventory.warehouseA'), status: "out" },
    { sku: "LOG-G502", product: "Logitech G502 Mouse", stock: 67, reserved: 8, available: 59, minStock: 20, location: t('inventory.warehouseA'), status: "ok" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const movements = [
    { date: "2025-11-08", type: "out", product: "Samsung Galaxy S23", quantity: 15, reason: t('ads.sales'), user: "System" },
    { date: "2025-11-08", type: "in", product: "JBL Bluetooth Headset", quantity: 50, reason: t('inventory.purchase'), user: "Admin" },
    { date: "2025-11-07", type: "out", product: "LG 55\" 4K TV", quantity: 5, reason: t('ads.sales'), user: "System" },
    { date: "2025-11-07", type: "return", product: "Dell Inspiron 15", quantity: 2, reason: t('inventory.customerReturn'), user: "Support" },
  ];

  // Filtered inventory with useMemo
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch = searchQuery === "" ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = locationFilter === "all" || item.location === locationFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesLocation && matchesStatus;
    });
  }, [inventory, searchQuery, locationFilter, statusFilter]);

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const totalProducts = inventory.length;
    const lowStockItems = inventory.filter(item => item.status === "low").length;
    const outOfStockItems = inventory.filter(item => item.status === "out").length;
    const totalReserved = inventory.reduce((sum, item) => sum + item.reserved, 0);
    return { totalProducts, lowStockItems, outOfStockItems, totalReserved };
  }, [inventory]);

  const handleAddProduct = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: Omit<InventoryItem, "available" | "status">) => {
    const available = productData.stock - productData.reserved;
    let status = "ok";
    if (available === 0) {
      status = "out";
    } else if (available < productData.minStock) {
      status = "low";
    }

    const newProduct: InventoryItem = {
      ...productData,
      available,
      status,
    };

    if (selectedItem) {
      // Edit existing
      setInventory(prev => prev.map(item =>
        item.sku === selectedItem.sku ? newProduct : item
      ));
      toast.success(t('inventory.productUpdated'));
    } else {
      // Add new
      setInventory(prev => [newProduct, ...prev]);
      toast.success(t('inventory.productAdded'));
    }

    setIsModalOpen(false);
  };

  const handleDeleteClick = (sku: string) => {
    setItemToDelete(sku);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setInventory(prev => prev.filter(item => item.sku !== itemToDelete));
      toast.success(t('inventory.productDeleted'));
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-success/10 text-success">{t('inventory.inStock')}</Badge>;
      case "low":
        return <Badge className="bg-warning/10 text-warning">{t('inventory.lowStock')}</Badge>;
      case "out":
        return <Badge className="bg-destructive/10 text-destructive">{t('ads.outOfStock')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title={t('inventory.title')}
        description={t('inventory.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('inventory.totalProducts')}</span>
              <Package className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
            <p className="text-xs text-success mt-1">{t('inventory.acrossAllLocations')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('inventory.lowStockItems')}</span>
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <p className="text-2xl font-bold text-warning">{stats.lowStockItems}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('inventory.needReplenishment')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('ads.outOfStock')}</span>
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-destructive">{stats.outOfStockItems}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('inventory.urgentActionNeeded')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('inventory.reserved')}</span>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">{stats.totalReserved}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('inventory.pendingShipment')}</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6 shadow-soft">
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder={t('inventory.searchBySku')}
              className="max-w-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('inventory.allLocations')}</SelectItem>
                <SelectItem value={t('inventory.warehouseA')}>{t('inventory.warehouseA')}</SelectItem>
                <SelectItem value={t('inventory.warehouseB')}>{t('inventory.warehouseB')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('inventory.allStatus')}</SelectItem>
                <SelectItem value="ok">{t('inventory.inStock')}</SelectItem>
                <SelectItem value="low">{t('inventory.lowStock')}</SelectItem>
                <SelectItem value="out">{t('ads.outOfStock')}</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddProduct}>{t('inventory.addProduct')}</Button>
          </div>
        </Card>

        {/* Inventory Table */}
        <Card className="p-6 shadow-soft mb-8">
          <h3 className="text-lg font-semibold mb-4">{t('inventory.currentInventory')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.sku')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.product')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.stock')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('inventory.reserved')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('inventory.available')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('inventory.minStock')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('inventory.location')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.status')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.sku} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-sm">{item.sku}</td>
                    <td className="py-3 px-4">{item.product}</td>
                    <td className="py-3 px-4 text-center font-medium">{item.stock}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{item.reserved}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-medium ${
                        item.available === 0 ? "text-destructive" :
                        item.available < item.minStock ? "text-warning" :
                        "text-success"
                      }`}>
                        {item.available}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-muted-foreground">{item.minStock}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{item.location}</Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProduct(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(item.sku)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Movements */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">{t('inventory.recentMovements')}</h3>
          <div className="space-y-3">
            {movements.map((movement, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    movement.type === "in" ? "bg-success" :
                    movement.type === "out" ? "bg-primary" :
                    "bg-warning"
                  }`} />
                  <div>
                    <p className="font-medium">{movement.product}</p>
                    <p className="text-xs text-muted-foreground">{movement.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    movement.type === "in" ? "text-success" :
                    movement.type === "out" ? "text-primary" :
                    "text-warning"
                  }`}>
                    {movement.type === "in" ? "+" : "-"}{movement.quantity}
                  </p>
                  <p className="text-xs text-muted-foreground">{movement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Info */}
        <Card className="p-6 shadow-soft mt-6 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2">{t('inventory.automaticUpdates')}</h4>
          <p className="text-sm text-muted-foreground">
            {t('inventory.automaticUpdatesDescription')}
          </p>
        </Card>
      </div>

      {/* Inventory Modal */}
      <InventoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        item={selectedItem}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title={t('inventory.deleteProduct')}
        description={t('inventory.deleteConfirmation')}
      />
    </div>
  );
}
