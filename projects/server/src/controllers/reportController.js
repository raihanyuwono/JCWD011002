const { messages } = require("../helpers");
const { reportService } = require("../services");

const getStockHistory = async (req, res) => {
  try {
    const {
      warehouseFrom,
      warehouseTo,
      transactionId,
      startDate,
      endDate,
      page,
      pageSize,
      orderBy,
      searchProduct,
      productId,
    } = req.query;
    const result = await reportService.getStockHistory({
      warehouseFrom,
      warehouseTo,
      transactionId,
      startDate,
      endDate,
      page,
      pageSize,
      orderBy,
      searchProduct,
      productId,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllStockHistory = async (req, res) => {
  try {
    const { filterByMonth, filterByYear, page, pageSize, orderBy } = req.query;
    const result = await reportService.getAllStockHistory(
      filterByMonth,
      filterByYear,
      page,
      pageSize,
      orderBy
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getStockHistory,
  getAllStockHistory,
};
