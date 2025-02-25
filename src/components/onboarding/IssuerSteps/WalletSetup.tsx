import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function WalletSetup({ onBack, onNext }) {
  const blockchains = [
    { value: "ethereum", label: "Ethereum" },
    { value: "polygon", label: "Polygon" },
    { value: "avalanche", label: "Avalanche" },
  ];

  const roles = [
    {
      id: "issuer",
      title: "Issuer Owner",
      description: "Primary control",
      required: true,
    },
    {
      id: "compliance",
      title: "Compliance Agent",
      description: "Oversight role",
      required: true,
    },
    {
      id: "agent",
      title: "Transaction Agent",
      description: "Transaction approval",
      required: true,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">
          SPV Wallet & Smart Contract Setup
        </h3>
        <div className="space-y-6">
          {/* Blockchain Selection */}
          <div className="space-y-2">
            <Label>Select Blockchain</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose blockchain network" />
              </SelectTrigger>
              <SelectContent>
                {blockchains.map((chain) => (
                  <SelectItem key={chain.value} value={chain.value}>
                    {chain.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Wallet Roles</Label>
              <Button variant="outline" size="sm">
                Generate Addresses
              </Button>
            </div>

            <div className="space-y-3">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between p-3 bg-background rounded-lg border"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{role.title}</p>
                      {role.required && (
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="approver">Approver</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Addresses Panel */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
            <h4 className="font-medium">Generated Addresses</h4>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{role.title}</span>
                  <code className="font-mono bg-background px-2 py-1 rounded">
                    Pending generation...
                  </code>
                </div>
              ))}
            </div>
          </div>
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
