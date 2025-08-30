import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, Zap, Coins, TrendingUp, Factory } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockProductionData = [
  { month: "Jan", production: 120, credits: 1200 },
  { month: "Feb", production: 150, credits: 1500 },
  { month: "Mar", production: 180, credits: 1800 },
  { month: "Apr", production: 200, credits: 2000 },
];

const mockTransactions = [
  { id: "TX001", date: "2024-01-15", type: "Credit Earned", amount: "+1,200", status: "Completed" },
  { id: "TX002", date: "2024-01-10", type: "Credit Sold", amount: "-500", status: "Completed" },
  { id: "TX003", date: "2024-01-08", type: "Credit Earned", amount: "+1,500", status: "Completed" },
  { id: "TX004", date: "2024-01-05", type: "Production Submit", amount: "180 tons", status: "Pending" },
];

export function ProducerDashboard() {
  const [productionAmount, setProductionAmount] = useState("");
  const { toast } = useToast();

  const handleSubmitProduction = () => {
    if (!productionAmount || parseFloat(productionAmount) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid production amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Production Submitted",
      description: `${productionAmount} tons of hydrogen production submitted for verification`,
    });
    setProductionAmount("");
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <Coins className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">4,320</div>
            <p className="text-xs text-muted-foreground">Available for trading</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Production</CardTitle>
            <Factory className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">200</div>
            <p className="text-xs text-muted-foreground">tons this month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">2,000</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Output</CardTitle>
            <Zap className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">2.4 MW</div>
            <p className="text-xs text-muted-foreground">current capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Production Form & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Submit Hydrogen Production
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="production">Production Amount (tons)</Label>
              <Input
                id="production"
                type="number"
                placeholder="Enter tons produced"
                value={productionAmount}
                onChange={(e) => setProductionAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facility">Facility ID</Label>
              <Input
                id="facility"
                value="HYDRO-PLANT-001"
                disabled
                className="bg-muted"
              />
            </div>
            <Button 
              onClick={handleSubmitProduction}
              className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
            >
              Submit for Verification
            </Button>
            <p className="text-xs text-muted-foreground">
              * Production will be verified by regulators before credits are issued
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Production vs Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockProductionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="production" fill="hsl(var(--primary))" name="Production (tons)" />
                <Bar dataKey="credits" fill="hsl(var(--secondary))" name="Credits Earned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-sm">{tx.id}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell className={tx.amount.startsWith('+') ? 'text-success' : tx.amount.startsWith('-') ? 'text-destructive' : ''}>
                    {tx.amount}
                  </TableCell>
                  <TableCell>
                    <Badge variant={tx.status === "Completed" ? "default" : "secondary"}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}