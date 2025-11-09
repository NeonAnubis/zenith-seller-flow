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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export interface InventoryItem {
  sku: string;
  product: string;
  stock: number;
  reserved: number;
  available: number;
  minStock: number;
  location: string;
  status: string;
}

interface InventoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
  onSave: (item: Omit<InventoryItem, "available" | "status">) => void;
}

export function InventoryModal({
  open,
  onOpenChange,
  item,
  onSave,
}: InventoryModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    sku: "",
    product: "",
    stock: "",
    reserved: "",
    minStock: "",
    location: t('inventory.warehouseA'),
  });

  useEffect(() => {
    if (item) {
      setFormData({
        sku: item.sku,
        product: item.product,
        stock: item.stock.toString(),
        reserved: item.reserved.toString(),
        minStock: item.minStock.toString(),
        location: item.location,
      });
    } else {
      setFormData({
        sku: "",
        product: "",
        stock: "",
        reserved: "",
        minStock: "",
        location: t('inventory.warehouseA'),
      });
    }
  }, [item, open, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.sku || !formData.product || !formData.stock || !formData.minStock) {
      toast.error(t('inventory.requiredFields'));
      return;
    }

    const stock = parseInt(formData.stock);
    const reserved = parseInt(formData.reserved || "0");
    const minStock = parseInt(formData.minStock);
    const available = stock - reserved;

    onSave({
      sku: formData.sku,
      product: formData.product,
      stock,
      reserved,
      available,
      minStock,
      location: formData.location,
    });

    setFormData({
      sku: "",
      product: "",
      stock: "",
      reserved: "",
      minStock: "",
      location: t('inventory.warehouseA'),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {item ? t('inventory.editProduct') : t('inventory.addProduct')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sku">{t('ads.sku')} *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                placeholder={t('inventory.enterSku')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">{t('ads.product')} *</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) =>
                  setFormData({ ...formData, product: e.target.value })
                }
                placeholder={t('inventory.enterProductName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">{t('common.stock')} *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reserved">{t('inventory.reserved')}</Label>
              <Input
                id="reserved"
                type="number"
                min="0"
                value={formData.reserved}
                onChange={(e) =>
                  setFormData({ ...formData, reserved: e.target.value })
                }
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minStock">{t('inventory.minStock')} *</Label>
              <Input
                id="minStock"
                type="number"
                min="0"
                value={formData.minStock}
                onChange={(e) =>
                  setFormData({ ...formData, minStock: e.target.value })
                }
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">{t('inventory.location')}</Label>
              <Select
                value={formData.location}
                onValueChange={(value) =>
                  setFormData({ ...formData, location: value })
                }
              >
                <SelectTrigger id="location">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={t('inventory.warehouseA')}>
                    {t('inventory.warehouseA')}
                  </SelectItem>
                  <SelectItem value={t('inventory.warehouseB')}>
                    {t('inventory.warehouseB')}
                  </SelectItem>
                </SelectContent>
              </Select>
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
