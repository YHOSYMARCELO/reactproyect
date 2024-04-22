
import './App.css';
import MaterialForm from './components/MaterialForm';
//import DetailsMaterial from './components/DetailsMaterial';
import { Routes, Route } from "react-router-dom";
import Lista from './components/Lista';
import DetailsMaterial from './components/DetailsMaterial';
import Stab from './components/Stab';
import Tags from './components/Tags';
import CartList from './componentes/CartList';
import ShopPage from './componentes/ShopPage';
import ModalProduct from './componentes/ModalProduct';
import CartProduct from './componentes/CartProduct';
import { useState } from 'react';
import CartProvider from './context/CartContext';
import ParentComponent from './componentes/ParentComponent';
//import Procedimientos from './components/Procedimientos';

function App() {
  return (
    <>
      {/*
    <Routes>
          <Route path="material" element={<MaterialForm/>} />
          <Route path="material/details/:id" element={<DetailsMaterial/>}/>
          <Route path="materialtab/:id" element={<Stab/>}/>
          <Route path="tags/:id" element={<Tags/>}/>
          <Route path="*" element={<Lista />} />    
  </Routes>*/}
      <ShopPage>
        <CartList />
      </ShopPage>
    </>
  );
}
export default App;
