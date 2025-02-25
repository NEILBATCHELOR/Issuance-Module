import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wallet, Shield, ArrowRight } from "lucide-react";
import { WalletStatus } from "../shared/WalletStatus";

export default function WalletSetup({ onBack, onNext }) {
  const walletStatus = {
    address: "0x1234...5678",
    status: "pending",
    complianceScore: 85,
    lastChecked: "2024-03-21 14:30 UTC",
    restrictions: [
      "Pending Guardian compliance verification",
      "Awaiting multi-sig setup",
    ],
  };
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Guardian Wallet Setup</h3>
        <div className="space-y-6">
          <RadioGroup defaultValue="new" className="space-y-4">
            <div className="flex items-start space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="new" id="new" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <Label htmlFor="new" className="font-medium">
                    Create Guardian Wallet
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Secure, managed wallet with built-in compliance
                </p>
                <div className="mt-3 space-y-2 bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center text-sm">
                    <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Automated compliance checks</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Built-in recovery options</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Institutional-grade security</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="connect" id="connect" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  <Label htmlFor="connect" className="font-medium">
                    Connect Existing Wallet
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Use your own wallet for investments
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    MetaMask
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Ledger
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    WalletConnect
                  </Button>
                </div>
              </div>
            </div>
          </RadioGroup>

          <WalletStatus wallet={walletStatus} />
        </div>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button onClick={onNext} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
}
