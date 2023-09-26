const db = require("../../database/models");
const Product = db.product;
const Category = db.category;
const { messages } = require("../../helpers");
const { Op } = require('sequelize')

const getProductList = async (req, res) => {
  try {
    const { sort, price, name, id_category, search, page, limit, status } = req.query;
    const orderBy = (field, order) => {
      return order === "desc" ? [field, "DESC"] : [field, "ASC"];
    };
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;

    let orderCriteria = [];
    if (sort) {
      orderCriteria.push(orderBy("created_at", sort));
    } else if (price) {
      orderCriteria.push(orderBy("price", price));
    } else if (name) {
      orderCriteria.push(orderBy("name", name));
    } else {
      orderCriteria.push(orderBy("created_at", "desc"));
    }

    const whereCondition = {};

    if (search) {
      whereCondition.name = {
        [Op.like]: `%${search}%`,
      };
    }

    if (id_category) whereCondition.id_category = id_category;
    if (status) whereCondition.is_active = status;
    const totalCount = await Product.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const productList = await Product.findAll({
      where: whereCondition,
      order: orderCriteria,
      include: [{ model: Category, attributes: ["name"] }, { model: db.product_warehouse, attributes: ["stock"], include: { model: db.warehouse, attributes: ["name"] } }],
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage,
    });

    return res.status(200).json({
      message: "Product list retrieved successfully",
      totalRows: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
      data: productList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error retrieving product list" });
  }
}

module.exports = getProductList