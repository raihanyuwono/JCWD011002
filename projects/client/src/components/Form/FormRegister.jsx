import InputTextCustom, { setAttr } from "../Custom/InputTextCustom";
import { FiMail } from "react-icons/fi";
import { registerSchema } from "../../helpers/FormikSchema";
import { useFormik } from "formik";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { register } from "../../api/auth";
import { useState } from "react";

const container = {
  direction: "column",
  gap: "8px",
};

function FormRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const initialValues = {
    email: "",
  };

  async function handleSubmit(attributes) {
    setIsLoading(true);
    await register(toast, attributes);
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const emailAttr = setAttr("email", "email", "Email", <FiMail />, formik);
  const buttonAttr = {
    type: "submit",
    variant: "capsuleSuccess",
    isLoading,
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex {...container}>
        <InputTextCustom {...emailAttr} />
        <Button {...buttonAttr}>Register</Button>
      </Flex>
    </form>
  );
}

export default FormRegister;
