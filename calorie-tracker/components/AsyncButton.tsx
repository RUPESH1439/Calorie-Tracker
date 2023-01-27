import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface AsyncButtonProps extends ButtonProps {
  loading?: boolean;
  title?: string;
}

export default function AsyncButton(props: AsyncButtonProps) {
  const { loading, title } = props;
  return (
    <Button {...props}>
      {loading ? (
        <CircularProgress variant="indeterminate" color="inherit" size={25} />
      ) : (
        title
      )}
    </Button>
  );
}
