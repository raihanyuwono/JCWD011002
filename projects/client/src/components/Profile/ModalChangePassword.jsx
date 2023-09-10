import {FormControl, FormLabel, Input, InputGroup, InputRightElement, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const ModalChangePassword = ({isOpen, userData, handleSaveClick, onClose, toggleShowPassword, showPassword, handleInputChange}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
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
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
    </>
  )
}

export default ModalChangePassword