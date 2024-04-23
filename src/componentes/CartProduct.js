import { Container, Typography, TableContainer,TextField, TableHead, TableCell, TableRow, TableBody, Paper, Table } from '@material-ui/core';
//import { CartContext } from './CartProvider'
import { useContext, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from '../context/CartContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import UpdateIcon from '@material-ui/icons/Update';
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
    const [valorCantidad, setValorCantidad]=useState(null)
    const [disabled, setDisabled] = useState({}); 
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

    useEffect(()=>{
        setValorCantidad(dataUnique.quantity || '')
    },[dataUnique])
   /* useEffect(() => {
        const updateDataCart=[...dataCart];
        const updateData = updateDataCart.findIndex((indice)=>indice.id===dataUnique.id); 
        if(updateData!==-1){
            updateDataCart[updateData].quantity+=dataUnique.quantity; 
        }
        else{
            updateDataCart.push(dataUnique)
        }
        setDataCart(updateDataCart)
    }, [dataUnique])
    /* useEffect(() => {
        
         const existingProductIndex = dataCart.findIndex(item => item.id === dataUnique.id);
 
         if (existingProductIndex !== -1) {
             const updatedDataCart = [...dataCart];
             updatedDataCart[existingProductIndex].quantity += dataUnique.quantity;
             setDataCart(updatedDataCart);
         } else {
            
             setDataCart(prevCart => [...prevCart, dataUnique]);
         }
     }, [dataUnique]);*/
   /* useEffect(() => {
        setValorCantidad(dataUnique.quantity)
        const productoD = dataCart.find((item) => item.id === dataUnique.id);
        if (productoD) {
            const dataFilterd = dataCart.map(item => item.id === dataUnique.id ?
                { ...item, quantity: item.quantity += dataUnique.quantity } : item)
            setDataCart(dataFilterd)
        } else {
            setDataCart(prevCart => [...prevCart, dataUnique]);
        }

    }, [dataUnique])

*/
    const deleteProduct = (value) => {
        const dataDelete = dataCart.filter((producto) => producto.id !== value.id);
        setDataCart(dataDelete);
    }
    const updateProduct = (value) => {
        const dataUpdate = dataCart.map((producto) => 
            producto.id === value.id ? { ...producto, quantity: valorCantidad } : producto
        );
        setDataCart(dataUpdate);
        setDisabled({ ...disabled, [value.id]: false }); 
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
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Update</TableCell>
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
                                <TableCell align="center"> <TextField
                                    className={classes.textField}
                                    type="number"
                                   // disabled={selectedRow !== row}
                                    disabled={disabled[row.id]}
                                    //value={selectedRow === row ? valorCantidad : row.quantity}
                                    value={valorCantidad}
                                    onChange={(e) => setValorCantidad(e.target.value)}
                                /></TableCell>
                                <TableCell align="center">{row.quantity * row.price}</TableCell>
                                <TableCell  align="center" ><HighlightOffIcon onClick={() => deleteProduct(row)} /></TableCell>
                                <TableCell align="center">
                                    <UpdateIcon onClick={() => updateProduct(row)} />
                                </TableCell>
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