import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import {Select, MenuItem} from "@mui/material"
import Form from "./Form"
import { Link } from "@material-ui/core";


export default function NewList() {
    const [open, setOpen]=useState(false); 
    const [selectedRow,setSelectedRow]=useState(null);
    const [paginationModel, setPaginationModel] = useState({
        datos: [],
        loading: false,
        pageSize: 5,
        page: 0,
      //  totalRowCount:0
    });

    useEffect(() => {
        const fetchData = async () => {
            setPaginationModel(prev => ({ ...prev, loading: true }));
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_page=${paginationModel.page}_limit=${paginationModel.pageSize}`);
                setPaginationModel(prev => ({ ...prev, datos: response.data, loading: false
                      //,totalRowCount: response.data.totalCount
                    }));
            } catch (error) {
                console.error("Error fetching data:", error);
                setPaginationModel(prev => ({ ...prev, loading: false }));
            }
        };
        fetchData();
    }, [paginationModel.page, paginationModel.pageSize]);


   
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'title', headerName: 'Title', width: 150 },
        {field:'completed',headerName:'Tarea', width:150},
        {
            field: '',
            headerName: 'Tarea',
            width: 250,
            renderCell: (params) => (
                <>
                    <Select
                    value={params.value}
                   // onChange={(e) => params.api.setRowData([{ ...params.row, tarea: e.target.value }])}
                  >
                    <MenuItem value={"true"}>Virtual</MenuItem>
                    <MenuItem value={"false"}>SemiVirtual</MenuItem>
                  </Select>
                  </>
            ),
            
          },
          {
            field: 'descripcion',
            headerName: 'Description',
            width: 250,
            renderCell: (params) => (
                <>
                 <Link to></Link>
                  </>
            ),
            
          },
       /* {
            field: "Completado",
            renderCell: (params) => (
                <Typography>
                    {params.row.completed ? "Completado" : "No Completado"}
                </Typography>
            ),
            width: 180,
        },*/
    ];

    const rows = paginationModel.datos.map((dato) => ({ id: dato.id, title: dato.title , completed: dato.completed ?" Completado" :"No Completado" }));
   
    const handleRowClick=(params)=>{
        setSelectedRow(params.row)
        setOpen(true);
    }
    const handleClose=()=>{
        setOpen(false); 
    }

    const handleCreate= async (id,title)=>{
        const valor= parseInt(id,10)
        console.log(typeof(valor));
        if(isNaN(valor) || !title.trim())
        {
            alert("Ingresa los campos coorectos"); 
            return; 
        }
        else{
           try{
            const response= await axios.post(`https://jsonplaceholder.typicode.com/todos`, {title});
            setPaginationModel(previus => ({
                ...previus,
                datos: [...previus.datos, response.data]
              }));
             
           } catch(error){
            console.log("error en conexión");
           }
        }
    }
    const handleUpdate= async (id, title)=>{
        const valor= parseInt(id,10)
        if(isNaN(valor) || !title.trim())
        {
            alert("Ingresa los campos coorectos"); 
            return; 
        }
        else{
            try {
                //const response
                 await axios.put(`https://jsonplaceholder.typicode.com/todos/${selectedRow.id}`, { id, title });
                //const dataUpdate=paginationModel.datos.map(dato => dato.id === selectedRow.id ? response.data : dato);
                setPaginationModel(previus => ({
                  ...previus,
                  datos: previus.datos.map(dato=> dato.id===selectedRow.id ? {...dato, id, title} :dato)
                }));
              
                alert("actualizado");
              } catch (error) {
                console.log("error de actualización:", error);
              }
        }
    }

    const handleBusqueda=(busqueda)=>{
        if(!busqueda.trim()){
            alert("ingresa algo");
            return; 
        }
        else{
            setPaginationModel((previus) => ({
                ...previus,
                datos: previus.datos.filter((dato) => String(dato.id) === busqueda)
              }));
        }
    }
    const handleDelete= async()=>{
        try{
            const response= await axios.delete(`https://jsonplaceholder.typicode.com/todos/${selectedRow.id}`);
            setPaginationModel((previus)=>({...previus,
            datos: previus.datos.filter((dato)=>dato.id !==selectedRow.id)}))
            alert("dato eliminado")
        }
        catch(error){
            console.log("error al eliminar");
        }
    }
    return (
        <>
    <DataGrid
    rows={rows}
    loading={paginationModel.loading}
    columns={columns}
    pageSize={paginationModel.pageSize}
    paginationMode="server"
    //paginationModel={{...paginationModel,totalRowCount: totalRowCount}}
    onPaginationModelChange={setPaginationModel}
    rowsPerPageOptions={[5, 10]}
    onPageChange={newPage => setPaginationModel(prev => ({ ...prev, page: newPage }))}
    checkboxSelection
    onRowClick={handleRowClick}
/>
    {open && <Form onDelete={handleDelete}
    open={handleClose} onBusqueda={handleBusqueda}  onUpdate={handleUpdate} onCreate={handleCreate}></Form>}
        </>
    );
}

