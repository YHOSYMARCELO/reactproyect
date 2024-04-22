import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Typography, TextField } from '@material-ui/core';
import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { CartContext } from '../context/CartContext';
//import { CartContext } from '../context/CartContext'

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    button: {
        margin: theme.spacing(1),
    },

    paper: {
        height: 600,
        padding: 50
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '50%'
    },
    textField: {
        marginBottom: theme.spacing(1)
    },
    image: {
        width: 500,
        height: 500
    },
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

}))

export default function ModalProduct({ producto, open, onClose, setCart}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showCart, setShowCart] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }
    const addProduct = () => {
        const newProduct = { ...producto, quantity };
        setCart(newProduct)
    }
    const toggleCart = () => {
        setShowCart(!showCart);
    }
    const body = (
        <Paper className={classes.paper}>
            <Container className={classes.container}>
                <Box >
                    <img className={classes.image} src={producto.images} />
                </Box>
                <Box className={classes.box}>
                    <Typography>{producto.title}</Typography>
                    <Typography>{producto.price}</Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {producto.description}
                    </Collapse>
                    <TextField
                        className={classes.textField}
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <Button onClick={addProduct}>Add Cart</Button>
                    <Button className={classes.button}
                        startIcon={<ShoppingCartIcon />} onClick={toggleCart}> {showCart ? "Show Cart" : "Hide Cart"}</Button>
                </Box>
            </Container>
            {/*showCart && <CartProduct cart={cart} />*/}
        </Paper>
    )
    const handleClose = () => {
        onClose()
    };

    return (
        <Modal className={classes.modal}
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    )
}