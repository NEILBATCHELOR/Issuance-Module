import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, Clock, ShieldCheck } from "lucide-react";

type WalletStatus = "active" | "pending" | "blocked" | "compliant";

interface WalletInfo {
  address: string;
  status: WalletStatus;
  complianceScore: number;
  lastChecked?: string;
  restrictions?: string[];
}

interface WalletStatusProps {
  wallet: WalletInfo;
}

export function WalletStatus({ wallet }: WalletStatusProps) {
  const getStatusIcon = (status: WalletStatus) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="text-green-500" />;
      case "pending":
        return <Clock className="text-yellow-500" />;
      case "blocked":
        return <AlertCircle className="text-destructive" />;
      case "compliant":
        return <ShieldCheck className="text-blue-500" />;
    }
  };

  const getStatusBadge = (status: WalletStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-500">
            Active
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "blocked":
        return <Badge variant="destructive">Blocked</Badge>;
      case "compliant":
        return (
          <Badge className="bg-blue-500/10 text-blue-500">Compliant</Badge>
        );
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">Wallet Status</h3>
            <p className="text-sm font-mono">{wallet.address}</p>
          </div>
          {getStatusBadge(wallet.status)}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Compliance Score</span>
            <span className="font-medium">{wallet.complianceScore}%</span>
          </div>
          <Progress value={wallet.complianceScore} className="h-2" />
        </div>

        {wallet.lastChecked && (
          <p className="text-sm text-muted-foreground">
            Last checked: {wallet.lastChecked}
          </p>
        )}

        {wallet.restrictions && wallet.restrictions.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Active Restrictions</p>
            <div className="space-y-1">
              {wallet.restrictions.map((restriction, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm text-muted-foreground"
                >
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span>{restriction}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
