// import React from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Input,
//   Button,
// } from "@chakra-ui/react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const FormCreateCategory = ({ isOpen, onClose, onSubmit }) => {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Category name can't be empty"),
//     }),
//     onSubmit: (values, actions) => {
//       onSubmit(values);
//       actions.resetForm();
//       onClose();
//     },
//   });

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Create Category</ModalHeader>
//         <ModalCloseButton />
//         <form onSubmit={formik.handleSubmit}>
//           <ModalBody>
//             <Input
//               type="text"
//               name="name"
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Category Name"
//             />
//             {formik.touched.name && formik.errors.name && (
//               <div style={{ color: "red" }}>{formik.errors.name}</div>
//             )}
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} type="submit">
//               Save
//             </Button>
//             <Button onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </form>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default FormCreateCategory;
import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  Input,
  Button,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormCreateCategory = ({ isOpen, onClose, fetchCategory }) => {
  const toast = useToast()
  const handleCreateCategory = async (categoryData) => {
    try {
      console.log("request create category")
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("image", categoryData.image);


      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/category`,
        formData,
        { headers }
      );

      toast({
        title: "Create category success",
        status: "success",
        duration: "2000",
        isClosable: true,
      });
      fetchCategory()

    } catch (error) {
      console.log(error);
      toast({
        title: "Create category can't be completed",
        description: error.response.data.message || error.response.data.errors[0].msg,
        status: "error",
        duration: "2000",
        isClosable: true,
      });
    }
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Category name can't be empty"),
    image: Yup.mixed()
      .required("Image is required")
      .test("fileType", "Invalid file type, only images are allowed", (value) => {
        if (!value) return true; // No file selected, validation is passed
        return value && value.type.startsWith("image/");
      })
      .test("fileSize", "File size must be less than 1MB", (value) => {
        if (!value) return true; // No file selected, validation is passed
        return value.size <= 1048576; // 1MB in bytes
      }),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      image: null, // Simpan file gambar di sini
    },
    validationSchema,
    onSubmit: (values, actions) => {
      console.log("Form submitted with values:", values);
      handleCreateCategory(values); // Kirim data termasuk gambar
      actions.resetForm();
      onClose();
    },
  });



  const handleImageChange = (e) => {
    formik.setFieldValue("image", e.target.files[0]);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <form onSubmit={formik.handleSubmit}>
        <DrawerContent>
          <DrawerHeader>Create Category</DrawerHeader>
          <DrawerBody>
            <Input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Category Name"
            />
            {formik.touched.name && formik.errors.name && (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            )}

            <Box mt={3}>
              <Text>Upload Image:</Text>
              <Input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
              {formik.touched.image && formik.errors.image && (
                <div style={{ color: "red" }}>{formik.errors.image}</div>
              )}
            </Box>

          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default FormCreateCategory;
