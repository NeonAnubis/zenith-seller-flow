import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FileText,
  BarChart3,
  Settings,
  Menu,
  X,
  Receipt,
  TrendingUp,
  Award,
  ChartBar,
  Store,
  Plug,
  Warehouse,
  Users,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { title: t('nav.dashboard'), url: "/", icon: LayoutDashboard },
    { title: t('nav.invoices'), url: "/invoices", icon: Receipt },
    { title: t('nav.sales'), url: "/sales", icon: ShoppingCart },
    { title: t('nav.ads'), url: "/ads", icon: Store },
    { title: t('nav.profit'), url: "/profit", icon: TrendingUp },
    { title: t('nav.bestSellers'), url: "/best-sellers", icon: Award },
    { title: t('nav.reports'), url: "/reports", icon: ChartBar },
    { title: t('nav.accounts'), url: "/accounts", icon: Users },
    { title: t('nav.integrations'), url: "/integrations", icon: Plug },
    { title: t('nav.inventory'), url: "/inventory", icon: Warehouse },
    { title: t('nav.products'), url: "/products", icon: Package },
    { title: t('nav.registrations'), url: "/registrations", icon: FileText },
    { title: t('nav.automation'), url: "/automation", icon: Workflow },
    { title: t('nav.settings'), url: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border flex-shrink-0">
            <h1 className="text-xl font-bold text-sidebar-foreground">Zenith Seller</h1>
            <ThemeToggle />
          </div>
          <nav className="flex-1 overflow-y-auto space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                end={item.url === "/"}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                activeClassName="bg-sidebar-accent font-medium"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{item.title}</span>
              </NavLink>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto w-full lg:w-auto">
        {children}
      </main>
    </div>
  );
}
