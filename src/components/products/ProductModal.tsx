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

export interface Product {
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  sales: number;
  profit: number;
}

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (product: Omit<Product, "sales" | "profit">) => void;
}

export function ProductModal({
  open,
  onOpenChange,
  product,
  onSave,
}: ProductModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Electronics",
    price: "",
    cost: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price.toString(),
        cost: product.cost.toString(),
        stock: product.stock.toString(),
      });
    } else {
      setFormData({
        name: "",
        sku: "",
        category: "Electronics",
        price: "",
        cost: "",
        stock: "",
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.sku || !formData.price || !formData.cost || !formData.stock) {
      toast.error(t('products.requiredFields'));
      return;
    }

    const price = parseFloat(formData.price);
    const cost = parseFloat(formData.cost);
    const stock = parseInt(formData.stock);

    onSave({
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price,
      cost,
      stock,
    });

    setFormData({
      name: "",
      sku: "",
      category: "Electronics",
      price: "",
      cost: "",
      stock: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {product ? t('products.editProduct') : t('products.addProduct')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('products.productName')} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t('products.enterProductName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">{t('ads.sku')} *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                placeholder={t('products.enterSku')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t('products.category')}</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">{t('products.electronics')}</SelectItem>
                  <SelectItem value="Fashion">{t('products.fashion')}</SelectItem>
                  <SelectItem value="Home & Garden">{t('products.homeGarden')}</SelectItem>
                  <SelectItem value="Sports">{t('products.sports')}</SelectItem>
                  <SelectItem value="Books">{t('products.books')}</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="price">{t('common.price')} (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">{t('products.cost')} (R$) *</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                min="0"
                value={formData.cost}
                onChange={(e) =>
                  setFormData({ ...formData, cost: e.target.value })
                }
                placeholder="0.00"
              />
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
