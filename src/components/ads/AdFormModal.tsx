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
import { Ad } from "@/pages/AdManagement";
import { toast } from "sonner";

interface AdFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ad: Ad | null;
  onSave: (adData: Partial<Ad>) => void;
}

export function AdFormModal({ open, onOpenChange, ad, onSave }: AdFormModalProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    title: "",
    sku: "",
    marketplace: "Mercado Livre",
    price: "",
    stock: "",
    unitCost: "",
    status: "active",
  });

  useEffect(() => {
    if (ad) {
      setFormData({
        title: ad.title,
        sku: ad.sku,
        marketplace: ad.marketplace,
        price: ad.price.toString(),
        stock: ad.stock.toString(),
        unitCost: ad.unitCost.toString(),
        status: ad.status,
      });
    } else {
      setFormData({
        title: "",
        sku: "",
        marketplace: "Mercado Livre",
        price: "",
        stock: "",
        unitCost: "",
        status: "active",
      });
    }
  }, [ad, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.sku || !formData.price || !formData.unitCost) {
      toast.error(t('ads.requiredFields'));
      return;
    }

    const price = parseFloat(formData.price);
    const unitCost = parseFloat(formData.unitCost);
    const stock = parseInt(formData.stock) || 0;

    if (isNaN(price) || isNaN(unitCost) || price <= 0 || unitCost <= 0) {
      toast.error(t('ads.invalidPrices'));
      return;
    }

    const margin = ((price - unitCost) / price) * 100;

    // Determine status based on stock
    let status = formData.status;
    if (stock === 0) {
      status = "out_of_stock";
    } else if (stock < 10) {
      status = "low_stock";
    } else {
      status = "active";
    }

    onSave({
      title: formData.title,
      sku: formData.sku,
      marketplace: formData.marketplace,
      price,
      stock,
      unitCost,
      margin,
      status,
    });

    setFormData({
      title: "",
      sku: "",
      marketplace: "Mercado Livre",
      price: "",
      stock: "",
      unitCost: "",
      status: "active",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {ad ? t('ads.editAd') : t('ads.createNewAd')}
          </DialogTitle>
          <DialogDescription>
            {ad ? t('ads.editAdDescription') : t('ads.createNewAdDescription')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Product Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t('ads.productTitle')} *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={t('ads.productTitlePlaceholder')}
              required
            />
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="sku">{t('ads.sku')} *</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder={t('ads.skuPlaceholder')}
              required
            />
          </div>

          {/* Marketplace */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">{t('common.price')} (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            {/* Unit Cost */}
            <div className="space-y-2">
              <Label htmlFor="unitCost">{t('ads.unitCost')} (R$) *</Label>
              <Input
                id="unitCost"
                type="number"
                step="0.01"
                min="0"
                value={formData.unitCost}
                onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock">{t('common.stock')}</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="0"
            />
            <p className="text-xs text-muted-foreground">
              {t('ads.stockAutoStatus')}
            </p>
          </div>

          {/* Margin Calculation Preview */}
          {formData.price && formData.unitCost && (
            <div className="p-4 bg-muted/20 rounded-lg">
              <p className="text-sm font-medium mb-2">{t('ads.marginPreview')}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('ads.calculatedMargin')}:</span>
                <span className={`text-lg font-bold ${
                  ((parseFloat(formData.price) - parseFloat(formData.unitCost)) / parseFloat(formData.price)) * 100 > 35
                    ? "text-success"
                    : ((parseFloat(formData.price) - parseFloat(formData.unitCost)) / parseFloat(formData.price)) * 100 > 25
                    ? "text-primary"
                    : "text-warning"
                }`}>
                  {(((parseFloat(formData.price) - parseFloat(formData.unitCost)) / parseFloat(formData.price)) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {ad ? t('common.save') : t('ads.createAd')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
