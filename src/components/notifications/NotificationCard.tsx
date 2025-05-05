
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "./NotificationIcons";

export interface NotificationItem {
  id: string;
  type: "leave" | "contract" | "meeting" | "renewal" | "team" | "submitted";
  title: string;
  date: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
  };
  isUnread: boolean;
}

export function NotificationCard({ notification }: { notification: NotificationItem }) {
  return (
    <div
      className={`relative flex gap-3 rounded-lg border p-3 transition-colors ${
        notification.isUnread ? "bg-primary/5" : ""
      }`}
    >
      {/* Icon or avatar */}
      {notification.user ? (
        <Avatar>
          <AvatarImage src={notification.user.avatar} />
          <AvatarFallback>
            {notification.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Icon type={notification.type} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm">{notification.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {notification.date} • {notification.time}
        </p>
      </div>

      {/* Unread indicator */}
      {notification.isUnread && (
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-brand-red"></div>
      )}
    </div>
  );
}
