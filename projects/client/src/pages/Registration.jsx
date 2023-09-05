import { Grid, GridItem } from "@chakra-ui/react";
import Register from "../components/Register";

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
