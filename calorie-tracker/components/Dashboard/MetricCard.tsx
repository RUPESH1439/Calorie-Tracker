import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface MetricCardProps {
  title: string;
  value: string | number;
}

export default function MetricCard({ title, value }: MetricCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid black",
        py: 5,
        px: 5,
      }}
    >
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="subtitle2">{value}</Typography>
    </Box>
  );
}
