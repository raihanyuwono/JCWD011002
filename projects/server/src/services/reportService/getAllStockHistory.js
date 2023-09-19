const { Op } = require("sequelize");
const { stock_history, sequelize, product } = require("../../database");

const getAllStockHistory = async (
  filterByMonth,
  filterByYear,
  page = 1,
  pageSize = 12,
  orderBy = "desc"
) => {
  try {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31, 23, 59, 59);

    const whereClause = {
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    };

    if (filterByMonth) {
      whereClause.created_at = {
        [Op.and]: [
          whereClause.created_at,
          sequelize.where(
            sequelize.fn("MONTH", sequelize.col("created_at")),
            filterByMonth
          ),
        ],
      };
    }

    if (filterByYear) {
      whereClause.created_at = {
        [Op.and]: [
          whereClause.created_at,
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("created_at")),
            filterByYear
          ),
        ],
      };
    }

    const allProducts = await product.findAll();

    const stockMutations = await Promise.all(
      allProducts.map(async (productItem) => {
        const lastStockPerMonth = await stock_history.findAll({
          attributes: [
            [
              sequelize.fn("MAX", sequelize.col("created_at")),
              "max_created_at",
            ],
            [sequelize.fn("MONTH", sequelize.col("created_at")), "month"],
            [sequelize.fn("YEAR", sequelize.col("created_at")), "year"],
          ],
          where: {
            created_at: whereClause.created_at,
            id_product: productItem.id,
          },
          group: ["month", "year"],
        });

        return Promise.all(
          lastStockPerMonth.map(async (row) => {
            const { max_created_at, month, year } = row.dataValues;

            const lastStock = await stock_history.findOne({
              attributes: [
                "id_product",
                [sequelize.literal("last_stock"), "last_stock"],
              ],
              where: {
                created_at: max_created_at,
                id_product: productItem.id,
              },
              include: [
                {
                  model: product,
                  attributes: ["id", "name"],
                },
              ],
            });

            const firstDayOfMonth = new Date(year, month - 1, 1);
            const lastDayOfMonth = new Date(year, month, 0, 23, 59, 59);

            const subtractionQty = await stock_history.sum("qty", {
              where: {
                created_at: {
                  [Op.between]: [firstDayOfMonth, lastDayOfMonth],
                },
                id_warehouse_to: null,
                id_product: productItem.id,
              },
            });

            const additionQty = await stock_history.sum("qty", {
              where: {
                created_at: {
                  [Op.between]: [firstDayOfMonth, lastDayOfMonth],
                },
                id_warehouse_to: {
                  [Op.not]: null,
                },
                id_warehouse_from: {
                  [Op.ne]: sequelize.col("id_warehouse_to"),
                },
                id_product: productItem.id,
              },
            });

            return {
              id: productItem.id,
              product_name: productItem.name,
              last_stock: lastStock ? lastStock.dataValues.last_stock : 0,
              month,
              year,
              subtraction_qty: subtractionQty || 0,
              addition_qty: additionQty || 0,
            };
          })
        );
      })
    );

    const groupedStockMutations = {};
    stockMutations.flat().forEach((mutation) => {
      const { month, year } = mutation;
      if (!groupedStockMutations[`${month}-${year}`]) {
        groupedStockMutations[`${month}-${year}`] = {
          month,
          year,
          subtraction_qty: 0,
          addition_qty: 0,
          last_stock: [],
        };
      }
      groupedStockMutations[`${month}-${year}`].last_stock.push({
        id: mutation.id,
        product_name: mutation.product_name,
        last_stock: mutation.last_stock,
      });
      groupedStockMutations[`${month}-${year}`].subtraction_qty +=
        mutation.subtraction_qty;
      groupedStockMutations[`${month}-${year}`].addition_qty +=
        mutation.addition_qty;
    });

    const result = Object.values(groupedStockMutations);

    result.sort((a, b) => {
      if (orderBy === "asc") {
        return a.year !== b.year ? a.year - b.year : a.month - b.month;
      } else {
        return b.year !== a.year ? b.year - a.year : b.month - a.month;
      }
    });

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const paginatedResult = result.slice(startIndex, endIndex);
    const totalItems = result.length;
    const totalPage = Math.ceil(totalItems / pageSize);
    const currentPage = page;

    const resultData = {
      total_page: totalPage,
      current_page: currentPage,
      total_items: totalItems,
      data: paginatedResult,
    };

    return resultData;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getAllStockHistory;
