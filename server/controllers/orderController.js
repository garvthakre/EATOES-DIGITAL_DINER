import pool from "../config/postgres.js";
import MenuItem from "../models/MenuItem.js";

// Create new order
export const createOrder = async (req, res) => {
  const client = await pool.connect();
  
  try {
    // Extract order information from request body
    const { items, contactName, contactPhone, userId, pickupTime } = req.body;
    
    // Validate required fields
    if (!items || items.length === 0 || !contactName || !contactPhone) {
      return res.status(400).json({ error: "Required fields missing" });
    }
    
    // Calculate total amount and verify menu items exist
    let totalAmount = 0;
    const verifiedItems = [];
    
    for (const item of items) {
      if (!item.menuItemId || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({ error: "Invalid item data" });
      }
      
      // Verify menu item exists in MongoDB
      try {
        const menuItem = await MenuItem.findById(item.menuItemId);
        if (!menuItem) {
          return res.status(404).json({ error: `Menu item not found: ${item.menuItemId}` });
        }
        
        // Calculate item total (including customizations if any)
        let itemPrice = menuItem.price;
        if (item.customizations && item.customizations.length > 0) {
          // Process customizations logic here if needed
          // For now, we assume customization prices are handled on the frontend
        }
        
        const itemTotal = itemPrice * item.quantity;
        totalAmount += itemTotal;
        
        // Add verified item with name for history
        verifiedItems.push({
          ...item,
          menuItemName: menuItem.name,
          unitPrice: itemPrice
        });
      } catch (error) {
        return res.status(400).json({ error: `Invalid menu item ID: ${item.menuItemId}` });
      }
    }
    
    // Begin transaction
    await client.query('BEGIN');
    
    // Insert order record
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, status, pickup_time, contact_name, contact_phone) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [userId || null, totalAmount, 'pending', pickupTime || null, contactName, contactPhone]
    );
    
    const orderId = orderResult.rows[0].id;
    
    // Insert order items
    for (const item of verifiedItems) {
      await client.query(
        `INSERT INTO order_items (order_id, menu_item_id, menu_item_name, quantity, unit_price, special_instructions, customizations) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          orderId,
          item.menuItemId,
          item.menuItemName,
          item.quantity,
          item.unitPrice,
          item.specialInstructions || null,
          item.customizations ? JSON.stringify(item.customizations) : null
        ]
      );
    }
    
    // Commit transaction
    await client.query('COMMIT');
    
    // Return order details
    res.status(201).json({
      id: orderId,
      totalAmount,
      status: 'pending',
      contactName,
      contactPhone,
      items: verifiedItems,
      pickupTime: pickupTime || null
    });
    
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  } finally {
    client.release();
  }
};

// Get orders by phone number
export const getOrdersByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    
    // Validate phone parameter
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }
    
    // Get orders for the phone number
    const orderResult = await pool.query(
      `SELECT id, order_date, total_amount, status, pickup_time, contact_name, contact_phone
       FROM orders 
       WHERE contact_phone = $1
       ORDER BY order_date DESC`,
      [phone]
    );
    
    res.json(orderResult.rows);
  } catch (error) {
    console.error("Error fetching orders by phone:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get specific order details
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate id parameter
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Valid order ID is required" });
    }
    
    // Get order details
    const orderResult = await pool.query(
      `SELECT id, user_id, order_date, total_amount, status, pickup_time, contact_name, contact_phone
       FROM orders 
       WHERE id = $1`,
      [id]
    );
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    const order = orderResult.rows[0];
    
    // Get order items
    const itemsResult = await pool.query(
      `SELECT id, menu_item_id, menu_item_name, quantity, unit_price, special_instructions, customizations
       FROM order_items 
       WHERE order_id = $1`,
      [id]
    );
    
    // Construct response
    const orderDetails = {
      ...order,
      items: itemsResult.rows.map(item => ({
        ...item,
        customizations: item.customizations ? item.customizations : null
      }))
    };
    
    res.json(orderDetails);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Failed to fetch order details" });
  }
};

// Update order status (for restaurant staff)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate parameters
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Valid order ID is required" });
    }
    
    if (!status || !['pending', 'preparing', 'ready', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: "Valid status is required" });
    }
    
    // Update order status
    const result = await pool.query(
      `UPDATE orders SET status = $1 WHERE id = $2 RETURNING id, status`,
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.json({ message: "Order status updated", order: result.rows[0] });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};