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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, RotateCw, UserPlus, X, Settings } from "lucide-react";
import AdminPanel from "./AdminPanel";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "pending" | "active";
  publicKey?: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export default function RoleManagement() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [roles] = useState<Role[]>([
    {
      id: "super_admin",
      name: "Super Admin",
      permissions: ["all"],
    },
    {
      id: "owner",
      name: "Owner",
      permissions: ["manage_token", "invite_users", "view_audit"],
    },
    {
      id: "compliance_manager",
      name: "Compliance Manager",
      permissions: ["approve_investors", "suspend_investors", "view_audit"],
    },
    {
      id: "agent",
      name: "Agent",
      permissions: ["manage_investors"],
    },
    {
      id: "compliance_officer",
      name: "Compliance Officer",
      permissions: ["approve_investors"],
    },
  ]);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      role: "agent",
      status: "active",
      publicKey: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
  ]);

  const [showPublicKey, setShowPublicKey] = useState<string>("");

  const addUser = (name: string, email: string, role: string) => {
    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      role,
      status: "pending",
    };
    setUsers([...users, newUser]);
  };

  const removeUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const resendInvite = (id: string) => {
    // Implement invite resend logic
    console.log("Resending invite to user:", id);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Role-Based Access Management</CardTitle>
          <CardDescription>
            Manage user roles and access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <Button
                variant={showAdminPanel ? "secondary" : "outline"}
                onClick={() => setShowAdminPanel(!showAdminPanel)}
              >
                Advanced Settings
              </Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" /> Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Invite a new user and assign their role
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    addUser(
                      formData.get("name") as string,
                      formData.get("email") as string,
                      formData.get("role") as string,
                    );
                  }}
                  className="space-y-4"
                >
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter user's name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter user's email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select name="role" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="compliance">
                          Compliance Officer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Send Invitation</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${user.status === "active" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.publicKey && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowPublicKey(user.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      {user.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => resendInvite(user.id)}
                        >
                          <RotateCw className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeUser(user.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {showPublicKey && (
            <Dialog
              open={!!showPublicKey}
              onOpenChange={() => setShowPublicKey("")}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Public Key</DialogTitle>
                </DialogHeader>
                <div className="p-4 bg-muted rounded-lg break-all">
                  {users.find((u) => u.id === showPublicKey)?.publicKey}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>

      {showAdminPanel && <AdminPanel />}
    </div>
  );
}
