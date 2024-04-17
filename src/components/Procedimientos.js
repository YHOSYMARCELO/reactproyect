import React, { useState } from 'react';

const Procedimientos = () => {
  const [procedimientos, setProcedimientos] = useState([
    { nombre: 'Procedimiento 1', descripcion: 'Descripción del procedimiento 1' },
    { nombre: 'Procedimiento 2', descripcion: 'Descripción del procedimiento 2' },
    { nombre: 'Procedimiento 3', descripcion: 'Descripción del procedimiento 3' },
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
      { nombre: 'Procedimiento 1', descripcion: 'Descripción del procedimiento 1' },
      { nombre: 'Procedimiento 2', descripcion: 'Descripción del procedimiento 2' },
      { nombre: 'Procedimiento 3', descripcion: 'Descripción del procedimiento 3' },
      // Añadir más procedimientos si es necesario
    ]);
    // Limpiar campos de filtro
    setFiltroNombre('');
    setFiltroDescripcion('');
  };

  return (
    <div>
      <button onClick={() => setMostrarFiltro(!mostrarFiltro)}>
        {mostrarFiltro ? 'Ocultar Filtro' : 'Mostrar Filtro'}
      </button>

      {mostrarFiltro && (
        <div>
          <input
            type="text"
            placeholder="Nombre"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={filtroDescripcion}
            onChange={(e) => setFiltroDescripcion(e.target.value)}
          />
          <button onClick={handleFiltrar}>Filtrar</button>
          <button onClick={handleLimpiarFiltro}>Limpiar Filtro</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {procedimientos.map((procedimiento, index) => (
            <tr key={index}>
              <td>{procedimiento.nombre}</td>
              <td>{procedimiento.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Procedimientos;
