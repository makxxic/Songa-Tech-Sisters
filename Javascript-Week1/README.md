# Week 1 JavaScript Assignment: Order Receipt

## Project overview
This project is a simple order calculator for **Soko Fresh Juice Bar**, a fictional small business in Kenya. The program collects customer and product details, calculates the order subtotal and final cost, and displays a readable receipt in the browser's Developer Tools Console.

## Project files
- `index.html` — a basic HTML page that loads `script.js`.
- `script.js` —  order details, calculations, and Console receipt output.
- `README.md` — project description, instructions and concepts used.

## How to run the project
1. Extract the ZIP file.
2. Keep `index.html` and `script.js` in the same folder.
3. Open `index.html` in Chrome, Edge, Firefox, or another modern browser.
4. Open Developer Tools:
   - Windows/Linux: press `Ctrl + Shift + I`, or right-click the page and choose **Inspect**.
   - macOS: press `Command + Option + I`.
5. Select the **Console** tab. Refresh the page if needed.
6. The order receipt should appear in the Console, not as a receipt on the webpage.

## Sample order and calculation
- Business: Soko Fresh Juice Bar
- Customer: Wanjiku Kamau
- Product: Mango-Passion Juice (500 ml)
- Unit price: KSh 180
- Quantity: 3
- Delivery fee: KSh 100
- Discount: KSh 50

Calculations:
- Subtotal = unit price × quantity = `180 × 3 = KSh 540`
- Total cost = subtotal + delivery fee − discount = `540 + 100 − 50 = KSh 590`

Expected total: **KSh 590**

## Week 1 concepts demonstrated
- Variables declared with `const` and `let`
- Strings for text and numbers for prices and quantity
- Arithmetic operators: multiplication (`*`), addition (`+`), and subtraction (`-`)
- Expressions and calculated values
- A template literal to format a multi-line receipt
- `console.log()` to display the receipt
- Comments to explain the code
- An HTML `<script>` element connecting the JavaScript file to the page
- Basic testing and debugging steps

