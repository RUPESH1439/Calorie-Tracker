import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

export default function LoadingProgress() {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
