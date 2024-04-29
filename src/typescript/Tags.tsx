import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chip from '@material-ui/core/Chip';
import { DataGrid } from '@mui/x-data-grid';
import DialogModal from "./DialogModal.tsx";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import React from "react"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

}));

interface TagsProps{

}
const Tags:React.FC<TagsProps>=()=>{
  const classes = useStyles();
  const { id } = useParams();
  const [tag, setTag] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [valueRow, setValueRow] = useState<any>();

  useEffect(() => {
    fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${id}/tags`)
      .then(response => response.json())
      .then(data => setTag(data))
  }, [id])

  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    {
      field: 'name',
      headerName: 'Tags',
      width: 250,
      renderCell: (params) => {
        const { name, color } = params.row
        return <Chip
          //label={params.value}
          label={name}
          variant="outlined"
          color={color}
        />

      },
    }
  ];

  const rows = tag.map((dato) => ({ id: dato.id, name: dato.name, color: dato.color }));

  const handleClick = (params) => {
    setValueRow(params.row);
    setOpen(!open);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleCreate = async (name, color) => {
    if (!name.trim() || !color.trim()) {
      alert("agregar valores");
      return;
    }
    else {
      const newData = {
        versionLock: 2,
        active: true,
        createdAt: null,
        modifiedAt: null,
        modifiedBy: null,
        id: parseInt(valueRow.id),
        clientId: 1,
        name: name,
        color: color
      }
      try {
        const response = await fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${id}/tags`, {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          }
        });
      
        setTag((previus) => ([...previus, newData]));
        alert("datos ingresados");
      }
      catch (e) {
        console.log("error de conexión")
      }

    }
  }
  const handleUpdate = async (name, color) => {
    if (!color.trim() || !name.trim()) {
      alert("necesitas ingresar los campos");
    }
    else {
      const newData = {
        versionLock: 2,
        active: true,
        createdAt: null,
        modifiedAt: null,
        modifiedBy: null,
        id: parseInt(valueRow.id),
        clientId: 1,
        name: name,
        color: color
      }
      try {
        const response = await fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/tags/${valueRow.id}`, {
          method: 'PUT',
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error("No se puede conectar");
        }
        const result = await response.json();
        setTag((prev) => prev.map((dat) => dat.id === valueRow.id ? { ...dat, ...result } : dat));
        alert("actualizado")
      } catch (error) {
        console.log(error);
      }
    }

  }
  const handleDelete=async()=>{

    try {
      await fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/tags/${valueRow.id}`, {
        method: "delete",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setTag((previus) => (previus.filter((dato) => dato.id !== valueRow.id)))
      alert("dato eliminado")
    } catch (error) {
      console.log(error)
    }
    }   
  
  return (<>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            DataMaterials
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      pageSize={3}
      onRowClick={handleClick}
    />
    <DialogModal open={open} onClose={handleClose} onDelete={handleDelete} onCreate={handleCreate} onUpdate={handleUpdate}></DialogModal>
  </>)
}
export default Tags; 