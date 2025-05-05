
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckIcon, ChevronLeft, X } from "lucide-react";
import { NotificationCard } from "./NotificationCard";
import { notifications } from "./notificationsData";

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b py-3 px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onClose}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Stay Updated with Your Latest Notifications
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center justify-between border-b py-2 px-4">
        <div className="flex gap-2">
          <Button variant="outline" className="text-sm h-8" size="sm">
            All
          </Button>
          <Button variant="ghost" className="text-sm h-8" size="sm">
            Unread ({unreadCount})
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-sm h-8 flex gap-1">
          <CheckIcon className="w-4 h-4" /> Mark all as read
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-3 px-4">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Today</h3>
          <div className="space-y-4">
            {notifications
              .filter((n) => n.date.includes("July 16"))
              .map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
          </div>

          <h3 className="mb-2 mt-6 text-sm font-medium text-muted-foreground">
            Yesterday
          </h3>
          <div className="space-y-4">
            {notifications
              .filter((n) => n.date.includes("July 15"))
              .map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
