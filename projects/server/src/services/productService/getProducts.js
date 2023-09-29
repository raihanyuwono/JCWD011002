const { col, fn, cast, Op } = require("sequelize");
const db = require("../../database");
const { messages, pagination } = require("../../helpers");

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

async function getProducts(query) {
  let {
    search = "",
    category = 0,
    page = 1,
    limit = 10,
    order = "name",
    sort = "ASC",
  } = query;
  category = parseInt(category);
  const where = {
    name: { [Op.like]: `%${search}%` },
    id_category: category,
  };
  if (category === 0) delete where.id_category;

  // Pagination
  const pages = pagination.setPagination(page, limit);

  const { count, rows: result } = await products.findAndCountAll({
    include,
    attributes: {
      include: [
        [col("_category.name"), "category"],
        [cast(fn("sum", col("product_warehouses.stock")), "int"), "stock"],
      ],
      exclude: ["id_category"],
    },
    group: ["product_warehouses.id_product"],
    order: [[order, sort]],
    where,
    subQuery: false,
    ...pages,
  });

  const payload = {
    pages: Math.ceil(count.length / limit),
    products: result,
  };

  return messages.success("", payload);
}

module.exports = getProducts;
