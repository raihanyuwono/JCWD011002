const { Op, Sequelize } = require("sequelize");
const models = require("../../database");

const getSalesProductMonthly = async (
  page = 1,
  pageSize = 10,
  filterByMonth,
  filterByYear = new Date().getFullYear(),
  orderBy
) => {
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  try {
    const whereClause = {};
    if (filterByMonth && filterByYear) {
      whereClause.created_at = {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("created_at")),
            filterByYear
          ),
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("created_at")),
            filterByMonth
          ),
        ],
      };
    }

    const transactions = await models.transaction.findAll({
      include: [
        {
          model: models.transaction_product,
          attributes: ["id", "qty", "price"],
          include: [
            {
              model: models.product,
              attributes: ["id", "name", "image"],
            },
          ],
        },
      ],
      where: whereClause,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const monthlySalesData = {};
    let idCounter = 1;

    transactions.forEach((transaction) => {
      const month = new Date(transaction.created_at).getMonth() + 1;
      const year = new Date(transaction.created_at).getFullYear();
      const key = `${year}-${month}`;

      if (!monthlySalesData[key]) {
        monthlySalesData[key] = {
          id: idCounter,
          month,
          year,
          total_sales_monthly: 0,
          month_sales: [],
        //   created_at: transaction.created_at,
        };
        idCounter++;
      }

      const monthSale = monthlySalesData[key];

      transaction.transaction_products.forEach((productTransaction) => {
        const productData = productTransaction.product;
        const existingProduct = monthSale.month_sales.find(
          (item) => item.product_id === productData.id
        );

        if (!existingProduct) {
          monthSale.month_sales.push({
            product_id: productData.id,
            product_name: productData.name,
            image: productData.image,
            total_qty_sold_product: productTransaction.qty,
            detail_product_sales: [
              {
                data_id: transaction.id,
                transaction_id: transaction.id,
                transaction_date:
                  transaction.created_at.toLocaleDateString("id"),
                qty: productTransaction.qty,
                price: productTransaction.price,
              },
            ],
          });
        } else {
          existingProduct.total_qty_sold_product += productTransaction.qty;
          existingProduct.detail_product_sales.push({
            data_id: transaction.id,
            transaction_id: transaction.id,
            transaction_date: transaction.created_at.toLocaleDateString("id"),
            qty: productTransaction.qty,
            price: productTransaction.price,
          });
        }

        monthSale.total_sales_monthly +=
          productTransaction.price * productTransaction.qty;
      });
    });

    const monthlySalesArray = Object.values(monthlySalesData);

    if (orderBy === "total_sales_monthly asc") {
      monthlySalesArray.sort(
        (a, b) => a.total_sales_monthly - b.total_sales_monthly
      );
    } else if (orderBy === "total_sales_monthly desc") {
      monthlySalesArray.sort(
        (a, b) => b.total_sales_monthly - a.total_sales_monthly
      );
    }

    if (orderBy === "created_at asc") {
      monthlySalesArray.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else if (orderBy === "created_at desc") {
      monthlySalesArray.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    }

    const totalPage = Math.ceil(monthlySalesArray.length / pageSize);

    return {
      totalPage,
      totalItems: monthlySalesArray.length,
      pageSize,
      currentPage: page,
      data: monthlySalesArray,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getSalesProductMonthly;
