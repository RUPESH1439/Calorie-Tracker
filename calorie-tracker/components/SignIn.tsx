import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import useSignIn from "../hooks/useSignin";
import AsyncButton from "./AsyncButton";

const style = {
  root: {
    bgcolor: "background.paper",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginTop: 5,
    minWidth: 400,
  },
  signin: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
    pt: 5,
  },
};

interface SignInProps {
  onSignInSuccess: () => void;
}

export default function SignIn({ onSignInSuccess }: SignInProps) {
  const { signin, loading } = useSignIn();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSignIn = async () => {
    try {
      const token = await signin({
        user: {
          email,
          password,
        },
      });
      if (token) {
        onSignInSuccess();
      } else {
        alert("Something went wrong!\nPlease check the email and try again");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div>
      <Box sx={style.root}>
        <Box sx={style.container}>
          <Typography variant="h6">Sign In</Typography>

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            sx={style.input}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            sx={style.input}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Box sx={style.signin}>
            <AsyncButton
              variant="contained"
              size="large"
              onClick={handleSignIn}
              title="Sign In"
              loading={loading}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
