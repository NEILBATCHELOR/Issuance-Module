import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, AlertCircle, MessageCircle } from "lucide-react";
import { ComplianceChecklist } from "../shared/ComplianceChecklist";

export default function ApprovalPending({ onBack }) {
  const approvalSteps = [
    {
      title: "Identity Verification",
      description: "Personal information validated",
      status: "completed",
      progress: 100,
    },
    {
      title: "Document Validation",
      description: "Required documents processed",
      status: "completed",
      progress: 100,
    },
    {
      title: "Compliance Review",
      description: "Guardian policy verification",
      status: "in-progress",
      progress: 60,
    },
    {
      title: "Final Approval",
      description: "Multi-signature authorization",
      status: "pending",
      progress: 0,
    },
  ];
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <Clock className="h-12 w-12 mx-auto text-primary" />
            <h3 className="font-semibold text-xl">Application Under Review</h3>
            <p className="text-muted-foreground">
              Your application is being reviewed by our compliance team
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">80%</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>

            <ComplianceChecklist items={approvalSteps} />
          </div>

          <div className="border-t pt-4">
            <Button variant="outline" className="w-full" onClick={() => {}}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
