import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from './Grid'

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" mt={100}>
        <Grid/>
      </Container>
    </React.Fragment>
  );
}
