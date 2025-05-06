
import React from "react";
import { format } from "date-fns";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Listing {
  id: number;
  title: string;
  description?: string;
  category: string;
  location: string;
  price: number;
  availableFrom: Date;
  availableUntil: Date;
  vendorEmail: string;
  status: string;
  image?: File | null;
}

interface ListingsTableProps {
  listings: Listing[];
  onEdit: (listing: Listing) => void;
  onDelete: (id: number) => void;
}

export function ListingsTable({ listings, onEdit, onDelete }: ListingsTableProps) {
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "in-stock") {
      return <Badge className="bg-green-100 text-status-active hover:bg-green-100">In Stock</Badge>;
    } else if (status === "out-of-stock") {
      return <Badge className="bg-red-100 text-status-blocked hover:bg-red-100">Out of Stock</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-status-warning hover:bg-yellow-100">Coming Soon</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Vendor Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.map((listing) => (
            <TableRow key={listing.id}>
              <TableCell className="font-medium">{listing.title}</TableCell>
              <TableCell>{listing.category}</TableCell>
              <TableCell>{listing.location}</TableCell>
              <TableCell>${listing.price.toFixed(2)}</TableCell>
              <TableCell>
                {format(listing.availableFrom, "MMM d, yyyy")} - {format(listing.availableUntil, "MMM d, yyyy")}
              </TableCell>
              <TableCell>{listing.vendorEmail}</TableCell>
              <TableCell>
                <StatusBadge status={listing.status} />
              </TableCell>
              <TableCell className="text-right space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(listing)}
                  className="hover:bg-secondary"
                >
                  <Pencil size={18} />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(listing.id)}
                  className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                >
                  <Trash2 size={18} />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {listings.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                No listings found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
