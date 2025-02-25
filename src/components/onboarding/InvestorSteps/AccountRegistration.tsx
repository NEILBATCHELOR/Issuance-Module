import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AccountRegistration({ onNext }) {
  const investorTypes = [
    {
      value: "individual",
      label: "Individual",
      description: "Personal investment account",
    },
    {
      value: "joint",
      label: "Joint Account",
      description: "Shared investment account",
    },
    {
      value: "corporate",
      label: "Corporate",
      description: "Business entity account",
    },
    {
      value: "trust",
      label: "Trust",
      description: "Trust or estate account",
    },
    {
      value: "institutional",
      label: "Institutional Fund",
      description: "Investment fund or institution",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Investor Type</Label>
          <RadioGroup
            defaultValue="individual"
            className="grid grid-cols-2 gap-4"
          >
            {investorTypes.map((type) => (
              <div
                key={type.value}
                className="flex items-start space-x-3 rounded-lg border p-3"
              >
                <RadioGroupItem
                  value={type.value}
                  id={type.value}
                  className="mt-1"
                />
                <div>
                  <Label htmlFor={type.value} className="font-medium">
                    {type.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Legal Name</Label>
          <Input id="fullName" placeholder="Enter your full legal name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country of Residence</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="sg">Singapore</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Business Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your business email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a secure password"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm">
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>
      </div>

      <Button onClick={onNext} className="w-full">
        Continue
      </Button>
    </div>
  );
}
