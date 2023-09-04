import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function setAttr(id, type, placeholder, icon, formik) {
  return { id, type, placeholder, icon, formik };
}

function rightElement(id, type, showPass, setShowPass) {
  if (type !== "password") return;

  function onClick() {
    setShowPass(!showPass);
    if (!showPass) document.getElementById(id).type = "text";
    else document.getElementById(id).type = "password";
  }

  const attr = {
    cursor: "pointer",
    onClick,
  };

  return (
    <InputRightElement>
      {showPass ? <FiEye {...attr} /> : <FiEyeOff {...attr} />}
    </InputRightElement>
  );
}

function InputTextCustom({ id, type, placeholder, icon, formik }) {
  const [showPass, setShowPass] = useState(false);

  function handleOnChange(event) {
    const { target } = event;
    formik.setFieldValue(id, target.value);
  }

  const inputGroupAttr = {
    border: "1px solid",
    borderRadius: "3rem",
    overflow: "hidden",
    borderColor: formik.errors[id] ? "red" : "black",
  };
  const inputAttr = {
    id,
    type,
    placeholder,
    onChange: (event) => handleOnChange(event),
  };
  const formErrorAttr = {
    mt: "-3px",
  };

  return (
    <FormControl isInvalid={formik.errors[id]}>
      <VStack>
        <InputGroup {...inputGroupAttr}>
          <InputLeftElement>{icon}</InputLeftElement>
          <Input {...inputAttr} />
          {rightElement(id, type, showPass, setShowPass)}
        </InputGroup>
        <FormErrorMessage {...formErrorAttr}>{formik.errors[id]}</FormErrorMessage>
      </VStack>
    </FormControl>
  );
}

export default InputTextCustom;
export { setAttr };
