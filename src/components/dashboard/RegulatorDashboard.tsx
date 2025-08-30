import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Shield, CheckCircle, XCircle, Clock, FileText, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockPendingReports = [
  { 
    id: "RPT001", 
    producer: "GreenH2 Corp", 
    amount: 150, 
    submitted: "2024-01-20", 
    facility: "Plant-A", 
    priority: "high",
    documents: ["production-log.pdf", "energy-audit.pdf"]
  },
  { 
    id: "RPT002", 
    producer: "HydroGen Ltd", 
    amount: 200, 
    submitted: "2024-01-19", 
    facility: "Plant-B", 
    priority: "medium",
    documents: ["monthly-report.pdf"]
  },
  { 
    id: "RPT003", 
    producer: "CleanFuel Inc", 
    amount: 75, 
    submitted: "2024-01-18", 
    facility: "Plant-C", 
    priority: "low",
    documents: ["production-data.xlsx", "compliance-cert.pdf"]
  },
];

const mockApprovedReports = [
  { id: "RPT098", producer: "EcoH2 Systems", amount: 180, approved: "2024-01-17", credits: 1800 },
  { id: "RPT097", producer: "GreenH2 Corp", amount: 160, approved: "2024-01-16", credits: 1600 },
  { id: "RPT096", producer: "HydroGen Ltd", amount: 220, approved: "2024-01-15", credits: 2200 },
];

const monthlyData = [
  { month: "Oct", submitted: 25, approved: 23, rejected: 2 },
  { month: "Nov", submitted: 30, approved: 28, rejected: 2 },
  { month: "Dec", submitted: 35, approved: 32, rejected: 3 },
  { month: "Jan", submitted: 28, approved: 25, rejected: 1 },
];

export function RegulatorDashboard() {
  const [selectedTab, setSelectedTab] = useState("pending");
  const { toast } = useToast();

  const handleApprove = (reportId: string, producer: string, amount: number) => {
    toast({
      title: "Report Approved",
      description: `${amount} tons from ${producer} approved. Credits will be issued.`,
    });
  };

  const handleReject = (reportId: string, producer: string) => {
    toast({
      title: "Report Rejected",
      description: `Report from ${producer} has been rejected and returned for revision.`,
      variant: "destructive"
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">12</div>
            <p className="text-xs text-muted-foreground">awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">8</div>
            <p className="text-xs text-muted-foreground">reports processed</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Issued</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">15,600</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="approved">Approved Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Production Reports Awaiting Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Producer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPendingReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-mono text-sm">{report.id}</TableCell>
                      <TableCell className="font-medium">{report.producer}</TableCell>
                      <TableCell>{report.amount} tons</TableCell>
                      <TableCell>{report.facility}</TableCell>
                      <TableCell>{report.submitted}</TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(report.priority)}>
                          {report.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{report.documents.length}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(report.id, report.producer, report.amount)}
                            className="bg-success hover:bg-success/90 text-success-foreground"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(report.id, report.producer)}
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Recently Approved Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Producer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Approved Date</TableHead>
                    <TableHead>Credits Issued</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApprovedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-mono text-sm">{report.id}</TableCell>
                      <TableCell className="font-medium">{report.producer}</TableCell>
                      <TableCell>{report.amount} tons</TableCell>
                      <TableCell>{report.approved}</TableCell>
                      <TableCell className="text-success font-medium">
                        {report.credits.toLocaleString()}
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
              <CardTitle>Monthly Review Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
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
                  <Bar dataKey="submitted" fill="hsl(var(--muted-foreground))" name="Submitted" />
                  <Bar dataKey="approved" fill="hsl(var(--success))" name="Approved" />
                  <Bar dataKey="rejected" fill="hsl(var(--destructive))" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Approval Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">94.2%</div>
                <p className="text-sm text-muted-foreground">Average monthly rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Avg. Review Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">2.3</div>
                <p className="text-sm text-muted-foreground">days per report</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">125K</div>
                <p className="text-sm text-muted-foreground">issued this year</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}