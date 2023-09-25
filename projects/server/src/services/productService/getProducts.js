const db = require("../../database");

const products = db["product"];
const product_warehouses = db["product_warehouses"];

async function getProducts(attributes) {
  const result = await products.findAll();
  return result
}

module.exports = getProducts;
