import { useState } from "react";
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
import { toast } from "sonner";

interface IntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integration: {
    name: string;
    type: "marketplace" | "logistics" | "payment";
  } | null;
  onSave: (credentials: { apiKey: string; apiSecret: string }) => void;
}

export function IntegrationModal({
  open,
  onOpenChange,
  integration,
  onSave,
}: IntegrationModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    apiKey: "",
    apiSecret: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.apiKey || !formData.apiSecret) {
      toast.error(t('integrations.requiredFields'));
      return;
    }

    onSave(formData);
    setFormData({ apiKey: "", apiSecret: "" });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFormData({ apiKey: "", apiSecret: "" });
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('integrations.connectTo')} {integration?.name}
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
                placeholder={t('integrations.enterApiKey')}
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
                placeholder={t('integrations.enterApiSecret')}
              />
            </div>

            <div className="bg-muted/20 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                {t('integrations.credentialsInfo')}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.connect')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
