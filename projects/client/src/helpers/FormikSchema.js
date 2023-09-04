import * as Yup from "yup";

const email = Yup.string().email("Invalid Format").required("required");

const registerSchema = {
  email,
};

export { registerSchema };
