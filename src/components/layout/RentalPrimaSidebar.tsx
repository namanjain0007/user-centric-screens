
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Shield,
  FolderTree,
  List,
  CreditCard,
  DollarSign,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";
import clsx from "clsx";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "User Management",
    icon: Users,
    href: "/users",
  },
  {
    label: "Admin Users",
    icon: Shield,
    href: "/admin",
  },
  {
    label: "Categories",
    icon: FolderTree,
    href: "/categories",
  },
  {
    label: "Listings",
    icon: List,
    href: "/listings",
  },
  {
    label: "Payments",
    icon: CreditCard,
    href: "/payments",
  },
  {
    label: "Plans",
    icon: DollarSign,
    href: "/pricing",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
  },
  {
    label: "Support",
    icon: HelpCircle,
    href: "/help",
  },
];

const logoutItem = {
  label: "Logout",
  icon: LogOut,
  href: "/logout", // Navigation logic can be adjusted
};

export function RentalPrimaSidebar() {
  const location = useLocation();

  return (
    <aside
      className="flex flex-col justify-between
        h-screen sticky top-0 left-0 w-64
        bg-gradient-to-b from-[#0073B1] to-[#005C99]
        shadow-xl rounded-r-3xl py-6"
    >
      {/* Top Branding */}
      <div className="px-6 mb-8">
        <h1 className="text-white text-2xl font-bold tracking-wide select-none">
          Rental Prima
        </h1>
      </div>
      {/* Main Navigation */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-6 py-3 rounded-lg transition-all font-medium",
                    "text-white hover:bg-white/20 hover:text-white focus:outline-none",
                    isActive &&
                      "bg-white/90 text-[#0073B1] shadow-md pointer-events-none" // match screenshot active
                  )}
                  style={{
                    fontSize: "1rem",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    size={22}
                    className={clsx(
                      isActive ? "text-[#0073B1]" : "text-white",
                      "transition-colors"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Logout button at the bottom */}
      <div className="mt-8 px-4">
        <Link
          to={logoutItem.href}
          className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all font-medium text-white hover:bg-white/20 hover:text-white"
          style={{
            fontSize: "1rem",
          }}
        >
          <logoutItem.icon size={22} className="text-white" />
          <span>{logoutItem.label}</span>
        </Link>
      </div>
    </aside>
  );
}

