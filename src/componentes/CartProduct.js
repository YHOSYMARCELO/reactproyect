import { Container, Typography, Box } from '@material-ui/core';
//import { CartContext } from './CartProvider'
import { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    }
}))
export default function CartProduct({ cart }) {
    
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
            {cart.map((prod) => (
                <Container className={classes.container}>
                    <Box>
                    <img src={prod.description}></img>
                    </Box>
                    <Box>
                    <Typography>{prod.title}</Typography>
                    </Box>
                    <Box>
                        <Typography>{prod.price}</Typography>
                    </Box>
                    <Box>
                        <Typography>{prod.price * prod.quantity}</Typography>
                    </Box>
                </Container>)
            )}
        </>
    )
}