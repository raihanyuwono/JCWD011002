import { Grid, GridItem } from "@chakra-ui/react";
import Register from "../components/Register";
import { useEffect } from "react";
import { keepLogin } from "../api/auth";

const container = {
  h: "full",
  w: "full",
  templateColumns: "repeat(2, 1fr)",
};

const banner = {
  bgImage: "url(/images/banner_registration.jpg)",
  bgPos: "center",
  bgSize: "cover",
  filter: "brightness(80%)",
};

function Registration() {

  useEffect(() => {
    keepLogin();
    console.log("KEEP LOGIN");
  });
  return (
    <Grid {...container}>
      <GridItem {...banner}></GridItem>
      <GridItem>
        <Register />
      </GridItem>
    </Grid>
  );
}

export default Registration;
