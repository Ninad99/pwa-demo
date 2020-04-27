import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChatIcon from '@material-ui/icons/Chat';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

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
    border: '2px solid #000',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ListItem(props) {
  const classes = useStyles();
  const { item, itemKey, removeItem } = props;
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleOpen = (operation) => {
    setOpen(true);
    setModalTitle(operation);
  };

  const handleClose = () => {
    setOpen(false);
    setModalTitle('');
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
