import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface Integration {
  name: string;
  status: string;
  type: "marketplace" | "logistics" | "payment";
}

interface IntegrationSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integration: Integration | null;
  onUpdate: (name: string, updates: Partial<Integration>) => void;
  onDisconnect: (name: string) => void;
}

export function IntegrationSettingsModal({
  open,
  onOpenChange,
  integration,
  onUpdate,
  onDisconnect,
}: IntegrationSettingsModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    apiKey: "",
    apiSecret: "",
    autoSync: true,
  });

  useEffect(() => {
    if (integration) {
      setFormData({
        apiKey: "",
        apiSecret: "",
        autoSync: true,
      });
    }
  }, [integration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!integration) return;

    onUpdate(integration.name, {});
    toast.success(t('integrations.settingsUpdated'));
    onOpenChange(false);
  };

  const handleDisconnect = () => {
    if (!integration) return;

    if (confirm(t('integrations.disconnectConfirm'))) {
      onDisconnect(integration.name);
      onOpenChange(false);
      toast.success(t('integrations.disconnected'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('integrations.settings')} - {integration?.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">{t('integrations.apiKey')}</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.apiKey}
                onChange={(e) =>
                  setFormData({ ...formData, apiKey: e.target.value })
                }
                placeholder={t('integrations.leaveBlankToKeep')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiSecret">{t('integrations.apiSecret')}</Label>
              <Input
                id="apiSecret"
                type="password"
                value={formData.apiSecret}
                onChange={(e) =>
                  setFormData({ ...formData, apiSecret: e.target.value })
                }
                placeholder={t('integrations.leaveBlankToKeep')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoSync">{t('integrations.autoSync')}</Label>
                <p className="text-xs text-muted-foreground">
                  {t('integrations.autoSyncDescription')}
                </p>
              </div>
              <Switch
                id="autoSync"
                checked={formData.autoSync}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, autoSync: checked })
                }
              />
            </div>

            <Separator />

            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2 text-destructive">
                {t('integrations.dangerZone')}
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                {t('integrations.disconnectWarning')}
              </p>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleDisconnect}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {t('integrations.disconnect')}
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
