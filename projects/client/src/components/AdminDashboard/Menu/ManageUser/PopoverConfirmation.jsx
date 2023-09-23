import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";

function PopoverConfirmation({ trigger, confirm }) {
  const triggerAttr = {
    children: trigger,
  };
  const buttonYes = {
    children: "Yes",
    variant: "success",
    onClick: () => confirm(),
  };
  const buttonNo = {
    children: "No",
    variant: "error",
  };
  return (
    <Popover>
      {/* <PopoverTrigger {...triggerAttr} /> */}
      <PopoverTrigger><Button>LOSLA</Button></PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Button {...buttonYes} />
            <Button {...buttonNo} />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default PopoverConfirmation;
