import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Typography, Button, MenuItem, Paper, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import base64Image from "../images/images";
import Chip from '@material-ui/core/Chip';
import { deepOrange } from '@material-ui/core/colors';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const baseUrl = "http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics";
const tagsUrl = "http://192.168.0.30:8080/snc-mf-api/v1/clients/1/tags";

const validationSchema = Yup.object().shape({
  code: Yup.string().required('El código es obligatorio'),
  name: Yup.string().required('El nombre es obligatorio'),
  externalCode: Yup.string().required('El código externo es obligatorio'),
  description: Yup.string().required('La descripción es obligatoria'),
  measureUnitId: Yup.number().required('La unidad de medida es obligatoria'),
  observations: Yup.string().required('Las observaciones son obligatorias'),
});
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

}));
export default function MaterialForm() {
  //const generateUuid= uuidv4()
  const classe = useStyle();
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState(0);
  const [target1, setTarget1] = useState([]);
  const [target2, setTarget2] = useState([]);
  const [pagination, setPagination] = useState({
    loading: false,
    pageSize: 6,
    page: 0,
    totalRows: 0
  });

  useEffect(() => {
    setPagination(prev => ({ ...prev, loading:true }));
    fetch(`${baseUrl}?pageSize=${pagination.pageSize}&page=${pagination.page}`)
      .then(response => response.json())
      .then(data1 => {
        fetch(`${tagsUrl}?pageSize=${pagination.pageSize}&page=${pagination.page}`)
          .then(response => response.json())
          .then(data2 => {
            //const combinedData=[...data1, ...data2];
            setTarget1(data1)
            setTarget2(data2)
            // setTable(combinedData)
            setPagination(prev => ({ ...prev, totalRows: target1.totalRows, loading:false }));
          })
      })
  }, [pagination.page, pagination.pageSize])

  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'code', headerName: 'codigo', width: 150 },
    { field: 'nameMaterial', headerName: 'Nombre', width: 150 },
    { field: 'externalCode', headerName: 'código externo', width: 150 },
    { field: 'description', headerName: 'descripción', width: 150 },
    { field: 'measureUnitId', headerName: 'unidad de Medida', width: 150 },
    { field: 'observations', headerName: 'observaciones', width: 150 },
    {
      field: 'descripcion',
      headerName: 'Description',
      width: 250,
      renderCell: (params) => (
        <>
          <Link to={`/materialtab/${params.row.id}`}>Details</Link>
        </>
      ),
    },

   {
      field: 'details',
      headerName: 'Details',
      width: 250,
      renderCell: (params) => (
        <>
          <Link to={`/material/details/${params.row.id}`}>Description</Link>
        </>
      ),

    },
    {
      field: "imageUuid",
      headerName: 'Avatar',
      width: 200,
      renderCell: (params) =>
        <>
          <Avatar className={classe.orange} src={params.value}>{params.value}</Avatar>
        </>
    },
    {
      field: "target",
      headerName: "Target",
      width: 200,
      renderCell: (params) =>
        <>
          {params.value ? params.value.map((tag) => (
            <Chip style={{ marginRight: 5 }} label={tag} color="secondary" />
          )) : <Chip label="sin valor" color="primary"></Chip>
          }
        </>
    }
  ];
  //paginationModel.datos && target ?.map
  /*const table = nameAPI.map((nameObj, i) => {
    let temp = rankAPI.find((rankObj) => rankObj.id === nameObj.id);
    return { ...nameObj, ...temp };
  });
*/
  const rows = target1.map(dat => {
    const targets = target2.filter((tag) => tag.versionLock === dat.id).map(data => data.name);
    return {
      id: dat.id, code: dat.code, nameMaterial: dat.name, externalCode: dat.externalCode, description: dat.description, measureUnitId:
        dat.measureUnitId, observations: dat.observations, imageUuid: dat.imageUuid ? `${base64Image}` : "N", target: targets.length > 0 ? targets : null
    }

  });

  const handleClick = (params) => {
    setSelectedRow(params.row)
  }

  const handleCreate = async (values, { setSubmitting }) => {

    const newData = {
      versionLock: null,
      active: true,
      createdAt: null,
      modifiedAt: null,
      modifiedBy: null,
      id: null,
      clientId: 1,
      measureUnitId: parseInt(values.measureUnitId),
      code: values.code,
      externalCode: values.externalCode,
      name: values.name,
      description: values.description,
      isVirtual: false,
      imageUuid: null,
      compositionImageUuid: null,
      observations: values.observations,
      isRawMaterial: false,
      isSemifinished: false,
      isFinished: false
    }

    try {
      const response = await fetch('http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics', {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error("no connection");
      }
      const data = await response.json();
      //setPaginationModel((previus) => ({ ...previus, datos: [...previus.datos, data] }));
      setTarget1((previus) => ([...previus, data ]));
      alert("DATOS INGRESADOS EXITOSAMENTE");
    }
    catch (error) {
      console.log("error de conexión", error)
      alert("Hubo un error al ingresar los datos. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setSubmitting(false);
    }
  }

  const handleDelete = async () => {
    try {
      await fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics/${selectedRow.id}`, {
        method: "delete",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setTarget1((previus) => previus.filter((dato) => dato.id !== selectedRow.id))
      alert("dato eliminado")
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = async (values, { setSubmitting }) => {
    const newData =
    {
      versionLock: null,
      active: true,
      createdAt: null,
      modifiedAt: null,
      modifiedBy: null,
      id: parseInt(selectedRow.id),
      clientId: 1,
      measureUnitId: parseInt(values.measureUnitId),
      code: values.code,
      externalCode: values.externalCode,
      name: values.name,
      description: values.description,
      isVirtual: false,
      imageUuid: null,
      compositionImageUuid: null,
      observations: values.observations,
      isRawMaterial: false,
      isSemifinished: false,
      isFinished: false
    }
    try {
      // Enviar la solicitud PUT al servidor
      const response = await fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics/${selectedRow.id}`, {
        method: 'PUT',
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTarget1((previous) => (
          previous.map((dato) => {
            if (dato.id === selectedRow.id) {
              return { ...dato, ...data };
            }
            return dato;
          })
        ));

        alert("¡Dato actualizado correctamente!");
      } else {
        throw new Error("Error al actualizar el dato.");
      }//Any error
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al actualizar el dato. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
        pageSize={pagination.pageSize}
        //paginationModel={paginationModel}
        //onPaginationModelChange={setPaginationModel}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        onRowClick={handleClick}
        loading={pagination.loading}
        rowCount={pagination.totalRows}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
      />
      <Typography style={{ textAlign: "center", marginTop: 45 }}>Formulario</Typography>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Box style={{ display: "flex", padding: 3, gap: 8, flexDirection: "column", border: 1, alignItems: "center" }} >

          <Formik
            initialValues={{
              code: "",
              name: "",
              externalCode: "",
              description: "",
              measureUnitId: "",
              observations: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              if (selectedRow) {
                handleUpdate(values, { setSubmitting, resetForm });
              } else {
                handleCreate(values, { setSubmitting, resetForm });
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box style={{ display: "flex", padding: 3, gap: 8, flexDirection: "column", border: 1, alignItems: "center" }}>
                  <Field
                    as={TextField}
                    label="Code"
                    name="code"
                    helperText={<ErrorMessage name="code" />}
                  />
                  <Field
                    as={TextField}
                    label="Name"
                    name="name"
                    helperText={<ErrorMessage name="name" />}
                  />
                  <Field
                    as={TextField}
                    label="External Code"
                    name="externalCode"
                    helperText={<ErrorMessage name="externalCode" />}
                  />
                  <Field
                    as={TextField}
                    label="Description"
                    name="description"
                    helperText={<ErrorMessage name="description" />}
                  />
                  <Field
                    as={TextField}
                    select
                    label="Measure"
                    name="measureUnitId"
                    helperText={<ErrorMessage name="measureUnitId" />}
                  >
                    {target1.map((option) => (
                      <MenuItem key={option.id} value={option.measureUnitId}>
                        {option.measureUnitId}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    as={TextField}
                    label="Observations"
                    name="observations"
                    helperText={<ErrorMessage name="observations" />}
                  />
                  <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
                    <Button type="submit" variant="contained" color="secondary" style={{ marginTop: 20, marginRight: 10 }} disabled={isSubmitting}>
                      {selectedRow ? "Actualizar" : "Crear"}
                    </Button>
                    <Button onClick={handleDelete} variant="contained" color="secondary" style={{ marginTop: 20, marginRight: 10 }} disabled={!selectedRow || isSubmitting}>
                      Eliminar
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>

      </Paper>
    </>
  )
}