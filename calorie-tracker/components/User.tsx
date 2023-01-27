import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserContext } from "../contexts/userContext";
import { Theme, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

export default function User() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { user, logout } = React.useContext(UserContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme() as Theme;

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {user?.name && (
          <Button
            id="user"
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Typography color={"secondary"} variant="h6">
              Welcome, {user?.name?.toUpperCase()}
            </Typography>
          </Button>
        )}
      </div>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
