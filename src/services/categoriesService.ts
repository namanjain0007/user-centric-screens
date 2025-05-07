
import { Category } from "../types/category";

// Mock data for categories
const mockCategories: Category[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Home & Kitchen" },
  { id: "3", name: "Books" },
  { id: "4", name: "Fashion" },
  { id: "5", name: "Sports" },
  { id: "6", name: "Beauty" },
];

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockCategories]), 300);
  });
};

// Add a new category
export const addCategory = async (name: string): Promise<Category> => {
  // Simulating API call to add a category
  return new Promise((resolve) => {
    const newCategory = {
      id: (mockCategories.length + 1).toString(),
      name,
    };
    mockCategories.push(newCategory);
    setTimeout(() => resolve(newCategory), 300);
  });
};

// Update an existing category
export const updateCategory = async (id: string, name: string): Promise<Category> => {
  // Simulating API call to update a category
  return new Promise((resolve, reject) => {
    const categoryIndex = mockCategories.findIndex((cat) => cat.id === id);
    if (categoryIndex === -1) {
      reject(new Error("Category not found"));
      return;
    }
    mockCategories[categoryIndex].name = name;
    setTimeout(() => resolve(mockCategories[categoryIndex]), 300);
  });
};

// Delete a category
export const deleteCategory = async (id: string): Promise<boolean> => {
  // Simulating API call to delete a category
  return new Promise((resolve, reject) => {
    const categoryIndex = mockCategories.findIndex((cat) => cat.id === id);
    if (categoryIndex === -1) {
      reject(new Error("Category not found"));
      return;
    }
    mockCategories.splice(categoryIndex, 1);
    setTimeout(() => resolve(true), 300);
  });
};
