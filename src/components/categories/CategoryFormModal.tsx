
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required").max(50),
});

type FormValues = z.infer<typeof formSchema>;

interface CategoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => Promise<boolean | void>;
  initialValue?: string;
  mode: "add" | "edit";
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "brand-purple";
}

export function CategoryFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialValue = "",
  mode = "add",
  buttonVariant = "default",
}: CategoryFormModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValue,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const result = await onSubmit(values.name);
      if (result !== false) {
        toast.success(`Category ${mode === "add" ? "added" : "updated"} successfully`);
        form.reset();
        onOpenChange(false);
      }
    } catch (error) {
      toast.error(`Failed to ${mode} category`);
    }
  };

  React.useEffect(() => {
    if (open && initialValue) {
      form.setValue("name", initialValue);
    } else if (!open) {
      form.reset();
    }
  }, [open, initialValue, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Category" : "Edit Category"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Add a new category to your store."
              : "Edit the category name."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name"
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant={buttonVariant}>
                {mode === "add" ? "Add Category" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
