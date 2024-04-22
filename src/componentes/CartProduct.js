import { Container, Typography, Box } from '@material-ui/core';
//import { CartContext } from './CartProvider'
import { useContext, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from '../context/CartContext';
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    }
}))
export default function CartProduct() {
    const {cart}= useContext(CartContext);
    const classes = useStyles();
    // const { cart } = useContext(CartContext);
    /*const [product, setProduct] = useState([]);
    useEffect(()=>{
        if(cart){
        setProduct((prev)=>[...prev, cart]); 
        }
    },[cart]);*/
    return (
        <>
            <Container className={classes.container}>
                <Box>
                    <img src={cart.images}></img>
                </Box>
                <Box>
                    <Typography>{cart.title}</Typography>
                </Box>
                <Box>
                    <Typography>{cart.price}</Typography>
                </Box>
            </Container>

        </>
    )
}