import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Online Payment"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
      default: "pending",
    },
    customerName: { type: String, default: "" },
    customerPhone: { type: String, default: "" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
