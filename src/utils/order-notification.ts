import type { TOrder } from "../models/order.model"
import { sendOrderNotification, sendOrderConfirmationToCustomer } from "../utils/email"

// This middleware function can be called after an order is created
export const notifyOrderCreated = async (order: TOrder) => {
  try {
    // Send notification to admin
    const adminNotification = await sendOrderNotification(order)

    // Send confirmation to customer
    const customerConfirmation = await sendOrderConfirmationToCustomer(order)

    return {
      success: true,
      adminEmail: adminNotification,
      customerEmail: customerConfirmation,
    }
  } catch (error) {
    console.error("Failed to send order notifications:", error)
    return { success: false, error }
  }
}
