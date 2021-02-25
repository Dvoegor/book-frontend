import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box mt={3}>
        <Grid item xs={12}>
          <Card
            icon="book"
            link="books"
            title="Книжный фонд"
            description="База данных книжного фонда"
          />
        </Grid>
      </Box>
      <Box mt={3}>
        <Grid item xs={12}>
          <Card
            icon="person"
            link="readers"
            title="Читатели"
            description="База данных читателей"
          />
        </Grid>
      </Box>
      <Box mt={3}>
        <Grid item xs={12}>
          <Card
            icon="list"
            link="history"
            title="История"
            description="База данных записей о том, когда и какой читатель брал книгу"
          />
        </Grid>
      </Box>
    </div>
  );
}
