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

export default function BookEdit() {
  const URL = axiosURL.axiosURL;
  const query = window.location.pathname

  const [data, setData] = useState({ reloading: true });
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [publishing_house, setPublishing_house] = useState("");
  const [year, setYear] = useState("");
  const [ISBN, setISBN] = useState("");
  const [pages, setPages] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");

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
      setAuthor(result.data.author)
      setTitle(result.data.title)
      setPublishing_house(result.data.publishing_house)
      setYear(result.data.year)
      setISBN(result.data.ISBN)
      setPages(result.data.pages)
      setType(result.data.type)
      setLocation(result.data.location)
      setState(result.data.state)
    }

    fetchData();
  }, [setData]);

  function handleSubmit(event) {
    async function patchData() {
      const result = await axios
        .patch(URL + query, {
            author: author,
            title: title,
            publishing_house: publishing_house,
            year: year,
            ISBN: ISBN,
            pages: pages,
            type: type,
            location: location,
            state: state,
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
          <Link exact to="/books" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="primary">
                  Вернуться
                </Button>
              </Link>
            <Grid container spacing={3}>
              <Box mt={8} mb={5}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div>
                  <TextField
                    id="author"
                    name="author"
                    label="Автор"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  
                  </div>
                  <div><br></br>
                  <TextField  
                    id="title"
                    name="title"
                    label="Название"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  </div>
                  <div><br></br>
                  <TextField 
                    id="publishing_house"
                    name="publishing_house"
                    label="Издательство"
                    type="text"
                    value={publishing_house}
                    onChange={(e) => setPublishing_house(e.target.value)}
                  />
                  </div>
                  <div><br></br>
                  <TextField
                    id="year"
                    name="year"
                    label="Год"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  
                  </div>
                  <div><br></br>
                  <TextField 
                    id="ISBN"
                    name="ISBN"
                    label="ISBN"
                    type="text"
                    value={ISBN}
                    onChange={(e) => setISBN(e.target.value)}
                  />
                  </div>
                  <div><br></br>
                  <TextField 
                    id="pages"
                    name="pages"
                    label="Страниц"
                    type="text"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                  />
                  </div>
                  <div><br></br>
                  <TextField
                    id="type"
                    name="type"
                    label="Тип"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                  
                  </div>
                  <div><br></br>
                  <TextField 
                    id="location"
                    name="location"
                    label="Местоположение"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  </div>
                  <div><br></br>
                  <TextField 
                    id="state"
                    name="state"
                    label="Состояние"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  </div>
                  <br></br>
                  <Button variant="contained" color="primary" type="submit">
                    Изменить книгу
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
