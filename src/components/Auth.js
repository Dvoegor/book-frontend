import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import axiosURL from "./config.json";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
    const URL = axiosURL.axiosURL;

  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleSubmit(event) {
    async function postData() {
      await axios
        .post(URL + "/auth", {
          email: email,
          password: password,
        })
        .then(function (response) {
          // console.log(response.headers)
            const token = response.headers["auth-token"]
            const isAdmin = response.headers["admin"]
            if (token) {
                document.cookie = `auth-token=${token}`
                document.cookie = `admin=${isAdmin}`
                window.location.href = '/'
            }
          setMessage(response.data);
          setOpen(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    postData();

    event.preventDefault();
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
