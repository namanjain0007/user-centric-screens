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
  href: "/logout",
};

export function RentalPrimaSidebar() {
  const location = useLocation();

  return (
    <aside
      className="flex flex-col justify-between h-screen sticky top-0 left-0 w-[250px] min-w-[220px]
      bg-gradient-to-b from-[#0073B1] to-[#005C99] shadow-xl rounded-r-3xl py-8"
    >
      {/* Top Branding */}
      <div className="px-8 pb-8">
        <h1 className="text-white font-bold text-2xl tracking-tight select-none">
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
                    "flex items-center gap-3 px-7 py-3 mx-2 my-0.5 rounded-xl font-medium text-base transition-all select-none",
                    "text-white/80 hover:bg-white/15 hover:text-white focus:outline-none",
                    isActive &&
                      "bg-white text-[#1995dd] font-semibold shadow-lg pointer-events-none"
                  )}
                  style={{
                    minHeight: 48,
                    letterSpacing: "0.01em",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    size={21}
                    className={clsx(
                      isActive ? "text-[#1995dd]" : "text-white/80",
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
      <div className="mb-2 mt-6 px-5">
        <Link
          to={logoutItem.href}
          className="flex items-center gap-3 px-7 py-3 rounded-xl text-white/80 font-medium text-base transition-all hover:bg-white/15 hover:text-white"
          style={{
            minHeight: 48,
            letterSpacing: "0.01em",
          }}
        >
          <logoutItem.icon size={20} className="text-white/80" />
          <span>{logoutItem.label}</span>
        </Link>
      </div>
    </aside>
  );
}
