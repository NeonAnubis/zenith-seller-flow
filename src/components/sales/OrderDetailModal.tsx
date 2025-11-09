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
import { ShoppingCart, User, Calendar, DollarSign, Hash, Package, Truck, Percent } from "lucide-react";

interface Order {
  id: string;
  date: string;
  customer: string;
  marketplace: string;
  items: number;
  subtotal: number;
  shipping: number;
  commission: number;
  profit: number;
  status: string;
}

interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailModal({ order, open, onOpenChange }: OrderDetailModalProps) {
  const { t } = useTranslation();

  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'entregue':
        return "bg-success/10 text-success";
      case 'shipped':
      case 'enviado':
        return "bg-primary/10 text-primary";
      case 'pending':
      case 'pendente':
        return "bg-muted text-muted-foreground";
      case 'processing':
      case 'processando':
        return "bg-warning/10 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: t('sales.pending'),
      processing: t('dashboard.processing'),
      shipped: t('sales.shipped'),
      delivered: t('sales.delivered'),
    };
    return statusMap[status] || status;
  };

  const totalAmount = order.subtotal + order.shipping;
  const profitMargin = totalAmount > 0 ? (order.profit / totalAmount) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <ShoppingCart className="h-6 w-6 text-primary" />
            {t('sales.orderDetails')}
          </DialogTitle>
          <DialogDescription>
            {t('sales.detailedOrderInformation')} {order.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Section */}
          <div className="bg-muted/30 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Hash className="h-4 w-4" />
                  {t('dashboard.orderId')}
                </div>
                <p className="text-lg font-bold">{order.id}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  {t('common.status')}
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusLabel(order.status)}
                </Badge>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  {t('common.date')}
                </div>
                <p className="font-medium">{order.date}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Truck className="h-4 w-4" />
                  {t('sales.marketplace')}
                </div>
                <p className="font-medium">{order.marketplace}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {t('sales.customerInfo')}
            </h3>
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('common.customer')}</p>
                  <p className="font-medium">{order.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('sales.items')}</p>
                  <p className="font-medium">{order.items} {t('sales.itemsUnit')}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              {t('sales.financialBreakdown')}
            </h3>
            <div className="bg-muted/20 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('sales.subtotal')}</span>
                <span className="font-medium">
                  R$ {order.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('sales.shipping')}</span>
                <span className="font-medium">
                  R$ {order.shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>{t('sales.totalAmount')}</span>
                <span className="text-primary">
                  R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Costs and Profit */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Percent className="h-5 w-5 text-primary" />
              {t('sales.costsAndProfit')}
            </h3>
            <div className="bg-muted/20 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('sales.commission')}</span>
                <span className="text-destructive font-medium">
                  - R$ {order.commission.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">{t('sales.netProfit')}</span>
                <span className="text-success font-bold">
                  R$ {order.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('sales.profitMargin')}</span>
                <span className="text-sm font-medium text-success">
                  {profitMargin.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('sales.orderTimeline')}</h3>
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${order.status === 'pending' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-success' : 'bg-muted'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t('sales.orderPlaced')}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-success' : 'bg-muted'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t('dashboard.processing')}</p>
                    <p className="text-xs text-muted-foreground">{order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? t('sales.completed') : t('sales.waitingStatus')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-success' : 'bg-muted'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t('sales.shipped')}</p>
                    <p className="text-xs text-muted-foreground">{order.status === 'shipped' || order.status === 'delivered' ? t('sales.completed') : t('sales.waitingStatus')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${order.status === 'delivered' ? 'bg-success' : 'bg-muted'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t('sales.delivered')}</p>
                    <p className="text-xs text-muted-foreground">{order.status === 'delivered' ? t('sales.completed') : t('sales.waitingStatus')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
