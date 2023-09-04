import { Button, Flex, useToast } from "@chakra-ui/react";
import { FiUser, FiUnlock, FiPhone } from "react-icons/fi";
import InputTextCustom, { setAttr } from "../Custom/InputTextCustom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { registrationSchema } from "../../helpers/FormikSchema";

const container = {
  direction: "column",
  gap: "8px",
};

const initialValues = {
  name: "",
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function FormRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(attributes) {
    setIsLoading(true);
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape(registrationSchema),
    onSubmit: (values) => handleSubmit(values),
  });

  const nameAttr = setAttr("name", "text", "Name", <FiUser />, formik);
  const usernameAttr = setAttr(
    "username",
    "text",
    "Username",
    <FiUser />,
    formik
  );
  const phoneAttr = setAttr("phone", "tel", "Phone", <FiPhone />, formik);
  const passwordAttr = setAttr(
    "password",
    "password",
    "Password",
    <FiUnlock />,
    formik
  );
  const confirmPasswordAttr = setAttr(
    "confirmPassword",
    "password",
    "Confirm Password",
    <FiUnlock />,
    formik
  );

  const buttonAttr = {
    type: "submit",
    variant: "capsuleSuccess",
    isLoading,
  };

  return (
    <form>
      <Flex {...container}>
        <InputTextCustom {...nameAttr} />
        <InputTextCustom {...usernameAttr} />
        <InputTextCustom {...phoneAttr} />
        <InputTextCustom {...passwordAttr} />
        <InputTextCustom {...confirmPasswordAttr} />
        <Button {...buttonAttr}>Register</Button>
      </Flex>
    </form>
  );
}

export default FormRegistration;
