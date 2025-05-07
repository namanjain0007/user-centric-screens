import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PricingPlan } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PricingPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: PricingPlan | null;
  onSubmit: (plan: PricingPlan) => void;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "brand-purple";
}

export function PricingPlanModal({ 
  open, 
  onOpenChange, 
  initialData, 
  onSubmit,
  buttonVariant = "default"
}: PricingPlanModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [duration, setDuration] = useState<"Monthly" | "Yearly">(initialData?.duration || "Monthly");
  
  // Reset form when modal opens/closes
  useState(() => {
    if (open && initialData) {
      setName(initialData.name || "");
      setPrice(initialData.price?.toString() || "");
      setDuration(initialData.duration || "Monthly");
    } else if (!open) {
      setName("");
      setPrice("");
      setDuration("Monthly");
    }
  });
  
  const handleSubmit = () => {
    const planData: PricingPlan = {
      id: initialData?.id || "temp-id",
      name,
      price: parseFloat(price),
      duration,
    };
    onSubmit(planData);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Add"} Pricing Plan</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Basic Plan"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="pl-7"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Billing Cycle</Label>
            <RadioGroup
              value={duration}
              onValueChange={(value) => setDuration(value as "Monthly" | "Yearly")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="monthly" value="Monthly" />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="yearly" value="Yearly" />
                <Label htmlFor="yearly">Yearly</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant={buttonVariant}
          >
            {initialData ? "Save Changes" : "Add Plan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
