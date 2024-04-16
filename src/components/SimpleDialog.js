
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {useState } from "react";

export default function SimpleDialog(props){
 
  const { onClose, open , onUpdate} = props;
  const [name,setName]=useState("");
  const [description, setDescription]=useState("");

  const handleClose = () => {
    onClose();
  };

   /* useEffect(()=>{

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valorNuevo)
    };

      fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/procedures`, requestOptions)
      .then(response=> response.json())
      .catch(error=>console.log(error))

    },[valorNuevo]);*/

  const handleClick=()=>{
      onUpdate(name,description);
      onClose();
  }
  
  /*const handleListItemClick = (value) => {
    onClose(value);
  };*/
    return(
  
        <Dialog onClose={handleClose}  aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Formulario</DialogTitle>
        <FormControl onSubmit={(e)=>(e.preventDefault)} style={{width:400 , height:400 , margin:20}}>
        <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
        <Input value={name} onChange={(e)=>setName((e.target.value))} 
        />
      <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
        <Input value={description} onChange={(e)=>setDescription((e.target.value))}
        
        />
        <Button style={{marginTop:10}} onClick={handleClick} variant='contained'>Actualizar</Button>
      </FormControl>
      </Dialog>
      
    );
}