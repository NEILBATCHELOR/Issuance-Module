import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { ProgressTracker } from "./shared/ProgressTracker";
import { Toaster } from "@/components/ui/toaster";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
}

export default function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  title,
  description,
}: OnboardingLayoutProps) {
  const progress = (currentStep / totalSteps) * 100;

  const steps = Array.from({ length: totalSteps }, (_, i) => ({
    title: `Step ${i + 1}`,
    description: `Step ${i + 1} description`,
    status:
      i + 1 === currentStep
        ? "current"
        : i + 1 < currentStep
          ? "completed"
          : "upcoming",
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <main className="space-y-8">
          <div className="bg-card p-6 lg:p-8 rounded-lg shadow-lg space-y-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
