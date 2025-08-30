import { UserRole } from "./DashboardLayout";
import { ProducerDashboard } from "./ProducerDashboard";
import { BuyerDashboard } from "./BuyerDashboard";
import { RegulatorDashboard } from "./RegulatorDashboard";
import { PublicDashboard } from "./PublicDashboard";

interface DashboardContentProps {
  selectedRole: UserRole;
}

export function DashboardContent({ selectedRole }: DashboardContentProps) {
  switch (selectedRole) {
    case "producer":
      return <ProducerDashboard />;
    case "buyer":
      return <BuyerDashboard />;
    case "regulator":
      return <RegulatorDashboard />;
    case "public":
      return <PublicDashboard />;
    default:
      return <ProducerDashboard />;
  }
}