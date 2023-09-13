"use client"
import React, { useEffect, useState } from "react"
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Avatar,
  useToast
} from "@chakra-ui/react"
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiMenu
} from "react-icons/fi"
import UserProfile from "../components/Profile/UpdateProfile"
import { getUser } from "../api/profile"
import UserAddress from "./UserAddress"
const LinkItems = [
  { name: "Profile", icon: FiHome },
  { name: "Address", icon: FiCompass },
  { name: "Transaction", icon: FiTrendingUp },
]

export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    is_verified: false,
    role: '',
    current_password: '',
    new_password: '',
    confirm_password: '',
    avatar: '',
  });
  const toast = useToast()
  const token = localStorage.getItem('token')
  const fetchUserData = async () => {
    await getUser(token, setUserData, toast);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Box w={"full"} mx="auto">
      <Flex>

        <SidebarContent
          // onClose={() => onClose}
          userData={userData}
          display={{ base: "none", md: "block" }}
        />
        <Box w={"full"} ml={{ base: 0, md: 60 }} p="4">
          {/* Content */}
          <UserProfile userData={userData} setUserData={setUserData} />
        </Box>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} userData={userData} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

    </Box>
  )
}

const SidebarContent = ({ userData, onClose, ...rest }) => {
  return (
    <Box
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      bg={"bgSecondary"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      color={'white'}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
        <Avatar src={`${process.env.REACT_APP_API_BASE_URL}/${userData?.avatar}`} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Text align={"center"} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        {userData?.name}
      </Text>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "primary",
          color: "white"
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white"
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        position={"absolute"}
        top={3}
        left={4}
        zIndex={999}
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  )
}
