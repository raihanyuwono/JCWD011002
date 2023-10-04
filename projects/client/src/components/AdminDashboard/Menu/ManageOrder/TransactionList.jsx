import { Tbody } from "@chakra-ui/react";
import TransactionData from "./TransactionData";

function TransactionList({transactions}) {
  return (
    <Tbody>
      {transactions.map((transaction, index) => (
        <TransactionData transaction={transaction} key={index} />
      ))}
    </Tbody>
  );
}

export default TransactionList;
