import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, CheckCircle, Clock, AlertCircle } from "lucide-react";

export interface Invoice {
  id: string;
  type: string;
  customer: string;
  value: string;
  status: string;
  date: string;
  taxId: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
  onView: (invoice: Invoice) => void;
  onDownload: (invoice: Invoice) => void;
}

export function InvoiceTable({ invoices, onView, onDownload }: InvoiceTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "issued":
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "processing":
        return <Clock className="h-4 w-4 text-warning" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      issued: "bg-success/10 text-success",
      completed: "bg-success/10 text-success",
      processing: "bg-warning/10 text-warning",
      error: "bg-destructive/10 text-destructive",
    };
    return variants[status] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice ID</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Customer</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Tax ID</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Date</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-border hover:bg-muted/30 transition-colors">
              <td className="py-3 px-4 font-medium text-sm">{invoice.id}</td>
              <td className="py-3 px-4">
                <Badge variant="outline" className="text-xs">{invoice.type}</Badge>
              </td>
              <td className="py-3 px-4 hidden md:table-cell">{invoice.customer}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground hidden lg:table-cell">{invoice.taxId}</td>
              <td className="py-3 px-4 font-medium text-sm">{invoice.value}</td>
              <td className="py-3 px-4 text-sm hidden sm:table-cell">{invoice.date}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(invoice.status)}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onView(invoice)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDownload(invoice)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
