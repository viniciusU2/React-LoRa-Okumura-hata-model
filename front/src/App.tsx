import {Page} from "./app/dashboard/page"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {MapPage} from './pages/home'
import { SignalStrengthMap } from './components/SignalStrengthMap';



function App() {


  return (
    <>
       <BrowserRouter>
        <Routes>
      
          <Route path="/" element={<Page/>}></Route>
          <Route path="/mapa" element={<MapPage/>}></Route>
           <Route path="/mapa2" element={<SignalStrengthMap losses={[91.2, 96.5, 98.3, 100.1, 102.2, 103.8, 105.0, 106.2, 107.4, 108.5]} />}></Route>
    
          <Route path="*" element={<h1> Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
