import cloudinary from "../lib/cloudinary.js";
import Category from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find({}); // find all categorys
		res.json({categories });
	} catch (error) {
		console.log("Error in getAllCategories controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const createCategory = async (req, res) => {
	try {
		const { name, link, image } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "categories" });
		}

		const category = await Category.create({
			name,
			link,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
		});

		res.status(201).json(category);
	} catch (error) {
		console.log("Error in createCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteCategory = async (req, res) => {
	try {
		const category= await Category.findById(req.params.id);

		if (!category) {
			return res.status(404).json({ message: "category not found" });
		}

		if (category.image) {
			const publicId = category.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`categories/${publicId}`);
				console.log("deleted image from cloudinary");
			} catch (error) {
				console.log("error deleting image from cloudinary", error);
			}
		}

		await Category.findByIdAndDelete(req.params.id);

		res.json({ message: "category deleted successfully" });
	} catch (error) {
		console.log("Error in deletecategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

