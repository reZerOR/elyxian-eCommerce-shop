import type { TOrder } from "../models/order.model"
import type { TProduct } from "../models/product.model"
import nodemailer from 'nodemailer'


// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Format date to a readable string
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const sendOrderNotification = async (order: TOrder) => {
  try {
    // Create the HTML content for the email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
          .logo { font-size: 24px; font-weight: bold; color: #333; }
          .order-info { margin: 20px 0; }
          .order-details { margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #777; }
          .highlight { color: #4a90e2; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Elyxian</div>
            <p>New Order Notification</p>
          </div>
          
          <div class="order-info">
            <h2>Order #${order._id}</h2>
            <p><strong>Date:</strong> ${order.createdAt ? formatDate(order.createdAt) : "N/A"}</p>
            <p><strong>Status:</strong> <span class="highlight">${order.status.toUpperCase()}</span></p>
            <p><strong>Transaction ID:</strong> ${order.transactionId || "N/A"}</p>
          </div>
          
          <div class="customer-info">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Address:</strong> ${order.address}, ${order.city}</p>
            ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ""}
          </div>
          
          <div class="order-details">
            <h3>Order Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.products
                  .map(
                    (product) => `
                  <tr>
                    <td>${typeof product.productId === "string" ? "Product ID: " + product.productId : (product.productId as TProduct).title}</td>
                    <td>${product.selectedSize}</td>
                    <td>${product.quantity}</td>
                    <td>${product.buyingPrice} Tk</td>
                    <td>${product.buyingPrice * product.quantity} Tk</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
          
          <div class="order-summary">
            <h3>Order Summary</h3>
            <p><strong>Subtotal:</strong> ${(order.total - order.deliveryCharge + (order.discount || 0))} Tk</p>
            <p><strong>Delivery Charge:</strong> ${(order.deliveryCharge)} Tk</p>
            ${order.discount ? `<p><strong>Discount:</strong> ${(order.discount)} Tk</p>` : ""}
            <p><strong>Total:</strong> <span class="highlight">${(order.total)} Tk</span></p>
            <p><strong>Delivery Option:</strong> ${order.deliveryOption}</p>
            ${order.deliveryPayment ? `<p><strong>Delivery Payment:</strong> ${order.deliveryPayment}</p>` : ""}
          </div>
          
          <div class="footer">
            <p>This is an automated email from Elyxian. Please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} Elyxian. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send the email
    const info = await transporter.sendMail({
      from: `"Elyxian Orders" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || "admin@elyxian.com",
      subject: `New Order #${order._id} - Elyxian`,
      html: htmlContent,
    })

    console.log("Order notification email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending order notification email:", error)
    return { success: false, error }
  }
}

// Add this new function after the sendOrderNotification function

export const sendOrderConfirmationToCustomer = async (order: TOrder) => {
  try {
    // Create the HTML content for the customer email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
          .logo { font-size: 24px; font-weight: bold; color: #333; }
          .message { margin: 20px 0; }
          .order-info { margin: 20px 0; }
          .order-details { margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #777; }
          .highlight { color: #4a90e2; }
          .button { display: inline-block; background-color: #4a90e2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Elyxian</div>
            <p>Order Confirmation</p>
          </div>
          
          <div class="message">
            <h2>Thank you for your order!</h2>
            <p>Dear ${order.name},</p>
            <p>We're excited to confirm that we've received your order. We're working on it now and will notify you when it ships.</p>
          </div>
          
          <div class="order-info">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> #${order._id}</p>
            <p><strong>Order Date:</strong> ${order.createdAt ? formatDate(order.createdAt) : "N/A"}</p>
            <p><strong>Order Status:</strong> <span class="highlight">${order.status.toUpperCase()}</span></p>
            ${order.transactionId ? `<p><strong>Transaction ID:</strong> ${order.transactionId}</p>` : ""}
          </div>
          
          <div class="shipping-info">
            <h3>Shipping Information</h3>
            <p><strong>Shipping Address:</strong> ${order.address}, ${order.city}</p>
            <p><strong>Delivery Method:</strong> ${order.deliveryOption}</p>
            ${order.notes ? `<p><strong>Order Notes:</strong> ${order.notes}</p>` : ""}
          </div>
          
          <div class="order-details">
            <h3>Items Ordered</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.products
                  .map(
                    (product) => `
                  <tr>
                    <td>${typeof product.productId === "string" ? "Product ID: " + product.productId : (product.productId as TProduct).title}</td>
                    <td>${product.selectedSize}</td>
                    <td>${product.quantity}</td>
                    <td>${(product.buyingPrice)} Tk</td>
                    <td>${(product.buyingPrice * product.quantity)} Tk</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
          
          <div class="order-summary">
            <h3>Order Summary</h3>
            <p><strong>Subtotal:</strong> ${(order.total - order.deliveryCharge + (order.discount || 0))} Tk</p>
            <p><strong>Delivery Charge:</strong> ${(order.deliveryCharge)} Tk</p>
            ${order.discount ? `<p><strong>Discount:</strong> ${(order.discount)} Tk</p>` : ""}
            <p><strong>Total:</strong> <span class="highlight">${(order.total)} Tk</span></p>
          </div>
          
          <div style="margin: 30px 0; text-align: center;">
            <p>If you have any questions about your order, please contact our customer service team.</p>
            <a href="mailto:support@elyxian.com" class="button">Contact Support</a>
          </div>
          
          <div class="footer">
            <p>Thank you for shopping with Elyxian!</p>
            <p>&copy; ${new Date().getFullYear()} Elyxian. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send the email
    const info = await transporter.sendMail({
      from: `"Elyxian Shop" <${process.env.SMTP_USER}>`,
      to: order.email,
      subject: `Order Confirmation #${order._id} - Elyxian`,
      html: htmlContent,
    })

    console.log("Order confirmation email sent to customer:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending order confirmation email to customer:", error)
    return { success: false, error }
  }
}
