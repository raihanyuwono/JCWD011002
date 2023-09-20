const { warehouse } = require('../../database/models')
const { messages } = require('../../helpers')

const getWarehouse = async () => {
  try {
    const result = await warehouse.findAll()
    return messages.success('successfully get warehouse', result)
  } catch (error) {
    return messages.error(500, error.message);
  }
}

module.exports = getWarehouse