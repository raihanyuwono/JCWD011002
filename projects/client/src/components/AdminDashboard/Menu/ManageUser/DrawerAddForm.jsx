import { Button, Flex, Input, Select, Text, useToast } from "@chakra-ui/react";
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
const buttonAttr = {
  id: "add-admin-button",
  type: "submit",
  display: "none",
};

function setOption(item) {
  return {
    value: item?.id,
    key: item?.id,
    children: item?.name,
    style: {
      textTransform: "capitalize",
      backgroundColor: "#233947",
    },
  };
}

function renderOption(items) {
  return items.map((item) => <option {...setOption(item)} />);
}

function DrawerAddForm({ formik }) {
  const [roles, setRoles] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const toast = useToast();

  function handleChange(event, field) {
    const value = parseInt(event.target.value);
    formik.setFieldValue(field, value);
  }

  const inputEmail = {
    placeholder: "Input Email",
    value: formik?.value?.email,
    required: true,
  };
  const inputRole = {
    placeholder: "Select Role",
    textTransform: "capitalize",
    value: formik?.value?.role,
    onChange: (e) => handleChange(e, "role"),
    children: renderOption(roles),
    required: true,
  };
  const inputWarehouse = {
    placeholder: "Select Warehouse",
    textTransform: "capitalize",
    value: formik?.value?.warehouse,
    onChange: (e) => handleChange(e, "warehouse"),
    children: renderOption(warehouses),
    required: true,
  };

  async function fetchRoles() {
    const { data } = await getRoles(toast);
    setRoles(data);
  }

  async function fetchWarehouse() {
    const { data } = await getWarehouses(toast);
    setWarehouses(data);
  }

  useEffect(() => {
    fetchRoles();
    fetchWarehouse();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex {...mainContainer}>
        <Flex {...container}>
          <Text>Email</Text>
          <Input {...inputEmail} />
        </Flex>
        <Flex {...container}>
          <Text>Role</Text>
          <Select {...inputRole} />
        </Flex>
        <Flex {...container}>
          <Text>Warehouse</Text>
          <Select {...inputWarehouse} />
        </Flex>
        <Button {...buttonAttr} />
      </Flex>
    </form>
  );
}

export default DrawerAddForm;
