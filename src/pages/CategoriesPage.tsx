import { useState, useEffect } from "react";
import { CategoryFormModal } from "@/components/categories/CategoryFormModal";
import { CategoriesTable } from "@/components/categories/CategoriesTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Category } from "@/types/category";
import { useToast } from "@/hooks/use-toast";
import { 
  getCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory 
} from "@/services/categoriesService";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (name: string) => {
    try {
      const newCategory = await addCategory(name);
      setCategories([...categories, newCategory]);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleBulkAddCategories = async (names: string[]) => {
    try {
      const newCategories = await Promise.all(names.map(name => addCategory(name)));
      setCategories([...categories, ...newCategories]);
      toast({
        title: "Success",
        description: `Added ${names.length} categories successfully`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add categories",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleEditCategory = async (name: string) => {
    if (!categoryToEdit) return;
    
    try {
      const updated = await updateCategory(categoryToEdit.id, name);
      setCategories(
        categories.map((cat) => (cat.id === updated.id ? updated : cat))
      );
      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((cat) => cat.id !== id));
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (category: Category) => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          variant="brand-purple"
          className="animate-fade-in"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <CategoriesTable
        categories={categories}
        onEdit={openEditModal}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <CategoryFormModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddCategory}
        onBulkSubmit={handleBulkAddCategories}
        mode="add"
        buttonVariant="brand-purple"
      />

      {categoryToEdit && (
        <CategoryFormModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSubmit={handleEditCategory}
          initialValue={categoryToEdit.name}
          mode="edit"
          buttonVariant="brand-purple"
        />
      )}
    </div>
  );
}
