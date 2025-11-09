import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Store, Bell, Key, User } from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-r from-muted to-muted/50">
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground text-lg">Configure your account and integrations</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Account Settings */}
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Account Information</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>

          {/* Marketplace Integrations */}
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <Store className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Marketplace Integrations</h3>
            </div>
            <div className="space-y-3">
              {["Mercado Livre", "Shopee", "Amazon", "Magalu"].map((marketplace) => (
                <div key={marketplace} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Store className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{marketplace}</p>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Store className="h-4 w-4 mr-2" />
                Add Marketplace
              </Button>
            </div>
          </Card>

          {/* API Keys */}
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <Key className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">API Keys</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">SEFAZ API Key</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="••••••••••••••••"
                    className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
                  />
                  <Button variant="outline">Update</Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Shipping API Key</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="••••••••••••••••"
                    className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
                  />
                  <Button variant="outline">Update</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Notifications</h3>
            </div>
            <div className="space-y-3">
              {[
                "New orders received",
                "Low stock alerts",
                "Invoice generation completed",
                "Failed transactions",
              ].map((notification) => (
                <div key={notification} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm">{notification}</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
