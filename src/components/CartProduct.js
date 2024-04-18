import { Container, Typography } from '@material-ui/core';
import { CartContext } from './CartProvider'
import { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    }
}))
export default function CartProduct() {
    const classes= useStyles();
    const { cart } = useContext(CartContext);
    const total= cart.precio * cart.quantity; 
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
                    <Typography>{cart.precio}</Typography>
                </Box>
                <Box>
                    <Typography>{total}</Typography>
                </Box>
            </Container>
        </>
    )
}