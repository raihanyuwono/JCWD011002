import { Td, Tr } from "@chakra-ui/react";
import { formaterPrice } from "../../../../helpers/formater";

const tdAttr = {
  textAlign: "center",
};

function setStatus(status) {
  switch (status) {
    case "Menunggu Pembayaran":
      return "To Pay";
    case "Menunggu Konfirmasi Pembayaran":
      return "To Confirm";
    case "Diproses":
      return "Processed";
    case "Dikirim":
      return "Shipped";
    case "Pesanan Dikonfirmasi":
      return "Shipped";
    case "Dibatalkan":
      return "Cancelled";
  }
}

function TransactionData({ transaction }) {
  const statusAttr = {
    wordBreak: "break-word",
    // children: setStatus(transaction?.status),
    children: transaction?.status,
  };
  return (
    <Tr>
      <Td {...tdAttr}>MWEGC2/ID/TXN/{transaction?.transactionId}</Td>
      <Td {...tdAttr}>{transaction?.created_at}</Td>
      <Td {...tdAttr} {...statusAttr}></Td>
      <Td {...tdAttr}>{transaction?.user_name}</Td>
      <Td {...tdAttr}>{transaction?.payment_method}</Td>
      <Td {...tdAttr}>{transaction?.payment_status}</Td>
      <Td {...tdAttr}>{transaction?.shipping_method}</Td>
      <Td {...tdAttr}>{transaction?.is_confirm ? "Yes" : "No"}</Td>
      <Td {...tdAttr}>Rp {formaterPrice(transaction?.total)}</Td>
      <Td>SEE DETAIL</Td>
    </Tr>
  );
}

export default TransactionData;
