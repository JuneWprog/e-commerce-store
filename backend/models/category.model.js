import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:[true, "Category name must be unique"],
      trim: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  { timestamps: true, versionKey: false }
);
export const Category = mongoose.model("Category", categorySchema);
export default Category;