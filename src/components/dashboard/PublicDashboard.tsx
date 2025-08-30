import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Globe, 
  Leaf, 
  TrendingUp, 
  Building, 
  Eye, 
  Activity 
} from "lucide-react";

const mockCompanyLedger = [
  { company: "GreenH2 Corp", credits: 4320, location: "California", rating: "AAA", verified: true },
  { company: "HydroGen Ltd", credits: 3850, location: "Texas", rating: "AA+", verified: true },
  { company: "CleanFuel Inc", credits: 2640, location: "Oregon", rating: "AA", verified: true },
  { company: "EcoH2 Systems", credits: 2100, location: "Nevada", rating: "AA-", verified: true },
  { company: "PureH2 Solutions", credits: 1890, location: "Arizona", rating: "A+", verified: false },
];

const productionTrend = [
  { month: "Aug", production: 850, credits: 8500, companies: 8 },
  { month: "Sep", production: 920, credits: 9200, companies: 9 },
  { month: "Oct", production: 1100, credits: 11000, companies: 10 },
  { month: "Nov", production: 1250, credits: 12500, companies: 12 },
  { month: "Dec", production: 1380, credits: 13800, companies: 13 },
  { month: "Jan", production: 1420, credits: 14200, companies: 14 },
];

const regionData = [
  { name: 'California', value: 35, fill: 'hsl(var(--primary))' },
  { name: 'Texas', value: 28, fill: 'hsl(var(--secondary))' },
  { name: 'Oregon', value: 18, fill: 'hsl(var(--accent))' },
  { name: 'Nevada', value: 12, fill: 'hsl(var(--success))' },
  { name: 'Others', value: 7, fill: 'hsl(var(--muted-foreground))' },
];

const marketMetrics = [
  { date: "Jan 15", price: 42, volume: 1200, efficiency: 85 },
  { date: "Jan 16", price: 44, volume: 1350, efficiency: 87 },
  { date: "Jan 17", price: 43, volume: 1180, efficiency: 86 },
  { date: "Jan 18", price: 45, volume: 1420, efficiency: 88 },
  { date: "Jan 19", price: 46, volume: 1580, efficiency: 89 },
  { date: "Jan 20", price: 44, volume: 1350, efficiency: 87 },
];

export function PublicDashboard() {
  const totalCredits = mockCompanyLedger.reduce((sum, company) => sum + company.credits, 0);
  const verifiedCompanies = mockCompanyLedger.filter(company => company.verified).length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <Leaf className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalCredits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">in circulation</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Producers</CardTitle>
            <Building className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{verifiedCompanies}</div>
            <p className="text-xs text-muted-foreground">verified companies</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Volume</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">1,420</div>
            <p className="text-xs text-muted-foreground">tons produced</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transparency</CardTitle>
            <Eye className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">100%</div>
            <p className="text-xs text-muted-foreground">verifiable records</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="ledger">Company Ledger</TabsTrigger>
          <TabsTrigger value="analytics">Production Analytics</TabsTrigger>
          <TabsTrigger value="regional">Regional Data</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Credit Production Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={productionTrend}>
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
                    <Area 
                      type="monotone" 
                      dataKey="credits" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.2)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={marketMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
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
                      strokeWidth={2}
                      name="Price ($)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      name="Volume"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ledger" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Public Credit Ledger
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Credits Balance</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCompanyLedger.map((company, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{company.company}</TableCell>
                      <TableCell>{company.location}</TableCell>
                      <TableCell className="font-mono text-primary">
                        {company.credits.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{company.rating}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={company.verified ? "default" : "outline"}>
                          {company.verified ? "Verified" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Production vs Credits Issued</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={productionTrend}>
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
                  <Area 
                    type="monotone" 
                    dataKey="production" 
                    stackId="1"
                    stroke="hsl(var(--secondary))" 
                    fill="hsl(var(--secondary) / 0.6)" 
                    name="Production (tons)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="credits" 
                    stackId="2"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.4)" 
                    name="Credits Issued"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Production by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {regionData.map((entry, index) => (
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
                <CardTitle>Regional Leaders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {regionData.map((region, index) => (
                  <div key={region.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: region.fill }}
                      />
                      <span className="font-medium">{region.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{region.value}%</div>
                      <div className="text-xs text-muted-foreground">market share</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}