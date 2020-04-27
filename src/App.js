import React, { useState } from 'react';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/navbar';
import Container from '@material-ui/core/Container';
import AddItem from './components/addItem';
import List from './components/list';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6746c3',
      main: '#311b92',
      dark: '#000063',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff350',
      main: '#ffc107',
      dark: '#c79100',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '2rem 0',
  },
}));

function App() {
  const classes = useStyles();
  const [listItems, setListItems] = useState([]);

  const handleAddItem = (item) => {
    console.log('new item added, items:', [...listItems, item]);
    setListItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (itemKey) => {
    const updatedItems = listItems.filter((item, index) => index !== itemKey);
    console.log(updatedItems);
    setListItems(updatedItems);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth='sm' className={classes.container}>
        <AddItem handleAddItem={handleAddItem} />
        <List items={listItems} removeItem={removeItem} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
