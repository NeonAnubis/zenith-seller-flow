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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Account } from "./AddAccountModal";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface AccountSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
  onUpdate: (accountId: number, updates: Partial<Account>) => void;
  onDelete: (accountId: number) => void;
}

export function AccountSettingsModal({
  open,
  onOpenChange,
  account,
  onUpdate,
  onDelete,
}: AccountSettingsModalProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    accountName: "",
    apiKey: "",
    apiSecret: "",
    autoSync: true,
    syncInterval: "15",
  });

  useEffect(() => {
    if (account) {
      setFormData({
        accountName: account.accountName,
        apiKey: account.apiKey || "",
        apiSecret: account.apiSecret || "",
        autoSync: true,
        syncInterval: "15",
      });
    }
  }, [account]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!account) return;

    if (!formData.accountName) {
      toast.error(t('accounts.requiredFields'));
      return;
    }

    onUpdate(account.id, {
      accountName: formData.accountName,
      apiKey: formData.apiKey,
      apiSecret: formData.apiSecret,
    });

    toast.success(t('accounts.settingsUpdated'));
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (!account) return;

    if (confirm(t('accounts.deleteAccountConfirm'))) {
      onDelete(account.id);
      onOpenChange(false);
    }
  };

  if (!account) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('accounts.accountSettings')}</DialogTitle>
          <DialogDescription>
            {account.marketplace} - {account.accountName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Account Name */}
          <div className="space-y-2">
            <Label htmlFor="accountName">{t('accounts.accountName')} *</Label>
            <Input
              id="accountName"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              required
            />
          </div>

          <Separator />

          {/* API Credentials */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">{t('accounts.apiCredentials')}</h4>

            <div className="space-y-2">
              <Label htmlFor="apiKey">{t('accounts.apiKey')}</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                placeholder="••••••••••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiSecret">{t('accounts.apiSecret')}</Label>
              <Input
                id="apiSecret"
                type="password"
                value={formData.apiSecret}
                onChange={(e) => setFormData({ ...formData, apiSecret: e.target.value })}
                placeholder="••••••••••••••••"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              {t('accounts.leaveBlankToKeep')}
            </p>
          </div>

          <Separator />

          {/* Sync Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">{t('accounts.syncSettings')}</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoSync">{t('accounts.automaticSync')}</Label>
                <p className="text-xs text-muted-foreground">
                  {t('accounts.automaticSyncDescription')}
                </p>
              </div>
              <Switch
                id="autoSync"
                checked={formData.autoSync}
                onCheckedChange={(checked) => setFormData({ ...formData, autoSync: checked })}
              />
            </div>

            {formData.autoSync && (
              <div className="space-y-2 ml-4">
                <Label htmlFor="syncInterval">{t('accounts.syncInterval')}</Label>
                <select
                  id="syncInterval"
                  value={formData.syncInterval}
                  onChange={(e) => setFormData({ ...formData, syncInterval: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground"
                >
                  <option value="5">5 {t('accounts.minutes')}</option>
                  <option value="15">15 {t('accounts.minutes')}</option>
                  <option value="30">30 {t('accounts.minutes')}</option>
                  <option value="60">1 {t('accounts.hour')}</option>
                </select>
              </div>
            )}
          </div>

          <Separator />

          {/* Danger Zone */}
          <div className="space-y-4 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
            <h4 className="font-semibold text-sm text-destructive">{t('accounts.dangerZone')}</h4>
            <p className="text-xs text-muted-foreground">
              {t('accounts.deleteAccountWarning')}
            </p>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('accounts.deleteAccount')}
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {t('common.saveChanges')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
