
import { useState } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserStatusBadge } from "./UserStatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface User {
  id: string;
  avatar?: string;
  name: string;
  email: string;
  city: string;
  status: "active" | "warning" | "blocked";
  createdAt: string;
}

const dummyUsers: User[] = [
  {
    id: "1",
    avatar: "/lovable-uploads/2142ba3b-0e6e-4adf-b902-a99a2b6ee5db.png",
    name: "Mark Wilson",
    email: "MarkWilson@gmail.com",
    city: "Melbourne",
    status: "active",
    createdAt: "Aug 16, 2024",
  },
  {
    id: "2",
    avatar: "/lovable-uploads/76f0a728-3281-42f7-8cde-22bd8c25894f.png",
    name: "David Smith",
    email: "Davidsmith@gmail.com",
    city: "Perth",
    status: "warning",
    createdAt: "Aug 16, 2024",
  },
  {
    id: "3",
    avatar: "/lovable-uploads/5f951dde-d045-4b18-a3a9-a23d39486e7f.png",
    name: "John Doe",
    email: "Johndoe@gmail.com",
    city: "Brisbane",
    status: "active",
    createdAt: "Aug 16, 2024",
  },
  {
    id: "4",
    avatar: "/lovable-uploads/409f1551-f6ec-4dd1-92f0-4390b768cc29.png",
    name: "Sofia Johnson",
    email: "Sofiajohnson@gmail.com",
    city: "Sydney",
    status: "active",
    createdAt: "Aug 16, 2024",
  },
  {
    id: "5",
    name: "Daniel Miller",
    email: "Danielmiller@gmail.com",
    city: "Melbourne",
    status: "blocked",
    createdAt: "Aug 16, 2024",
  },
  {
    id: "6",
    avatar: "/lovable-uploads/d179dce0-7025-459b-8dd4-b7fa7a31d46f.png",
    name: "Mark Wilson",
    email: "MarkWilson@gmail.com",
    city: "Mornington Peninsula",
    status: "active",
    createdAt: "Aug 16, 2024",
  },
];

export function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filterPeriod, setFilterPeriod] = useState("30");

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleAllSelection = () => {
    if (selectedUsers.length === dummyUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(dummyUsers.map((user) => user.id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold">User list</h2>
        <div className="flex items-center gap-2 md:ml-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for user"
              className="w-full pl-8 md:w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="shrink-0">
              Filters
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Last</span>
              <Select
                value={filterPeriod}
                onValueChange={setFilterPeriod}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedUsers.length > 0 &&
                    selectedUsers.length === dummyUsers.length
                  }
                  onCheckedChange={toggleAllSelection}
                  aria-label="Select all users"
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">Email address</TableHead>
              <TableHead className="hidden md:table-cell">City</TableHead>
              <TableHead className="hidden md:table-cell">Created date</TableHead>
              <TableHead>User status</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyUsers.map((user) => (
              <TableRow key={user.id} className="h-16">
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleUserSelection(user.id)}
                    aria-label={`Select ${user.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="truncate font-medium">{user.name}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                <TableCell className="hidden md:table-cell">{user.city}</TableCell>
                <TableCell className="hidden md:table-cell">{user.createdAt}</TableCell>
                <TableCell>
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Open menu"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                      <DropdownMenuItem className="text-status-blocked">
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">...</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">8</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">9</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">10</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
