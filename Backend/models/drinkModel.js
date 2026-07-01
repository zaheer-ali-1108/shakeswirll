import mongoose from "mongoose";

const drinkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["shake", "juice", "smoothie", "special"],
      required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    bgColor: { type: String, default: "#FFB347" },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    sizes: {
      small: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      large: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Drink = mongoose.model("Drink", drinkSchema);
export default Drink;
