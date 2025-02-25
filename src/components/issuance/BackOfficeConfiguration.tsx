import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BackOfficeConfiguration() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
          <CardDescription>Assign roles to manage the token</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="agent">Agent Address</Label>
            <Input id="agent" placeholder="Enter agent wallet address" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="compliance">Compliance Officer Address</Label>
            <Input
              id="compliance"
              placeholder="Enter compliance officer wallet address"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Configuration</CardTitle>
          <CardDescription>
            Configure primary and secondary market settings
          </CardDescription>
        </CardHeader>
        <CardContent>{/* Market configuration UI will go here */}</CardContent>
      </Card>
    </div>
  );
}
