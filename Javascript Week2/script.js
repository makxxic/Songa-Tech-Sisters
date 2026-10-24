// Soko Fresh Mini-Mart Inventory Manager
// Week 2 JavaScript Assignment
// Stock is considered low when quantity is 5 units or fewer.

const shopName = "Soko Fresh Mini-Mart";
const lowStockThreshold = 5;

// Each product is an object. The array stores all product records.
const products = [
    { name: "Maize Flour (2 kg)", price: 180, quantity: 12 },
    { name: "Cooking Oil (1 L)", price: 320, quantity: 4 },
    { name: "Sugar (1 kg)", price: 170, quantity: 3 },
    { name: "Rice (1 kg)", price: 220, quantity: 15 },
    { name: "Milk (500 ml)", price: 65, quantity: 5 },
    { name: "Bread", price: 80, quantity: 2 },
    { name: "Eggs (tray)", price: 450, quantity: 0 }
];

// Reusable function: calculate the value of one product's stock.
function calculateStockValue(product) {
    return product.price * product.quantity;
}

// Reusable function: format amounts as Kenyan shillings.
function formatCurrency(amount) {
    return `KSh ${amount.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

// Create a new array with each product's calculated stock value.
// map() transforms each product record without changing the original array.
const inventoryReport = products.map(product => ({
    ...product,
    stockValue: calculateStockValue(product)
}));

// filter() returns every product at or below the chosen low-stock threshold.
const lowStockProducts = inventoryReport.filter(
    product => product.quantity <= lowStockThreshold
);

// find() returns the first product matching the requested name.
// Change searchProductName to test another product or a name that does not exist.
const searchProductName = "Cooking Oil (1 L)";
const productToFind = inventoryReport.find(
    product => product.name === searchProductName
);

// Add the stock values together to calculate the total inventory value.
let totalInventoryValue = 0;
inventoryReport.forEach(product => {
    totalInventoryValue += product.stockValue;
});

// Display a readable report in the browser Console.
function displayInventoryReport() {
    console.log(`${shopName.toUpperCase()} — INVENTORY REPORT`);
    console.log(`Number of different products: ${inventoryReport.length}`);
    console.log(`Low-stock rule: ${lowStockThreshold} units or fewer`);
    console.log("");

    console.log("PRODUCT DETAILS");

    inventoryReport.forEach((product, index) => {
        const stockStatus = product.quantity === 0
            ? "OUT OF STOCK"
            : product.quantity <= lowStockThreshold
                ? "LOW STOCK"
                : "In stock";

        console.log(
            `${index + 1}. ${product.name} | ` +
            `Unit price: ${formatCurrency(product.price)} | ` +
            `Quantity: ${product.quantity} | ` +
            `Stock value: ${formatCurrency(product.stockValue)} | ` +
            `Status: ${stockStatus}`
        );
    });

    console.log(`TOTAL INVENTORY VALUE: ${formatCurrency(totalInventoryValue)}`);
    console.log("");

    console.log("PRODUCTS THAT NEED RESTOCKING");

    if (lowStockProducts.length > 0) {
        lowStockProducts.forEach(product => {
            const status = product.quantity === 0
                ? "OUT OF STOCK — restock immediately"
                : `Only ${product.quantity} unit(s) left`;

            console.log(`${product.name}: ${status}`);
        });
    } else {
        console.log("No products currently need restocking.");
    }

    console.log("");
    console.log("PRODUCT LOOKUP");

    if (productToFind) {
        console.log(
            `Found: ${productToFind.name} | ` +
            `Quantity: ${productToFind.quantity} | ` +
            `Stock value: ${formatCurrency(productToFind.stockValue)}`
        );
    } else {
        console.log(`No product found with the name "${searchProductName}".`);
    }

}

// Run the report.
displayInventoryReport();
