import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Paper, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react"

interface FormProps {
    id:number |any
    value: number,
    index: number,
}
interface Data {
    id: number,
    componentId?: number | null,
    compositionOrder?: number | null,
    units?: number | null,
    tolerance: number,
    measureUnitId: number,
    isPercentage: boolean
}
const FormDetails: React.FC<FormProps> = (props) => {
    const [detail, setDetail] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<Data | null>(null);
    const [dato, setDato] = useState<any>({
        componentId: null,
        compositionOrder: null,
        units: null

    });

    useEffect(() => {
        fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${props.id}/components`)
            .then(response => response.json())
            .then(data => setDetail(data))
    }, [props.id]);

    const columns = [
        { field: 'id', headerName: 'Id', width: 150 },
        { field: 'componentId', headerName: 'Component', width: 150 },
        { field: 'compositionOrder', headerName: 'Composition', width: 150 },
        { field: 'units', headerName: 'Units', width: 150 },
        { field: 'tolerance', headerName: 'Tolerance', width: 150 },
        { field: 'measureUnitId', headerName: 'Measure', width: 150 },
        { field: 'isPercentage', headerName: 'Percentage', width: 150 },
        {
            field: 'tags',
            headerName: 'Tags',
            width: 250,
            renderCell: (params) => (
                <>
                    <Link to={`/tags/${params.row.componentId}`}>Tags</Link>
                </>
            ),
        }

    ]
    const rows = detail.map((dat, index) =>
    ({
        id: index, componentId: dat.componentId, compositionOrder: dat.compositionOrder, units: dat.units, tolerance
            : dat.tolerance, measureUnitId: dat.measureUnitId, isPercentage: dat.isPercentage
    }));

    const newData = {
        componentId: dato.componentId,
        compositionOrder: dato.compositionOrder,
        units: dato.units,
        tolerance: 0,
        measureUnitId: 0,
        imageMap: null,
        isPercentage: true
    }
    const handleCreate = () => {

        fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${props.id}/components`, {
            method: "POST",
            body: JSON.stringify(newData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then(data => setDetail((prev) => [...prev, newData]))
            .catch(error => console.log(error))
    }
    const handleClickRow = (params) => {
        setSelectedRow(params.row);
    }
    const handleDelete = () => {
        // const response= axios.delete(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${id}/components/${selectedRow.componentId}`)
        setDetail((previus) => previus.filter((dat) => dat.componentId !== selectedRow!.componentId));
    }
    const handleUpdate = () => {
        setDetail((previous) => (
            previous.map((dato) => {
                if (dato.componentId === selectedRow!.componentId) {
                    return { ...dato, ...newData };
                }
                return dato;
            })
        ));
    }
    return (
        <>
            <div
                role="tabpanel"
                hidden={props.value !== props.index}
                id={`simple-tabpanel-${props.index}`}
                aria-labelledby={`simple-tab-${props.index}`}
            >
                {props.value === props.index && (
                    <div>
                        <DataGrid
                            autoHeight
                            rows={rows}
                            columns={columns}
                            pageSize={2}
                            checkboxSelection
                            onRowClick={handleClickRow}
                        />

                        <Paper elevation={3} style={{ padding: 20 }}>
                            <Box style={{ display: "flex", padding: 3, gap: 8, flexDirection: "column", border: 1, alignItems: "center" }} >


                                <TextField
                                    label="Code"
                                    value={dato.componentId}
                                    id="standard-error-helper-text"
                                    helperText="Incorrect entry."
                                    onChange={(e) => setDato((previus => ({ ...previus, componentId: e.target.value })))}
                                />

                                <TextField
                                    label="Composition Order"
                                    id="filled-error"
                                    variant="filled"
                                    value={dato.compositionOrder}
                                    onChange={(e) => setDato((previus => ({ ...previus, compositionOrder: e.target.value })))}
                                />
                                <TextField

                                    label="Units"
                                    helperText="Incorrect entry."
                                    variant="filled"
                                    value={dato.units}
                                    onChange={(e) => setDato((previus => ({ ...previus, units: e.target.value })))}
                                />

                                <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
                                    <Button onClick={handleCreate} variant="contained" color="primary" style={{ marginTop: 20, marginRight: 10 }}>
                                        Create
                                    </Button>
                                    <Button onClick={handleDelete} variant="contained" color="primary" style={{ marginTop: 20, marginRight: 10 }}>
                                        Delete
                                    </Button>
                                    <Button onClick={handleUpdate} variant="contained" color="primary" style={{ marginTop: 20, marginRight: 10 }}>
                                        Update
                                    </Button>
                                </Box>
                            </Box>

                        </Paper>

                    </div>
                )}
            </div>

        </>
    )
}
export default FormDetails; 