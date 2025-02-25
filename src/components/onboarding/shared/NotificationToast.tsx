import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  type: NotificationType;
  title: string;
  description?: string;
}

export function useNotification() {
  const { toast } = useToast();

  const showNotification = ({
    type,
    title,
    description,
  }: NotificationProps) => {
    const getIcon = () => {
      switch (type) {
        case "success":
          return <CheckCircle2 className="h-5 w-5 text-green-500" />;
        case "error":
          return <AlertCircle className="h-5 w-5 text-destructive" />;
        case "warning":
          return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        case "info":
          return <Info className="h-5 w-5 text-blue-500" />;
      }
    };

    toast({
      variant: type === "error" ? "destructive" : "default",
      title: (
        <div className="flex items-center gap-2">
          {getIcon()}
          <span>{title}</span>
        </div>
      ),
      description: description,
    });
  };

  return { showNotification };
}
