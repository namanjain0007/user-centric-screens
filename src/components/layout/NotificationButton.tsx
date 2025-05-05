
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { NotificationsPanel } from "@/components/notifications/NotificationsPanel";
import { createPortal } from "react-dom";

export function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const unreadCount = 5; // This would be dynamic in a real app

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // This component will automatically inject itself into the header
  const NotificationPortal = () => {
    const headerElement = document.querySelector('.header-right-section');
    
    if (!headerElement) return null;
    
    return createPortal(
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-brand-red text-white"
                variant="outline"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0 w-full sm:max-w-lg">
          <NotificationsPanel onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>,
      headerElement
    );
  };

  return mounted ? <NotificationPortal /> : null;
}
