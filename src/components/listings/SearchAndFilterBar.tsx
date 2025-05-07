
import React from "react";
import { Search, Filter, ArrowDown, ArrowUp, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { DateRange } from "react-day-picker";

// Filter schema
const filterSchema = z.object({
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
  category: z.string().optional(),
  location: z.string().optional(),
});

export type FilterValues = z.infer<typeof filterSchema>;

interface SearchAndFilterBarProps {
  categories: string[];
  locations: string[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterSubmit: (data: FilterValues) => void;
  onSortChange: (option: string) => void;
  sortOption: string;
  onAddListing: () => void;
}

export function SearchAndFilterBar({
  categories,
  locations,
  searchQuery,
  onSearchChange,
  onFilterSubmit,
  onSortChange,
  sortOption,
  onAddListing,
}: SearchAndFilterBarProps) {
  // Filter form
  const filterForm = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      dateRange: undefined,
      category: "",
      location: "",
    },
  });

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        {/* Search bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search listings..."
            className="pl-10"
            value={searchQuery}
            onChange={onSearchChange}
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
                        selected={field.value as DateRange}
                        onSelect={(value) => {
                          field.onChange(value || undefined);
                        }}
                        className="rounded-md border"
                        numberOfMonths={1}
                        classNames={{
                          root: "p-3 pointer-events-auto"
                        }}
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
            <DropdownMenuItem onClick={() => onSortChange("price-asc")}>
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("price-desc")}>
              Price: High to Low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("date-desc")}>
              Recently Added
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("available-soon")}>
              Available Soon
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Add Listing Button */}
      <Button 
        onClick={onAddListing}
        className="bg-brand-purple hover:bg-brand-purple/90 text-white ml-auto"
      >
        <Plus size={16} className="mr-2" />
        Add Listing
      </Button>
    </div>
  );
}
