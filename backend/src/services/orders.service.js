import Order from "../models/Order.js";
import CustomerShippingAddress from "../models/CustomerShippingAddress.js";
import sequelize from "../config/db.config.js";

export async function createOrder({
  userId,
  items,
  shippingDetails,
  subtotal,
  tax,
  discount,
  totalAmount,
}) {
  return await sequelize.transaction(async (transaction) => {
    // 1. Save or Update Shipping Details
    await CustomerShippingAddress.upsert(
      {
        userId,
        phone: shippingDetails.phone,
        address: shippingDetails.address,
        city: shippingDetails.city,
        postalCode: shippingDetails.postalCode,
      },
      { transaction },
    );

    // 2. Generate Order Number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 3. Create Order
    const order = await Order.create(
      {
        user_id: userId,
        order_number: orderNumber,
        status: "PENDING",
        subtotal,
        tax,
        discount,
        total_amount: totalAmount,
      },
      { transaction },
    );

    return {
      message: "Order placed successfully",
      order: {
        id: order.id,
        orderNumber: order.order_number,
        totalAmount: order.total_amount,
      },
    };
  });
}

export async function getOrderByNumber(orderNumber) {
  console.log(orderNumber);
  const order = await Order.findOne({
    where: { order_number: orderNumber },
  });
  console.log(order);

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}
