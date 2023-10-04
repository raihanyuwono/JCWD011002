const db = require('../../database/models')
const Product = db.product
const Warehouse = db.warehouse
const ProductWarehouse = db.product_warehouse
const Category = db.category
const Admin = db.admin
const { messages } = require('../../helpers')
const { Op } = require('sequelize')

const getProductById = async (req, res) => {
  try {
    const id_admin = req.account.id
    const role = req.account.role
    console.log("ini id dan role", id_admin, role)
    const { id } = req.params

    const admin = await Admin.findOne({
      where: {
        id_user: id_admin,
      },
    })
    console.log("ini admin", admin)
    const product = await Product.findOne({
      where: { id }, include: [
        {
          model: Category,
          attributes: ["name"]
        },
        {
          model: ProductWarehouse, where: {
            id_warehouse: role === "admin warehouse" ? admin.id_warehouse : { [Op.not]: null },
          },
          attributes: ["id_warehouse", "id_product", "stock"],
          include: {
            model: Warehouse,
            attributes: ["id", "name"]
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