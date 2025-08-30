import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ShoppingCart, Wallet, TrendingUp, Award, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const mockMarketplace = [
  { id: "PROD001", producer: "GreenH2 Corp", amount: 500, price: 45, rating: 4.8, location: "California" },
  { id: "PROD002", producer: "HydroGen Ltd", amount: 750, price: 42, rating: 4.9, location: "Texas" },
  { id: "PROD003", producer: "CleanFuel Inc", amount: 300, price: 48, rating: 4.7, location: "Oregon" },
  { id: "PROD004", producer: "EcoH2 Systems", amount: 1000, price: 40, rating: 4.6, location: "Nevada" },
];

const mockPurchaseHistory = [
  { date: "2024-01-20", producer: "GreenH2 Corp", credits: 200, price: 45, total: 9000 },
  { date: "2024-01-18", producer: "HydroGen Ltd", credits: 150, price: 42, total: 6300 },
  { date: "2024-01-15", producer: "CleanFuel Inc", credits: 100, price: 48, total: 4800 },
  { date: "2024-01-12", producer: "EcoH2 Systems", credits: 300, price: 40, total: 12000 },
];

const pieData = [
  { name: 'GreenH2 Corp', value: 35, fill: 'hsl(var(--primary))' },
  { name: 'HydroGen Ltd', value: 25, fill: 'hsl(var(--secondary))' },
  { name: 'CleanFuel Inc', value: 20, fill: 'hsl(var(--accent))' },
  { name: 'Others', value: 20, fill: 'hsl(var(--muted-foreground))' },
];

const priceData = [
  { month: "Jan", price: 42 },
  { month: "Feb", price: 45 },
  { month: "Mar", price: 44 },
  { month: "Apr", price: 46 },
];

export function BuyerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handlePurchase = (producer: string, amount: number, price: number) => {
    toast({
      title: "Purchase Initiated",
      description: `Purchasing ${amount} credits from ${producer} at $${price}/credit`,
    });
  };

  const filteredMarketplace = mockMarketplace.filter(item =>
    item.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$125,000</div>
            <p className="text-xs text-muted-foreground">Ready for purchases</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Owned</CardTitle>
            <Award className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">2,850</div>
            <p className="text-xs text-muted-foreground">total purchased</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <ShoppingCart className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">750</div>
            <p className="text-xs text-muted-foreground">credits purchased</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$44</div>
            <p className="text-xs text-muted-foreground">per credit</p>
          </CardContent>
        </Card>
      </div>

      {/* Marketplace & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Credit Marketplace
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search producers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMarketplace.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.producer}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.amount} credits</TableCell>
                    <TableCell className="text-success font-medium">${item.price}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.rating} ⭐</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handlePurchase(item.producer, item.amount, item.price)}
                        className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
                      >
                        Purchase
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={priceData}>
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
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Producer</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Price per Credit</TableHead>
                <TableHead>Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPurchaseHistory.map((purchase, index) => (
                <TableRow key={index}>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell className="font-medium">{purchase.producer}</TableCell>
                  <TableCell>{purchase.credits}</TableCell>
                  <TableCell className="text-success">${purchase.price}</TableCell>
                  <TableCell className="font-medium">${purchase.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}