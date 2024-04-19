
import {createContext,useState} from "react";

export const CartContext= createContext();

export default function CartProvider({children}){
     const [cart,setCart]=useState([]); 
     const addProduct=(product, quantity)=>{
        setCart([...cart, {product, quantity}])
    }
return(
    <CartContext.Provider value={{addProduct,cart}}>
        {children}
    </CartContext.Provider>
)
}