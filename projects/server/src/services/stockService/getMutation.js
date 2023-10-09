const db = require("../../database/models");
const { messages } = require("../../helpers");
const stockHistory = db.stock_history;
const productWarehouse = db.product_warehouse;
const sequelize = db.sequelize;
const Admin = db.admin;
const Warehouse = db.warehouse;
const User = db.user;
const Product = db.product;
const Status = db.status;
const { Op } = require("sequelize");

const getAdmin = (id) => {
  return Admin.findOne({
    where: {
      id_user: id
    }
  })
}

const includeModel = () => {
  return [
    {
      model: User,
      attributes: ["name"]
    },
    {
      model: Warehouse,
      as: "_warehouse_from",
      attributes: ["name"]
    },
    {
      model: Warehouse,
      as: "_warehouse_to",
      attributes: ["name"]
    },
    {
      model: Product,
      attributes: ["name"]
    },
    {
      model: Status,
      attributes: ["name"]
    }
  ]
}

const getMutation = async (req, res) => {
  try {
    const { id, role } = req.account;
    const admin = await getAdmin(id);
    console.log(admin);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    let result;

    if (role === "admin") {
      result = await stockHistory.findAll({
        where: {
          [Op.or]: [
            { id_warehouse_from: { [Op.not]: null } },
            { id_warehouse_to: { [Op.not]: null } }
          ],
          [Op.or]: [
            // { id_status: 7 },
            { id_status: 8 },
            { id_status: 9 }
          ]
        },
        attributes: ["id", "id_status", "qty", "created_at", "updated_at",],
        include: includeModel(),
      });
    } else if (role === "admin warehouse") {
      result = await stockHistory.findAll({
        where: sequelize.and(
          sequelize.or(
            {
              id_warehouse_from: {
                [Op.not]: null,
                [Op.eq]: admin.id_warehouse
              }
            },
            {
              id_warehouse_to: {
                [Op.not]: null,
                [Op.eq]: admin.id_warehouse
              }
            }
          ),
          sequelize.or(
            // { id_status: 7 },
            { id_status: 8 },
            { id_status: 9 }
          )
        ),
        attributes: ["id", "id_status", "qty", "created_at", "updated_at",],
        include: includeModel(),
      });
    }

    // Pisahkan hasil dengan id_status 7 ke atas dan yang di bawahnya
    // const status7AndAbove = result.filter(item => item.id_status >= 7);
    // const belowStatus7 = result.filter(item => item.id_status < 7);

    // // Gabungkan kembali hasil di atas status 7 dan yang di bawahnya
    // result = [...status7AndAbove, ...belowStatus7];

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed"
    });
  }
};



module.exports = getMutation;
