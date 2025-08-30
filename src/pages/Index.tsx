import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Index = () => {
  return (
    <DashboardLayout>
      <DashboardContent selectedRole="producer" />
    </DashboardLayout>
  );
};

export default Index;
