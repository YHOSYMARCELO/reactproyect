
import './App.css';
import MaterialForm from './components/MaterialForm';
//import DetailsMaterial from './components/DetailsMaterial';
import {Routes, Route} from "react-router-dom";
import Lista from './components/Lista';
import DetailsMaterial from './components/DetailsMaterial';
import Stab from './components/Stab';
import Tags from './components/Tags';
import Cart from './components/Cart';
import ShopPage from './components/ShopPage';

function App() {
  return (
    <>
 {/* <Routes>
          <Route path="material" element={<MaterialForm/>} />
          <Route path="material/details/:id" element={<DetailsMaterial/>}/>
          <Route path="materialtab/:id" element={<Stab/>}/>
          <Route path="tags/:id" element={<Tags/>}/>
          <Route path="*" element={<Lista />} />
       
  </Routes>*/}
  <ShopPage>
    <Cart></Cart>
  </ShopPage>
   </>
  );
}

export default App;
