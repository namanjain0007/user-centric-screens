import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Users, LayoutDashboard, Bell, Settings, HelpCircle, CreditCard, Search, ListOrdered, Shield, DollarSign, FolderTree } from "lucide-react";
import { Input } from "@/components/ui/input";
interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
}
const NavItem = ({
  href,
  icon,
  title,
  isActive
}: NavItemProps) => {
  return <Link to={href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground")}>
      {icon}
      <span>{title}</span>
    </Link>;
};
const NavSection = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return <div className="space-y-2">
      <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
        {title}
      </h2>
      <div className="space-y-1">{children}</div>
    </div>;
};
export function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return;
}