import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface ErrorMessageProps {
  error?: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;
  return (
    <Box py={1}>
      <Typography variant="caption" sx={{ color: "red" }}>
        {error}
      </Typography>
    </Box>
  );
}
