import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function CapTableManagement() {
  const mockData = [
    {
      investor: "0x1234...5678",
      holdings: "1,000,000",
      percentage: "10%",
      status: "Active",
    },
    {
      investor: "0x8765...4321",
      holdings: "500,000",
      percentage: "5%",
      status: "Active",
    },
    {
      investor: "0x9876...1234",
      holdings: "250,000",
      percentage: "2.5%",
      status: "Locked",
    },
  ];

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Cap Table Overview</CardTitle>
          <CardDescription>Real-time view of token holdings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor</TableHead>
                <TableHead>Holdings</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.investor}</TableCell>
                  <TableCell>{row.holdings}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>Generate cap table reports</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button>Export to CSV</Button>
          <Button variant="outline">Generate Snapshot</Button>
        </CardContent>
      </Card>
    </div>
  );
}
