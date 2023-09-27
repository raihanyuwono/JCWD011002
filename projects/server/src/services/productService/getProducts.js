const { col, fn, cast, Op } = require("sequelize");
const db = require("../../database");
const { messages } = require("../../helpers");

const products = db["product"];
const categories = db["category"];
const product_warehouses = db["product_warehouse"];

const include = [
  {
    model: product_warehouses,
    attributes: [],
  },
  {
    model: categories,
    as: "_category",
    attributes: [],
  },
];

async function getProducts(attributes) {
  const { search = "" } = attributes;
  const result = await products.findAll({
    include,
    attributes: {
      include: [
        [col("_category.name"), "category"],
        [cast(fn("sum", col("product_warehouses.stock")), "int"), "stock"],
      ],
      exclude: ["id_category"],
    },
    group: ["id_product"],
    where: {
      name: { [Op.like]: `%${search}%` },
    },
  });
  return messages.success("", result);
}

module.exports = getProducts;
