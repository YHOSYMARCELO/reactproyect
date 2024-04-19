import React, { useState } from 'react';
import productosJSON from './productos.json';

// Componente de Tarjeta de Producto
const ProductoCard = ({ nombre, imagen, precio, descripcion, descuento, onProductoClick }) => {
  const handleClick = () => {
    onProductoClick({ nombre, imagen, precio, descripcion, descuento });
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={imagen} alt={nombre} />
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text">{descripcion}</p>
        <p className="card-text">Precio: ${precio}</p>
        {descuento && <p className="card-text">Descuento: {descuento}%</p>}
      </div>
    </div>
  );
};

// Componente Modal
const Modal = ({ producto, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{producto.nombre}</h2>
        <img src={producto.imagen} alt={producto.nombre} />
        <p>{producto.descripcion}</p>
        <p>Precio: ${producto.precio}</p>
        {producto.descuento && <p>Descuento: {producto.descuento}%</p>}
      </div>
    </div>
  );
};

// Componente Principal
const ProductosList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductoClick = (producto) => {
    setSelectedProduct(producto);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="productos-list">
      {productosJSON.map((producto, index) => (
        <ProductoCard 
          key={index} 
          {...producto} 
          onProductoClick={handleProductoClick} 
        />
      ))}
      {modalOpen && <Modal producto={selectedProduct} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductosList;
