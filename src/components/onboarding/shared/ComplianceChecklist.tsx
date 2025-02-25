import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Status = "completed" | "pending" | "failed" | "in-progress";

interface ChecklistItem {
  title: string;
  description: string;
  status: Status;
  progress?: number;
}

interface ComplianceChecklistProps {
  items: ChecklistItem[];
}

export function ComplianceChecklist({ items }: ComplianceChecklistProps) {
  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="text-green-500" />;
      case "pending":
        return <Clock className="text-yellow-500" />;
      case "failed":
        return <AlertCircle className="text-destructive" />;
      case "in-progress":
        return <Clock className="text-blue-500" />;
    }
  };

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline">Complete</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(item.status)}
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
            {getStatusBadge(item.status)}
          </div>
          {item.progress !== undefined && (
            <Progress value={item.progress} className="h-2" />
          )}
        </div>
      ))}
    </div>
  );
}
