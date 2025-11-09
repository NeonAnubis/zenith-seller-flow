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
import { toast } from "sonner";

type EntityType = "product" | "customer" | "supplier" | "vendor";

export interface RegistrationProduct {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
}

export interface RegistrationCustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
}

export interface RegistrationSupplier {
  id: number;
  name: string;
  cnpj: string;
  contact: string;
  products: number;
}

export interface RegistrationVendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  commission: string;
}

type Entity = RegistrationProduct | RegistrationCustomer | RegistrationSupplier | RegistrationVendor;

interface RegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: EntityType;
  entity: Entity | null;
  onSave: (data: any) => void;
}

export function RegistrationModal({
  open,
  onOpenChange,
  type,
  entity,
  onSave,
}: RegistrationModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (entity) {
      setFormData(entity);
    } else {
      // Initialize empty form based on type
      switch (type) {
        case "product":
          setFormData({ name: "", sku: "", category: "", price: "", cost: "" });
          break;
        case "customer":
          setFormData({ name: "", email: "", phone: "", orders: 0 });
          break;
        case "supplier":
          setFormData({ name: "", cnpj: "", contact: "", products: 0 });
          break;
        case "vendor":
          setFormData({ name: "", email: "", phone: "", commission: "" });
          break;
      }
    }
  }, [entity, type, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (type === "product" && (!formData.name || !formData.sku || !formData.price || !formData.cost)) {
      toast.error(t('registrations.requiredFields'));
      return;
    }
    if (type === "customer" && (!formData.name || !formData.email || !formData.phone)) {
      toast.error(t('registrations.requiredFields'));
      return;
    }
    if (type === "supplier" && (!formData.name || !formData.cnpj || !formData.contact)) {
      toast.error(t('registrations.requiredFields'));
      return;
    }
    if (type === "vendor" && (!formData.name || !formData.email || !formData.phone)) {
      toast.error(t('registrations.requiredFields'));
      return;
    }

    onSave(formData);
  };

  const renderFields = () => {
    switch (type) {
      case "product":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">{t('registrations.productName')} *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">{t('registrations.sku')} *</Label>
              <Input
                id="sku"
                value={formData.sku || ""}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">{t('registrations.category')}</Label>
              <Input
                id="category"
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">{t('registrations.price')} (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">{t('registrations.cost')} (R$) *</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={formData.cost || ""}
                onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
              />
            </div>
          </>
        );

      case "customer":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">{t('registrations.name')} *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('registrations.email')} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t('registrations.phone')} *</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 98765-4321"
              />
            </div>
          </>
        );

      case "supplier":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">{t('registrations.company')} *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">{t('registrations.cnpj')} *</Label>
              <Input
                id="cnpj"
                value={formData.cnpj || ""}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                placeholder="12.345.678/0001-90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">{t('registrations.contact')} *</Label>
              <Input
                id="contact"
                type="email"
                value={formData.contact || ""}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>
          </>
        );

      case "vendor":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">{t('registrations.name')} *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('registrations.email')} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t('registrations.phone')} *</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 98765-4321"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commission">{t('registrations.commission')} (%)</Label>
              <Input
                id="commission"
                value={formData.commission || ""}
                onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                placeholder="10%"
              />
            </div>
          </>
        );
    }
  };

  const getTitle = () => {
    const action = entity ? t('common.edit') : t('common.add');
    switch (type) {
      case "product":
        return `${action} ${t('registrations.product')}`;
      case "customer":
        return `${action} ${t('registrations.customer')}`;
      case "supplier":
        return `${action} ${t('registrations.supplier')}`;
      case "vendor":
        return `${action} ${t('registrations.vendor')}`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-4">
            {renderFields()}
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
