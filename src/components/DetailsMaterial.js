import { Paper, TextField, Box, Button, Typography } from '@material-ui/core';
//import {DataGrid}  from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"


export default function DetailsMaterial({ valor, index }) {

  const { id } = useParams();
  const [data, setDato] = useState([]);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState( {
        id: null,
        name: null,
        code: null,
        externalCode: null,
        description: null,
        isVirtual: null,
        observations: null
  }); 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics/${id}`);
        setDato(response.data);
      }
      catch (error) {
        console.log("error en conexion")
      }
    }
    fetchData();
  }, [id])

  /* useEffect(()=>{
       setMaterial(material);
   },[])*/
   useEffect(() => {
    // Actualiza formData cuando data cambie
    setFormData({
      id: data.id || "",
      name: data.name || "",
      code: data.code || "",
      externalCode: data.externalCode || "",
      description: data.description || "",
      isVirtual: data.isVirtual || false,
      observations: data.observations || ""
    });
  }, [data]);

   const handleInputChange=(e)=>{
    const {name, value} =e.target.value; 
    setFormData({...formData, [name]:value})
   }
  const handleClick = () => {
    if(!edit){
      setFormData({
        id: null,
        name: null,
        code: null,
        externalCode: null,
        description: null,
        isVirtual: null,
        observations: null
      })
    }
    setEdit(!edit);
  }
  return (
    <>
      <div
        role="tabpanel"
        hidden={valor !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {valor === index && (
          <Paper elevation={3} style={{ padding: 20 }}>
           
              <Box style={{ display: "flex", border: 1, flexDirection: "column" }}>
                 <TextField variant="outlined" margin="normal" label="Id" onChange={handleInputChange} value={formData.id} disabled={!edit} />
                <TextField variant="outlined" margin="normal" label="Name"onChange={handleInputChange}  value={formData.name} disabled={!edit}/>
                <TextField variant="outlined" margin="normal" label="Code" onChange={handleInputChange} value={formData.code} disabled={!edit}/>
                <TextField variant="outlined" margin="normal" label="ExternalCode" onChange={handleInputChange}  value={formData.externalCode} disabled={!edit} />
                <TextField variant="outlined" margin="normal" label="Description" onChange={handleInputChange}  value={formData.description} disabled={!edit}/>
                <TextField variant="outlined" margin="normal"  label="isVirtual" onChange={handleInputChange}  value={formData.isVirtual} disabled={!edit}/>
                <TextField variant="outlined" margin="normal"label="Observations" onChange={handleInputChange}  value={formData.observations} disabled={!edit} />
                <Button color="primary" variant="contained" onClick={handleClick}>{ edit ? "Guardar" : "Editar"}</Button>
              </Box>
          </Paper>

        )}
      </div>

    </>
  )
}