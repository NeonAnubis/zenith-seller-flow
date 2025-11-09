import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Upload, Download } from "lucide-react";

export default function Registrations() {
  const { t } = useTranslation();

  const products = [
    { id: 1, name: "Samsung Galaxy S23", sku: "SAMS23-128", category: "Smartphones", price: 2899.90, cost: 2100.00 },
    { id: 2, name: "JBL Bluetooth Headset", sku: "JBL-BT-500", category: "Audio", price: 299.90, cost: 180.00 },
  ];

  const customers = [
    { id: 1, name: "João Silva", email: "joao@email.com", phone: "(11) 98765-4321", orders: 12 },
    { id: 2, name: "Maria Santos", email: "maria@email.com", phone: "(21) 97654-3210", orders: 8 },
  ];

  const suppliers = [
    { id: 1, name: "TechDistributor Ltda", cnpj: "12.345.678/0001-90", contact: "contato@techdist.com", products: 45 },
    { id: 2, name: "ElectroSupply SA", cnpj: "98.765.432/0001-10", contact: "vendas@electro.com", products: 28 },
  ];

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
                  <Button size="sm">
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
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
                  <Button size="sm">
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
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
                <Button size="sm">
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
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('registrations.addVendor')}
                </Button>
              </div>
              <p className="text-muted-foreground">{t('registrations.vendorComingSoon')}</p>
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
    </div>
  );
}
