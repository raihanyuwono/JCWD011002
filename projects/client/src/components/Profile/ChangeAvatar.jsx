import React, { useState } from 'react'
import { Box, Avatar, Text, Button, Stack, Flex, Input, useToast } from '@chakra-ui/react'
import { MdOutlineCancelPresentation } from 'react-icons/md'
import { FaRegEdit, FaRegSave } from 'react-icons/fa'
import { updateAvatar } from '../../api/profile'
import { useDispatch } from 'react-redux'
import { updateUserAvatar } from '../../storage/userReducer'

const ChangeAvatar = ({ userData, fetchUserData }) => {
  const toast = useToast();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch()

  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [file, setFile] = useState(null);
  const handleEditAvatarClick = () => {
    setIsEditingAvatar(true);
  }
  const handleCancelAvatarClick = () => {
    setIsEditingAvatar(false);
  }
  const handleSaveAvatarClick = async () => {
    console.log("save di klik")
    await dispatch(updateUserAvatar({ token, file, userData }));
    setIsEditingAvatar(false);
    fetchUserData();
    toast({
      title: 'Success',
      description: 'Avatar updated successfully',
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  return (
    <>
      <Box w={['100%', '30%']} align={'center'} mt={{ base: 4, md: 4, lg: 0 }}>
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
    </>
  )
}

export default ChangeAvatar