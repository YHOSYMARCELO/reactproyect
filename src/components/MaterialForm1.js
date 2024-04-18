import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Typography, Button, MenuItem, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import base64Image from "../images/images";
import Chip from '@mui/material/Chip';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const baseUrl = "https://desarrollo.emisuite.es/snc-mf-api/v1/clients/1/materialGenerics";
const tagsUrl = "https://desarrollo.emisuite.es/snc-mf-api/v1/clients/1/tags";

const validationSchema = Yup.object().shape({
  code: Yup.string().required('El código es obligatorio'),
  name: Yup.string().required('El nombre es obligatorio'),
  externalCode: Yup.string().required('El código externo es obligatorio'),
  description: Yup.string().required('La descripción es obligatoria'),
  measureUnitId: Yup.number().required('La unidad de medida es obligatoria'),
  observations: Yup.string().required('Las observaciones son obligatorias'),
});

export default function MaterialForm() {
  const [selectedRow, setSelectedRow] = useState(0);
  const [combinedData, setCombinedData] = useState([]);
  const [pagination, setPagination] = useState({
    loading: false,
    pageSize: 10,
    page: 0,
    totalRows: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const materialsResponse = await fetch(`${baseUrl}?pageSize=${pagination.pageSize}&page=${pagination.page}`);
        const materialsData = await materialsResponse.json();

        const tagsResponse = await fetch(`${tagsUrl}?pageSize=${pagination.pageSize}&page=${pagination.page}`);
        const tagsData = await tagsResponse.json();

        const combined = materialsData.data.map(material => {
          const tagsForMaterial = tagsData.data.filter(tag => tag.versionLock === material.id).map(tag => tag.name);
          return { ...material, tags: tagsForMaterial.length >0 ? tagsForMaterial:null };
        });

        setCombinedData(combined);
        setPagination(prev => ({ ...prev, totalRows: materialsData.totalRows }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[pagination.page, pagination.pageSize]);

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
          <Avatar  src={params.value}>{params.value}</Avatar>
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
          )) : <Chip label="sin valor" color="primary"></Chip>}
        </>
    }
  ];

  const handleCreate = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('https://desarrollo.emisuite.es/snc-mf-api/v1/clients/1/materialGenerics', {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error("No se pudo conectar");
      }

      const data = await response.json();
      setCombinedData(prevData => [...prevData, data]);
      alert("¡Datos ingresados exitosamente!");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al ingresar los datos. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`https://desarrollo.emisuite.es/snc-mf-api/v1/clients/1/materialGenerics/${selectedRow.id}`, {
        method: "delete",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setCombinedData(prevData => prevData.filter(dato => dato.id !== selectedRow.id));
      alert("Dato eliminado");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al eliminar el dato. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`https://desarrollo.emisuite.es/snc-mf-api/v1/clients/1/materialGenerics/${selectedRow.id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el dato.");
      }

      const data = await response.json();
      setCombinedData(prevData => (
        prevData.map(dato => dato.id === selectedRow.id ? data : dato)
      ));
      alert("¡Dato actualizado correctamente!");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al actualizar el dato. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div>
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
        rows={combinedData}
        columns={columns}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        onRowClick={(params) => setSelectedRow(params.row)}
        loading={pagination.loading}
        pageSize={pagination.pageSize}
        rowCount={pagination.totalRows}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        paginationMode="server"
      />
      <Typography style={{ textAlign: "center", marginTop: 45 }}>Formulario</Typography>
      <Paper elevation={3} style={{ padding: 20 }}>
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
                  {combinedData.map((option) => (
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
      </Paper>
    </>
  );
}
