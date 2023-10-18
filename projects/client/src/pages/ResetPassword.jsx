import { Flex } from "@chakra-ui/react";
import ResetPassword from "../components/ResetPassword";

const container = {
  w: "full",
  alignItems: "center",
  justifyContent: "center",
};

const banner = {
  flex: 1,
  bgImage: "url(/images/reset_password.jpg)",
  h: "full",
  bgPos: "center",
  bgSize: "cover",
  filter: "brightness(80%)",
};

function MobileView() {
  const backdrop = {
    w: "full",
    backdropFilter: "blur(8px)",
  };
  const mobile = { display: { base: "flex", lg: "none" } };
  return (
    <Flex {...container} {...mobile}>
      <Flex {...banner}>
        <Flex {...backdrop}>
          <ResetPassword />
        </Flex>
      </Flex>
    </Flex>
  );
}

function DesktopView() {
  const desktop = { display: { base: "none", lg: "flex" } };
  return (
    <Flex {...container} {...desktop}>
      <Flex {...banner} />
      <ResetPassword />
    </Flex>
  );
}

function ResetPasswordPage() {
  return <>
    <MobileView />
    <DesktopView />
  </>;
}

export default ResetPasswordPage;
