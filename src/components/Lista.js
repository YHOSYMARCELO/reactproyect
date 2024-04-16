import * as React from 'react';
import { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input, Box, TextField } from "@material-ui/core";
import SimpleDialog from './SimpleDialog';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Lista() {

  const [id, setId] = useState(1);
  const [estado, setEstado] = useState(true);
  const [name, setInputNombre] = useState("");
  const [code, setInputCode] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectRow, setSelectRow] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    datos: [],
    loading: false,
    pageSize: 6,
    page: 0,
    totalRows: 0
  }
  );
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Se requiere el nombre'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('La descripción es obligatoria'),
  });
  useEffect(() => {
    setPaginationModel((previus) => ({ ...previus, loading: true }));
    fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/${id}/procedures?pageSize=${paginationModel.pageSize}&page=${paginationModel.page}`)
      .then(response => (response.json()))
      .then(data => (setPaginationModel((previus) => ({ ...previus, datos: data, loading: false }))));
  }, [id]);

  const cambiarEstado = () => {
    return setEstado(!estado);
  }
  const handleClickUpdate = (params) => {
    setSelectRow(params.row);
    setOpen(true);
  }
  const handleClickDelete = async (params) => {
    // setSelectRow(params.row); 
    try {
      await axios.delete(`http://192.168.0.30:8080/snc-mf-api/v1/clients/${id}/procedures/${params.row.id}`)
      const datosEliminados = paginationModel.datos.filter((datos) => (datos.id !== selectRow.id));
      setPaginationModel((prev) => ({ ...prev, datos: datosEliminados }));
      alert("dato eliminado");
    }
    catch (error) {
      console.log("error en eliminar");
    }
  }

  const handleActualizar = async (name, description) => {

    if (!name.trim() || !description.trim()) {
      alert("agregar los campos");
      return;
    }
    else {
      const newData = {
        versionLock: null,
        active: true,
        createdAt: null,
        modifiedAt: null,
        modifiedBy: null,
        id: parseInt(selectRow.id),
        clientId: 1,
        name: name,
        description: description
      }
      try {
        await axios.put(`http://192.168.0.30:8080/snc-mf-api/v1/clients/${id}/procedures/${selectRow.id}`, newData)
          //const updateData= paginationModel.datos.map((dato)=>(dato.id===selectRow.id ? [...dato, name , description]: dato))
          .then(response => setPaginationModel((previus) => ({ ...previus, datos: previus.datos.map((dato) => dato.id === selectRow.id ? { ...dato, ...response.data } : dato) })));
        // setPaginationModel((previus)=>({...previus, datos:updateData}));

      } catch (error) {
        console.log("error de actualización");
      }
    }

  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async (values, { setSubmitting }) => {
    const newData = {
      versionLock: null,
      active: true,
      createdAt: null,
      modifiedAt: null,
      modifiedBy: null,
      id: null,
      clientId: 1,
      name: values.name,
      description: values.description
    }

    axios.post(`http://192.168.0.30:8080/snc-mf-api/v1/clients/${id}/procedures`, newData)
      .then(response => {
        setPaginationModel((previus) => ({ ...previus, datos: [...previus.datos, response.data] }))
        alert("DATOS INGRESADOS CORRECTAMENTE")
      })
      .catch(error => console.log("ERROR", error))
      .finally(() => setSubmitting(false));
    //setPaginationModel((previus)=>({...previus , datos: [id, name, description]}));
  }
  const buscarDatos = () => {
    const valorFiltrado = paginationModel.datos.filter((dat) =>
    (dat.id === parseInt(code) &&
      dat.name.toLowerCase().includes(name.toLowerCase())));
    setPaginationModel((previus) => ({ ...previus, datos: valorFiltrado }));
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    {
      field: "Delete",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClickDelete(params)}
          >
            Delete
          </Button>
        );

      }, width: 180,
    },
    {
      field: "Update",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => { handleClickUpdate(params) }}
          >
            Update
          </Button>
        );
      }, width: 180,
    }
  ];

  const rows = paginationModel.datos.map((dat) =>
    ({ id: dat.id, name: dat.name, description: dat.description }));

  return (
    <>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          autoHeight
          rows={rows}
          loading={paginationModel.loading}
          columns={columns}
          pageSize={paginationModel.pageSize}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowsPerPageOptions={[5, 10]}
          onPageChange={(newPage) => setPaginationModel((previus) => ({ ...previus, page: newPage }))}

        />

      </div>
      <div style={{ visibility: estado === true ? "hidden" : "visible", marginTop: 20, display: "flex", justifyContent: "center", gap: 8 }}>
        <TextField variant="outlined" margin="normal" label="Id" onChange={(e) => setInputCode(e.target.value)} value={code} />
        <TextField variant="outlined" margin="normal" label="Name" onChange={(e) => setInputNombre(e.target.value)} value={name} />
      </div>
      <Box style={{ display: "grid", flexDirection: "row", gap: 10 }}>
        <Button variant="outlined" onClick={cambiarEstado} color="primary" disableElevation>
          Desaparecer
        </Button>
        <Button variant="outlined" onClick={buscarDatos} color="primary" disableElevation>
          Filtrar
        </Button>
        <Button variant="outlined" onClick={() => (setId(id + 1))} color="primary" disableElevation>
          Aumentar
        </Button>
        <Button variant="outlined" onClick={() => (setId(id - 1))} color="primary" disableElevation>
          Disminuir
        </Button>
      </Box>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {

          handleCreate(values, { setSubmitting });

        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box boxShadow={3} style={{ display: "flex", padding: 3, gap: 8, flexDirection: "column", alignItems: "center" }}>
              <Field
                as={TextField}
                label="Name"
                name="name"
                helperText={<ErrorMessage name="code" />}
              />
              <Field
                as={TextField}
                label="Description"
                name="description"
                helperText={<ErrorMessage name="name" />}
              />

              <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
                <Button type="submit" variant="contained" color="secondary" style={{ marginTop: 20, marginRight: 10 }} disabled={isSubmitting}>
                  Create
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <SimpleDialog data={selectRow} open={open} onClose={handleClose} onUpdate={handleActualizar} />
    </>
  )
}