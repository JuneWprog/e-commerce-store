import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";


export const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,

  setCategories: (categories) => set({ categories }),

  createCategory: async (categoryData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/categories", categoryData);
      set((prevState) => ({
        categories: [...prevState.categories, res.data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },
  fetchAllCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/categories");
      set({ categories: response.data.categories, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch categories", loading: false });
      toast.error(error.response.data.error || "Failed to fetch categories");
    }
  },
  deleteCategory: async (categoryId) => {
    //use it with caution, it will delete the category from the database and remove all  products associated with it
    set({ loading: true });
    try {
      await axios.delete(`/categories/${categoryId}`);
      set((prevCategories) => ({
        categories: prevCategories.categories.filter(
          (category) => category._id !== categoryId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to delete category");
    }
  },
  getCategoryNames: () => {
    const categories = get().categories;
    return categories.map((category) => category.name);
  },

  getCategoryFormatStrings: () => {
    const categories = get().categories;
    return categories.map((category) => ({
      href: `/${category.name}`,
      name: category.name,
      imageUrl: category.image,
    }));
  },
}));
