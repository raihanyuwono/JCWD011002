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
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getStockHistory,
};
