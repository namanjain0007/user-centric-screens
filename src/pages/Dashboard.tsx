
import { Users, List, DollarSign, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

// Data for KPI cards (as in screenshot)
const kpiCards = [
  {
    label: "Total Users",
    value: "5,240",
    icon: Users,
    percent: "+12.5%",
    percentColor: "text-green-500",
    trend: "up",
    description: "vs last month",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Active Listings",
    value: "1,345",
    icon: List,
    percent: "+8.2%",
    percentColor: "text-green-500",
    trend: "up",
    description: "vs last month",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Monthly Revenue",
    value: "$32,580",
    icon: DollarSign,
    percent: "-2.4%",
    percentColor: "text-red-500",
    trend: "down",
    description: "vs last month",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Total Views",
    value: "245,647",
    icon: Eye,
    percent: "+18.7%",
    percentColor: "text-green-500",
    trend: "up",
    description: "vs last month",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
];

export default function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      {/* Top KPI Row (Cards & Report Button) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1">
          {kpiCards.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col justify-between rounded-2xl bg-white shadow-[0_2px_16px_0_rgba(24,63,118,0.08)] p-6 min-w-[200px] min-h-[110px] animate-fade-in"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                  <div className="flex items-end mt-1 gap-2">
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                </div>
                <div className={`${stat.iconBg} rounded-xl p-2 flex items-center justify-center`}>
                  <stat.icon size={26} className={`${stat.iconColor}`} />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className={`text-base ${stat.percentColor} font-semibold`}>
                  {stat.trend === "up" ? (
                    <span>&uarr; </span>
                  ) : (
                    <span>&darr; </span>
                  )}
                  {stat.percent}
                </span>
                <span className="text-xs text-gray-400">{stat.description}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-shrink-0">
          <Button
            className={
              "bg-[#1995dd] hover:bg-[#0073b1] text-white font-semibold rounded-lg shadow-none px-7 py-3 h-auto min-w-[150px] whitespace-nowrap text-base"
            }
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Revenue/Chart section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="bg-[#f8fafc] rounded-2xl shadow-[0_2px_16px_0_rgba(24,63,118,0.05)] p-9 min-h-[210px] flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-gray-800">Revenue Overview</span>
          </div>
          <div className="flex-1 w-full h-32 flex items-center justify-center">
            <span className="text-gray-400 text-base">Revenue Chart Placeholder</span>
          </div>
        </div>
        <div className="bg-[#f8fafc] rounded-2xl shadow-[0_2px_16px_0_rgba(24,63,118,0.05)] p-9 min-h-[210px] flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-gray-800">User Growth</span>
          </div>
          <div className="flex-1 w-full h-32 flex items-center justify-center">
            <span className="text-gray-400 text-base">User Growth Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}
