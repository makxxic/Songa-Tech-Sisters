# Week 2: Product Inventory Manager

## Project overview

This project is a simple JavaScript inventory manager for **Soko Fresh Mini-Mart**, a fictional Kenyan shop. It stores product names, unit prices, and quantities in stock, calculates the value of each product's stock, calculates the total inventory value, and identifies products that need restocking.

The report appears in the browser Developer Tools Console. 

## Low-stock rule

A product is flagged for restocking when its quantity is **5 units or fewer**.  Products with zero units are labelled **OUT OF STOCK** so they stand out in the report.

## Files

- `index.html` — a basic HTML page that loads the JavaScript file.
- `script.js` — product data, stock calculations, array operations, and the Console report.
- `README.md` — project description and instructions.

## How to run the project

1. Download or clone this project folder.
2. Open `index.html` in a browser such as Chrome.
3. Open Developer Tools:
   - Windows/Linux: press `F12` or `Ctrl + Shift + J` in Chrome.
   - Alternatively, right-click the page, choose **Inspect**, then select **Console**.
4. Read the inventory report in the Console.
5. To experiment, edit the `products` array in `script.js`, save the file, and refresh the browser.

No server, package installation, or external library is required.

## JavaScript concepts used

- **Variables and data types:** `const`, `let`, strings, and numbers.
- **Objects and arrays:** each product is an object, and `products` is an array of those objects.
- **Operators and calculations:** multiplication calculates each stock value; addition calculates the total value.
- **Template literals:** combine product details and calculations into readable Console messages.
- **Functions:** `calculateStockValue()`, `formatCurrency()`, and `displayInventoryReport()` organize reusable tasks.
- **Conditions:** `if...else` and conditional expressions assign stock statuses and handle the restocking list.
- **Array methods:**
  - `map()` creates product records that include calculated stock values.
  - `filter()` selects products at or below the low-stock threshold.
  - `find()` looks up the first product with a matching name.
  - `forEach()` displays products and adds their stock values.
- **Debugging and testing:** check the calculations by changing prices and quantities and comparing the output.

## Sample data and calculation checks

The sample inventory contains seven products. The stock value formula is:

`Stock value = unit price × quantity in stock`

The total inventory value for the supplied sample data should be **KSh 7,735.00**.

Products expected in the restocking list:
- Cooking Oil (1 L): 4 units
- Sugar (1 kg): 3 units
- Milk (500 ml): 5 units
- Bread: 2 units
- Eggs (tray): 0 units (out of stock)

