import { extendTheme } from "@chakra-ui/react";

const buttonDark = {
  fontFamily: "Fira Code, monospace",
  color: "textPrimary",
};

const successScheme = {
  ...buttonDark,
  bgColor: "successPrimary",
  _hover: {
    bgColor: "successSecondary",
  },
};

const errorScheme = {
  ...buttonDark,
  bgColor: "errorPrimary",
  _hover: {
    bgColor: "errorSecondary",
  },
};

const themes = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: "bgSecondary",
      },
    },
  },
  fonts: {
    body: "JetBrains Mono, monospace",
  },
  colors: {
    primary: "#34638A",
    secondary: "#233947",
    bgPrimary: "#1C1C1C",
    bgSecondary: "#2D2D2D",
    textPrimary: "#FFFFFF",
    textSecondary: "#E0E0E0",
    successPrimary: "#2E7D32",
    successSecondary: "#4CAF50",
    errorPrimary: "#D32F2F",
    errorSecondary: "#EF5350",
    warningPrimary: "#ED6C02",
    warningSecondary: "#FF9800",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "8px",
      },
      variants: {
        success: successScheme,
        error: errorScheme,
        capsuleSuccess: {
          borderRadius: "3rem",
          ...successScheme,
        },
        capsuleError: {
          borderRadius: "3rem",
          ...errorScheme,
        },
      },
    },
  },
});

export default themes;
