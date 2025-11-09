import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Upload, Trash2, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface BulkInvoiceItem {
  id: string;
  customer: string;
  taxId: string;
  value: string;
  type: string;
}

interface BulkInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (items: BulkInvoiceItem[]) => void;
}

export function BulkInvoiceModal({ open, onOpenChange, onSubmit }: BulkInvoiceModalProps) {
  const { t } = useTranslation();
  const [items, setItems] = useState<BulkInvoiceItem[]>([]);
  const [currentItem, setCurrentItem] = useState({
    customer: "",
    taxId: "",
    value: "",
    type: "NF-e",
  });

  const handleAddItem = () => {
    if (!currentItem.customer || !currentItem.taxId || !currentItem.value) {
      toast.error(t('invoices.requiredFields'));
      return;
    }

    const newItem: BulkInvoiceItem = {
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...currentItem,
    };

    setItems(prev => [...prev, newItem]);
    setCurrentItem({ customer: "", taxId: "", value: "", type: "NF-e" });
    toast.success(t('invoices.itemAdded'));
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      toast.error(t('invoices.addAtLeastOne'));
      return;
    }

    onSubmit(items);
    setItems([]);
    setCurrentItem({ customer: "", taxId: "", value: "", type: "NF-e" });
    onOpenChange(false);
  };

  const handleCancel = () => {
    setItems([]);
    setCurrentItem({ customer: "", taxId: "", value: "", type: "NF-e" });
    onOpenChange(false);
  };

  const totalValue = items.reduce((sum, item) => {
    const value = parseFloat(item.value) || 0;
    return sum + value;
  }, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FileText className="h-6 w-6 text-primary" />
            {t('invoices.createBulkBatch')}
          </DialogTitle>
          <DialogDescription>
            {t('invoices.bulkBatchDescription')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Add New Item Form */}
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              {t('invoices.addInvoiceItem')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('invoices.invoiceType')}
                </label>
                <select
                  value={currentItem.type}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="NF-e">{t('invoices.nfe')}</option>
                  <option value="NFC-e">{t('invoices.nfce')}</option>
                  <option value="NFS-e">{t('invoices.nfse')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('invoices.customerName')}
                </label>
                <input
                  type="text"
                  value={currentItem.customer}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, customer: e.target.value }))}
                  placeholder={t('invoices.enterCustomer')}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('invoices.taxIdLabel')}
                </label>
                <input
                  type="text"
                  value={currentItem.taxId}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, taxId: e.target.value }))}
                  placeholder={t('invoices.taxIdPlaceholder')}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('invoices.valueLabel')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={currentItem.value}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, value: e.target.value }))}
                  placeholder={t('invoices.valuePlaceholder')}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
            </div>

            <Button onClick={handleAddItem} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              {t('invoices.addToList')}
            </Button>
          </div>

          <Separator />

          {/* Items List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {t('invoices.itemsInBatch')} ({items.length})
              </h3>
              {items.length > 0 && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t('invoices.totalValue')}</p>
                  <p className="text-xl font-bold text-primary">
                    R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>

            {items.length === 0 ? (
              <div className="text-center py-12 bg-muted/20 rounded-lg">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">{t('invoices.noItemsAdded')}</p>
                <p className="text-sm text-muted-foreground mt-1">{t('invoices.addItemsAbove')}</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={item.id} className="bg-muted/20 rounded-lg p-4 flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">{t('invoices.type')}</p>
                        <Badge variant="outline" className="mt-1">{item.type}</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t('invoices.customer')}</p>
                        <p className="font-medium text-sm mt-1">{item.customer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">CPF/CNPJ</p>
                        <p className="text-sm mt-1">{item.taxId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t('invoices.value')}</p>
                        <p className="font-medium text-sm mt-1">
                          R$ {parseFloat(item.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {items.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">{t('invoices.batchSummary')}</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">{t('invoices.totalInvoices')}</p>
                  <p className="font-bold text-lg">{items.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('invoices.nfeCount')}</p>
                  <p className="font-bold text-lg">{items.filter(i => i.type === 'NF-e').length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('invoices.nfceCount')}</p>
                  <p className="font-bold text-lg">{items.filter(i => i.type === 'NFC-e').length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('invoices.nfseCount')}</p>
                  <p className="font-bold text-lg">{items.filter(i => i.type === 'NFS-e').length}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} disabled={items.length === 0}>
            <FileText className="h-4 w-4 mr-2" />
            {t('invoices.processBatch')} ({items.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
