import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Paper, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

interface FormProps {
  id:number
  value: number;
  index: number;
}

interface Data {
  id?: number;
  componentId: number;
  compositionOrder: number;
  units: number;
  tolerance?: number;
  measureUnitId?: number;
  isPercentage?: boolean;
}
interface DataSecond{
  id?:number
  componentId:number |null, 
  compositionOrder:number |null, 
  units:number |null
}

const FormDetails: React.FC<FormProps> = (props) => {
  const [detail, setDetail] = useState<DataSecond[]>([]);
  const [selectedRow, setSelectedRow] = useState<Data | null>(null);
  const [dato, setDato] = useState<DataSecond>({
    componentId: null,
    compositionOrder: null,
    units: null,
  });

  useEffect(() => {
    fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${props.id}/components`)
      .then((response) => response.json())
      .then((data) => setDetail(data))
      .catch((error) => console.log("Error fetching data:", error));
  }, [props.id]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "componentId", headerName: "Component", width: 150 },
    { field: "compositionOrder", headerName: "Composition", width: 150 },
    { field: "units", headerName: "Units", width: 150 },
    { field: "tolerance", headerName: "Tolerance", width: 150 },
    { field: "measureUnitId", headerName: "Measure", width: 150 },
    { field: "isPercentage", headerName: "Percentage", width: 150 },
    {
      field: "tags",
      headerName: "Tags",
      width: 250,
      renderCell: (params) => (
        <Link to={`/tags/${params.row.componentId}`}>Tags</Link>
      ),
    },
  ];

  const handleCreate = () => {
    fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${props.id}/components`, {
      method: "POST",
      body: JSON.stringify(dato),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setDetail((prev) => [...prev, data]))
      .catch((error) => console.log("Error creating data:", error));
  };

  const handleDelete = () => {
    if (selectedRow) {
      fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${props.id}/components/${selectedRow.componentId}`, {
        method: "DELETE",
      })
        .then(() => {
          setDetail((prev) => prev.filter((row) => row.id !== selectedRow.id));
          setSelectedRow(null);
        })
        .catch((error) => console.log("Error deleting data:", error));
    }
  };

  const handleUpdate = () => {
    if (selectedRow) {
      fetch(`http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${props.id}/components/${selectedRow.componentId}`, {
        method: "PUT",
        body: JSON.stringify(dato),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setDetail((prev) =>
            prev.map((row) => (row.id === selectedRow.id ? dato : row))
          );
        })
        .catch((error) => console.log("Error updating data:", error));
    }
  };

  return (
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
            rows={detail}
            columns={columns}
            pageSize={2}
            checkboxSelection
            onRowClick={(params:any) => setSelectedRow(params.row)}
          />

          <Paper elevation={3} style={{ padding: 20 }}>
            <Box
              style={{
                display: "flex",
                padding: 3,
                gap: 8,
                flexDirection: "column",
                border: 1,
                alignItems: "center",
              }}
            >
              <TextField
                label="Code"
                value={dato.componentId || ""}
                onChange={(e) =>
                  setDato((prev) => ({
                    ...prev,
                    componentId: parseInt(e.target.value),
                  }))
                }
              />
              <TextField
                label="Composition Order"
                value={dato.compositionOrder || ""}
                onChange={(e) =>
                  setDato((prev) => ({
                    ...prev,
                    compositionOrder: parseInt(e.target.value),
                  }))
                }
              />
              <TextField
                label="Units"
                value={dato.units || ""}
                onChange={(e) =>
                  setDato((prev) => ({
                    ...prev,
                    units: parseInt(e.target.value),
                  }))
                }
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
  );
};

export default FormDetails;
