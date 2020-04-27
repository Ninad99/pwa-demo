import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '1rem',
  },
  formInput: {
    width: '100%',
    margin: '1rem 0',
  },
}));

export default function AddItem(props) {
  const classes = useStyles();
  const { handleAddItem } = props;
  const [formInput, setFormInput] = useState('');
  const [formError, setFormError] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormError(null);
    if (formInput === '') {
      return setFormError({ message: 'Field cannot be blank!' });
    }
    console.log('form submitted', formInput);
    handleAddItem(formInput);
    setFormInput('');
  };

  return (
    <Box p={1}>
      <Typography variant='h6' style={{ padding: '0 1rem' }}>
        A demo PWA. You can add/remove list items below:
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete='off'
        onSubmit={handleFormSubmit}>
        {formError && (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            {formError.message}
          </Alert>
        )}
        <TextField
          className={classes.formInput}
          id='standard-basic'
          label='Input something here'
          name='itemname'
          value={formInput}
          onChange={(e) => setFormInput(e.target.value)}
        />
        <Button variant='contained' color='secondary' type='submit'>
          <AddCircleOutlineIcon />
          &nbsp;&nbsp;Add
        </Button>
      </form>
    </Box>
  );
}
