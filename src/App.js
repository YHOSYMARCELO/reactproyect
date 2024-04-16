
import './App.css';
import MaterialForm from './components/MaterialForm';
//import DetailsMaterial from './components/DetailsMaterial';
import {Routes, Route} from "react-router-dom";
import Lista from './components/Lista';
import DetailsMaterial from './components/DetailsMaterial';
import Stab from './components/Stab';
import Tags from './components/Tags';

function App() {
  return (
    <>
  <Routes>
          <Route path="material" element={<MaterialForm/>} />
          <Route path="material/details/:id" element={<DetailsMaterial/>}/>
          <Route path="materialtab/:id" element={<Stab/>}/>
          <Route path="tags/:id" element={<Tags/>}/>
          <Route path="*" element={<Lista />} />
       
      </Routes>
   </>
  );
}

export default App;
