import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OnboardingSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-[800px] w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome to Chain Capital
          </h1>
          <p className="text-muted-foreground">
            Choose your account type to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/onboarding/issuer")}
          >
            <div className="space-y-4 text-center">
              <Building2 className="w-12 h-12 mx-auto text-primary" />
              <div>
                <h2 className="text-xl font-semibold">I'm an Issuer</h2>
                <p className="text-muted-foreground">
                  I want to raise capital and issue securities
                </p>
              </div>
              <Button className="w-full">Continue as Issuer</Button>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/onboarding/investor")}
          >
            <div className="space-y-4 text-center">
              <Users className="w-12 h-12 mx-auto text-primary" />
              <div>
                <h2 className="text-xl font-semibold">I'm an Investor</h2>
                <p className="text-muted-foreground">
                  I want to invest in securities
                </p>
              </div>
              <Button className="w-full">Continue as Investor</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
