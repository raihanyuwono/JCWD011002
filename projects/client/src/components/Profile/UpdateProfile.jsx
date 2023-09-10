import React, { useState } from 'react';
import { useToast, Flex, Card } from '@chakra-ui/react';
import { updateAvatar, updateUser } from '../../api/profile';
import ModalChangePassword from './ModalChangePassword';
import RenderFieldInput from './RenderFieldInput';
import ChangeAvatar from './ChangeAvatar';
import RenderDataUser from './RenderDataUser';

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
    await updateUser(token, toast, userData, isEditingPassword);
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
    window.location.reload();
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
      <RenderFieldInput
        fieldName={fieldName}
        label={label}
        type={type}
        fieldValue={fieldValue}
        isEditing={isEditing}
        onEditClick={() => handleEditClick(fieldName)}
        onSaveClick={() => handleSaveClick(fieldName)}
        onCancelClick={() => handleCancelClick(fieldName)}
        onChange={handleInputChange}
        handleEditPasswordClick={handleEditPasswordClick}
      />
    );
  };


  return (
    <Flex justifyContent={'center'} alignItems={'center'} minH="100vh">
      <Card bg={"blueCold"} w={'70%'} p={10}>
        <Flex align={'center'} justifyContent={'center'} direction={['column', 'row']}>
          {/* Change Avatar */}
          <ChangeAvatar userData={userData} isEditingAvatar={isEditingAvatar} handleCancelAvatarClick={handleCancelAvatarClick} handleSaveAvatarClick={handleSaveAvatarClick} handleFileChange={handleFileChange} handleEditAvatarClick={handleEditAvatarClick} />
          {/* Render Data User */}
          <RenderDataUser userData={userData} renderField={renderField} />
          {/* Modal Change Password */}
          <ModalChangePassword userData={userData} isOpen={isEditingPassword} onClose={handleCancelPasswordClick} handleSaveClick={handleSaveClick} toggleShowPassword={toggleShowPassword} showPassword={showPassword} handleInputChange={handleInputChange} />
        </Flex>
      </Card>
    </Flex>
  );
}

export default UserProfile;
