const db = require('../../database/models')
const Product = db.product
const Warehouse = db.warehouse
const ProductWarehouse = db.product_warehouse
const { messages } = require('../../helpers')
const { Op } = require('sequelize')

const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id }, include: [
        {
          model: ProductWarehouse,
          attributes: ["stock"],
          include: {
            model: Warehouse,
            attributes: ["name"]
          }
        }
      ]
    })
    if (!product) return res.status(404).json({ message: "Product not found" })
    return res.status(200).json({
      message: "Product retrieved successfully",
      data: product,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = getProductById