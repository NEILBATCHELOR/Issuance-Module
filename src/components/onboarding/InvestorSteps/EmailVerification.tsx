import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { QrCode, KeyRound } from "lucide-react";

export default function EmailVerification({ onBack, onNext }) {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Step 1: Email Verification */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Email Verification</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailCode">Verification Code</Label>
              <Input
                id="emailCode"
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
            </div>
            <Button variant="link" className="w-full">
              Resend Code
            </Button>
          </div>
        </Card>

        {/* Step 2: 2FA Setup */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-muted p-8 rounded-lg inline-block">
                <QrCode className="w-32 h-32 text-primary" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="authCode">Authenticator Code</Label>
                <Input
                  id="authCode"
                  placeholder="Enter code from authenticator app"
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <KeyRound className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Backup Codes</span>
                </div>
                <div className="font-mono text-sm bg-background p-2 rounded border">
                  XXXX-XXXX-XXXX-XXXX
                </div>
                <p className="text-xs text-muted-foreground">
                  Save these backup codes in a secure location. You'll need them
                  if you lose access to your authenticator app.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button onClick={onNext} className="w-full">
          Verify & Continue
        </Button>
      </div>
    </div>
  );
}
