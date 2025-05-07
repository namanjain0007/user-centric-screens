
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingPlanTable } from "@/components/pricing/PricingPlanTable";
import { PricingPlanModal } from "@/components/pricing/PricingPlanModal";
import { PricingPlan } from "@/types";

// Sample data for pricing plans
const initialPlans: PricingPlan[] = [
  {
    id: "1",
    name: "Basic Plan",
    price: 9.99,
    duration: "Monthly",
  },
  {
    id: "2",
    name: "Pro Plan",
    price: 19.99,
    duration: "Monthly",
  },
  {
    id: "3",
    name: "Business Plan",
    price: 49.99,
    duration: "Monthly",
  },
  {
    id: "4",
    name: "Enterprise",
    price: 99.99,
    duration: "Monthly",
  },
  {
    id: "5",
    name: "Annual Basic",
    price: 99.99,
    duration: "Yearly",
  },
  {
    id: "6",
    name: "Annual Pro",
    price: 199.99,
    duration: "Yearly",
  },
];

export default function PricingPlansPage() {
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<PricingPlan | null>(null);

  const handleAddPlan = () => {
    setCurrentPlan(null);
    setIsModalOpen(true);
  };

  const handleEditPlan = (plan: PricingPlan) => {
    setCurrentPlan(plan);
    setIsModalOpen(true);
  };

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const handleSubmitPlan = (plan: PricingPlan) => {
    if (currentPlan) {
      // Edit existing plan
      setPlans(plans.map(p => (p.id === plan.id ? plan : p)));
    } else {
      // Add new plan
      const newPlan = {
        ...plan,
        id: (plans.length + 1).toString(),
      };
      setPlans([...plans, newPlan]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pricing Plan Management</h1>
        <Button 
          onClick={handleAddPlan} 
          variant="brand-purple"
          className="animate-fade-in"
        >
          <Plus size={16} />
          Add Plan
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <PricingPlanTable 
          plans={plans} 
          onEdit={handleEditPlan} 
          onDelete={handleDeletePlan} 
        />
      </div>

      <PricingPlanModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={currentPlan}
        onSubmit={handleSubmitPlan}
      />
    </div>
  );
}
