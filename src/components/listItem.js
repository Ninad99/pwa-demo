import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {
  Grid,
  Typography,
  Modal,
  Backdrop,
  Fade,
  Button,
  Paper,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  Chat as ChatIcon,
  VideoCall as VideoCallIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import AddItem from './addItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '.5rem 0',
  },
  flexRoot: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
  },
  btn: {
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #aaa',
    padding: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
  },
}));

export default function ListItem(props) {
  const classes = useStyles();
  const { item, itemKey, removeItem } = props;
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [innerItems, setInnerItems] = useState([]);

  const handleOpen = (operation) => {
    setOpen(true);
    setModalTitle(operation);
  };

  const handleClose = () => {
    setOpen(false);
    setModalTitle('');
  };

  const handleAddItem = (item) => {
    setInnerItems((prevItems) => [...prevItems, item]);
  };

  const removeInnerItem = (itemIndex) => {
    setInnerItems((prevItems) =>
      prevItems.filter((item, index) => index !== itemIndex)
    );
  };

  return (
    <div className={classes.root}>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>
              {modalTitle} - {item}
            </h2>
            <p id='transition-modal-description'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              necessitatibus et quia temporibus officia veritatis, alias magni
              quo maiores pariatur.
            </p>
          </div>
        </Fade>
      </Modal>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography className={classes.heading}>{item}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container justify='center' spacing={2}>
            <Grid item xs={12} className={classes.flexRoot}>
              <AddItem handleAddItem={handleAddItem} />
            </Grid>
            {innerItems.length > 0 && (
              <>
                {innerItems.map((item, index) => (
                  <Grid item xs={12} key={index} className={classes.flexRoot}>
                    <Paper
                      className={classes.paper}
                      onClick={() => removeInnerItem(index)}>
                      {item}
                    </Paper>
                  </Grid>
                ))}
              </>
            )}
            <Grid item md={3} className={classes.flexRoot}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.btn}
                onClick={() => handleOpen('Chat')}>
                <ChatIcon />
                &nbsp;Chat
              </Button>
            </Grid>
            <Grid item md={6} className={classes.flexRoot}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.btn}
                onClick={() => handleOpen('Video upload')}>
                <VideoCallIcon />
                &nbsp;Video Upload
              </Button>
            </Grid>
            <Grid item md={3} className={classes.flexRoot}>
              <Button
                variant='outlined'
                style={{ color: 'red' }}
                className={classes.btn}
                onClick={() => removeItem(itemKey)}>
                <DeleteIcon />
                &nbsp;Remove
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
