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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Cookies from 'js-cookie';
import moment from "moment";
moment().format();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  formControl: {
    minWidth: 300,
  },
});

export default function DenseTable() {
  const URL = axiosURL.axiosURL;
  const admin = Cookies.get('admin')
  let isAdmin
  if (admin === 'true') {
    isAdmin = true
  } else {
    isAdmin = false
  }

  const [data, setData] = useState({ hits: [], reloading: true });
  const [readers, setReaders] = useState();
  const [books, setBooks] = useState();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const date = moment(new Date()).format("YYYY-MM-DD");
  console.log(date);

  const [selectedDate, setSelectedDate] = React.useState(date);
  const [selectedReturnDate, setSelectedReturnDate] = React.useState(date);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
  const handleReturnDateChange = (e) => {
    setSelectedReturnDate(e.target.value);
  };

  const [reader, setReader] = React.useState(0);

  const handleChangeReader = (event) => {
    setReader(event.target.value);
  };
  const [book, setBook] = React.useState(0);

  const handleChangeBook = (event) => {
    setBook(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(URL + "/history");

      setData({ hits: result.data, reloading: false });
    }
    async function fetchReaders() {
      const result = await axios.get(URL + "/readers");

      setReaders(result.data);
    }
    async function fetchBooks() {
      const result = await axios.get(URL + "/books");
      setBooks(result.data);
    }

    fetchData();
    fetchReaders()
    fetchBooks();
  }, [setData]);

  function handleSubmit(event) {
    console.log(book)
    console.log(reader)
    console.log(selectedDate)
    console.log(selectedReturnDate)
    async function postData() {
      const result = await axios
        .post(URL + "/history", {
          book_id: book,
          reader_id: reader,
          taking_date: selectedDate,
          returned_date: selectedReturnDate,
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
      const result = await axios.get(URL + "/history");
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
        .delete(URL + "/history/" + id)
        .then(function (response) {
          setMessage(response.data);
          setOpen(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    async function fetchData() {
      const result = await axios.get(URL + "/history");
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
                >
                  <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Карточка читателя
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={reader}
                        onChange={handleChangeReader}
                      >
                        {readers.map((item) => (
                          <MenuItem value={item.id}>
                            {item.card_number}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <br></br>
                  <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Книга
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={book}
                        onChange={handleChangeBook}
                      >
                        {books.map((item) => (
                          <MenuItem value={item.id}>{item.title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <br></br>
                    <TextField
                      id="date"
                      label="Дата выдачи"
                      type="date"
                      defaultValue={selectedDate}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleDateChange(e)}
                    />
                  </div>
                  <div>
                    <br></br>
                    <TextField
                      id="dateReturn"
                      label="Дата возврата"
                      type="date"
                      defaultValue={selectedReturnDate}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleReturnDateChange(e)}
                    />
                  </div>
                  

                  <br></br>
                  <Button variant="contained" color="primary" type="submit">
                    Добавить запись
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
                      <TableCell>Книга</TableCell>
                      <TableCell>Карточка читателя</TableCell>
                      <TableCell>Дата выдачи</TableCell>
                      <TableCell>Дата возврата</TableCell>
                      <TableCell>Редактировать</TableCell>
                      {isAdmin ? <TableCell>Удалить</TableCell> : '' }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.hits.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Link
                            to={"books/" + item.book_id}
                            style={{ textDecoration: "none" }}
                          >
                            {item.book}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={"readers/" + item.reader_id}
                            style={{ textDecoration: "none" }}
                          >
                            {item.reader}
                          </Link>
                        </TableCell>
                        <TableCell>{item.taking_date}</TableCell>
                        <TableCell>{item.returned_date}</TableCell>
                        <TableCell>
                          <Link
                            to={"history/" + item.id}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              value={item.id}
                            >
                              Редактировать
                            </Button>
                          </Link>
                        </TableCell>
                        {isAdmin ? <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => onDelete(item.id)}
                          >
                            Удалить
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

// import 'date-fns';
// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

// export default function MaterialUIPickers() {
// The first commit of Material-UI
// const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

// const handleDateChange = (date) => {
//   setSelectedDate(date);
// };

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <Grid container justify="space-around">
//         <KeyboardDatePicker
//           disableToolbar
//           variant="inline"
//           format="MM/dd/yyyy"
//           margin="normal"
//           id="date-picker-inline"
//           label="Date picker inline"
//           value={selectedDate}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
// //         <KeyboardDatePicker
//           margin="normal"
//           id="date-picker-dialog"
//           label="Date picker dialog"
//           format="MM/dd/yyyy"
//           value={selectedDate}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
//         <KeyboardTimePicker
//           margin="normal"
//           id="time-picker"
//           label="Time picker"
//           value={selectedDate}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             'aria-label': 'change time',
//           }}
//         />
// </Grid>
//     </MuiPickersUtilsProvider>
//   );
// }
