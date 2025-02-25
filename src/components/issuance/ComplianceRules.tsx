import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Rule {
  id: string;
  name: string;
  category: string;
  status: "active" | "inactive";
  conditions: Record<string, any>;
  approvals: string[];
}

const RULE_CATEGORIES = [
  {
    id: "investor_qualification",
    name: "Investor Qualification",
    description: "KYC, accreditation status",
  },
  {
    id: "jurisdiction",
    name: "Jurisdiction-Based",
    description: "Geographic restrictions and compliance",
  },
  {
    id: "asset_class",
    name: "Asset Class-Based",
    description: "Restrictions based on underlying asset type",
  },
  {
    id: "issuer_imposed",
    name: "Issuer-Imposed",
    description: "Lock-up periods, whitelists, volume limits",
  },
  {
    id: "conditional_approval",
    name: "Conditional Approval",
    description: "Multi-signature and escrow-based approvals",
  },
  {
    id: "time_based",
    name: "Time-Based",
    description: "Vesting schedules and expiry windows",
  },
  {
    id: "smart_contract",
    name: "Smart Contract-Triggered",
    description: "Oracle or automated condition triggers",
  },
  {
    id: "collateralized",
    name: "Collateralized",
    description: "LTV thresholds and margin requirements",
  },
  {
    id: "multi_party",
    name: "Multi-Party Syndicated",
    description: "Multiple stakeholder approvals",
  },
];

export default function ComplianceRules() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [newRule, setNewRule] = useState<Partial<Rule>>({
    category: "",
    name: "",
    conditions: {},
    approvals: [],
  });

  const addRule = () => {
    if (!newRule.name || !newRule.category) return;

    const rule: Rule = {
      id: String(Date.now()),
      name: newRule.name,
      category: newRule.category,
      status: "active",
      conditions: newRule.conditions || {},
      approvals: newRule.approvals || [],
    };

    setRules([...rules, rule]);
    setShowRuleDialog(false);
    setNewRule({ category: "", name: "", conditions: {}, approvals: [] });
  };

  const toggleRuleStatus = (id: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              status: rule.status === "active" ? "inactive" : "active",
            }
          : rule,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Rule Management</h2>
          <p className="text-muted-foreground">
            Configure and manage transfer rules
          </p>
        </div>
        <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Rule</DialogTitle>
              <DialogDescription>
                Configure a new transfer rule based on category
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Rule Category</Label>
                <Select
                  value={newRule.category}
                  onValueChange={(value) =>
                    setNewRule({ ...newRule, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rule category" />
                  </SelectTrigger>
                  <SelectContent>
                    {RULE_CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Rule Name</Label>
                <Input
                  value={newRule.name}
                  onChange={(e) =>
                    setNewRule({ ...newRule, name: e.target.value })
                  }
                  placeholder="Enter rule name"
                />
              </div>

              {newRule.category && (
                <Card>
                  <CardHeader>
                    <CardTitle>Rule Configuration</CardTitle>
                    <CardDescription>
                      Configure specific conditions for this rule
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {newRule.category === "investor_qualification" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Required Verifications</Label>
                          <div className="grid gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="kyc"
                                checked={newRule.conditions?.kyc}
                                onCheckedChange={(checked) =>
                                  setNewRule({
                                    ...newRule,
                                    conditions: {
                                      ...newRule.conditions,
                                      kyc: checked,
                                    },
                                  })
                                }
                              />
                              <Label htmlFor="kyc">KYC Verification</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="accredited"
                                checked={newRule.conditions?.accredited}
                                onCheckedChange={(checked) =>
                                  setNewRule({
                                    ...newRule,
                                    conditions: {
                                      ...newRule.conditions,
                                      accredited: checked,
                                    },
                                  })
                                }
                              />
                              <Label htmlFor="accredited">
                                Accredited Investor Status
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="risk_profile"
                                checked={newRule.conditions?.risk_profile}
                                onCheckedChange={(checked) =>
                                  setNewRule({
                                    ...newRule,
                                    conditions: {
                                      ...newRule.conditions,
                                      risk_profile: checked,
                                    },
                                  })
                                }
                              />
                              <Label htmlFor="risk_profile">
                                Risk Profile Verification
                              </Label>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="autoVerification"
                            checked={newRule.conditions?.autoVerification}
                            onCheckedChange={(checked) =>
                              setNewRule({
                                ...newRule,
                                conditions: {
                                  ...newRule.conditions,
                                  autoVerification: checked,
                                },
                              })
                            }
                          />
                          <Label htmlFor="autoVerification">
                            Enable automatic verification
                          </Label>
                        </div>
                      </div>
                    )}

                    {/* Rest of the rule category configurations remain unchanged */}
                  </CardContent>
                </Card>
              )}
            </div>
            <DialogFooter>
              <Button onClick={addRule}>Create Rule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RULE_CATEGORIES.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    {category.name}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rules.filter((r) => r.category === category.id).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Active rules</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transfer Rules</CardTitle>
                  <CardDescription>
                    Manage conditional transfer rules
                  </CardDescription>
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {RULE_CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {rules
                    .filter(
                      (rule) =>
                        !selectedCategory || rule.category === selectedCategory,
                    )
                    .map((rule) => (
                      <Card key={rule.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{rule.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {
                                  RULE_CATEGORIES.find(
                                    (c) => c.id === rule.category,
                                  )?.name
                                }
                              </p>
                            </div>
                            <Switch
                              checked={rule.status === "active"}
                              onCheckedChange={() => toggleRuleStatus(rule.id)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Review and approve transfer requests
              </CardDescription>
            </CardHeader>
            <CardContent>{/* Approval requests list */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Rule Audit Log</CardTitle>
              <CardDescription>
                Track rule changes and approvals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {/* Sample audit entries */}
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Rule Activated</p>
                      <p className="text-sm text-muted-foreground">
                        KYC Verification rule enabled
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2024-03-21 14:30 • By admin@example.com
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
