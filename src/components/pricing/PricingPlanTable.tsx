
import React from "react";
import { Edit, Trash } from "lucide-react";
import { PricingPlan } from "@/types";
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

interface PricingPlanTableProps {
  plans: PricingPlan[];
  onEdit: (plan: PricingPlan) => void;
  onDelete: (id: string) => void;
}

export function PricingPlanTable({ plans, onEdit, onDelete }: PricingPlanTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">S.No</TableHead>
          <TableHead>Plan Name</TableHead>
          <TableHead>Price/month</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans.map((plan, index) => (
          <TableRow key={plan.id} className="hover:bg-muted/30">
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{plan.name}</TableCell>
            <TableCell>
              <Badge 
                variant="secondary" 
                className="bg-brand-blue/10 text-brand-blue font-medium"
              >
                ${plan.price.toFixed(2)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge 
                variant="outline"
                className={
                  plan.duration === "Monthly" 
                  ? "bg-brand-green/10 text-brand-green border-brand-green/20" 
                  : "bg-brand-purple/10 text-brand-purple border-brand-purple/20"
                }
              >
                {plan.duration}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(plan)}
                  className="text-brand-blue hover:text-brand-blue/80 hover:bg-brand-blue/10"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(plan.id)}
                  className="text-brand-red hover:text-brand-red/80 hover:bg-brand-red/10"
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
