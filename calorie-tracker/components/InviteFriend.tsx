import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, TextField } from "@mui/material";
import generatePassword from "../services/generatePassword";
import useSignup from "../hooks/useSignup";
import useSignIn from "../hooks/useSignin";
import emailjs from "@emailjs/browser";
import misc from "../config/misc";
import AsyncButton from "./AsyncButton";

const {
  emailConfig: { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY },
} = misc;

const style = {
  root: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    width: "40%",
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  input: {
    marginTop: 5,
  },
  invite: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
    pt: 5,
  },
};

export default function InviteFriend() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { signup } = useSignup();
  const { signin } = useSignIn();

  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleInvite = async () => {
    const password = generatePassword();
    try {
      setLoading(true);
      const signedUp = await signup({
        user: {
          email,
          password,
          name,
          calorie_limit: 2000,
          role: "regular",
        },
      });
      if (signedUp?.success) {
        const token = await signin({
          user: {
            email,
            password,
          },
        });
        if (token) {
          //TODO Move keys to env
          await emailjs
            .send(
              SERVICE_ID,
              TEMPLATE_ID,
              {
                to_name: name,
                to_email: email,
                user_email: email,
                user_password: password,
                user_token: token,
              },
              PUBLIC_KEY
            )
            .then(
              (result) => {
                setOpen(false);
              },
              (error) => {
                console.log(error.text);
              }
            );
        }
      } else {
        alert("Something went wrong!\nPlease check the email and try again");
      }
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Invite a friend
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.root}>
          <Box sx={style.container}>
            <Typography variant="h6">Invite a friend</Typography>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              sx={style.input}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
            <Box sx={style.invite}>
              <AsyncButton
                variant="contained"
                size="large"
                onClick={handleInvite}
                title="Invite"
                loading={loading}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
