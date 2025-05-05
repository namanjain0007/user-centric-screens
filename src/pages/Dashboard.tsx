
import { Users, UserPlus, UserCheck } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { UserTable } from "@/components/users/UserTable";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total users" 
          value="1240" 
          change={{ value: "40% vs last month", isPositive: true }}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard 
          title="New users" 
          value="185" 
          change={{ value: "10% vs last month", isPositive: true }}
          icon={<UserPlus className="h-5 w-5" />}
        />
        <StatCard 
          title="Active users" 
          value="650" 
          change={{ value: "5% vs last month", isPositive: false }}
          icon={<UserCheck className="h-5 w-5" />}
        />
      </div>

      <UserTable />
    </div>
  );
}
