import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";

type RiskLevel = "low" | "medium" | "high";

interface RiskFactor {
  name: string;
  level: RiskLevel;
  description: string;
}

interface RiskClassificationProps {
  overallRisk: RiskLevel;
  factors: RiskFactor[];
}

export function RiskClassification({
  overallRisk,
  factors,
}: RiskClassificationProps) {
  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
    }
  };

  const getRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return <CheckCircle2 className="text-green-500" />;
      case "medium":
        return <AlertTriangle className="text-yellow-500" />;
      case "high":
        return <AlertCircle className="text-red-500" />;
    }
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Low Risk
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            Medium Risk
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            High Risk
          </Badge>
        );
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold">Risk Assessment</h3>
          <p className="text-sm text-muted-foreground">
            Overall risk classification
          </p>
        </div>
        {getRiskBadge(overallRisk)}
      </div>

      <div className="space-y-4">
        {factors.map((factor, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50"
          >
            {getRiskIcon(factor.level)}
            <div>
              <p className="font-medium">{factor.name}</p>
              <p className="text-sm text-muted-foreground">
                {factor.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
