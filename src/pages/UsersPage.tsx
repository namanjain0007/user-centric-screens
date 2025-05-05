
import { UserTable } from "@/components/users/UserTable";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Users Management</h1>
        <Button className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>
      <UserTable />
    </div>
  );
}
