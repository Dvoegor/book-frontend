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
import Cookies from 'js-cookie';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Book() {
  const URL = axiosURL.axiosURL;
  const admin = Cookies.get('admin')
  let isAdmin
  if (admin === 'true') {
    isAdmin = true
  } else {
    isAdmin = false
  }

  const [data, setData] = useState({ hits: [], reloading: true });
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
      const result = await axios.get(URL + "/books");
      setData({ hits: result.data, reloading: false });
    }

    fetchData();
  }, [setData]);

  function handleSubmit(event) {
    async function postData() {
      const result = await axios
        .post(URL + "/books", {
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
    async function fetchData() {
      const result = await axios.get(URL + "/books");
      setData({ hits: result.data });
      console.log(data);
    }

    async function updateState() {
      await postData();
      await fetchData();
    }
    updateState();
    event.preventDefault();
  }

  function onDelete(id) {
    async function deleteData() {
      const result = await axios
        .delete(URL + "/books/" + id)
        .then(function (response) {
          setMessage(response.data);
          setOpen(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    async function fetchData() {
      const result = await axios.get(URL + "/books");
      setData({ hits: result.data });
      console.log(data);
    }

    async function updateState() {
      await deleteData();
      await fetchData();
    }
    updateState();
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
          <Link exact to="/" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="primary">
                  Вернуться
                </Button>
              </Link>
            <Grid container spacing={3}>
              <Box mt={8} mb={5}>
                <form
                  className={classes.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                ><div>
                  <TextField
                    id="author"
                    name="author"
                    label="Автор"
                    type="text"
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  {/* <div><br></br> */}
                  <TextField  style={{ marginLeft: 20 }}
                    id="title"
                    name="title"
                    label="Название"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {/* </div> */}
                  {/* <div><br></br> */}
                  <TextField style={{ marginLeft: 20 }}
                    id="publishing_house"
                    name="publishing_house"
                    label="Издательство"
                    type="text"
                    onChange={(e) => setPublishing_house(e.target.value)}
                  />
                  {/* </div> */}
                  </div>
                  
                  <div><br></br>
                  <TextField
                    id="year"
                    name="year"
                    label="Год"
                    type="text"
                    onChange={(e) => setYear(e.target.value)}
                  />
                  {/* <div><br></br> */}
                  <TextField style={{ marginLeft: 20 }}
                    id="ISBN"
                    name="ISBN"
                    label="ISBN"
                    type="text"
                    onChange={(e) => setISBN(e.target.value)}
                  />
                  {/* </div> */}
                  {/* <div><br></br> */}
                  <TextField style={{ marginLeft: 20 }}
                    id="pages"
                    name="pages"
                    label="Страниц"
                    type="text"
                    onChange={(e) => setPages(e.target.value)}
                  />
                  {/* </div> */}
                  </div>
                  
                  <div><br></br>
                  <TextField
                    id="type"
                    name="type"
                    label="Тип"
                    type="text"
                    onChange={(e) => setType(e.target.value)}
                  />
                  {/* <div><br></br> */}
                  <TextField style={{ marginLeft: 20 }}
                    id="location"
                    name="location"
                    label="Местоположение"
                    type="text"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {/* </div> */}
                  {/* <div><br></br> */}
                  <TextField style={{ marginLeft: 20 }}
                    id="state"
                    name="state"
                    label="Состояние"
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                  />
                  {/* </div> */}
                  </div>
                  
                  <br></br>
                  <Button variant="contained" color="primary" type="submit">
                    Добавить книгу
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
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Автор</TableCell>
                      <TableCell>Название</TableCell>
                      <TableCell>Издательство</TableCell>
                      <TableCell>Год</TableCell>
                      <TableCell>ISBN</TableCell>
                      <TableCell>Страниц</TableCell>
                      <TableCell>Тип</TableCell>
                      <TableCell>Местоположение</TableCell>
                      <TableCell>Состояние</TableCell>
                      <TableCell>Ред.</TableCell>
                      {isAdmin ? <TableCell>Уд.</TableCell> : '' }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.hits.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.publishing_house}</TableCell>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>{item.ISBN}</TableCell>
                        <TableCell>{item.pages}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell>
                          <Link
                            to={"books/" + item.id}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              value={item.id}
                            >
                              Ред
                            </Button>
                          </Link>
                        </TableCell>
                        {isAdmin ? <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => onDelete(item.id)}
                          >
                            Уд.
                          </Button>
                        </TableCell> : '' }
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
        </Container>
      </div>
    );
  }
}
