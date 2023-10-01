import {BrowserRouter, Routes, Route} from "react-router-dom";import { Home } from "../pages/Home";
import { ProductosConfig } from "../pages/ProductosConfig";

export function MyRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/home" element={ <Home />} />
            <Route path="/" element={ <ProductosConfig />} />
        </Routes>
    </BrowserRouter>
  );
}

