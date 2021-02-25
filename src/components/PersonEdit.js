import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import axiosURL from "./config.json";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function PersonEdit() {
  const URL = axiosURL.axiosURL;
  const query = window.location.pathname

  const [data, setData] = useState({ reloading: true });
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(URL + query);
      console.log(result.data)
      setData({ reloading: false })
      setFullName(result.data.full_name)
      setCardNumber(result.data.card_number)
    }

    fetchData();
  }, [setData]);

  function handleSubmit(event) {
    async function patchData() {
      const result = await axios
        .patch(URL + query, {
          fullName: fullName,
          cardNumber: cardNumber,
        })
        .then(function (response) {
          setMessage(response.data);
          setOpen(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    patchData();
    event.preventDefault();
  }

  

  const classes = useStyles();
  if (data.reloading) {
    return (
      <div className={classes.root}>
        <LinearProgress color="secondary" />
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Container maxWidth="lg" mt={100}>
          <Box mt={5}>
          <Link exact to="/readers" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="primary">
                  Вернуться
                </Button>
              </Link>
            <Grid container spacing={3}>
              <Box mt={8} mb={5}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      id="standard-multiline-flexible"
                      label="ФИО"
                      multiline
                      rowsMax={4}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <br></br>
                  <div>
                    <TextField
                      id="standard-multiline-flexible"
                      label="Номер карты"
                      multiline
                      rowsMax={4}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <br></br>
                  <Button variant="contained" color="primary" type="submit">
                    Изменить читателя
                  </Button>
                </form>
              </Box>
              <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
              >
                <Alert severity="success" onClose={handleClose}>
                  {message}
                </Alert>
              </Snackbar>
            </Grid>
          </Box>
        </Container>
      </div>
    );
  }
}
