import React, { useState } from "react";
import { Search, Filter, ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: "Indoor Succulent Plants",
    category: "Plant",
    location: "San Francisco",
    price: 46,
    availableFrom: new Date("2023-06-01"),
    availableUntil: new Date("2023-12-31"),
    vendorEmail: "green@example.com",
    status: "out-of-stock",
  },
  {
    id: 2,
    title: "Cartoon Press Pen",
    category: "Gadget",
    location: "New York",
    price: 22,
    availableFrom: new Date("2023-05-15"),
    availableUntil: new Date("2023-11-15"),
    vendorEmail: "stationery@example.com",
    status: "in-stock",
  },
  {
    id: 3,
    title: "Tripod Camera Stand",
    category: "Electronic",
    location: "Los Angeles",
    price: 33,
    availableFrom: new Date("2023-07-01"),
    availableUntil: new Date("2023-10-31"),
    vendorEmail: "camera@example.com",
    status: "coming-soon",
  },
  {
    id: 4,
    title: "Smart Watch for Man",
    category: "Electronic",
    location: "Chicago",
    price: 225,
    availableFrom: new Date("2023-06-15"),
    availableUntil: new Date("2023-12-15"),
    vendorEmail: "watches@example.com",
    status: "out-of-stock",
  },
  {
    id: 5,
    title: "Stylish Headphone",
    category: "Electronic",
    location: "Miami",
    price: 155,
    availableFrom: new Date("2023-05-01"),
    availableUntil: new Date("2023-11-30"),
    vendorEmail: "audio@example.com",
    status: "in-stock",
  },
  {
    id: 6,
    title: "Sunglass for Men",
    category: "Gadget",
    location: "Seattle",
    price: 135,
    availableFrom: new Date("2023-06-01"),
    availableUntil: new Date("2023-09-30"),
    vendorEmail: "eyewear@example.com",
    status: "coming-soon",
  },
  {
    id: 7,
    title: "Wireless Gaming Mouse",
    category: "Electronic",
    location: "Austin",
    price: 155,
    availableFrom: new Date("2023-07-15"),
    availableUntil: new Date("2023-12-31"),
    vendorEmail: "gaming@example.com",
    status: "out-of-stock",
  },
  {
    id: 8,
    title: "WIWU Airbuds Pro 2",
    category: "Electronic",
    location: "Boston",
    price: 144,
    availableFrom: new Date("2023-06-01"),
    availableUntil: new Date("2023-11-30"),
    vendorEmail: "audio@example.com",
    status: "in-stock",
  },
];

// Filter schema
const filterSchema = z.object({
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
  category: z.string().optional(),
  location: z.string().optional(),
});

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState(mockListings);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter form
  const filterForm = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      dateRange: { from: undefined, to: undefined },
      category: "",
      location: "",
    },
  });

  // Get unique categories and locations for filters
  const categories = Array.from(new Set(mockListings.map(item => item.category)));
  const locations = Array.from(new Set(mockListings.map(item => item.location)));

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterListings(e.target.value, filterForm.getValues(), sortOption);
  };

  // Handle sort
  const handleSort = (option: string) => {
    setSortOption(option);
    let sortedListings = [...listings];
    
    switch (option) {
      case "price-asc":
        sortedListings.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedListings.sort((a, b) => b.price - a.price);
        break;
      case "date-desc":
        sortedListings.sort((a, b) => b.availableFrom.getTime() - a.availableFrom.getTime());
        break;
      case "available-soon":
        sortedListings.sort((a, b) => a.availableFrom.getTime() - b.availableFrom.getTime());
        break;
      default:
        break;
    }
    
    setListings(sortedListings);
  };

  // Handle filters
  const onFilterSubmit = (data: z.infer<typeof filterSchema>) => {
    filterListings(searchQuery, data, sortOption);
  };

  const filterListings = (query: string, filters: z.infer<typeof filterSchema>, sort: string) => {
    let filtered = mockListings.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(item => item.location === filters.location);
    }

    // Apply date range filter
    if (filters.dateRange?.from || filters.dateRange?.to) {
      filtered = filtered.filter(item => {
        const from = filters.dateRange?.from;
        const to = filters.dateRange?.to;

        if (from && to) {
          return item.availableFrom >= from && item.availableUntil <= to;
        } else if (from) {
          return item.availableFrom >= from;
        } else if (to) {
          return item.availableUntil <= to;
        }
        return true;
      });
    }

    // Apply sort
    if (sort) {
      handleSort(sort);
    } else {
      setListings(filtered);
    }
  };

  // Handle delete
  const handleDelete = (id: number) => {
    const updatedListings = listings.filter(item => item.id !== id);
    setListings(updatedListings);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(listings.length / itemsPerPage);

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
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            {/* Search bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search listings..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            {/* Filters popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>Filters</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <Form {...filterForm}>
                  <form onSubmit={filterForm.handleSubmit(onFilterSubmit)} className="space-y-4">
                    <h4 className="font-medium mb-2">Filter Listings</h4>
                    
                    {/* Category filter */}
                    <FormField
                      control={filterForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                              {...field}
                            >
                              <option value="">All Categories</option>
                              {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    {/* Location filter */}
                    <FormField
                      control={filterForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                              {...field}
                            >
                              <option value="">All Locations</option>
                              {locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                              ))}
                            </select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    {/* Date Range */}
                    <FormField
                      control={filterForm.control}
                      name="dateRange"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Availability Date Range</FormLabel>
                          <Calendar
                            mode="range"
                            selected={field.value}
                            onSelect={(value: any) => field.onChange(value || { from: undefined, to: undefined })}
                            className="rounded-md border pointer-events-auto"
                            numberOfMonths={1}
                          />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full mt-4">Apply Filters</Button>
                  </form>
                </Form>
              </PopoverContent>
            </Popover>
            
            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <span>Sort</span>
                  {sortOption === "price-asc" || sortOption === "available-soon" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSort("price-asc")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("price-desc")}>
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("date-desc")}>
                  Recently Added
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("available-soon")}>
                  Available Soon
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Listings table */}
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
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((listing) => (
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
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(listing.id)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      >
                        <Trash2 size={18} />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {currentItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No listings found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {listings.length > 0 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {totalPages > 5 && <PaginationEllipsis />}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="text-sm text-muted-foreground text-center mt-2">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, listings.length)} of {listings.length} entries
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
