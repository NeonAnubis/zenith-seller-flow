import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Copy, Eye, TrendingUp, AlertTriangle } from "lucide-react";
import { AdFormModal } from "@/components/ads/AdFormModal";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { toast } from "sonner";

export interface Ad {
  id: string;
  title: string;
  sku: string;
  marketplace: string;
  price: number;
  stock: number;
  unitCost: number;
  margin: number;
  status: string;
  views: number;
  sales: number;
}

export default function AdManagement() {
  const { t } = useTranslation();

  const [ads, setAds] = useState<Ad[]>([
    {
      id: "AD-001",
      title: "Smartphone Samsung Galaxy S23",
      sku: "SAMS23-128",
      marketplace: "Mercado Livre",
      price: 2899.90,
      stock: 45,
      unitCost: 2100.00,
      margin: 27.58,
      status: "active",
      views: 1234,
      sales: 45
    },
    {
      id: "AD-002",
      title: "Fone de Ouvido Bluetooth JBL",
      sku: "JBL-BT-500",
      marketplace: "Shopee",
      price: 299.90,
      stock: 120,
      unitCost: 180.00,
      margin: 39.97,
      status: "active",
      views: 856,
      sales: 78
    },
    {
      id: "AD-003",
      title: "Smart TV LG 55\" 4K",
      sku: "LG-55-4K",
      marketplace: "Amazon",
      price: 2499.00,
      stock: 8,
      unitCost: 1850.00,
      margin: 25.97,
      status: "low_stock",
      views: 567,
      sales: 23
    },
    {
      id: "AD-004",
      title: "Notebook Dell Inspiron 15",
      sku: "DELL-I15-512",
      marketplace: "Magazine Luiza",
      price: 3599.00,
      stock: 0,
      unitCost: 2800.00,
      margin: 22.20,
      status: "out_of_stock",
      views: 445,
      sales: 12
    },
    {
      id: "AD-005",
      title: "Mouse Gamer Logitech G502",
      sku: "LOG-G502",
      marketplace: "Mercado Livre",
      price: 289.90,
      stock: 67,
      unitCost: 165.00,
      margin: 43.08,
      status: "active",
      views: 2103,
      sales: 156
    },
  ]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [marketplaceFilter, setMarketplaceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal states
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingAdId, setDeletingAdId] = useState<string | null>(null);

  // Filtered ads
  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      const matchesSearch = searchQuery === "" ||
        ad.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMarketplace = marketplaceFilter === "all" || ad.marketplace === marketplaceFilter;
      const matchesStatus = statusFilter === "all" || ad.status === statusFilter;
      return matchesSearch && matchesMarketplace && matchesStatus;
    });
  }, [ads, searchQuery, marketplaceFilter, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalActive = ads.filter(ad => ad.status === 'active').length;
    const avgMargin = ads.reduce((sum, ad) => sum + ad.margin, 0) / ads.length;
    const lowStockCount = ads.filter(ad => ad.status === 'low_stock').length;
    const totalViews = ads.reduce((sum, ad) => sum + ad.views, 0);
    return { totalActive, avgMargin, lowStockCount, totalViews };
  }, [ads]);

  const marketplaceColors: Record<string, string> = {
    "Mercado Livre": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    "Shopee": "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    "Amazon": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    "Magazine Luiza": "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success">{t('common.active')}</Badge>;
      case "low_stock":
        return <Badge className="bg-warning/10 text-warning">{t('ads.lowStock')}</Badge>;
      case "out_of_stock":
        return <Badge className="bg-destructive/10 text-destructive">{t('ads.outOfStock')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleNewAd = () => {
    setEditingAd(null);
    setIsAdModalOpen(true);
  };

  const handleEditAd = (ad: Ad) => {
    setEditingAd(ad);
    setIsAdModalOpen(true);
  };

  const handleCopyAd = (ad: Ad) => {
    const newAd: Ad = {
      ...ad,
      id: `AD-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      title: `${ad.title} (${t('ads.copy')})`,
      sku: `${ad.sku}-COPY`,
    };
    setAds(prev => [newAd, ...prev]);
    toast.success(t('ads.adCopied'));
  };

  const handleDeleteClick = (adId: string) => {
    setDeletingAdId(adId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingAdId) {
      setAds(prev => prev.filter(ad => ad.id !== deletingAdId));
      toast.success(t('ads.adDeleted'));
      setIsDeleteDialogOpen(false);
      setDeletingAdId(null);
    }
  };

  const handleSaveAd = (adData: Partial<Ad>) => {
    if (editingAd) {
      // Update existing ad
      setAds(prev => prev.map(ad =>
        ad.id === editingAd.id
          ? { ...ad, ...adData }
          : ad
      ));
      toast.success(t('ads.adUpdated'));
    } else {
      // Create new ad
      const newAd: Ad = {
        id: `AD-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
        title: adData.title || "",
        sku: adData.sku || "",
        marketplace: adData.marketplace || "",
        price: adData.price || 0,
        stock: adData.stock || 0,
        unitCost: adData.unitCost || 0,
        margin: adData.margin || 0,
        status: adData.status || "active",
        views: 0,
        sales: 0,
      };
      setAds(prev => [newAd, ...prev]);
      toast.success(t('ads.adCreated'));
    }
    setIsAdModalOpen(false);
    setEditingAd(null);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title={t('ads.title')}
        description={t('ads.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-soft">
            <p className="text-sm text-muted-foreground mb-2">{t('ads.totalActiveAds')}</p>
            <p className="text-2xl font-bold">{stats.totalActive}</p>
            <p className="text-xs text-success mt-1">+12 {t('ads.thisWeek')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <p className="text-sm text-muted-foreground mb-2">{t('ads.averageMargin')}</p>
            <p className="text-2xl font-bold">{stats.avgMargin.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-1">{t('ads.acrossAllAds')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <p className="text-sm text-muted-foreground mb-2">{t('ads.lowStockAlerts')}</p>
            <p className="text-2xl font-bold text-warning">{stats.lowStockCount}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('ads.requiresAttention')}</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <p className="text-sm text-muted-foreground mb-2">{t('ads.totalViews')}</p>
            <p className="text-2xl font-bold">{(stats.totalViews / 1000).toFixed(1)}K</p>
            <p className="text-xs text-success mt-1">+15.3% {t('ads.vsLastWeek')}</p>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="p-6 mb-6 shadow-soft">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 flex-1">
              <Input
                placeholder={t('ads.searchBySku')}
                className="max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select value={marketplaceFilter} onValueChange={setMarketplaceFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('sales.allMarketplaces')}</SelectItem>
                  <SelectItem value="Mercado Livre">{t('sales.mercadoLivre')}</SelectItem>
                  <SelectItem value="Shopee">{t('sales.shopee')}</SelectItem>
                  <SelectItem value="Amazon">{t('sales.amazon')}</SelectItem>
                  <SelectItem value="Magazine Luiza">{t('ads.magalu')}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('sales.allStatus')}</SelectItem>
                  <SelectItem value="active">{t('common.active')}</SelectItem>
                  <SelectItem value="low_stock">{t('ads.lowStock')}</SelectItem>
                  <SelectItem value="out_of_stock">{t('ads.outOfStock')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleNewAd}>{t('ads.newAd')}</Button>
          </div>
        </Card>

        {/* Ads Table */}
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t('ads.activeListings')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('sales.showing')} {filteredAds.length} {t('sales.of')} {ads.length} {t('ads.ads')}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.product')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.sku')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('sales.marketplace')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.price')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.cost')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.margin')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.stock')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('ads.performance')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.status')}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredAds.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-muted-foreground">
                      {t('ads.noAdsFound')}
                    </td>
                  </tr>
                ) : (
                  filteredAds.map((ad) => (
                    <tr key={ad.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{ad.title}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{ad.sku}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={marketplaceColors[ad.marketplace]}>
                          {ad.marketplace}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        R$ {ad.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                        R$ {ad.unitCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-medium ${
                          ad.margin > 35 ? "text-success" :
                          ad.margin > 25 ? "text-primary" :
                          "text-warning"
                        }`}>
                          {ad.margin.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-medium ${
                          ad.stock === 0 ? "text-destructive" :
                          ad.stock < 10 ? "text-warning" :
                          ""
                        }`}>
                          {ad.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="text-xs space-y-1">
                          <div className="flex items-center justify-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{ad.views}</span>
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <TrendingUp className="h-3 w-3 text-success" />
                            <span>{ad.sales} {t('ads.sales')}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getStatusBadge(ad.status)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEditAd(ad)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleCopyAd(ad)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(ad.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Bulk Actions Info */}
        <Card className="p-6 shadow-soft mt-6 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            {t('ads.integratedPriceManagement')}
          </h4>
          <p className="text-sm text-muted-foreground">
            {t('ads.integratedDescription')}
          </p>
        </Card>
      </div>

      {/* Ad Form Modal */}
      <AdFormModal
        open={isAdModalOpen}
        onOpenChange={setIsAdModalOpen}
        ad={editingAd}
        onSave={handleSaveAd}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title={t('ads.deleteAd')}
        description={t('ads.deleteAdConfirmation')}
      />
    </div>
  );
}
