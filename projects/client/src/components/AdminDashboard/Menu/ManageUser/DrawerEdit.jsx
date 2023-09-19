import { Flex, Select, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getRoles } from "../../../../api/admin";
import { getWarehouses } from "../../../../api/warehouse";

const mainContainer = {
  direction: "column",
  gap: "12px",
};
const container = {
  direction: "column",
  gap: "8px",
};

function getIndexValue(items, value) {
  return items.findIndex((item) => item?.name === value);
}

function setDefaultValue(items, value) {
  const idx = getIndexValue(items, value);
  return items[idx]?.id;
}

function handleChange(event, setter) {
  const { value } = event.target;
  setter(value);
}

function DrawerEdit({ data }) {
  const { user, warehouse: defaultWarehouse } = data;
  const [roles, setRoles] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedRole, setSelectedRole] = useState(0);
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);
  const toast = useToast();

  async function fetchRoles() {
    const { data } = await getRoles(toast);
    setRoles(data);
    setSelectedRole(setDefaultValue(data, user?.role?.name));
  }

  async function fetchWarehouses() {
    const { data } = await getWarehouses(toast);
    setWarehouses(data);
    setSelectedWarehouse(setDefaultValue(data, defaultWarehouse?.name));
  }

  useEffect(() => {
    fetchRoles();
    fetchWarehouses();
  }, []);

  const selectRolesAttr = {
    textTransform: "capitalize",
    value: selectedRole,
    onChange: (e) => handleChange(e, setSelectedRole),
  };
  const selectWarehousesAttr = {
    textTransform: "capitalize",
    value: selectedWarehouse,
    onChange: (e) => handleChange(e, setSelectedWarehouse),
  };

  return (
    <Flex {...mainContainer}>
      <Flex {...container}>
        <Text>Role</Text>
        <Select {...selectRolesAttr}>
          {roles.map((role) => (
            <option
              key={role?.id}
              value={role?.id}
              style={{ color: "black", textTransform: "capitalize" }}
            >
              {role?.name}
            </option>
          ))}
        </Select>
      </Flex>
      {selectedRole !== 0 &&
        selectedRole !== roles[getIndexValue(roles, "admin")]?.id && (
          <Flex {...container}>
            <Text>Warehouse</Text>
            <Select {...selectWarehousesAttr}>
              {warehouses.map((warehouse) => (
                <option
                  key={warehouse?.id}
                  value={warehouse?.id}
                  style={{ color: "black", textTransform: "capitalize" }}
                >
                  {warehouse?.name}
                </option>
              ))}
            </Select>
          </Flex>
        )}
    </Flex>
  );
}

export default DrawerEdit;
