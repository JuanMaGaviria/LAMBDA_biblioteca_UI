// importaciones de react
import './index.css';
import { Routes, Route } from 'react-router-dom';

// importaciones generales 
import Login from './modules/Core/Login/components/Login.jsx'
import RestablecerClave from './modules/Core/Login/components/RestablecerClave.jsx'
import CambiarClave from './modules/Core/Login/components/CambiarClave.jsx';
import Sidebar from './modules/Core/Sidebar/components/Sidebar.jsx';
import ProtectedRoute from './modules/Core/ProtectedRoute/components/ProtectedRoute.jsx';

import Muro from './modules/Exterior/Muro/components/Muro.jsx';
// importaciones de modulos internos
import Inicio from './modules/Inicio/components/inicio.jsx';
import Usuarios from './modules/Usuarios/components/Usuarios.jsx';
import Principal from './modules/Maestros/Principal/components/Principal.jsx';
import Areas from './modules/Maestros/Areas/components/Areas.jsx';
import Categorias from './modules/Maestros/Categorias/components/Categorias.jsx';

// 
import Recursos from './modules/Recursos/components/Recursos.jsx';
import RecursosForm from './modules/Recursos/components/RecursosForm.jsx';
import RecursoDetalle from './modules/Recursos/components/RecursoDetalle.jsx';
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/login" element={<Muro />} /> */}
            <Route path="/restablecer-contrasena/:token" element={<CambiarClave />} />
            <Route path="/app" element={<ProtectedRoute><Sidebar /></ProtectedRoute>}>
                <Route path="inicio" element={<Inicio />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="principal" element={<Principal />} />
                <Route path="maestros/areas" element={<Areas />} />
                <Route path="maestros/categorias" element={<Categorias />} />

                <Route path="recursos" element={<Recursos />} />
                <Route path="recursos/crear" element={<RecursosForm />} />
                <Route path="recursos/detalle/:id" element={<RecursoDetalle />} />
            </Route>
        </Routes>
    );
};

export default App;