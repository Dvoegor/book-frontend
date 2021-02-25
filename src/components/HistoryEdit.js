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
  const query = window.location.pathname

  const [data, setData] = useState({ reloading: true });
  const [readers, setReaders] = useState([]);
  const [books, setBooks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
//   const date = moment(new Date()).format("YYYY-MM-DD");
//   console.log(date);

  const [selectedDate, setSelectedDate] = React.useState();
  const [selectedReturnDate, setSelectedReturnDate] = React.useState();

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
      async function fetchHistory() {
          const result = await axios.get(URL + query)

          setData({reloading: false})
          setBook(result.data.book_id)
          setReader(result.data.reader_id)
          setSelectedDate(result.data.taking_date)
          setSelectedReturnDate(result.data.returned_date)
      }
      async function fetchReaders() {
        const result = await axios.get(URL + "/readers");
  
        setReaders(result.data);
      }
      async function fetchBooks() {
        const result = await axios.get(URL + "/books");
        setBooks(result.data);
      }

      fetchReaders()
    fetchBooks();
    fetchHistory()
    console.log(selectedDate)
  }, [setData]);

  function handleSubmit(event) {
    async function postData() {
        const result = await axios
          .patch(URL + query, {
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

      postData();
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
            <Link exact to="/history" style={{ textDecoration: "none" }}>
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
                      value={selectedDate}
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
                      value={selectedReturnDate}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleReturnDateChange(e)}
                    />
                  </div>
                  

                  <br></br>
                  <Button variant="contained" color="primary" type="submit">
                    Изменить запись
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
