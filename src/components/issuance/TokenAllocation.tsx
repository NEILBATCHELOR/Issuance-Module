import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function TokenAllocation() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Token Allocation</CardTitle>
          <CardDescription>
            Distribute tokens to multiple investors
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Upload Allocation List</Label>
            <Input type="file" accept=".csv,.xlsx" />
          </div>
          <Button>Process Bulk Allocation</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Individual Allocation</CardTitle>
          <CardDescription>
            Allocate tokens to a single investor
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Investor Wallet Address</Label>
            <Input placeholder="Enter wallet address" />
          </div>
          <div className="grid gap-2">
            <Label>Amount</Label>
            <Input type="number" placeholder="Enter token amount" />
          </div>
          <Button>Allocate Tokens</Button>
        </CardContent>
      </Card>
    </div>
  );
}
