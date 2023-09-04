import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import { Flex } from "@chakra-ui/react";

const mainContainerAttr = {
  w: "100vw",
  h: "100vh",
  color: "textPrimary",
}

function App() {
  return (
    <Flex {...mainContainerAttr}>
      <Routes>
        <Route path="/registration/:token" element={<Registration />} />
      </Routes>
    </Flex>
  );
}

export default App;
