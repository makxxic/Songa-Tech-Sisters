// Week 1 JavaScript Assignment
// Business scenario: a small Kenyan juice bar.
// This program calculates an order and prints a receipt in the browser Console.

// Order information
const businessName = "Soko Fresh Juice Bar";
const customerName = "Wanjiku Kamau";
const productName = "Mango-Passion Juice (500 ml)";
const unitPrice = 180;

// Use let for quantity because it may be changed while testing different orders.
let quantity = 3;

// Optional order adjustments
const deliveryFee = 100;
const discount = 50;

// Calculations
const subtotal = unitPrice * quantity;
const totalCost = subtotal + deliveryFee - discount;

// Display a readable receipt in the browser Console.
// Template literals (backticks) allow values to be inserted with ${...}.
console.log(`
========================================
          ${businessName}
             ORDER RECEIPT
========================================
Customer:       ${customerName}
Product:        ${productName}
Unit price:     KSh ${unitPrice}
Quantity:       ${quantity}
----------------------------------------
Subtotal:       KSh ${subtotal}
Delivery fee:   KSh ${deliveryFee}
Discount:       KSh ${discount}
----------------------------------------
TOTAL:          KSh ${totalCost}
========================================
Thank you for ordering with us!
========================================
`);
