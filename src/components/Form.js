import {TextField,Paper,Button,Box} from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react"; 

export default function Form({open , onCreate, onUpdate,onBusqueda,onDelete}){
  const[  id, setId]= useState("");
  const[ title, setTitle]= useState("");
  const [busqueda,setBusqueda]=useState(null);

  const  handleClick=()=>{
    open(); 
  }
  const handleCreate=()=>{
      onCreate(id,title);
  }

  const handleUpdate=()=>{
      onUpdate(id,title);
  }

  const handleBusqueda=()=>{
      onBusqueda(busqueda);
  }

  const handleDelete=()=>{
    onDelete(); 
  }
    return(
        <Paper elevation={3} style={{ padding: 20 }}>
        <Box display="flex"  position="relative" padding={3} border={1} flexDirection="column" alignItems="center">
          <IconButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={handleClick}>
            <CloseIcon/>
          </IconButton>
          <TextField label="Id" variant="outlined" margin="normal" value={id} onChange={(e)=>setId(e.target.value)} />
          <TextField label="Title" variant="outlined" margin="normal" value={title} onChange={(e)=> setTitle(e.target.value)} />
          
          <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
          <Button  onClick={handleCreate} variant="contained" color="primary" style={{ marginTop: 20 , marginRight:10 }}>
            Crear
          </Button>
          <Button  onClick={handleUpdate} variant="contained" color="primary" style={{ marginTop: 20 , marginRight:10}}>
            Actualizar
          </Button>
         </Box>
          <Box>
          <TextField label="Buscar" variant="outlined" margin="normal" value={busqueda} onChange={(e)=>setBusqueda(e.target.value)} />
         < Button  onClick={handleBusqueda} variant="contained" color="primary" style={{ marginTop: 20 , marginRight:10}}>
            Buscar
          </Button>
          < Button   onClick={handleDelete} variant="contained" color="primary" style={{ marginTop: 20 , marginRight:10}}>
            Delete
          </Button>
          </Box>
          </Box>
          </Paper>
          )
          }