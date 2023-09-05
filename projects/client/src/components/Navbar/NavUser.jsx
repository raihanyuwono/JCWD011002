import React, { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { BsHandbag } from "react-icons/bs";
import Login from "../Login";

const Links = ["ini apa", "ini juga", "apalagi?"];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCartOpen, setCartOpen] = useState(false);

  const handleCartHover = () => {
    setCartOpen(true);
  };

  const handleCartLeave = () => {
    setCartOpen(false);
  };

  const isLogin = localStorage.getItem("token");

  return (
    <>
      <Box boxShadow={"lg"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <InputGroup maxW={"300px"} display={{ base: "none", md: "block" }}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input type="text" placeholder="Search" />
          </InputGroup>
          <Flex alignItems={"center"}>
            <Button
              mr={4}
              bg={"transparent"}
              _hover={{ bg: "transparent" }}
              onMouseEnter={handleCartHover}
              onMouseLeave={handleCartLeave}
            >
              <BsHandbag />
            </Button>
            {isLogin ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Login />
            )}

          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
        {isCartOpen && (
          <Box
            position="absolute"
            top="50"
            right="0"
            bg="white"
            boxShadow="lg"
            p={4}
            zIndex={999}
            onMouseEnter={handleCartHover}
            onMouseLeave={handleCartLeave}
          >
            <Text>cart detail order</Text>
          </Box>
        )}
      </Box>
    </>
  );
}
