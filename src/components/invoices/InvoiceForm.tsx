import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvoiceFormProps {
  formData: {
    type: string;
    customer: string;
    taxId: string;
    value: string;
  };
  onChange: (field: string, value: string) => void;
}

export function InvoiceForm({ formData, onChange }: InvoiceFormProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">{t('invoices.invoiceType')} *</Label>
        <Select value={formData.type} onValueChange={(value) => onChange("type", value)}>
          <SelectTrigger id="type">
            <SelectValue placeholder={t('invoices.selectType')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NF-e">{t('invoices.nfe')}</SelectItem>
            <SelectItem value="NFC-e">{t('invoices.nfce')}</SelectItem>
            <SelectItem value="NFS-e">{t('invoices.nfse')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="customer">{t('invoices.customerName')} *</Label>
        <Input
          id="customer"
          value={formData.customer}
          onChange={(e) => onChange("customer", e.target.value)}
          placeholder={t('invoices.enterCustomer')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="taxId">{t('invoices.taxIdLabel')} *</Label>
        <Input
          id="taxId"
          value={formData.taxId}
          onChange={(e) => onChange("taxId", e.target.value)}
          placeholder={t('invoices.taxIdPlaceholder')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="value">{t('invoices.valueLabel')} *</Label>
        <Input
          id="value"
          type="number"
          step="0.01"
          value={formData.value}
          onChange={(e) => onChange("value", e.target.value)}
          placeholder={t('invoices.valuePlaceholder')}
        />
      </div>
    </div>
  );
}
