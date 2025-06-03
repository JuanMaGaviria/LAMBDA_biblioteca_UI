import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import '../utils/Sidebar.css'
import logo from '../../../../assets/logo.png';
import { useUser } from '../../../../context/userContext'; // Ajustá el path según tu estructura



export default function Sidebar() {
    const { setUser } = useUser(); // Dentro del componente donde estés usando logout
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('');
    const [isCollapsed, setCollapsed] = useState(false);
    const [isRecepcionOpen, setIsRecepcionOpen] = useState(false);
    const [isSeguimientoOpen, setIsSeguimientoOpen] = useState(false);
    const [hasNotification, setHasNotification] = useState(false);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        // Simulamos que hay una notificación después de 3 segundos
        const timer = setTimeout(() => {
            setHasNotification(true); // Habilita la notificación
        }, 3000);

        return () => clearTimeout(timer); // Limpiamos el timer al desmontar el componente
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.setItem('closed_session', 'true');

        setUser(null); // ← esto limpia el contexto global

        navigate('/');
    };
    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const dia = hoy.getDate();
    const mes = hoy.getMonth();
    const ano = hoy.getFullYear();
    const fecha = `${meses[mes]} ${dia}, ${ano}`;

    const maestrosRoutes = ['/app/principal', '/app/maestros/areas', '/app/maestros/categorias'];
    const recursosRoutes = ['/app/recursos', '/app/recursos/crear'];
    return (
        <>
            <div className={`navigation ${isCollapsed ? "collapsed" : ""}`}>
                <div className="navb text-right flex flex-row mb-7">
                    <svg className="menu-icon" onClick={toggleCollapse} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeDasharray="16" strokeDashoffset="16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M5 5h14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" /></path><path d="M5 12h14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="16;0" /></path><path d="M5 19h14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="16;0" /></path></g></svg>
                    <span className="absolute nombre_app">Panel de administración</span>
                    <div className="pe flex flex-row items-center">
                        <div className="flex flex-row items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M6.96 2c.418 0 .756.31.756.692V4.09c.67-.012 1.422-.012 2.268-.012h4.032c.846 0 1.597 0 2.268.012V2.692c0-.382.338-.692.756-.692s.756.31.756.692V4.15c1.45.106 2.403.368 3.103 1.008c.7.641.985 1.513 1.101 2.842v1H2V8c.116-1.329.401-2.2 1.101-2.842c.7-.64 1.652-.902 3.103-1.008V2.692c0-.382.339-.692.756-.692" /><path fill="currentColor" d="M22 14v-2c0-.839-.013-2.335-.026-3H2.006c-.013.665 0 2.161 0 3v2c0 3.771 0 5.657 1.17 6.828C4.349 22 6.234 22 10.004 22h4c3.77 0 5.654 0 6.826-1.172S22 17.771 22 14" opacity=".5" /><path fill="currentColor" fillRule="evenodd" d="M14 12.25A1.75 1.75 0 0 0 12.25 14v2a1.75 1.75 0 1 0 3.5 0v-2A1.75 1.75 0 0 0 14 12.25m0 1.5a.25.25 0 0 0-.25.25v2a.25.25 0 1 0 .5 0v-2a.25.25 0 0 0-.25-.25" clipRule="evenodd" /><path fill="currentColor" d="M11.25 13a.75.75 0 0 0-1.28-.53l-1.5 1.5a.75.75 0 0 0 1.06 1.06l.22-.22V17a.75.75 0 0 0 1.5 0z" /></svg>
                            <h5 className="mx-5 fecha">{fecha}</h5>
                            <div className="notification-bell">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="4" strokeDashoffset="4" d="M12 3v2"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="4;0" /></path><path fill="currentColor" fillOpacity="0" strokeDasharray="28" strokeDashoffset="28" d="M12 5c-3.31 0 -6 2.69 -6 6l0 6c-1 0 -2 1 -2 2h8M12 5c3.31 0 6 2.69 6 6l0 6c1 0 2 1 2 2h-8"><animate fill="freeze" attributeName="fill-opacity" begin="0.9s" dur="0.15s" values="0;0.3" /><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.4s" values="28;0" /></path><path strokeDasharray="8" strokeDashoffset="8" d="M10 20c0 1.1 0.9 2 2 2c1.1 0 2 -0.9 2 -2"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0" /></path></g></svg>
                                {hasNotification && <div className="notification-dot"></div>} {/* Círculo rojo */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="app flex flex-col justify-start items-center pt-4 ml-2">
                    <img src={logo} className="w-40 mt-2" alt="" />
                </div>


                <ul className="ml-4 mt-8 ">
                    <small className="seccion_titulo">General</small>
                    <li className={`list cursor-pointer ${activeItem === '/app/inicio' ? 'active' : ''}`} onClick={() => navigate('/app/inicio')}>
                        <a>

                            <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13m7 7v-5h4v5zm2-15.586l6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586z" /></svg>
                            <span className="title">Inicio</span>
                        </a>
                    </li>
                    <li className={`list cursor-pointer ${activeItem === '/app/usuarios' ? 'active' : ''}`} onClick={() => navigate('/app/usuarios')}>
                        <a>
                            <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19.128a9.38 9.38 0 0 0 2.625.372a9.337 9.337 0 0 0 4.121-.952a4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0a3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0a2.625 2.625 0 0 1 5.25 0Z" /></svg>
                            <span className="title">Gestión de usuarios</span>
                        </a>
                    </li>
                    <li className={`list cursor-pointer ${maestrosRoutes.some(route => activeItem.startsWith(route)) ? 'active' : ''}`} onClick={() => navigate('/app/principal')}>
                        <a>
                            <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><circle cx="6.25" cy="6.25" r="4.25" /><path d="M18 9.357V10.5m0-1.143a2.93 2.93 0 0 1-2.427-1.272M18 9.357a2.93 2.93 0 0 0 2.427-1.272M18 3.643a2.93 2.93 0 0 1 2.427 1.272M18 3.643a2.93 2.93 0 0 0-2.427 1.272M18 3.643V2.5m3.5 1.714l-1.073.701M14.5 8.785l1.073-.7M14.5 4.215l1.073.7m5.927 3.87l-1.073-.7m0-3.17a2.8 2.8 0 0 1 0 3.17m-4.854-3.17a2.8 2.8 0 0 0 0 3.17" /><circle cx="17.75" cy="17.75" r="4.25" /><circle cx="6.25" cy="17.75" r="4.25" /></g></svg>
                            <span className="title">Gestión de maestros</span>
                        </a>
                    </li>
                    <li className={`list cursor-pointer ${recursosRoutes.some(route => activeItem.startsWith(route)) ? 'active' : ''}`} onClick={() => navigate('/app/recursos')}>
                        <a>
                            <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32"><path fill="currentColor" d="M9 4a5 5 0 0 0-5 5v14.004a5 5 0 0 0 5 5h5.003a10 10 0 0 1-1.169-2H9a3 3 0 0 1-3-3V10h20.004v2.834a10 10 0 0 1 2 1.169V9a5 5 0 0 0-5-5zm16.829 4H6.168A3 3 0 0 1 9 6h14c1.306 0 2.418.835 2.83 2m-9.826 5.997v-1a1 1 0 0 0-1-1H9.009a1 1 0 0 0-1 1V23a1 1 0 0 0 1 1h3.19A10 10 0 0 1 12 22h-1.992v-8.002h3.995v1.997a10 10 0 0 1 2-1.998m.673 14.573l.046-.156a4 4 0 0 0-2.895-5.02a8.5 8.5 0 0 1 .072-2.746a4 4 0 0 0 2.879-4.987a8.5 8.5 0 0 1 2.343-1.435a4 4 0 0 0 5.795-.003l.111-.118a8 8 0 0 1 2.296 1.326l-.046.155a4 4 0 0 0 2.895 5.02c.123.9.103 1.828-.071 2.747a4 4 0 0 0-2.88 4.987a8.5 8.5 0 0 1-2.343 1.435a4 4 0 0 0-5.795.003l-.111.117a8 8 0 0 1-2.296-1.325m4.17-4.571c1.067.616 2.448.22 3.085-.884c.637-1.103.29-2.497-.778-3.113c-1.066-.616-2.448-.22-3.085.883c-.637 1.104-.289 2.498.778 3.114"/></svg>
                            <span className="title">Recursos</span>
                        </a>
                    </li>
                    
                    <li className="config list mt-3 cursor-pointer absolute w-full bottom-1 mb-1" onClick={() => handleLogout()} style={{ width: '88%' }}>
                        <a>
                            <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M19 12h-13.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" /></path><path strokeDasharray="10" strokeDashoffset="10" d="M5 12l5 5M5 12l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="10;0" /></path></g></svg>
                            <span className="title">Cerrar sesión</span>
                        </a>
                    </li>

                </ul>
            </div>
            <div className="content">
                <div className="app-content">
                    <div className="projects-section">
                        <div className="seccion_conten rounded-lg">
                            <Toaster />
                            <Outlet />
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}
