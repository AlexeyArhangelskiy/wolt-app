import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { Calculator } from "../Calculator";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
        <Box
          sx={{
            margin: "50px auto",
            maxWidth: "700px",
            width: "100%",
            background: "#fff",
            borderRadius: "30px",
            padding: "50px",
            boxSizing: "border-box",
          }}
        >
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: "50px", fontWeight: 700 }}
        >
          Delivery fee calculator
        </Typography>
        <Calculator />
        </Box>
    </ThemeProvider>
  );
};
