import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Typography , TextField} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { createContext } from 'react';

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
        display:'flex',
        justifyContent:'center'
    },
    box: {
        display:'flex',
        flexDirection:'column',
        gap:3
    },
    textField:{
        marginBottom:theme.spacing(1)
    }

}))

const ProductContext= createContext(null);

export default function ModalProduct({producto, open, onClose }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [quantity, setQuantity]= useState(1); 
    const [addProduct, setAddProduct] = useState({producto:[], quantity:1})

    useEffect(()=>{
        setAddProduct({producto:producto, quantity:quantity})
    },[producto]); 

    const body = (
        <Paper>
            <Container className={classes.container}>
                <Box>
                    <img src={producto.images[0]}/>
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
                    <Button className={classes.button}
                        startIcon={<ShoppingCartIcon />} onClick={handleAddProduct}> Add Cart</Button>
                </Box>
            </Container>
        </Paper>
    )
    const handleClose = () => {
        onClose()
    };

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }
    const handleAddProduct=(producto,quantity)=>{
        setAddProduct({producto, quantity})
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    )
}