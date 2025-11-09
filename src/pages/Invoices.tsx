import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle, Clock, XCircle } from "lucide-react";

export default function Invoices() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-white mb-2">Invoices</h1>
            <p className="text-white/90 text-lg">Automatic NF-e, NFC-e, and NFS-e generation</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <p className="text-sm text-muted-foreground">Issued</p>
            </div>
            <p className="text-2xl font-bold">1,089</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-warning" />
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <p className="text-2xl font-bold">23</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
            <p className="text-2xl font-bold">5</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <p className="text-2xl font-bold">1,117</p>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Invoices</h3>
            <div className="flex gap-2">
              <select className="px-4 py-2 rounded-lg border border-input bg-background text-sm">
                <option>All Types</option>
                <option>NF-e</option>
                <option>NFC-e</option>
                <option>NFS-e</option>
              </select>
              <select className="px-4 py-2 rounded-lg border border-input bg-background text-sm">
                <option>All Status</option>
                <option>Issued</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice #</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { invoice: "NFE-2025-001234", type: "NF-e", order: "#ORD-1234", date: "2025-01-08", customer: "João Silva", amount: "R$ 299.90", status: "Issued" },
                  { invoice: "NFCE-2025-005678", type: "NFC-e", order: "#ORD-1235", date: "2025-01-08", customer: "Maria Santos", amount: "R$ 459.50", status: "Pending" },
                  { invoice: "NFE-2025-001233", type: "NF-e", order: "#ORD-1236", date: "2025-01-07", customer: "Pedro Costa", amount: "R$ 199.00", status: "Issued" },
                  { invoice: "NFSE-2025-000123", type: "NFS-e", order: "#ORD-1237", date: "2025-01-07", customer: "Ana Oliveira", amount: "R$ 349.90", status: "Failed" },
                  { invoice: "NFE-2025-001232", type: "NF-e", order: "#ORD-1238", date: "2025-01-06", customer: "Carlos Lima", amount: "R$ 549.90", status: "Issued" },
                ].map((invoice) => (
                  <tr key={invoice.invoice} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{invoice.invoice}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {invoice.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{invoice.order}</td>
                    <td className="py-3 px-4 text-sm">{invoice.date}</td>
                    <td className="py-3 px-4">{invoice.customer}</td>
                    <td className="py-3 px-4 font-medium">{invoice.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status === "Issued" ? "bg-success/10 text-success" :
                        invoice.status === "Pending" ? "bg-warning/10 text-warning" :
                        "bg-destructive/10 text-destructive"
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
