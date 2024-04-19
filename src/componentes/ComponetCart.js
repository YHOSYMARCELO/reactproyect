import React, { useState, useEffect, createContext, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Typography, TextField } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    },
    textField: {
        marginBottom: theme.spacing(1),
    },
}));


export default function ModalProduct({ producto, open, onClose }) {
    const classes = useStyles();
    const {addToCart} = useContext(ProductContext);
    const [expanded, setExpanded] = useState(false);
    const [quantity, setQuantity] = useState(1);
   // const [addProduct, setAddProduct] = useState({ producto: null, quantity: 1 });

    /*useEffect(() => {
        setAddProduct({ producto: producto, quantity: quantity });
    }, [producto, quantity]);*/

    const body = (
        <Paper>
            <Container className={classes.container}>
                <Box>
                    <img src={producto.images[0]} alt="Product" />
                </Box>
                <Box>
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
                    <Button
                        className={classes.button}
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleAddProduct}
                    >
                        Add Cart
                    </Button>
                </Box>
            </Container>
        </Paper>
    );

    const handleClose = () => {
        onClose();
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleAddProduct = () => {
        addToCart(producto,quantity)
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <ProductContext.Provider value={{ addProduct, setAddProduct }}>
                {body}
            </ProductContext.Provider>
        </Modal>
    );
}
