import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export interface Account {
  id: number;
  marketplace: string;
  accountName: string;
  status: string;
  orders: number;
  revenue: number;
  lastSync: string;
  apiKey?: string;
  apiSecret?: string;
}

interface AddAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (accountData: Omit<Account, 'id' | 'orders' | 'revenue' | 'lastSync'>) => void;
}

export function AddAccountModal({ open, onOpenChange, onSave }: AddAccountModalProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    accountName: "",
    marketplace: "Mercado Livre",
    apiKey: "",
    apiSecret: "",
  });

  useEffect(() => {
    if (!open) {
      setFormData({
        accountName: "",
        marketplace: "Mercado Livre",
        apiKey: "",
        apiSecret: "",
      });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.accountName || !formData.apiKey || !formData.apiSecret) {
      toast.error(t('accounts.requiredFields'));
      return;
    }

    onSave({
      marketplace: formData.marketplace,
      accountName: formData.accountName,
      status: "active",
      apiKey: formData.apiKey,
      apiSecret: formData.apiSecret,
    });

    setFormData({
      accountName: "",
      marketplace: "Mercado Livre",
      apiKey: "",
      apiSecret: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('accounts.addNewAccount')}</DialogTitle>
          <DialogDescription>
            {t('accounts.addAccountDescription')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Marketplace Selection */}
          <div className="space-y-2">
            <Label htmlFor="marketplace">{t('sales.marketplace')} *</Label>
            <Select
              value={formData.marketplace}
              onValueChange={(value) => setFormData({ ...formData, marketplace: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mercado Livre">{t('sales.mercadoLivre')}</SelectItem>
                <SelectItem value="Shopee">{t('sales.shopee')}</SelectItem>
                <SelectItem value="Amazon">{t('sales.amazon')}</SelectItem>
                <SelectItem value="Magazine Luiza">{t('ads.magalu')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Account Name */}
          <div className="space-y-2">
            <Label htmlFor="accountName">{t('accounts.accountName')} *</Label>
            <Input
              id="accountName"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              placeholder={t('accounts.accountNamePlaceholder')}
              required
            />
            <p className="text-xs text-muted-foreground">
              {t('accounts.accountNameHelp')}
            </p>
          </div>

          {/* API Credentials */}
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
            <h4 className="font-semibold text-sm">{t('accounts.apiCredentials')}</h4>

            <div className="space-y-2">
              <Label htmlFor="apiKey">{t('accounts.apiKey')} *</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                placeholder={t('accounts.apiKeyPlaceholder')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiSecret">{t('accounts.apiSecret')} *</Label>
              <Input
                id="apiSecret"
                type="password"
                value={formData.apiSecret}
                onChange={(e) => setFormData({ ...formData, apiSecret: e.target.value })}
                placeholder={t('accounts.apiSecretPlaceholder')}
                required
              />
            </div>

            <p className="text-xs text-muted-foreground">
              {t('accounts.credentialsHelp')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {t('accounts.connectAccount')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
