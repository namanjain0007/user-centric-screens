import { useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { NotificationsPanel } from "../notifications/NotificationsPanel";
interface HeaderProps {
  title: string;
}
export function Header({
  title
}: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  return;
}