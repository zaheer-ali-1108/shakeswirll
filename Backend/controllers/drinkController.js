import Drink from "../models/drinkModel.js";

// Public: get all available drinks
export const getDrinks = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { available: true };
    if (category && category !== "all") filter.category = category;
    const drinks = await Drink.find(filter).sort({ createdAt: -1 });
    res.json(drinks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drinks" });
  }
};

// Public: get single drink
export const getDrinkById = async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) return res.status(404).json({ message: "Drink not found" });
    res.json(drink);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drink" });
  }
};

// Admin: get ALL drinks (including unavailable)
export const getAllDrinksAdmin = async (req, res) => {
  try {
    const drinks = await Drink.find().sort({ createdAt: -1 });
    res.json(drinks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drinks" });
  }
};

// Admin: create drink
export const createDrink = async (req, res) => {
  try {
    const { name, category, description, price, bgColor, available, featured, sizes } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || "";

    const drink = await Drink.create({
      name, category, description, price: Number(price),
      image, bgColor, available, featured,
      sizes: sizes ? JSON.parse(sizes) : { small: 0, medium: 0, large: 0 },
    });
    res.status(201).json({ message: "Drink created", drink });
  } catch (error) {
    res.status(500).json({ message: "Error creating drink", error: error.message });
  }
};

// Admin: update drink
export const updateDrink = async (req, res) => {
  try {
    const { name, category, description, price, bgColor, available, featured, sizes } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const updated = await Drink.findByIdAndUpdate(
      req.params.id,
      {
        name, category, description, price: Number(price),
        image, bgColor,
        available: available === "true" || available === true,
        featured: featured === "true" || featured === true,
        sizes: sizes ? JSON.parse(sizes) : undefined,
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Drink not found" });
    res.json({ message: "Drink updated", drink: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating drink", error: error.message });
  }
};

// Admin: delete drink
export const deleteDrink = async (req, res) => {
  try {
    const deleted = await Drink.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Drink not found" });
    res.json({ message: "Drink deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting drink" });
  }
};
