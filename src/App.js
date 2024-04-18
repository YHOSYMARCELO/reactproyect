
import './App.css';
import MaterialForm from './components/MaterialForm';
//import DetailsMaterial from './components/DetailsMaterial';
import { Routes, Route } from "react-router-dom";
import Lista from './components/Lista';
import DetailsMaterial from './components/DetailsMaterial';
import Stab from './components/Stab';
import Tags from './components/Tags';
import CartList from './components/CartList';
import ShopPage from './components/ShopPage';
import Procedimientos from './components/Procedimientos';

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
       
<<<<<<< HEAD
  </Routes>*/}
   
      <ShopPage>
        <CartList/>
      </ShopPage>
    </>
=======
  </Routes>
  <ShopPage>
    <Cart></Cart>
  </ShopPage>*/}
  <Procedimientos></Procedimientos>
   </>
>>>>>>> 4c25fcd0f586c705e6e8e2df32cb49e45c892cc4
  );
}

export default App;
