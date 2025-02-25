import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function InvestorProfile({ onBack, onNext }) {
  const accreditationTypes = [
    {
      value: "hnw",
      label: "High-Net-Worth",
      description: "Net worth exceeding $1M or annual income over $200K",
      recommended: true,
    },
    {
      value: "institutional",
      label: "Institutional",
      description: "Banks, investment companies, insurance companies",
      recommended: false,
    },
    {
      value: "regulated",
      label: "Regulated Fund",
      description: "Licensed and regulated investment funds",
      recommended: false,
    },
    {
      value: "retail",
      label: "Retail",
      description: "Individual non-accredited investor",
      recommended: false,
    },
  ];

  const experienceLevels = [
    {
      value: "low",
      label: "Low",
      description: "Limited investment experience",
    },
    {
      value: "medium",
      label: "Medium",
      description: "Some investment experience",
    },
    {
      value: "high",
      label: "High",
      description: "Extensive investment experience",
    },
  ];
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Investor Qualification</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Accreditation Type</Label>
            <RadioGroup defaultValue="hnw" className="space-y-3">
              {accreditationTypes.map((type) => (
                <div
                  key={type.value}
                  className="flex items-start space-x-3 rounded-lg border p-3"
                >
                  <RadioGroupItem
                    value={type.value}
                    id={type.value}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={type.value} className="font-medium">
                        {type.label}
                      </Label>
                      {type.recommended && (
                        <Badge variant="secondary">Recommended</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Investment Experience</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label} - {level.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxResidency">Tax Residency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tax residency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="sg">Singapore</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium">Pre-check Eligibility</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle2 className="text-green-500 h-4 w-4" />
                <span>Jurisdiction verification complete</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle2 className="text-green-500 h-4 w-4" />
                <span>Investment limits validated</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle2 className="text-green-500 h-4 w-4" />
                <span>Risk profile assessment passed</span>
              </div>
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
