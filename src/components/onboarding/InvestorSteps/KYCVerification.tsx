import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Upload, CheckCircle2, Clock } from "lucide-react";

export default function KYCVerification({ onBack, onNext }) {
  const documents = [
    {
      title: "Government-Issued ID",
      description: "Passport or National ID",
      status: "completed",
      progress: 100,
    },
    {
      title: "Proof of Address",
      description: "Utility Bill or Bank Statement",
      status: "pending",
      progress: 0,
    },
    {
      title: "Source of Wealth",
      description: "Bank Statements or Investment Portfolio",
      status: "pending",
      progress: 0,
    },
  ];

  const riskScore = {
    level: "low",
    score: 85,
    factors: [
      { name: "Identity Verification", status: "passed" },
      { name: "Address Verification", status: "pending" },
      { name: "AML Screening", status: "passed" },
    ],
  };
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Document Verification</h3>
            <Badge variant="outline">Required</Badge>
          </div>

          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {doc.status === "completed" ? (
                      <CheckCircle2 className="text-green-500" />
                    ) : doc.status === "pending" ? (
                      <AlertCircle className="text-destructive" />
                    ) : (
                      <Upload className="text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {doc.status === "completed" ? "View" : "Upload"}
                  </Button>
                </div>
                <Progress value={doc.progress} className="h-2" />
              </div>
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Risk Assessment</h4>
              <Badge
                variant="secondary"
                className={
                  riskScore.level === "low"
                    ? "bg-green-500/10 text-green-500"
                    : ""
                }
              >
                {riskScore.score}% - {riskScore.level.toUpperCase()} RISK
              </Badge>
            </div>

            <div className="space-y-2">
              {riskScore.factors.map((factor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{factor.name}</span>
                  {factor.status === "passed" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
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
