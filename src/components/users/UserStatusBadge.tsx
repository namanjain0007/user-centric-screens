
import { cn } from "@/lib/utils";

type UserStatus = "active" | "warning" | "blocked";

interface UserStatusBadgeProps {
  status: UserStatus;
  className?: string;
}

export function UserStatusBadge({ status, className }: UserStatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        status === "active" && "bg-green-100 text-status-active",
        status === "warning" && "bg-yellow-100 text-status-warning",
        status === "blocked" && "bg-red-100 text-status-blocked",
        className
      )}
    >
      <span
        className={cn(
          "mr-1 h-1.5 w-1.5 rounded-full",
          status === "active" && "bg-status-active",
          status === "warning" && "bg-status-warning",
          status === "blocked" && "bg-status-blocked"
        )}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
}
