import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { AddAccountModal, Account } from "@/components/accounts/AddAccountModal";
import { AccountSettingsModal } from "@/components/accounts/AccountSettingsModal";
import { toast } from "sonner";

export default function Accounts() {
  const { t } = useTranslation();

  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, marketplace: "Mercado Livre", accountName: "TechStore Principal", status: "active", orders: 456, revenue: 125340.50, lastSync: "2 min ago" },
    { id: 2, marketplace: "Mercado Livre", accountName: "TechStore Outlet", status: "active", orders: 234, revenue: 67890.30, lastSync: "5 min ago" },
    { id: 3, marketplace: "Shopee", accountName: "TechStore Official", status: "active", orders: 189, revenue: 45230.80, lastSync: "1 min ago" },
    { id: 4, marketplace: "Amazon", accountName: "TechStore BR", status: "active", orders: 134, revenue: 89456.20, lastSync: "3 min ago" },
    { id: 5, marketplace: "Magazine Luiza", accountName: "TechStore Marketplace", status: "warning", orders: 67, revenue: 23450.70, lastSync: "45 min ago" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [syncingIds, setSyncingIds] = useState<Set<number>>(new Set());
  const [syncingAll, setSyncingAll] = useState(false);

  // Calculate stats
  const stats = useMemo(() => {
    const totalAccounts = accounts.length;
    const uniqueMarketplaces = new Set(accounts.map(acc => acc.marketplace)).size;
    const totalOrders = accounts.reduce((sum, acc) => sum + acc.orders, 0);
    const totalRevenue = accounts.reduce((sum, acc) => sum + acc.revenue, 0);
    return { totalAccounts, uniqueMarketplaces, totalOrders, totalRevenue };
  }, [accounts]);

  const handleAddAccount = (accountData: Omit<Account, 'id' | 'orders' | 'revenue' | 'lastSync'>) => {
    const newAccount: Account = {
      ...accountData,
      id: Math.max(0, ...accounts.map(a => a.id)) + 1,
      orders: 0,
      revenue: 0,
      lastSync: "Just now",
    };

    setAccounts(prev => [newAccount, ...prev]);
    setIsAddModalOpen(false);
    toast.success(t('accounts.accountConnected'));
  };

  const handleUpdateAccount = (accountId: number, updates: Partial<Account>) => {
    setAccounts(prev => prev.map(acc =>
      acc.id === accountId ? { ...acc, ...updates } : acc
    ));
  };

  const handleDeleteAccount = (accountId: number) => {
    setAccounts(prev => prev.filter(acc => acc.id !== accountId));
    toast.success(t('accounts.accountDeleted'));
  };

  const handleSync = async (accountId: number) => {
    setSyncingIds(prev => new Set(prev).add(accountId));

    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));

    setAccounts(prev => prev.map(acc =>
      acc.id === accountId
        ? { ...acc, lastSync: "Just now", status: "active" }
        : acc
    ));

    setSyncingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(accountId);
      return newSet;
    });

    toast.success(t('accounts.syncComplete'));
  };

  const handleSyncAll = async () => {
    setSyncingAll(true);

    // Simulate sync all process
    await new Promise(resolve => setTimeout(resolve, 3000));

    setAccounts(prev => prev.map(acc => ({
      ...acc,
      lastSync: "Just now",
      status: "active",
    })));

    setSyncingAll(false);
    toast.success(t('accounts.allAccountsSynced'));
  };

  const handleSettingsClick = (account: Account) => {
    setSelectedAccount(account);
    setIsSettingsModalOpen(true);
  };

  const getMarketplaceLabel = (marketplace: string) => {
    const labels: Record<string, string> = {
      "Mercado Livre": t('sales.mercadoLivre'),
      "Shopee": t('sales.shopee'),
      "Amazon": t('sales.amazon'),
      "Magazine Luiza": t('ads.magalu'),
    };
    return labels[marketplace] || marketplace;
  };

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
            <p className="text-2xl font-bold">{stats.totalAccounts}</p>
            <p className="text-xs text-success mt-1">{stats.uniqueMarketplaces} {t('accounts.marketplaces')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <p className="text-sm text-muted-foreground mb-2">{t('accounts.totalOrders')}</p>
            <p className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('accounts.last30Days')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <p className="text-sm text-muted-foreground mb-2">{t('accounts.combinedRevenue')}</p>
            <p className="text-2xl font-bold">
              R$ {(stats.totalRevenue / 1000).toFixed(1)}K
            </p>
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
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t('accounts.addAccount')}
          </Button>
          <Button
            variant="outline"
            onClick={handleSyncAll}
            disabled={syncingAll}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${syncingAll ? 'animate-spin' : ''}`} />
            {t('accounts.syncAll')}
          </Button>
        </div>

        {/* Accounts List */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">{t('accounts.connectedAccounts')}</h3>
          {accounts.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">{t('accounts.noAccountsYet')}</p>
              <p className="text-sm text-muted-foreground mt-1">{t('accounts.addFirstAccount')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {accounts.map((account) => (
                <Card key={account.id} className="p-4 border border-border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{account.accountName}</h4>
                        <Badge variant="outline">{getMarketplaceLabel(account.marketplace)}</Badge>
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
                          <span className="font-medium ml-2">
                            R$ {account.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{t('accounts.lastSync')}:</span>
                          <span className="font-medium ml-2">{account.lastSync}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSync(account.id)}
                        disabled={syncingIds.has(account.id)}
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${syncingIds.has(account.id) ? 'animate-spin' : ''}`} />
                        {t('accounts.sync')}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSettingsClick(account)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* Info */}
        <Card className="p-6 shadow-soft mt-6 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2">{t('accounts.unifiedManagement')}</h4>
          <p className="text-sm text-muted-foreground">
            {t('accounts.unifiedDescription')}
          </p>
        </Card>
      </div>

      {/* Add Account Modal */}
      <AddAccountModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSave={handleAddAccount}
      />

      {/* Account Settings Modal */}
      <AccountSettingsModal
        open={isSettingsModalOpen}
        onOpenChange={setIsSettingsModalOpen}
        account={selectedAccount}
        onUpdate={handleUpdateAccount}
        onDelete={handleDeleteAccount}
      />
    </div>
  );
}
