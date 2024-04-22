import { Container, Typography, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, Table } from '@material-ui/core';
//import { CartContext } from './CartProvider'
import { useContext, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from '../context/CartContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '8px',
        justifyContent: 'space-between',
    },
}))
export default function CartProduct({ cart, dataUnique }) {
    const classes = useStyles();
    const [total, setTotal] = useState(0);
    const [dataCart, setDataCart] = useState(cart);
    // const { cart } = useContext(CartContext);
    /*const [product, setProduct] = useState([]);
    useEffect(()=>{
        if(cart){
        setProduct((prev)=>[...prev, cart]); 
        }
    },[cart]);*/
    useEffect(() => {
        let sum = 0;
        dataCart.forEach(element => {
            return sum += parseInt(element.price * element.quantity);
        });
        setTotal(sum)
    }, [dataCart])

    useEffect(() => {
        const UpdateData = dataCart.map((valor) => valor.id === dataUnique.id ? { ...valor, quantity:valor.quantity += dataUnique.quantity } : valor);
        setDataCart(UpdateData)
    }, [dataUnique])
    const deleteProduct = (value) => {
        const dataDelete = dataCart.filter((producto) => producto.id !== value.id);
        setDataCart(dataDelete);
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Producto</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Nombre</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Precio</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Cantidad</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Costo Total</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataCart.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    <img src={row.images} style={{ height: '100px', width: '100px' }}></img>
                                </TableCell>
                                <TableCell align="center">{row.title}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row.quantity * row.price}</TableCell>
                                <TableCell ><HighlightOffIcon onClick={() => deleteProduct(row)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Container className={classes.container}>
                <Typography style={{ fontWeight: 'bold', fontSize: '30px' }}>Total :</Typography>
                <Typography>{total}</Typography>
            </Container>
        </>
    )
}