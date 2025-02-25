import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ComplianceInfo({ onBack, onNext }) {
  const riskLevels = [
    {
      value: "low",
      label: "Low Risk",
      description: "Standard compliance requirements",
      recommended: true,
    },
    {
      value: "medium",
      label: "Medium Risk",
      description: "Additional documentation needed",
      recommended: false,
    },
    {
      value: "high",
      label: "High Risk",
      description: "Enhanced due diligence required",
      recommended: false,
    },
  ];
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Compliance & Due Diligence</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Risk Classification</Label>
            <RadioGroup defaultValue="low" className="space-y-3">
              {riskLevels.map((level) => (
                <div
                  key={level.value}
                  className="flex items-start space-x-3 rounded-lg border p-3"
                >
                  <RadioGroupItem
                    value={level.value}
                    id={level.value}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={level.value} className="font-medium">
                        {level.label}
                      </Label>
                      {level.recommended && (
                        <Badge variant="secondary">Recommended</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {level.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="uboName">Ultimate Beneficial Owner Name</Label>
            <Input id="uboName" placeholder="Enter UBO name" />
          </div>

          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <p className="text-muted-foreground mb-2">
              Upload AML/KYC Documents
            </p>
            <Button variant="outline">Select Files</Button>
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
