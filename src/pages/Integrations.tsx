import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Settings, Zap } from "lucide-react";

export default function Integrations() {
  const { t } = useTranslation();

  const marketplaces = [
    { name: t('sales.mercadoLivre'), status: "connected", orders: 456, lastSync: "2 min ago", logo: "🟡" },
    { name: t('sales.shopee'), status: "connected", orders: 189, lastSync: "5 min ago", logo: "🟠" },
    { name: t('sales.amazon'), status: "connected", orders: 134, lastSync: "3 min ago", logo: "🟦" },
    { name: t('ads.magalu'), status: "connected", orders: 67, lastSync: "10 min ago", logo: "🔵" },
    { name: "Americanas", status: "disconnected", orders: 0, lastSync: t('integrations.never'), logo: "🔴" },
  ];

  const logistics = [
    { name: "Correios", status: "connected", shipments: 234, logo: "📦" },
    { name: "Jadlog", status: "connected", shipments: 123, logo: "📦" },
    { name: "Total Express", status: "connected", shipments: 89, logo: "📦" },
    { name: "Loggi", status: "disconnected", shipments: 0, logo: "📦" },
  ];

  const payments = [
    { name: "Mercado Pago", status: "connected", logo: "💳" },
    { name: "PagSeguro", status: "connected", logo: "💳" },
    { name: "PayPal", status: "disconnected", logo: "💳" },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title={t('integrations.title')}
        description={t('integrations.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container mx-auto px-6 py-8">
        {/* Marketplace Integrations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('integrations.marketplaces')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaces.map((marketplace) => (
              <Card key={marketplace.name} className="p-6 shadow-soft">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{marketplace.logo}</div>
                    <div>
                      <h3 className="font-semibold">{marketplace.name}</h3>
                      {marketplace.status === "connected" && (
                        <p className="text-xs text-muted-foreground">{marketplace.orders} {t('integrations.ordersSynced')}</p>
                      )}
                    </div>
                  </div>
                  {marketplace.status === "connected" ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('common.status')}:</span>
                    <Badge className={marketplace.status === "connected" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                      {marketplace.status === "connected" ? t('integrations.connected') : t('integrations.disconnected')}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('integrations.lastSync')}:</span>
                    <span className="font-medium">{marketplace.lastSync}</span>
                  </div>
                </div>
                {marketplace.status === "connected" ? (
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    {t('common.configure')}
                  </Button>
                ) : (
                  <Button size="sm" className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    {t('common.connect')}
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Logistics Integrations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('integrations.logisticsCarriers')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {logistics.map((carrier) => (
              <Card key={carrier.name} className="p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{carrier.logo}</span>
                    <h3 className="font-semibold text-sm">{carrier.name}</h3>
                  </div>
                  {carrier.status === "connected" ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                {carrier.status === "connected" && (
                  <p className="text-xs text-muted-foreground mb-3">{carrier.shipments} {t('integrations.shipments')}</p>
                )}
                <Badge className={carrier.status === "connected" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                  {carrier.status === "connected" ? t('integrations.connected') : t('integrations.disconnected')}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Integrations */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('integrations.paymentGateways')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {payments.map((payment) => (
              <Card key={payment.name} className="p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{payment.logo}</span>
                    <h3 className="font-semibold">{payment.name}</h3>
                  </div>
                  {payment.status === "connected" ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <Badge className={payment.status === "connected" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                  {payment.status === "connected" ? t('integrations.connected') : t('integrations.disconnected')}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Info */}
        <Card className="p-6 shadow-soft mt-8 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2">{t('integrations.automaticSync')}</h4>
          <p className="text-sm text-muted-foreground">
            {t('integrations.automaticSyncDescription')}
          </p>
        </Card>
      </div>
    </div>
  );
}
