import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, User, Calendar, DollarSign, Hash, CheckCircle } from "lucide-react";

export interface Invoice {
  id: string;
  type: string;
  customer: string;
  value: string;
  status: string;
  date: string;
  taxId: string;
}

interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceDetailModal({ invoice, open, onOpenChange }: InvoiceDetailModalProps) {
  const { t } = useTranslation();

  if (!invoice) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'issued':
      case 'emitida':
        return "bg-success/10 text-success";
      case 'processing':
      case 'processando':
        return "bg-warning/10 text-warning";
      case 'error':
      case 'erro':
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Calculate tax breakdown (example values based on Brazilian tax structure)
  const numericValue = parseFloat(invoice.value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
  const subtotal = numericValue / 1.2; // Assuming 20% total tax
  const icms = subtotal * 0.18; // 18% ICMS
  const pisCofins = subtotal * 0.0365; // 3.65% PIS/COFINS
  const iss = invoice.type.includes('NFS-e') ? subtotal * 0.05 : 0; // 5% ISS for services

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FileText className="h-6 w-6 text-primary" />
            {t('invoices.invoiceDetails')}
          </DialogTitle>
          <DialogDescription>
            {t('invoices.detailedInformation')} {invoice.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Section */}
          <div className="bg-muted/30 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Hash className="h-4 w-4" />
                  {t('invoices.invoiceNumber')}
                </div>
                <p className="text-lg font-bold">{invoice.id}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <CheckCircle className="h-4 w-4" />
                  {t('invoices.status')}
                </div>
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status}
                </Badge>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <FileText className="h-4 w-4" />
                  {t('invoices.type')}
                </div>
                <p className="font-medium">{invoice.type}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  {t('invoices.issueDate')}
                </div>
                <p className="font-medium">{invoice.date}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {t('invoices.customerInformation')}
            </h3>
            <div className="bg-muted/20 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('invoices.customerName')}</p>
                  <p className="font-medium">{invoice.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CPF/CNPJ</p>
                  <p className="font-medium">{invoice.taxId}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              {t('invoices.financialDetails')}
            </h3>
            <div className="bg-muted/20 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('invoices.subtotal')}</span>
                <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">ICMS (18%)</span>
                  <span>R$ {icms.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">PIS/COFINS (3.65%)</span>
                  <span>R$ {pisCofins.toFixed(2)}</span>
                </div>
                {iss > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">ISS (5%)</span>
                    <span>R$ {iss.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>{t('invoices.totalValue')}</span>
                <span className="text-primary">{invoice.value}</span>
              </div>
            </div>
          </div>

          {/* SEFAZ Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('invoices.sefazInformation')}</h3>
            <div className="bg-muted/20 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{t('invoices.accessKey')}</span>
                <span className="font-mono text-xs">
                  {Math.random().toString(36).substring(2, 15).toUpperCase()}
                  {Math.random().toString(36).substring(2, 15).toUpperCase()}
                  {Math.random().toString(36).substring(2, 9).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{t('invoices.protocol')}</span>
                <span className="font-mono text-xs">
                  {Math.floor(Math.random() * 900000000000000 + 100000000000000)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{t('invoices.authorization')}</span>
                <span className="text-success font-medium">{t('invoices.authorized')}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
