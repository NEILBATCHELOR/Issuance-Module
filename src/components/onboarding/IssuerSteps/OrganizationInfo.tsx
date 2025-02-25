import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function OrganizationInfo({ onBack, onNext }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spv">Special Purpose Vehicle (SPV)</SelectItem>
              <SelectItem value="fund">Investment Fund</SelectItem>
              <SelectItem value="am">Asset Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Required Documents</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="text-green-500" />
                <div>
                  <span className="font-medium">Commercial Register Extract</span>
                  <p className="text-sm text-muted-foreground">Certificate of incorporation/formation</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Upload</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-destructive" />
                <div>
                  <span className="font-medium">Memorandum & Articles</span>
                  <p className="text-sm text-muted-foreground">Articles of association</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Upload</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-destructive" />
                <div>
                  <span className="font-medium">Regulatory Status</span>
                  <p className="text-sm text-muted-foreground">License and regulatory documentation</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Upload</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-destructive" />
                <div>
                  <span className="font-medium">List of Directors</span>
                  <p className="text-sm text-muted-foreground">Passport copies + proof of address</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Upload</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-destructive" />
                <div>
                  <span className="font-medium">Shareholder Register</span>
                  <p className="text-sm text-muted-foreground">Including documents for >10% ownership</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Upload</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-destructive" />
                <div>
                  <span className="font-medium">Financial Statements</span>
                  <p className="text-sm text-muted-foreground">Latest audited financial statements</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Upload</Button>
            </div>
          </div>
        </Card>
      </div>

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
