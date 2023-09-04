import {
  Modal,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

const modalOverlayAttr = {
  backdropFilter: "blur(2px)",
};
const tabsAttr = {
  isFitted: true,
};

function ModalPopup({ isOpen, onClose }) {
  const modalAttr = { isOpen, onClose };

  return (
    <Modal {...modalAttr}>
      <ModalOverlay {...modalOverlayAttr} />
      <ModalContent>
        <Tabs {...tabsAttr}>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormLogin />
            </TabPanel>
            <TabPanel>
              <FormRegister />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
}

export default ModalPopup;
