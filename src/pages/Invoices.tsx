import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { FormModal } from "@/components/common/FormModal";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { InvoiceTable, Invoice } from "@/components/invoices/InvoiceTable";
import { InvoiceDetailModal } from "@/components/invoices/InvoiceDetailModal";
import { BulkInvoiceModal } from "@/components/invoices/BulkInvoiceModal";
import { generateInvoicePDF } from "@/utils/generateInvoicePDF";
import { toast } from "sonner";

export default function Invoices() {
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "NFE-001234", type: "NF-e", customer: "João Silva", value: "R$ 2,459.90", status: "issued", date: "2025-11-08", taxId: "12345678901234" },
    { id: "NFCE-005678", type: "NFC-e", customer: "Maria Santos", value: "R$ 459.50", status: "processing", date: "2025-11-08", taxId: "98765432109876" },
    { id: "NFSE-009012", type: "NFS-e", customer: "TechCorp Ltda", value: "R$ 8,999.00", status: "issued", date: "2025-11-07", taxId: "11223344556677" },
    { id: "NFE-001235", type: "NF-e", customer: "Pedro Costa", value: "R$ 1,299.00", status: "error", date: "2025-11-07", taxId: "22334455667788" },
    { id: "NFCE-005679", type: "NFC-e", customer: "Ana Oliveira", value: "R$ 349.90", status: "issued", date: "2025-11-06", taxId: "33445566778899" },
  ]);

  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [isBulkInvoiceOpen, setIsBulkInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [bulkBatches, setBulkBatches] = useState<Array<{
    id: string;
    date: string;
    count: number;
    totalValue: string;
    status: string;
  }>>([
    {
      id: "BATCH-001",
      date: "2025-11-08",
      count: 15,
      totalValue: "R$ 25,487.50",
      status: "completed",
    },
    {
      id: "BATCH-002",
      date: "2025-11-07",
      count: 8,
      totalValue: "R$ 12,340.00",
      status: "processing",
    },
  ]);
  const [formData, setFormData] = useState({
    type: "NF-e",
    customer: "",
    taxId: "",
    value: "",
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateInvoice = () => {
    if (!formData.customer || !formData.taxId || !formData.value) {
      toast.error(t('invoices.requiredFields'));
      return;
    }

    const newInvoice: Invoice = {
      id: `${formData.type.replace("-", "")}-${String(Math.floor(Math.random() * 900000) + 100000)}`,
      type: formData.type,
      customer: formData.customer,
      taxId: formData.taxId,
      value: `R$ ${parseFloat(formData.value).toFixed(2)}`,
      status: "processing",
      date: new Date().toISOString().split("T")[0],
    };

    setInvoices(prev => [newInvoice, ...prev]);
    setIsNewInvoiceOpen(false);
    setFormData({ type: "NF-e", customer: "", taxId: "", value: "" });
    toast.success(t('invoices.invoiceCreated'));
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailModalOpen(true);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    try {
      generateInvoicePDF(invoice);
      toast.success(`${t('invoices.downloadingInvoice')}: ${invoice.id}`);
    } catch (error) {
      toast.error('Error generating PDF');
      console.error('PDF generation error:', error);
    }
  };

  const handleBulkInvoiceSubmit = (items: Array<{ id: string; customer: string; taxId: string; value: string; type: string }>) => {
    // Create batch record
    const batchId = `BATCH-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
    const totalValue = items.reduce((sum, item) => sum + parseFloat(item.value), 0);

    const newBatch = {
      id: batchId,
      date: new Date().toISOString().split("T")[0],
      count: items.length,
      totalValue: `R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      status: "processing",
    };

    setBulkBatches(prev => [newBatch, ...prev]);

    // Create individual invoices
    const newInvoices: Invoice[] = items.map((item) => ({
      id: `${item.type.replace("-", "")}-${String(Math.floor(Math.random() * 900000) + 100000)}`,
      type: item.type,
      customer: item.customer,
      taxId: item.taxId,
      value: `R$ ${parseFloat(item.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      status: "processing",
      date: new Date().toISOString().split("T")[0],
    }));

    setInvoices(prev => [...newInvoices, ...prev]);

    toast.success(`${t('invoices.batchCreated')}: ${batchId} (${items.length} ${t('invoices.invoices')})`);

    // Simulate processing completion after 2 seconds
    setTimeout(() => {
      setBulkBatches(prev =>
        prev.map(batch =>
          batch.id === batchId ? { ...batch, status: "completed" } : batch
        )
      );
      setInvoices(prev =>
        prev.map(inv =>
          newInvoices.find(ni => ni.id === inv.id) && inv.status === "processing"
            ? { ...inv, status: "issued" }
            : inv
        )
      );
      toast.success(`${t('invoices.batchCompleted')}: ${batchId}`);
    }, 2000);
  };

  return (
    <div className="min-h-full pb-8">
      <PageHeader
        title={t('invoices.title')}
        description={t('invoices.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <Card className="p-4 sm:p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">{t('invoices.issuedToday')}</span>
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">127</p>
            <p className="text-xs text-muted-foreground mt-1">+15% {t('invoices.fromYesterday')}</p>
          </Card>
          <Card className="p-4 sm:p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">{t('invoices.processing')}</span>
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">23</p>
            <p className="text-xs text-muted-foreground mt-1">{t('invoices.averageWait')}</p>
          </Card>
          <Card className="p-4 sm:p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">{t('invoices.totalValue')}</span>
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">R$ 45.9K</p>
            <p className="text-xs text-muted-foreground mt-1">{t('invoices.todaysInvoices')}</p>
          </Card>
          <Card className="p-4 sm:p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">{t('invoices.errors')}</span>
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">3</p>
            <p className="text-xs text-muted-foreground mt-1">{t('invoices.needsAttention')}</p>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="individual" className="space-y-6">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="individual" className="flex-1 sm:flex-none">{t('invoices.individual')}</TabsTrigger>
            <TabsTrigger value="bulk" className="flex-1 sm:flex-none">{t('invoices.bulk')}</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-6">
            <Card className="p-4 sm:p-6 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-semibold">{t('invoices.recentInvoices')}</h3>
                <Button onClick={() => setIsNewInvoiceOpen(true)} className="w-full sm:w-auto">
                  <FileText className="h-4 w-4 mr-2" />
                  {t('invoices.newInvoice')}
                </Button>
              </div>
              <InvoiceTable
                invoices={invoices}
                onView={handleViewInvoice}
                onDownload={handleDownloadInvoice}
              />
            </Card>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-6">
            <Card className="p-4 sm:p-6 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold">{t('invoices.bulkBatches')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t('invoices.processMultiple')}</p>
                </div>
                <Button onClick={() => setIsBulkInvoiceOpen(true)} className="w-full sm:w-auto">
                  <FileText className="h-4 w-4 mr-2" />
                  {t('invoices.newBatch')}
                </Button>
              </div>

              {bulkBatches.length === 0 ? (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">{t('invoices.noBatchesYet')}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t('invoices.createFirstBatch')}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('invoices.batchId')}</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">{t('invoices.date')}</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('invoices.count')}</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('invoices.totalValue')}</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('invoices.status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkBatches.map((batch) => (
                        <tr key={batch.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4 font-medium text-sm">{batch.id}</td>
                          <td className="py-3 px-4 text-sm hidden sm:table-cell">{batch.date}</td>
                          <td className="py-3 px-4 text-center font-medium">{batch.count}</td>
                          <td className="py-3 px-4 text-right font-medium">{batch.totalValue}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {batch.status === "completed" ? (
                                <CheckCircle className="h-4 w-4 text-success" />
                              ) : (
                                <Clock className="h-4 w-4 text-warning" />
                              )}
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                batch.status === "completed"
                                  ? "bg-success/10 text-success"
                                  : "bg-warning/10 text-warning"
                              }`}>
                                {batch.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Tax Calculation Info */}
            <Card className="p-4 sm:p-6 shadow-soft bg-primary/5 border-primary/20">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                {t('invoices.sefazActive')}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {t('invoices.sefazDescription')}
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• {t('invoices.icms')}</li>
                <li>• {t('invoices.pisCofins')}</li>
                <li>• {t('invoices.ipi')}</li>
                <li>• {t('invoices.iss')}</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Invoice Modal */}
      <FormModal
        open={isNewInvoiceOpen}
        onOpenChange={setIsNewInvoiceOpen}
        title={t('invoices.createInvoice')}
        description={t('invoices.createInvoiceDesc')}
        onSubmit={handleCreateInvoice}
        submitLabel={t('invoices.newInvoice')}
        cancelLabel={t('common.cancel')}
      >
        <InvoiceForm formData={formData} onChange={handleFormChange} />
      </FormModal>

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      {/* Bulk Invoice Modal */}
      <BulkInvoiceModal
        open={isBulkInvoiceOpen}
        onOpenChange={setIsBulkInvoiceOpen}
        onSubmit={handleBulkInvoiceSubmit}
      />
    </div>
  );
}
