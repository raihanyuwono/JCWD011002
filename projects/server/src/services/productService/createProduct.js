const { product, sequelize } = require('../../database/models')
const { messages } = require('../../helpers')

const createProduct = async (req, res) => {
  try {
    const { name, price, id_category, is_active, description } = req.body
    const image = req.file.path

    await sequelize.transaction(async (t) => {
      const result = await product.create({
        name,
        price,
        image: image,
        description,
        is_active,
        id_category
      }, { transaction: t })

      // return messages.success('successfully created product', result)
      return res.status(201).json(result)
    })
  }
  catch (error) {
    console.log(error)
    return messages.error(500, error.message || 'Internal server error')
  }
}

module.exports = createProduct