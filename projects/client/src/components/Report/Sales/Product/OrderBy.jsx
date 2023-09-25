import React, { useEffect, useState } from "react";
import { Flex, Select } from "@chakra-ui/react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const OrderBy = ({
  orderBy,
  setOrderBy,
  productId,
  setProductId,
  warehouseId,
  setWarehouseId,
}) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const decode = jwt_decode(localStorage.getItem("token"));
  const role = decode.role;
  const [wh, setWh] = useState("");

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleWarehouseChange = (e) => {
    setWarehouseId(e.target.value);
  };

  const handleProductChange = (e) => {
    setProductId(e.target.value);
  };

  const fetchWarehouse = async () => {
    try {
      const response = await axios.get(`${API_URL}/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataWarehouse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWHAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/roles/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWh(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  useEffect(() => {
    fetchWHAdmin();
    if (role === "admin warehouse" && wh.id_warehouse) {
      setWarehouseId(wh.id_warehouse);
    } else {
      setWarehouseId("");
    }
  }, [role, wh, setWarehouseId]);

  return (
    <>
      {role === "admin warehouse" ? (
        <Select
          ml={2}
          w={"20vw"}
          color={"black"}
          bg={"white"}
          value={warehouseId}
          onChange={handleWarehouseChange}
          disabled={true}
        >
          <option value={wh.id_warehouse}>{wh.warehouse_name}</option>
        </Select>
      ) : (
        <Select
          ml={2}
          w={"20vw"}
          color={"black"}
          bg={"white"}
          placeholder="All Warehouse"
          value={warehouseId}
          onChange={handleWarehouseChange}
        >
          {dataWarehouse.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </Select>
      )}
      <Select
        ml={2}
        w={"20vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Product"
        value={productId}
        onChange={handleProductChange}
      >
        <option value="1">Seagate 1TB</option>
        <option value="2">RTX 3090</option>
        <option value="3">Samsung Curve Monitor</option>
        <option value="4">AMD Radeon Supra X</option>
      </Select>
      <Select
        ml={2}
        w={"20vw"}
        color={"black"}
        bg={"white"}
        placeholder="Sort By"
        value={orderBy}
        onChange={handleOrderChange}
      >
        <option value="total_qty_sold asc">TOTAL : ASC</option>
        <option value="total_qty_sold desc">TOTAL : DESC</option>
        <option value="month_year asc">DATE : ASC</option>
        <option value="month_year desc">DATE : DESC</option>
      </Select>
    </>
  );
};

export default OrderBy;
