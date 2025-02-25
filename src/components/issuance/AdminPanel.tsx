import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface ApprovalRequest {
  id: string;
  type: string;
  requester: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  approvers: string[];
  timestamp: string;
}

export default function AdminPanel() {
  const [approvalRequests] = useState<ApprovalRequest[]>([
    {
      id: "1",
      type: "Role Change",
      requester: "john@example.com",
      description: "Promote to Compliance Manager",
      status: "pending",
      approvers: ["admin1@example.com"],
      timestamp: "2024-03-21 14:30",
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Admin Panel</CardTitle>
        <CardDescription>
          Configure system-wide policies and manage approvals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="policies" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="policies">Policy Rules</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="policies" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Signature Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable 2-of-3 Consensus</Label>
                      <p className="text-sm text-muted-foreground">
                        Require two approvers for critical actions
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-2">
                    <Label>Actions Requiring Consensus</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="role-changes" />
                        <Label htmlFor="role-changes">Role Changes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="key-revocation" />
                        <Label htmlFor="key-revocation">Key Revocation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="compliance-changes" />
                        <Label htmlFor="compliance-changes">
                          Compliance Changes
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Auto-Approval Thresholds</Label>
                    <div className="grid gap-2">
                      <Input
                        placeholder="Maximum auto-approved transfer amount"
                        type="number"
                      />
                      <Input
                        placeholder="Maximum auto-approved user count"
                        type="number"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Rotation Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enforce Key Rotation</Label>
                      <p className="text-sm text-muted-foreground">
                        Require periodic key rotation for security
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Input placeholder="Rotation period (days)" type="number" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div className="space-y-4">
                {approvalRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="font-medium">{request.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.description}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{request.timestamp}</span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            request.status === "pending"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="audit">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div className="space-y-4">
                {/* Sample audit log entries */}
                <div className="flex items-center space-x-4">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Role Change Approved</p>
                    <p className="text-sm text-muted-foreground">
                      User promoted to Compliance Manager
                    </p>
                    <p className="text-xs text-muted-foreground">
                      2024-03-21 14:30 • By admin@example.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Key Rotation Required</p>
                    <p className="text-sm text-muted-foreground">
                      3 users need to rotate their keys
                    </p>
                    <p className="text-xs text-muted-foreground">
                      2024-03-21 14:25 • System
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
