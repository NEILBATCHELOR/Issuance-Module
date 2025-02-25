import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RealTimeUpdates() {
  const mockUpdates = [
    {
      time: "2024-03-20 14:30",
      event: "New investor onboarded",
      details: "Wallet 0x1234...5678",
    },
    {
      time: "2024-03-20 14:25",
      event: "Token transfer",
      details: "1,000 tokens from 0x8765...4321 to 0x9876...1234",
    },
    {
      time: "2024-03-20 14:20",
      event: "Compliance check",
      details: "KYC verification completed for 0x1234...5678",
    },
    {
      time: "2024-03-20 14:15",
      event: "Market activity",
      details: "Secondary market trade executed",
    },
  ];

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>Real-time platform activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid gap-4">
              {mockUpdates.map((update, i) => (
                <div key={i} className="grid gap-1">
                  <div className="text-sm font-semibold">{update.event}</div>
                  <div className="text-sm text-muted-foreground">
                    {update.details}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {update.time}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Platform and blockchain network status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span>Platform Status</span>
              <span className="text-green-500">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Blockchain Network</span>
              <span className="text-green-500">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Block</span>
              <span>#14,325,678</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
