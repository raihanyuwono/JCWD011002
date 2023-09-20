const { messages } = require("../helpers")
const { warehouseService } = require("../services")

const createWarehouse = async (req, res) => {
  try {
    const { name, address, province, city_name, postal_code } = req.body;
    const body = { name, address, province, city_name, postal_code };
    const result = await warehouseService.createWarehouse(body);
    res.status(result.status).json(messages.success(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.messages })
  }
}

const updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, province, city_name, postal_code } = req.body;
    const body = { name, address, province, city_name, postal_code };
    const result = await warehouseService.updateWarehouse(id, body);
    res.status(result.status).json(messages.success(result));
  } catch (error) {
    res.status(500).json({ message: error.messages })
  }
}

const deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await warehouseService.deleteWarehouse(id);
    res.status(result.status).json(messages.success(result));
  } catch (error) {
    res.status(500).json({ message: error.messages })
  }
}

const getWarehouse = async (req, res) => {
  try {
    const result = await warehouseService.getWarehouse();
    res.status(result.status).json(messages.success(result));
  } catch (error) {
    res.status(500).json({ message: error.messages })
  }
}

module.exports = { createWarehouse, updateWarehouse, deleteWarehouse, getWarehouse }