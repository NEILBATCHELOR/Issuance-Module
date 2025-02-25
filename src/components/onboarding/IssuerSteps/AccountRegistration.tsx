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

export default function AccountRegistration({ onNext }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="orgName">Organization Name</Label>
          <Input id="orgName" placeholder="Enter organization name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country of Registration</Label>
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
          <Input id="email" type="email" placeholder="Enter business email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Create password" />
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
