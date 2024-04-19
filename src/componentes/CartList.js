import { useEffect, useState } from "react";
import Cart  from "./Cart";
import ModalProduct from "./ModalProduct";
export default function CartList(){

    const [open,setOpen]= useState(false);
    const [selectedProduct, setSelectedProduct]=useState(null);
    const [product, setProduct]= useState([]); 

    useEffect(()=> {
        async function fetchData(){
            try{
            const response= await fetch("https://api.escuelajs.co/api/v1/products");
            if(!response.ok){
                throw new Error("SOMETHING WRONG"); 
            }
            const data= await response.json(); 
            setProduct(data);
            }catch(error){
                console.log("ERROR",error)
            }
        }
        fetchData(); 
    },[])

    const handleProductClick=(producto)=>{
        setSelectedProduct(producto);
        setOpen(true); 
    }
    const handleClose = () => {
        setOpen(false);
      };
    return(
        <>
        {product.slice(0,12).map((producto)=>(
            <Cart key={producto.id}
            //{...producto}
            producto={producto}
            onHandleImage={handleProductClick}/>   
        ))}
       {selectedProduct && <ModalProduct producto={selectedProduct} open={open} onClose={handleClose}/>}
        </>
    )
}