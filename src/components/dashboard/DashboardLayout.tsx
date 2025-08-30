import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Factory, 
  ShoppingCart, 
  Shield, 
  Globe, 
  Menu, 
  X,
  Leaf 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export type UserRole = "producer" | "buyer" | "regulator" | "public";

interface RoleConfig {
  id: UserRole;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

const roles: RoleConfig[] = [
  {
    id: "producer",
    name: "Producer",
    icon: Factory,
    description: "Submit production & track credits",
    color: "bg-primary"
  },
  {
    id: "buyer",
    name: "Buyer", 
    icon: ShoppingCart,
    description: "Purchase credits from marketplace",
    color: "bg-secondary"
  },
  {
    id: "regulator",
    name: "Regulator",
    icon: Shield,
    description: "Review & approve submissions",
    color: "bg-accent"
  },
  {
    id: "public",
    name: "Public",
    icon: Globe,
    description: "View transparency dashboard",
    color: "bg-muted-foreground"
  }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("producer");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentRole = roles.find(role => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-card shadow-lg"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col bg-gradient-to-b from-primary to-primary-dark text-primary-foreground shadow-2xl">
          {/* Header */}
          <div className="flex h-20 items-center px-6 border-b border-primary-foreground/20">
            <Leaf className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-lg font-bold">HydroCredit</h1>
              <p className="text-xs opacity-80">Blockchain System</p>
            </div>
          </div>

          {/* Role Selection */}
          <div className="flex-1 px-4 py-6 space-y-3">
            <h2 className="px-2 text-sm font-semibold opacity-80 mb-4">
              Switch Role
            </h2>
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = selectedRole === role.id;
              
              return (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left group",
                    isActive 
                      ? "bg-primary-foreground/20 shadow-lg border border-primary-foreground/30" 
                      : "hover:bg-primary-foreground/10"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-md mr-3 transition-colors",
                    isActive ? "bg-primary-foreground/30" : "bg-primary-foreground/20 group-hover:bg-primary-foreground/30"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-xs opacity-70">{role.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-primary-foreground/20">
            <p className="text-xs opacity-60 text-center">
              Powered by Hyperledger Fabric
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header Bar */}
        <div className="bg-card border-b border-border px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="lg:hidden w-10" /> {/* Spacer for mobile menu */}
              {currentRole && (
                <>
                  <div className={cn("p-2 rounded-lg", currentRole.color)}>
                    <currentRole.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">{currentRole.name} Dashboard</h1>
                    <p className="text-sm text-muted-foreground">{currentRole.description}</p>
                  </div>
                </>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Network Status: <span className="text-success font-medium">Connected</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="p-6">
          {React.cloneElement(children as React.ReactElement, { selectedRole })}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}