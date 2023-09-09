import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast, Flex, Text, Card, Center, Avatar, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, InputGroup, InputRightElement } from '@chakra-ui/react';
import axios from 'axios';
import { getUser, updateAvatar, updateUser } from '../../api/profile';
import { FaRegEdit, FaRegSave } from 'react-icons/fa';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

function UserProfile({ userData, setUserData }) {
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState({
    name: false,
    username: false,
    email: false,
    phone: false,
    role: false,
    password: false,
  });
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [maskedPassword, setMaskedPassword] = useState(userData.password);
  const toast = useToast();
  const token = localStorage.getItem('token');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEditPasswordClick = () => {
    setIsEditingPassword(true);
  };

  const handleCancelPasswordClick = () => {
    setIsEditingPassword(false);
  };
  const handleEditClick = (fieldName) => {
    setIsEditing({ ...isEditing, [fieldName]: true });
  };

  const handleCancelClick = (fieldName) => {
    setIsEditing({ ...isEditing, [fieldName]: false });
  };

  const handleSaveClick = async (fieldName) => {
    await updateUser(token, toast, userData, file);
    setIsEditing({ ...isEditing, [fieldName]: false });
    setIsEditingPassword(false);
  };

  const handleEditAvatarClick = () => {
    setIsEditingAvatar(true);
  }
  const handleCancelAvatarClick = () => {
    setIsEditingAvatar(false);
  }
  const handleSaveAvatarClick = async () => {
    await updateAvatar(token, toast, file);
    setIsEditingAvatar(false);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };


  const renderField = (fieldName, label, type) => {
    const fieldValue = fieldName === 'role' ? userData.role.name : fieldName === 'password' ? '*'.repeat(12) : userData[fieldName];

    return (
      <Flex align="center" justify="space-between">
        <FormControl m={4}>
          <Flex alignItems={isEditing[fieldName] ? 'center' : ''}>
            <FormLabel>{label}: </FormLabel>
            {isEditing[fieldName] ? (
              <Input
                type={type}
                name={fieldName}
                value={fieldValue}
                onChange={handleInputChange}
              />
            ) : (
              <Text>{fieldValue}</Text>
            )}
          </Flex>
        </FormControl>

        {fieldName === 'password' ? (
          <Button colorScheme="teal" onClick={handleEditPasswordClick}>
            <FaRegEdit />
          </Button>
        )
          : isEditing[fieldName] ? (
            <Flex>
              <Button colorScheme="blue" onClick={() => handleSaveClick(fieldName)} mr={2}>
                <FaRegSave />
              </Button>
              <Button colorScheme='red' onClick={() => handleCancelClick(fieldName)}><MdOutlineCancelPresentation /></Button>
            </Flex>
          ) : (
            <Button colorScheme="teal" onClick={() => handleEditClick(fieldName)}>
              <FaRegEdit />
            </Button>
          )}
      </Flex >
    );
  };


  return (
    <Flex justifyContent={'center'} alignItems={'center'} minH="100vh">
      <Card bg={"blueCold"} w={'70%'} p={10}>
        <Flex align={'center'} justifyContent={'center'} direction={['column', 'row']}>
          <Box w={['100%', '30%']} align={'center'}>
            <Avatar borderRadius='full' boxSize='150px' src={`${process.env.REACT_APP_API_BASE_URL}/${userData?.avatar}`} />
            <Box my={2}>
              {isEditingAvatar ? (
                <Stack spacing={4} w={'50%'}>
                  <Input type="file" accept="image/*" onChange={handleFileChange} />
                  <Flex justifyContent={'space-evenly'}>
                    <Button colorScheme="blue" onClick={handleSaveAvatarClick}>
                      <FaRegSave />
                    </Button>
                    <Button colorScheme='red' onClick={handleCancelAvatarClick}><MdOutlineCancelPresentation /></Button>
                  </Flex>
                </Stack>
              ) : (
                <Button colorScheme="teal" onClick={handleEditAvatarClick}>
                  <Text mr={2}>Change</Text> <FaRegEdit />
                </Button>
              )}
            </Box>
          </Box>

          <Box p={4} w={['100%', '50%']}>
            {renderField('name', 'Name', 'text')}
            <Box border={'2px'} borderColor={'primary'}></Box>
            {renderField('username', 'Username', 'text')}
            <Box border={'2px'} borderColor={'primary'}></Box>
            {renderField('email', 'Email', 'email')}
            <Box border={'2px'} borderColor={'primary'}></Box>
            {renderField('phone', 'Phone', 'text')}
            <Box border={'2px'} borderColor={'primary'}></Box>
            {userData.role.name === 'admin' ? renderField('role', 'Role', 'text') : null}
            {renderField('password', 'Password', 'password')}
            <Box border={'2px'} borderColor={'primary'}></Box>

          </Box>

          <Modal isOpen={isEditingPassword} onClose={handleCancelPasswordClick}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Password</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Current Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="current_password"
                      value={userData.current_password}
                      onChange={handleInputChange}
                    />
                    <InputRightElement>
                      <Button onClick={toggleShowPassword} variant="ghost">
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="new_password"
                      value={userData.new_password}
                      onChange={handleInputChange}
                    />
                    <InputRightElement>
                      <Button onClick={toggleShowPassword} variant="ghost">
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="confirm_password"
                      value={userData.confirm_password}
                      onChange={handleInputChange}
                    />
                    <InputRightElement>
                      <Button onClick={toggleShowPassword} variant="ghost">
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSaveClick}>
                  Save
                </Button>
                <Button onClick={handleCancelPasswordClick}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

        </Flex>
      </Card>
    </Flex>
  );
}

export default UserProfile;
