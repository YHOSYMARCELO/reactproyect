import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { AppBar, Toolbar, Typography, MenuItem, Paper, Box, Button, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import base64Image from "../images/images";
//import {useHistory} from "react-router-dom";
//import { Formik, Form, Field } from 'formik';
const baseUrl = "https://desarrollo.emisuite.es/snc-mf-api/v1/clients/1/materialGenerics";
//import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    code: Yup.string().required("El código es requerido"),
    name: Yup.string().required("El nombre es requerido"),
    externalCode: Yup.string().required("El código externo es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    measureUnitId: Yup.number().required("La unidad de medida es requerida"),
    observations: Yup.string().required("Las observaciones son requeridas"),
});
export default function MaterialFormik() {
    const [additionalValues, setAdditionalValues] = useState({
        versionLock: null,
        active: true,
        createdAt: null,
        modifiedAt: null,
        modifiedBy: null,
        clientId: 1,
        isVirtual: false,
        imageUuid: null,
        compositionImageUuid: null,
        isRawMaterial: false,
        isSemifinished: false,
        isFinished: false
    });
    const [selectedRow, setSelectedRow] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        datos: [],
        loading: false,
        pageSize: 10,
        page: 0
    }
    );
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(baseUrl, {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("bad connection")
                }
                const data = await response.json();
                setPaginationModel((previus) => ({ ...previus, datos: data }));
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();

        /*fetch(baseUrl)
          .then(response=>response.json())
          .then(data=>setDatos(data))
          .catch(error=>console.log(`error al cargar datos ${error}`))*/
    }, []);


    //<Link to={`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics/${params.row.id}`}>Descripcion</Link>
    const columns = [
        { field: 'id', headerName: 'Id', width: 150 },
        { field: 'code', headerName: 'codigo', width: 150 },
        { field: 'name', headerName: 'Nombre', width: 150 },
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
                    <Avatar src={params.value}>{params.value}</Avatar>
                </>
        },

    ];
    const rows = paginationModel.datos.map((dat) =>
    ({
        id: dat.id, code: dat.code, name: dat.name, externalCode: dat.externalCode, description: dat.description, measureUnitId:
            dat.measureUnitId, observations: dat.observations, imageUuid: dat.imageUuid ? `${base64Image}` : "N"
    }));

    const handleClick = (params) => {
        setSelectedRow(params.row)
        // history.push(`/material/details/${params.row.id}`);

    }
    const handleCreateOrUpdate = async (values) => {
        try {
            const dataToSend = { ...values, ...additionalValues };
            const response = await fetch(selectedRow.id ? `${baseUrl}/${selectedRow.id}` : baseUrl, {
                method: selectedRow.id ? 'PUT' : 'POST',
                body: JSON.stringify(dataToSend),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Error al crear o actualizar el dato.");
            }

            const data = await response.json();

            if (selectedRow.id) {
                setPaginationModel((previous) => ({
                    ...previous,
                    datos: previous.datos.map((dato) => {
                        if (dato.id === selectedRow.id) {
                            return { ...dato, ...data };
                        }
                        return dato;
                    }),
                }));
            } else {
                setPaginationModel((previous) => ({ ...previous, datos: [...previous.datos, data] }));
            }

            alert("¡Dato guardado exitosamente!");
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error al guardar el dato. Por favor, inténtalo de nuevo más tarde.");
        }
    };
    const handleDelete = async () => {
        try {
            await fetch(`${baseUrl}/${selectedRow.id}`, {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setPaginationModel((previus) => ({
                ...previus,
                datos: previus.datos.filter((dato) => dato.id !== selectedRow.id)
            }))
            alert("dato eliminado")
        } catch (error) {
            console.log(error)
        }
    }
 
    return (
        <>
            <div >
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
                loading={paginationModel.loading}
                columns={columns}
                pageSize={paginationModel.pageSize}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowsPerPageOptions={[5, 10]}
                onPageChange={(newPage) => setPaginationModel((previus) => ({ ...previus, page: newPage }))}
                checkboxSelection
                onRowClick={handleClick}

            />
            <Typography style={{ textAlign: "center", marginTop: 45 }}>Formulario</Typography>
            <Paper elevation={3} style={{ padding: 20 }}> 
                <Box style={{ display: "flex", padding: 3, gap: 8, flexDirection: "column", border: 1, alignItems: "center" }} >
                    <Formik
                        initialValues={{
                            id: null,
                            code: "",
                            name: "",
                            externalCode: "",
                            description: "",
                            measureUnitId: 0,
                            observations: ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            handleCreateOrUpdate(values);
                            resetForm();
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <TextField
                                    label="Code"
                                    name="code"
                                />
                                {errors.code && touched.code ? (
                                <div>{errors.code}</div>
                                        ) : null}
                                <TextField
                                    label="Name"
                                    name="name"
                                   
                                />
                                  {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                                        ) : null}
                                <TextField
                                    label="External Code"
                                    name="externalCode"
                                    />
        
                                  {errors.externalCode && touched.externalCode ? (
                                <div>{errors.externalCode}</div>
                                        ) : null}
                                <TextField
                                    label="Description"
                                    name="description"
                                    
                                />
                                 {errors.description && touched.description ? (
                                <div>{errors.description}</div>
                                        ) : null}
                                <TextField
                                    label="Measure"
                                    name="measureUnitId"
                                    select
                                >
                                    {paginationModel.datos.map((option) => (
                                        <MenuItem key={option.id} value={option.measureUnitId}>
                                            {option.measureUnitId}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Observations"
                                    name="observations"
                                  
                                />
                                <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
                                    <Button type="submit" variant="contained" color="secondary" style={{ marginTop: 20, marginRight: 10 }}>
                                        Create/Update
                                    </Button>
                                    <Button onClick={handleDelete} variant="contained" color="secondary" style={{ marginTop: 20, marginRight: 10 }}>
                                        Delete
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Paper>

        </>
    )
}