import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Procedimientos = () => {
  const [procedimientos, setProcedimientos] = useState([
    { id: 1, nombre: 'Procedimiento 1', descripcion: 'Descripción del procedimiento 1' },
    { id: 2, nombre: 'Procedimiento 2', descripcion: 'Descripción del procedimiento 2' },
    { id: 3, nombre: 'Procedimiento 3', descripcion: 'Descripción del procedimiento 3' },
    // Añadir más procedimientos si es necesario
  ]);
  
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroDescripcion, setFiltroDescripcion] = useState('');
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  const handleFiltrar = () => {
    const procedimientosFiltrados = procedimientos.filter(procedimiento => {
      return procedimiento.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
             procedimiento.descripcion.toLowerCase().includes(filtroDescripcion.toLowerCase());
    });
    // Aplicar el filtro
    setProcedimientos(procedimientosFiltrados);
  };

  const handleLimpiarFiltro = () => {
    // Restablecer procedimientos originales
    setProcedimientos([
      { id: 1, nombre: 'Procedimiento 1', descripcion: 'Descripción del procedimiento 1' },
      { id: 2, nombre: 'Procedimiento 2', descripcion: 'Descripción del procedimiento 2' },
      { id: 3, nombre: 'Procedimiento 3', descripcion: 'Descripción del procedimiento 3' },
      // Añadir más procedimientos si es necesario
    ]);
    // Limpiar campos de filtro
    setFiltroNombre('');
    setFiltroDescripcion('');
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 300 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button onClick={() => setMostrarFiltro(!mostrarFiltro)} variant="contained" color="primary">
        {mostrarFiltro ? 'Ocultar Filtro' : 'Mostrar Filtro'}
      </Button>

      {mostrarFiltro && (
        <div style={{ marginTop: 10 }}>
          <TextField
            label="Nombre"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
          <TextField
            label="Descripción"
            value={filtroDescripcion}
            onChange={(e) => setFiltroDescripcion(e.target.value)}
          />
          <Button onClick={handleFiltrar} variant="contained" color="primary" style={{ marginLeft: 10 }}>
            Filtrar
          </Button>
          <Button onClick={handleLimpiarFiltro} variant="contained" color="secondary" style={{ marginLeft: 10 }}>
            Limpiar Filtro
          </Button>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <DataGrid
          rows={procedimientos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Procedimientos;
