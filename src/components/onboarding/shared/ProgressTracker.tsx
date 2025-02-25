import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

interface Step {
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressTracker({ steps, currentStep }: ProgressTrackerProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-[50%] top-[15px] w-full h-[2px]",
                  step.status === "completed" ? "bg-primary" : "bg-muted",
                )}
                style={{ width: "calc(100% + 2rem)" }}
              />
            )}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                {step.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle
                    className={cn(
                      "h-5 w-5",
                      step.status === "current"
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  />
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.status === "completed" && "text-primary",
                    step.status === "current" && "text-foreground",
                    step.status === "upcoming" && "text-muted-foreground",
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
