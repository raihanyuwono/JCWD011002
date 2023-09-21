const db = require("../../database/models");
const sequelize = db.sequelize;
const Product = db.product;
const { messages } = require("../../helpers")
const { Op } = require('sequelize')
const fs = require('fs')

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    const { name, price, id_category, is_active, description } = req.body
    let updateData = {
      name: name,
      price: price,
      id_category: id_category,
      is_active: is_active,
      description: description
    }
    if (req.file && req.file.path) {
      updateData.image = req.file.path;

      if (product.image && fs.existsSync(product.image)) {
        fs.unlinkSync(product.image);
      }
    }

    await sequelize.transaction(async (t) => {
      const result = await Product.update(
        updateData,
        {
          where: {
            id: id
          }
        },
        { transaction: t }
      );
      return res.status(200).json({
        message: "Product successfully updated!",
        data: updateData
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = updateProduct