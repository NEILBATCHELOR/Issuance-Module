import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenConfiguration from "./TokenConfiguration";
import RoleManagement from "./RoleManagement";
import ComplianceRules from "./ComplianceRules";
import TokenAllocation from "./TokenAllocation";
import CapTableManagement from "./CapTableManagement";
import RealTimeUpdates from "./RealTimeUpdates";

export default function IssuanceModule() {
  return (
    <div className="w-full h-full bg-background p-6">
      <h1 className="text-3xl font-bold mb-6">Token Issuance Module</h1>

      <Tabs defaultValue="token" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="token">Token Design</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="compliance">Rule Management</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="captable">Cap Table</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="token">
          <TokenConfiguration />
        </TabsContent>

        <TabsContent value="roles">
          <RoleManagement />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceRules />
        </TabsContent>

        <TabsContent value="allocation">
          <TokenAllocation />
        </TabsContent>

        <TabsContent value="captable">
          <CapTableManagement />
        </TabsContent>

        <TabsContent value="updates">
          <RealTimeUpdates />
        </TabsContent>
      </Tabs>
    </div>
  );
}
