import { createTheme } from "@mui/material/styles";

export const blueColor = "rgb(0, 194, 232)";

export const theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-contained": {
            fontWeight: "700",
            color: "#fff",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#fff!important",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#fff!important",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: blueColor,
    },
  },
});
