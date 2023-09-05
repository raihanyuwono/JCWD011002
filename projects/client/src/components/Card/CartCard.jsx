// import React, { useEffect } from "react";
// import {
//   useNumberInput,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
//   Text,
//   Image,
//   Button,
//   HStack,
//   Input,
//   Box,
//   IconButton,
//   Flex,
// } from "@chakra-ui/react";
// import { DeleteIcon } from "@chakra-ui/icons";
// import axios from "axios";
// import { useState } from "react";
// const CartCard = () => {
//   const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
//     useNumberInput({
//       step: 1,
//       defaultValue: 1,
//       min: 0,
//       max: 900,
//     });
//   const inc = getIncrementButtonProps();
//   const dec = getDecrementButtonProps();
//   const input = getInputProps();
//   const userId = localStorage.getItem("userId");
//   const [cart, setCart] = useState([]);
//   const viewCart = async (userId) => {
//     const response = await axios.get(
//       `http://localhost:8000/api/order/cart/${userId}`
//     );
//     setCart(response.data.data);
//   };

//   useEffect(() => {
//     viewCart(userId);
//   }, []);

//   return (
//     <>
//       <Box>
//         <Table variant="simple" color={"#34638a"} bgColor="white">
//           <Thead>
//             <Tr>
//               <Th></Th>
//               <Th>Product</Th>
//               <Th>Price</Th>
//               <Th>Quantity</Th>
//               <Th> </Th>
//               <Th>Subtotal</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {cart.map((item) => (
//               <Tr>
//                 <Td>
//                   <Image src={item.image} />
//                 </Td>
//                 <Td>{item.name}</Td>
//                 <Td>{item.price}</Td>
//                 <Td>{item.quantity}</Td>
//                 <Td>
//                   <Box>
//                     <HStack textAlign={"center"} maxW="220px">
//                       <IconButton
//                         isRound={true}
//                         variant="solid"
//                         colorScheme="red"
//                         aria-label="Delete"
//                         fontSize="20px"
//                         icon={<DeleteIcon />}
//                       />
//                       <Button {...dec}>-</Button>
//                       <Input {...input} />
//                       <Button colorScheme="facebook" {...inc}>
//                         +
//                       </Button>
//                     </HStack>
//                   </Box>
//                 </Td>
//                 <Td>{item.subtotal}</Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Box>
//     </>
//   );
// };

// export default CartCard;
