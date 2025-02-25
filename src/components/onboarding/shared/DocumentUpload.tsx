import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  name: string;
  type: string;
  status: "uploaded" | "pending" | "error" | "validating";
  progress?: number;
  errorMessage?: string;
}

interface DocumentUploadProps {
  documents: Document[];
  onUpload: (type: string) => void;
}

export function DocumentUpload({ documents, onUpload }: DocumentUploadProps) {
  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "uploaded":
        return <CheckCircle2 className="text-green-500" />;
      case "pending":
        return <Upload className="text-muted-foreground" />;
      case "error":
        return <AlertCircle className="text-destructive" />;
      case "validating":
        return <FileText className="text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(doc.status)}
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-muted-foreground">{doc.type}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpload(doc.type)}
              disabled={
                doc.status === "uploaded" || doc.status === "validating"
              }
            >
              {doc.status === "uploaded" ? "View" : "Upload"}
            </Button>
          </div>

          {doc.progress !== undefined && doc.status !== "uploaded" && (
            <div className="space-y-2">
              <Progress value={doc.progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {doc.status === "validating"
                    ? "Validating..."
                    : `${doc.progress}% uploaded`}
                </span>
                {doc.status === "validating" && (
                  <Badge variant="outline">Auto-validating</Badge>
                )}
              </div>
            </div>
          )}

          {doc.status === "error" && doc.errorMessage && (
            <div className="text-sm text-destructive flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>{doc.errorMessage}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
