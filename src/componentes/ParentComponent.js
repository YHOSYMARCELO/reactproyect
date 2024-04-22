import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import ModalProduct from "./ModalProduct";
import { Typography } from "@material-ui/core";

export default function ParentComponent(){
    const  {cart,setCart}= useContext(CartContext); 
    return(
       <>
       <Typography>{cart}</Typography>
       <ModalProduct setCart={setCart}></ModalProduct>
       <CartContext></CartContext>
       </> 
    )
}