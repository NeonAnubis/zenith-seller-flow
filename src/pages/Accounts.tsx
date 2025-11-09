import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

export default function Accounts() {
  const { t } = useTranslation();

  const accounts = [
    { id: 1, marketplace: t('sales.mercadoLivre'), accountName: "TechStore Principal", status: "active", orders: 456, revenue: 125340.50, lastSync: "2 min ago" },
    { id: 2, marketplace: t('sales.mercadoLivre'), accountName: "TechStore Outlet", status: "active", orders: 234, revenue: 67890.30, lastSync: "5 min ago" },
    { id: 3, marketplace: t('sales.shopee'), accountName: "TechStore Official", status: "active", orders: 189, revenue: 45230.80, lastSync: "1 min ago" },
    { id: 4, marketplace: t('sales.amazon'), accountName: "TechStore BR", status: "active", orders: 134, revenue: 89456.20, lastSync: "3 min ago" },
    { id: 5, marketplace: t('ads.magalu'), accountName: "TechStore Marketplace", status: "warning", orders: 67, revenue: 23450.70, lastSync: "45 min ago" },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title={t('accounts.title')}
        description={t('accounts.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-soft">
            <p className="text-sm text-muted-foreground mb-2">{t('accounts.connectedAccounts')}</p>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-success mt-1">4 {t('accounts.marketplaces')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <p className="text-sm text-muted-foreground mb-2">{t('accounts.totalOrders')}</p>
            <p className="text-2xl font-bold">1,080</p>
            <p className="text-xs text-muted-foreground mt-1">{t('accounts.last30Days')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <p className="text-sm text-muted-foreground mb-2">{t('accounts.combinedRevenue')}</p>
            <p className="text-2xl font-bold">R$ 351.4K</p>
            <p className="text-xs text-success mt-1">+15.3% {t('accounts.vsLastMonth')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <p className="text-sm text-muted-foreground mb-2">{t('accounts.syncStatus')}</p>
            <p className="text-2xl font-bold text-success">{t('common.active')}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('accounts.allAccountsSynced')}</p>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('accounts.addAccount')}
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('accounts.syncAll')}
          </Button>
        </div>

        {/* Accounts List */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">{t('accounts.connectedAccounts')}</h3>
          <div className="space-y-4">
            {accounts.map((account) => (
              <Card key={account.id} className="p-4 border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{account.accountName}</h4>
                      <Badge variant="outline">{account.marketplace}</Badge>
                      {account.status === "active" ? (
                        <Badge className="bg-success/10 text-success flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {t('common.active')}
                        </Badge>
                      ) : (
                        <Badge className="bg-warning/10 text-warning flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {t('accounts.syncIssue')}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t('reports.orders')}:</span>
                        <span className="font-medium ml-2">{account.orders}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('profit.revenue')}:</span>
                        <span className="font-medium ml-2">R$ {account.revenue.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('accounts.lastSync')}:</span>
                        <span className="font-medium ml-2">{account.lastSync}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      {t('accounts.sync')}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Info */}
        <Card className="p-6 shadow-soft mt-6 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2">{t('accounts.unifiedManagement')}</h4>
          <p className="text-sm text-muted-foreground">
            {t('accounts.unifiedDescription')}
          </p>
        </Card>
      </div>
    </div>
  );
}
