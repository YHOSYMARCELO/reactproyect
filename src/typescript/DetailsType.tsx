import React, { useState, useEffect } from "react";
import { Paper, TextField, Box, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";

interface DetailsMaterialProp {
  valor: number;
  index: number;
}

interface FormData {
  id: number | null;
  name: string | null;
  code: string | null;
  externalCode: string | null;
  description: string | null;
  isVirtual: boolean | null;
  observations: string | null;
}

const Details: React.FC<DetailsMaterialProp> = (props) => {
  const { id } = useParams();
  const [data, setData] = useState<FormData | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    id: null,
    name: null,
    code: null,
    externalCode: null,
    description: null,
    isVirtual: null,
    observations: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.log("error en conexion");
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id || null,
        name: data.name || null,
        code: data.code || null,
        externalCode: data.externalCode || null,
        description: data.description || null,
        isVirtual: data.isVirtual || null,
        observations: data.observations || null,
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    if (!edit) {
      setFormData({
        id: null,
        name: null,
        code: null,
        externalCode: null,
        description: null,
        isVirtual: null,
        observations: null,
      });
    }
    setEdit(!edit);
  };

  return (
    <>
      <div
        role="tabpanel"
        hidden={props.valor !== props.index}
        id={`simple-tabpanel-${props.index}`}
        aria-labelledby={`simple-tab-${props.index}`}
      >
        {props.valor === props.index && (
          <Paper elevation={3} style={{ padding: 20 }}>
            <Box style={{ display: "flex", border: 1, flexDirection: "column" }}>
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="Id"
                onChange={handleInputChange}
                value={formData.id || ""}
                disabled={!edit}
              />
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="Name"
                onChange={handleInputChange}
                value={formData.name || ""}
                disabled={!edit}
              />
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="Code"
                onChange={handleInputChange}
                value={formData.code || ""}
                disabled={!edit}
              />
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="ExternalCode"
                onChange={handleInputChange}
                value={formData.externalCode || ""}
                disabled={!edit}
              />
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="Description"
                onChange={handleInputChange}
                value={formData.description || ""}
                disabled={!edit}
              />
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="isVirtual"
                onChange={handleInputChange}
                value={formData.isVirtual || ""}
                disabled={!edit}
              />
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="Observations"
                onChange={handleInputChange}
                value={formData.observations || ""}
                disabled={!edit}
              />
              <Button color="primary" variant="contained" onClick={handleClick}>
                {edit ? "Guardar" : "Editar"}
              </Button>
            </Box>
          </Paper>
        )}
      </div>
    </>
  );
};

export default Details;
