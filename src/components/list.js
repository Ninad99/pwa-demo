import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ListItem from './listItem';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function List(props) {
  const classes = useStyles();
  const { items, removeItem } = props;

  let content = null;

  if (items.length === 0) {
    content = (
      <Paper elevation={1} className={classes.paper}>
        No items
      </Paper>
    );
  }

  if (items.length > 0) {
    content = items.map((item, index) => (
      <ListItem
        key={index}
        itemKey={index}
        item={item}
        removeItem={removeItem}
      />
    ));
  }

  return <Box p={3}>{content}</Box>;
}
