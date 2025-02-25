import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function TwoFactorAuth({ onBack, onNext }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <div className="bg-muted p-4 rounded-lg inline-block mb-4">
              {/* Placeholder for QR Code */}
              <div className="w-48 h-48 bg-primary/10 rounded flex items-center justify-center">
                <p className="text-sm text-muted-foreground">QR Code</p>
              </div>
            </div>
            <h3 className="font-semibold">Scan QR Code</h3>
            <p className="text-sm text-muted-foreground">
              Scan this QR code with your authenticator app
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verificationCode">Enter Verification Code</Label>
            <Input
              id="verificationCode"
              placeholder="Enter 6-digit code"
              maxLength={6}
            />
          </div>
        </div>
      </Card>

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
