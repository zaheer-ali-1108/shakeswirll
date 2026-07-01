import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { product, size, price, paymentMethod, customerName, customerPhone } = req.body;
    if (!product || !size || !price || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const order = await Order.create({ product, size, price, paymentMethod, customerName, customerPhone });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error while placing order" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
};
