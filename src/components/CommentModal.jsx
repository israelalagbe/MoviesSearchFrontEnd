import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { addCommentToMovie } from '../store/actions/movie';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none !important',
        '&:focus': {
            outline: 'none',
        }
    },
    textRight: {
        textAlign: 'right'
    },
    paper: {
        minWidth: '500px',
        maxWidth: '600px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CommentModal({
    isOpen,
    handleClose,
    movie
}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [comment, setComment] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(addCommentToMovie({comment, id: movie._id}));
        setComment('');
    };
    return (

        <Modal
            className={classes.modal}
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className={classes.paper}>
                    <div className={classes.textRight}>
                        <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                    </div>
                    <h2 id="transition-modal-title">Comments </h2>

                    <form onSubmit={onSubmit}>
                        <TextField required value={comment} onChange={(e) => {
                            setComment(e.target.value)
                        }} fullWidth id="standard-basic" label="Write a comment" />
                    </form>

                    <List className={classes.root}>
                        {movie.comments.map((comment, index)=><React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="A" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Anonymous"
                                    secondary={
                                        <React.Fragment>
                                            {comment}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>)}

                    </List>
                </div>
            </Fade>
        </Modal>
    );
}