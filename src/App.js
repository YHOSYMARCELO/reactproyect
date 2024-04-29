
import './App.css';
import MaterialForm from './typescript/MaterialForm.tsx';
//import DetailsMaterial from './components/DetailsMaterial';
import { Routes, Route } from "react-router-dom";
import Lista from './typescript/Lista.tsx';
import DetailsMaterial from './typescript/DetailsMaterial.tsx';
import Stab from './typescript/STab.tsx';
import Tags from './typescript/Tags.tsx';
import CartList from './componentes/CartList';
import ShopPage from './componentes/ShopPage';
import ModalProduct from './componentes/ModalProduct';
import CartProduct from './componentes/CartProduct';
import { useState } from 'react';
import CartProvider from './context/CartContext';
import ParentComponent from './componentes/ParentComponent';
import Task  from './tasklist/Task';
import AppFinanzas from './JobsTypeScript/finanzas/AppFinanzas.tsx';
//import Procedimientos from './components/Procedimientos';

function App() {
  return (
    <> 
    <AppFinanzas/>
    {/*   
    <Routes>
          <Route path="material" element={<MaterialForm/>} />
          <Route path="material/details/:id" element={<DetailsMaterial/>}/>
          <Route path="materialtab/:id" element={<Stab/>}/>
          <Route path="tags/:id" element={<Tags/>}/>
          <Route path="*" element={<Lista />} />    
  </Routes>
  
      <ShopPage>
        <CartList />
      </ShopPage>*/}
      
    </>
  );
}
export default App;
