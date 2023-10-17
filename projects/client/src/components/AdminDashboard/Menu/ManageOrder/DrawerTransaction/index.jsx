import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { cancelOrder, getTransaction } from "../../../../../api/transactions";
import { useEffect, useState } from "react";
import PopoverConfirmation from "../../../../Utility/PopoverConfirmation";
import TransactionDetail from "./TransactionDetail";
import HeaderDetail from "./HeaderDetail";
import FooterButtons from "./FooterButtons";

const drawerContentAttr = {
  bgColor: "secondary",
  color: "textPrimary",
};
const drawerHeaderAttr = {
  borderBottomWidth: "1px",
};
const drawerFooterAttr = {
  borderTopWidth: "1px",
  gap: "8px",
};

const btnContainer = {
  direction: "column",
  w: "full",
  gap: "8px",
};

function isFooter(status) {
  const noFooter = [1, 4, 5, 6];
  return !noFooter.includes(status);
}

function DrawerTransaction({
  status,
  transaction,
  shipping,
  total,
  isOpen,
  onClose,
}) {
  const { transaction_payments: payment, user } = transaction;
  const {
    isOpen: isConfirmOpen,
    onOpen: confirmOpen,
    onClose: confirmClose,
  } = useDisclosure();
  const {
    isOpen: isCancelOpen,
    onOpen: cancelOpen,
    onClose: cancelClose,
  } = useDisclosure();
  const [products, setProducts] = useState([]);
  const toast = useToast();

  const drawerAttr = {
    isOpen,
    onClose,
    placement: "right",
    size: "lg",
  };

  async function fetchTransactionProduct() {
    const { data } = await getTransaction(toast, transaction?.id);
    setProducts(data?.transaction_products);
  }

  useEffect(() => {
    fetchTransactionProduct();
  }, []);

  const btnConfirm = {
    children: "Confirm",
    variant: "success",
    onClick: confirmOpen,
  };
  const btnCancel = {
    children: "Cancel",
    variant: "error",
    onClick: cancelOpen,
  };

  const attributes = { userId: user?.id, transactionId: transaction?.id };

  const confirmAttr = {
    trigger: <Button {...btnConfirm} />,
    confirm: () => console.log("Confirm Transaction"),
    isOpen: isConfirmOpen,
    onClose: confirmClose,
  };

  const cancelAttr = {
    trigger: <Button {...btnCancel} />,
    confirm: async () => await cancelOrder(toast, attributes),
    isOpen: isCancelOpen,
    onClose: cancelClose,
  };

  const headerAttr = {
    id: transaction?.id || 0,
    payment: payment[0],
  };

  const transactionDetail = {
    payment: payment[0],
    products,
    shipping,
    total,
  };

  const footerButtons = {
    status,
    id_user: user?.id,
    id_transaction: transaction?.id,
  };

  return (
    <Drawer {...drawerAttr}>
      <DrawerOverlay />
      <DrawerContent {...drawerContentAttr}>
        <DrawerHeader {...drawerHeaderAttr}>
          <HeaderDetail {...headerAttr} />
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody py="20px">
          <TransactionDetail {...transactionDetail} />
        </DrawerBody>
        {isFooter(status) && <FooterButtons {...footerButtons} />}
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerTransaction;
