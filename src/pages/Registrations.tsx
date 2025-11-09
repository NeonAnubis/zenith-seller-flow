import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Upload, Download } from "lucide-react";
import {
  RegistrationModal,
  RegistrationProduct,
  RegistrationCustomer,
  RegistrationSupplier,
  RegistrationVendor,
} from "@/components/registrations/RegistrationModal";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { toast } from "sonner";

export default function Registrations() {
  const { t } = useTranslation();

  const [products, setProducts] = useState<RegistrationProduct[]>([
    { id: 1, name: "Samsung Galaxy S23", sku: "SAMS23-128", category: "Smartphones", price: 2899.90, cost: 2100.00 },
    { id: 2, name: "JBL Bluetooth Headset", sku: "JBL-BT-500", category: "Audio", price: 299.90, cost: 180.00 },
  ]);

  const [customers, setCustomers] = useState<RegistrationCustomer[]>([
    { id: 1, name: "João Silva", email: "joao@email.com", phone: "(11) 98765-4321", orders: 12 },
    { id: 2, name: "Maria Santos", email: "maria@email.com", phone: "(21) 97654-3210", orders: 8 },
  ]);

  const [suppliers, setSuppliers] = useState<RegistrationSupplier[]>([
    { id: 1, name: "TechDistributor Ltda", cnpj: "12.345.678/0001-90", contact: "contato@techdist.com", products: 45 },
    { id: 2, name: "ElectroSupply SA", cnpj: "98.765.432/0001-10", contact: "vendas@electro.com", products: 28 },
  ]);

  const [vendors, setVendors] = useState<RegistrationVendor[]>([
    { id: 1, name: "Carlos Mendes", email: "carlos@example.com", phone: "(11) 99999-0000", commission: "10%" },
    { id: 2, name: "Ana Paula", email: "ana@example.com", phone: "(21) 98888-0000", commission: "12%" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"product" | "customer" | "supplier" | "vendor">("product");
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<{ type: string; id: number } | null>(null);

  // Product handlers
  const handleAddProduct = () => {
    setSelectedEntity(null);
    setModalType("product");
    setModalOpen(true);
  };

  const handleEditProduct = (product: RegistrationProduct) => {
    setSelectedEntity(product);
    setModalType("product");
    setModalOpen(true);
  };

  const handleSaveProduct = (data: any) => {
    if (selectedEntity) {
      setProducts(prev => prev.map(p => p.id === selectedEntity.id ? { ...data, id: selectedEntity.id } : p));
      toast.success(t('registrations.productUpdated'));
    } else {
      const newProduct = { ...data, id: Math.max(0, ...products.map(p => p.id)) + 1 };
      setProducts(prev => [newProduct, ...prev]);
      toast.success(t('registrations.productAdded'));
    }
    setModalOpen(false);
  };

  const handleDeleteProduct = (id: number) => {
    setEntityToDelete({ type: "product", id });
    setDeleteDialogOpen(true);
  };

  // Customer handlers
  const handleAddCustomer = () => {
    setSelectedEntity(null);
    setModalType("customer");
    setModalOpen(true);
  };

  const handleEditCustomer = (customer: RegistrationCustomer) => {
    setSelectedEntity(customer);
    setModalType("customer");
    setModalOpen(true);
  };

  const handleSaveCustomer = (data: any) => {
    if (selectedEntity) {
      setCustomers(prev => prev.map(c => c.id === selectedEntity.id ? { ...data, id: selectedEntity.id, orders: selectedEntity.orders } : c));
      toast.success(t('registrations.customerUpdated'));
    } else {
      const newCustomer = { ...data, id: Math.max(0, ...customers.map(c => c.id)) + 1, orders: 0 };
      setCustomers(prev => [newCustomer, ...prev]);
      toast.success(t('registrations.customerAdded'));
    }
    setModalOpen(false);
  };

  const handleDeleteCustomer = (id: number) => {
    setEntityToDelete({ type: "customer", id });
    setDeleteDialogOpen(true);
  };

  // Supplier handlers
  const handleAddSupplier = () => {
    setSelectedEntity(null);
    setModalType("supplier");
    setModalOpen(true);
  };

  const handleEditSupplier = (supplier: RegistrationSupplier) => {
    setSelectedEntity(supplier);
    setModalType("supplier");
    setModalOpen(true);
  };

  const handleSaveSupplier = (data: any) => {
    if (selectedEntity) {
      setSuppliers(prev => prev.map(s => s.id === selectedEntity.id ? { ...data, id: selectedEntity.id, products: selectedEntity.products } : s));
      toast.success(t('registrations.supplierUpdated'));
    } else {
      const newSupplier = { ...data, id: Math.max(0, ...suppliers.map(s => s.id)) + 1, products: 0 };
      setSuppliers(prev => [newSupplier, ...prev]);
      toast.success(t('registrations.supplierAdded'));
    }
    setModalOpen(false);
  };

  const handleDeleteSupplier = (id: number) => {
    setEntityToDelete({ type: "supplier", id });
    setDeleteDialogOpen(true);
  };

  // Vendor handlers
  const handleAddVendor = () => {
    setSelectedEntity(null);
    setModalType("vendor");
    setModalOpen(true);
  };

  const handleEditVendor = (vendor: RegistrationVendor) => {
    setSelectedEntity(vendor);
    setModalType("vendor");
    setModalOpen(true);
  };

  const handleSaveVendor = (data: any) => {
    if (selectedEntity) {
      setVendors(prev => prev.map(v => v.id === selectedEntity.id ? { ...data, id: selectedEntity.id } : v));
      toast.success(t('registrations.vendorUpdated'));
    } else {
      const newVendor = { ...data, id: Math.max(0, ...vendors.map(v => v.id)) + 1 };
      setVendors(prev => [newVendor, ...prev]);
      toast.success(t('registrations.vendorAdded'));
    }
    setModalOpen(false);
  };

  const handleDeleteVendor = (id: number) => {
    setEntityToDelete({ type: "vendor", id });
    setDeleteDialogOpen(true);
  };

  // Unified save handler
  const handleSave = (data: any) => {
    switch (modalType) {
      case "product":
        handleSaveProduct(data);
        break;
      case "customer":
        handleSaveCustomer(data);
        break;
      case "supplier":
        handleSaveSupplier(data);
        break;
      case "vendor":
        handleSaveVendor(data);
        break;
    }
  };

  // Unified delete confirmation
  const handleConfirmDelete = () => {
    if (!entityToDelete) return;

    switch (entityToDelete.type) {
      case "product":
        setProducts(prev => prev.filter(p => p.id !== entityToDelete.id));
        toast.success(t('registrations.productDeleted'));
        break;
      case "customer":
        setCustomers(prev => prev.filter(c => c.id !== entityToDelete.id));
        toast.success(t('registrations.customerDeleted'));
        break;
      case "supplier":
        setSuppliers(prev => prev.filter(s => s.id !== entityToDelete.id));
        toast.success(t('registrations.supplierDeleted'));
        break;
      case "vendor":
        setVendors(prev => prev.filter(v => v.id !== entityToDelete.id));
        toast.success(t('registrations.vendorDeleted'));
        break;
    }

    setDeleteDialogOpen(false);
    setEntityToDelete(null);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title={t('registrations.title')}
        description={t('registrations.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="products">{t('registrations.products')}</TabsTrigger>
            <TabsTrigger value="customers">{t('registrations.customers')}</TabsTrigger>
            <TabsTrigger value="suppliers">{t('registrations.suppliers')}</TabsTrigger>
            <TabsTrigger value="vendors">{t('registrations.vendors')}</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card className="p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">{t('registrations.productCatalog')}</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    {t('common.import')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t('common.export')}
                  </Button>
                  <Button size="sm" onClick={handleAddProduct}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('registrations.addProduct')}
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.product')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.sku')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.category')}</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.price')}</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.cost')}</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{product.sku}</td>
                        <td className="py-3 px-4">{product.category}</td>
                        <td className="py-3 px-4 text-right font-medium">R$ {product.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right text-muted-foreground">R$ {product.cost.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
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
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card className="p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">{t('registrations.customerDatabase')}</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    {t('common.import')}
                  </Button>
                  <Button size="sm" onClick={handleAddCustomer}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('registrations.addCustomer')}
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.name')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.email')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.phone')}</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.orders')}</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{customer.name}</td>
                        <td className="py-3 px-4 text-sm">{customer.email}</td>
                        <td className="py-3 px-4 text-sm">{customer.phone}</td>
                        <td className="py-3 px-4 text-center">{customer.orders}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditCustomer(customer)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteCustomer(customer.id)}>
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
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <Card className="p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">{t('registrations.supplierManagement')}</h3>
                <Button size="sm" onClick={handleAddSupplier}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('registrations.addSupplier')}
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.company')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.cnpj')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.contact')}</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.products')}</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier) => (
                      <tr key={supplier.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{supplier.name}</td>
                        <td className="py-3 px-4 text-sm">{supplier.cnpj}</td>
                        <td className="py-3 px-4 text-sm">{supplier.contact}</td>
                        <td className="py-3 px-4 text-center">{supplier.products}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditSupplier(supplier)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteSupplier(supplier.id)}>
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
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card className="p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">{t('registrations.vendorManagement')}</h3>
                <Button size="sm" onClick={handleAddVendor}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('registrations.addVendor')}
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.name')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.email')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.phone')}</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('registrations.commission')}</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{vendor.name}</td>
                        <td className="py-3 px-4 text-sm">{vendor.email}</td>
                        <td className="py-3 px-4 text-sm">{vendor.phone}</td>
                        <td className="py-3 px-4 text-center">{vendor.commission}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditVendor(vendor)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteVendor(vendor.id)}>
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
          </TabsContent>
        </Tabs>

        {/* Info */}
        <Card className="p-6 shadow-soft mt-6 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2">{t('registrations.bulkOperations')}</h4>
          <p className="text-sm text-muted-foreground">
            {t('registrations.bulkDescription')}
          </p>
        </Card>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        type={modalType}
        entity={selectedEntity}
        onSave={handleSave}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title={t('registrations.deleteItem')}
        description={t('registrations.deleteConfirmation')}
      />
    </div>
  );
}
