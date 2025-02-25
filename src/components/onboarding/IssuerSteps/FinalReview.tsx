import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";

export default function FinalReview({ onBack, onNext }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Submission Timeline</h3>
        <div className="space-y-4">
          <div className="relative pl-8 pb-8 border-l-2 border-primary">
            <div className="absolute -left-[11px] bg-background p-1">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">Account Registration</h4>
                <Badge variant="outline">Completed</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Basic information verified
              </p>
            </div>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-primary">
            <div className="absolute -left-[11px] bg-background p-1">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <Badge variant="outline">Completed</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Security measures enabled
              </p>
            </div>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-muted">
            <div className="absolute -left-[11px] bg-background p-1">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">Document Review</h4>
                <Badge variant="secondary">In Progress</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Legal team verification
              </p>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-[11px] bg-background p-1">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">Final Approval</h4>
                <Badge variant="secondary">Pending</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Awaiting compliance review
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button onClick={onNext} className="w-full">
          Submit for Review
        </Button>
      </div>
    </div>
  );
}
