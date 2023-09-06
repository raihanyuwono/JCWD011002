import { Button, Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../api/auth";
import { useFormik } from "formik";
import InputTextCustom, { setAttr } from "../Custom/InputTextCustom";
import { FiUnlock, FiUser } from "react-icons/fi";

const container = {
  direction: "column",
  gap: "8px",
};

function FormLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const initialValues = {
    identifier: "",
    password: "",
  };

  async function handleSubmit(attributes) {
    setIsLoading(true);
    await login(toast, attributes);
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values),
  });

  const identifierAttr = setAttr(
    "identifier",
    "text",
    "Username or Email",
    <FiUser />,
    formik
  );
  const passwordAttr = setAttr(
    "password",
    "password",
    "Password",
    <FiUnlock />,
    formik
  );
  const buttonAttr = {
    type: "submit",
    variant: "capsuleSuccess",
    isLoading,
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex {...container}>
        <InputTextCustom {...identifierAttr} />
        <InputTextCustom {...passwordAttr} />
        <Button {...buttonAttr}>Login</Button>
      </Flex>
    </form>
  );
}

export default FormLogin;
