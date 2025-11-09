import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Zap, FileText, Package, ShoppingCart, DollarSign, Bell } from "lucide-react";

export default function Automation() {
  const { t } = useTranslation();

  const automationRules = [
    {
      id: 1,
      name: t('automation.autoInvoiceGeneration'),
      description: t('automation.autoInvoiceDescription'),
      category: t('automation.invoices'),
      enabled: true,
      icon: FileText,
      executions: 1234,
    },
    {
      id: 2,
      name: t('automation.inventorySync'),
      description: t('automation.inventorySyncDescription'),
      category: t('automation.inventory'),
      enabled: true,
      icon: Package,
      executions: 5678,
    },
    {
      id: 3,
      name: t('automation.orderStatusUpdates'),
      description: t('automation.orderStatusDescription'),
      category: t('automation.orders'),
      enabled: true,
      icon: ShoppingCart,
      executions: 2345,
    },
    {
      id: 4,
      name: t('automation.priceAdjustments'),
      description: t('automation.priceAdjustmentsDescription'),
      category: t('automation.pricing'),
      enabled: false,
      icon: DollarSign,
      executions: 0,
    },
    {
      id: 5,
      name: t('automation.lowStockAlerts'),
      description: t('automation.lowStockAlertsDescription'),
      category: t('automation.alerts'),
      enabled: true,
      icon: Bell,
      executions: 456,
    },
  ];

  const channelRules = [
    { channel: t('sales.mercadoLivre'), autoShipping: true, minPrice: 50.00, promotions: true },
    { channel: t('sales.shopee'), autoShipping: true, minPrice: 30.00, promotions: false },
    { channel: t('sales.amazon'), autoShipping: true, minPrice: 75.00, promotions: true },
    { channel: t('ads.magalu'), autoShipping: false, minPrice: 40.00, promotions: false },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      [t('automation.invoices')]: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      [t('automation.inventory')]: "bg-green-500/10 text-green-700 dark:text-green-400",
      [t('automation.orders')]: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      [t('automation.pricing')]: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
      [t('automation.alerts')]: "bg-red-500/10 text-red-700 dark:text-red-400",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title={t('automation.title')}
        description={t('automation.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('automation.activeRules')}</span>
              <Zap className="h-5 w-5 text-success" />
            </div>
            <p className="text-2xl font-bold">{automationRules.filter(r => r.enabled).length}</p>
            <p className="text-xs text-muted-foreground mt-1">{automationRules.filter(r => r.enabled).length} {t('automation.ofTotal')} {automationRules.length}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('automation.executionsToday')}</span>
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">9,713</p>
            <p className="text-xs text-success mt-1">+12.3% {t('automation.vsYesterday')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('automation.timeSaved')}</span>
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">48.5h</p>
            <p className="text-xs text-muted-foreground mt-1">{t('automation.thisMonth')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('automation.successRate')}</span>
              <Zap className="h-5 w-5 text-success" />
            </div>
            <p className="text-2xl font-bold text-success">99.8%</p>
            <p className="text-xs text-muted-foreground mt-1">{t('automation.highReliability')}</p>
          </Card>
        </div>

        {/* Automation Rules */}
        <Card className="p-6 shadow-soft mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">{t('automation.automationRules')}</h3>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              {t('automation.createRule')}
            </Button>
          </div>
          <div className="space-y-4">
            {automationRules.map((rule) => (
              <Card key={rule.id} className="p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <rule.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold">{rule.name}</h4>
                        <Badge variant="outline" className={getCategoryColor(rule.category)}>
                          {rule.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {t('automation.executed')} {rule.executions.toLocaleString()} {t('automation.times')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={rule.enabled} />
                    <Button variant="outline" size="sm">{t('common.configure')}</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Channel-specific Rules */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">{t('automation.channelSpecificRules')}</h3>
          <p className="text-sm text-muted-foreground mb-6">
            {t('automation.channelRulesDescription')}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('automation.channel')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('automation.autoShipping')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('automation.minPrice')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('automation.autoPromotions')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {channelRules.map((rule, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{rule.channel}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={rule.autoShipping ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                        {rule.autoShipping ? t('common.enabled') : t('common.disabled')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">R$ {rule.minPrice.toFixed(2)}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={rule.promotions ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                        {rule.promotions ? t('common.yes') : t('common.no')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="outline" size="sm">{t('automation.editRules')}</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Info */}
        <Card className="p-6 shadow-soft mt-6 bg-success/5 border-success/20">
          <h4 className="font-semibold mb-2 text-success">{t('automation.automationBenefits')}</h4>
          <p className="text-sm text-muted-foreground">
            {t('automation.automationDescription')}
          </p>
        </Card>
      </div>
    </div>
  );
}
