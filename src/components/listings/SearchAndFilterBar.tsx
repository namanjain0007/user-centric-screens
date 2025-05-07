import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchAndFilterBar() {
  return (
    <div className="flex items-center justify-between space-x-4 py-4">
      <Input
        placeholder="Search listings..."
        className="max-w-sm"
      />
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add New Listing
      </Button>
    </div>
  );
}import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchAndFilterBar() {
  return (
    <div className="flex items-center justify-between space-x-4 py-4">
      <Input
        placeholder="Search listings..."
        className="max-w-sm"
      />
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add New Listing
      </Button>
    </div>
  );
}
