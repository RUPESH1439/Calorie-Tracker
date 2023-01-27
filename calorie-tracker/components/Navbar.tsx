import { useTheme } from "@emotion/react";
import { Theme, Typography } from "@mui/material";
import { Box } from "@mui/system";
import User from "./User";

export default function Navbar() {
  const theme = useTheme() as Theme;
  return (
    <div
      style={{
        height: 70,
        backgroundColor: theme?.palette?.primary?.main,
        position: "sticky",
        top: 0,
        alignItems: "center",
        display: "flex",
        zIndex: 999,
      }}
    >
      <Typography ml={10} color="secondary" variant="h6">
        Your Calorie Tracker!
      </Typography>

      <Box
        sx={{
          right: 20,
          position: "absolute",
        }}
      >
        <User />
      </Box>
    </div>
  );
}
