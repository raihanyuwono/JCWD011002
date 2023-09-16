import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UploadReceipt from "./UploadReceipt";
import { PiUploadBold } from "react-icons/pi";

export default function ButtonUpload() {
  const [uploadedImage, setUploadedImage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [uploadReceipt, setUploadReceipt] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState("photo");

  const handleSavePhoto = (newPhoto) => {
    setCurrentPhoto(newPhoto);
  };

  const openPhotoModal = () => {
    setUploadReceipt(true);
  };

  const closePhotoModal = () => {
    setUploadReceipt(false);
  };

  return (
    <Box mt={16}>
      <Button
        color={"white"}
        variant={"outline"}
        _hover={{ bgColor: "white", color: "black" }}
        onClick={openPhotoModal}
      >
        <PiUploadBold size={18} />
        &nbsp;Upload Receipt
      </Button>
      <UploadReceipt
        isOpen={uploadReceipt}
        onClose={closePhotoModal}
        currentPhoto={currentPhoto}
        onSave={handleSavePhoto}
        onImageUpload={handleImageUpload}
      />
    </Box>
  );
}
