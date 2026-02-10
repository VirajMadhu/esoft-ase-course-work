import Order from "../models/Order.js";
import CustomerShippingAddress from "../models/CustomerShippingAddress.js";
import sequelize from "../config/db.config.js";

// export async function createOrder({
//   userId,
//   items,
//   shippingDetails,
//   subtotal,
//   tax,
//   discount,
//   totalAmount,
// }) {
//   const transaction = await sequelize.transaction();

//   try {
//     // 1. Save or Update Shipping Details
//     await CustomerShippingAddress.upsert(
//       {
//         userId,
//         phone: shippingDetails.phone,
//         address: shippingDetails.address,
//         city: shippingDetails.city,
//         postalCode: shippingDetails.postalCode,
//       },
//       { transaction },
//     );

//     // 2. Generate Order Number
//     const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

//     // 3. Create Order
//     const order = await Order.create(
//       {
//         user_id: userId,
//         order_number: orderNumber,
//         status: "PENDING",
//         subtotal,
//         tax,
//         discount,
//         total_amount: totalAmount,
//       },
//       { transaction },
//     );

//     // 4. (Future) Handle Order Items and Stock Movements
//     // For now, we just create the order header as per the model provided
//     // In a full implementation, you'd have an OrderItem model too.

//     await transaction.commit();

//     return {
//       message: "Order placed successfully",
//       order: {
//         id: order.id,
//         orderNumber: order.order_number,
//         totalAmount: order.total_amount,
//       },
//     };
//   } catch (error) {
//     await transaction.rollback();
//     throw error;
//   }
// }

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
