import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import negocio from '../../../assets/negocios.jpg'
import '../utils/inicio.css'

export default function Inicio() {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: '#F9FAFB' }}>
            <br />

            <div className="car car-head w-full flex flex-flex bg-white rounded-md p-5">
                <div className="flex flex-col">
                    <span className="text-dark-color ml-3 text-3xl font-semibold"><span style={{ color: "#b4bc00" }}>B</span>ienvenido a Tame</span>
                    <span className='text-sm ml-3 text-gray-600 mt-2'>Control y parametrización de la herramineto, permitiendo uan gestión mas eficiente del contenido y de los usuarios del sistema</span>
                    <div className="contenido-cards flex flex-row justify-between ">
                        <div className="car-card flex flex-col justify-center bg-white items-center rounded-md p-8 w-full m-4 text-center">
                            <svg className='circ-icon' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="6" r="4" /><path stroke-linecap="round" d="M18 9c1.657 0 3-1.12 3-2.5S19.657 4 18 4M6 9C4.343 9 3 7.88 3 6.5S4.343 4 6 4" opacity=".5" /><ellipse cx="12" cy="17" rx="6" ry="4" /><path stroke-linecap="round" d="M20 19c1.754-.385 3-1.359 3-2.5s-1.246-2.115-3-2.5M4 19c-1.754-.385-3-1.359-3-2.5s1.246-2.115 3-2.5" opacity=".5" /></g></svg>
                            <span>Gestión de usuarios</span>
                            <span className='text-xs text-gray-600 text-center'>
                                En esta sección tendras visibilidad de los usuarios existentes y podras crear nuevos
                            </span>
                            {/* <span>Gestión de usuarios</span>
                            <span className='h-24 mt-2 text-sm text-gray-600 text-center'>
                                En esta sección tendras visibilidad de los usuarios existentes y podras crear nuevos
                            </span> */}
                            <button onClick={() => navigate('/app/usuarios')} className='btn-acc flex flex-row items-center justify-center bg-secondary-green w-full rounded-md p-1 mt-4 text-white'>Acceder <svg className='ml-2' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="m12.2 13l-.9.9q-.275.275-.275.7t.275.7t.7.275t.7-.275l2.6-2.6q.3-.3.3-.7t-.3-.7l-2.6-2.6q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l.9.9H9q-.425 0-.712.288T8 12t.288.713T9 13zm-.2 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg></button>
                        </div>
                        
                        <div className="car-card  flex flex-col justify-center bg-white  items-center rounded-md p-8 w-full m-4 text-center">
                            <svg className='circ-icon' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M2.25 6A.75.75 0 0 1 3 5.25h18a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 6m0 4A.75.75 0 0 1 3 9.25h18a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75m14.72-.53a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 1 1-1.06 1.06l-1.22-1.22V20a.75.75 0 0 1-1.5 0v-4.19l-1.22 1.22a.75.75 0 1 1-1.06-1.06zM2.25 18a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75" clip-rule="evenodd" /></svg>
                            <span>Gestión de listas maestras</span>
                            <span className=' text-xs text-gray-600 text-center'>
                                En esta sección podrá gestionar los diferentes maestros de la aplicación
                            </span>
                            {/* <span>Gestión de listas maestras</span>
                            <span className='h-24 mt-2 text-sm text-gray-600 text-center'>
                                En esta sección podrá gestionar los diferentes maestros de la aplicación
                            </span> */}
                            <button onClick={() => navigate('/app/maestros')} className='btn-acc flex flex-row items-center justify-center bg-secondary-green w-full rounded-md p-1 mt-4'>Acceder <svg className='ml-2' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="m12.2 13l-.9.9q-.275.275-.275.7t.275.7t.7.275t.7-.275l2.6-2.6q.3-.3.3-.7t-.3-.7l-2.6-2.6q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l.9.9H9q-.425 0-.712.288T8 12t.288.713T9 13zm-.2 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg></button>
                        </div>
                        <div className="car-card  flex flex-col justify-center bg-white  items-center rounded-md p-8 w-full m-4 text-center">
                            <svg className='circ-icon' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="32" d="M176 416v64M80 32h192a32 32 0 0 1 32 32v412a4 4 0 0 1-4 4H48h0V64a32 32 0 0 1 32-32m240 160h112a32 32 0 0 1 32 32v256h0h-160h0V208a16 16 0 0 1 16-16"/><path fill="currentColor" d="M98.08 431.87a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m0-80a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m0-80a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m0-80a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m0-80a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m80 240a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m0-80a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m0-80a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m0-80a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m80 320a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m0-80a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79m0-80a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79"/><ellipse cx="256" cy="176" fill="currentColor" rx="15.95" ry="16.03" transform="rotate(-45 255.99 175.996)"/><path fill="currentColor" d="M258.08 111.87a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79M400 400a16 16 0 1 0 16 16a16 16 0 0 0-16-16m0-80a16 16 0 1 0 16 16a16 16 0 0 0-16-16m0-80a16 16 0 1 0 16 16a16 16 0 0 0-16-16m-64 160a16 16 0 1 0 16 16a16 16 0 0 0-16-16m0-80a16 16 0 1 0 16 16a16 16 0 0 0-16-16m0-80a16 16 0 1 0 16 16a16 16 0 0 0-16-16"/></svg>
                            <span>Recursos</span>
                            <span className='text-xs text-gray-600 text-center'>
                                En esta sección de gestionar la información de los diferentes recursos compartidos
                            </span>
                            {/* <span>Gestión de empresas</span>
                            <span className='h-24 mt-2 text-sm text-gray-600 text-center'>
                                En esta sección de gestionar la información de las empresas
                            </span> */}
                            <button onClick={() => navigate('/app/empresas')} className='btn-acc flex flex-row items-center justify-center w-full rounded-md p-1 mt-4'>Acceder <svg className='ml-2' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="m12.2 13l-.9.9q-.275.275-.275.7t.275.7t.7.275t.7-.275l2.6-2.6q.3-.3.3-.7t-.3-.7l-2.6-2.6q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l.9.9H9q-.425 0-.712.288T8 12t.288.713T9 13zm-.2 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg></button>
                        </div>
                        <div className="car-card  flex flex-col justify-center bg-white  items-center rounded-md p-8 w-full m-4 text-center">
                            <svg className='circ-icon' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M6.209 12.324H4.401c-.579 0-1.048.47-1.048 1.048v6.83c0 .578.47 1.048 1.048 1.048H6.21c.58 0 1.049-.47 1.049-1.049v-6.829a1.05 1.05 0 0 0-1.049-1.049m6.694-9.573h-1.808c-.58 0-1.049.47-1.049 1.049V20.2c0 .58.47 1.049 1.05 1.049h1.807c.58 0 1.049-.47 1.049-1.049V3.8c0-.58-.47-1.049-1.05-1.049m6.696 5.176H17.79c-.58 0-1.049.47-1.049 1.05V20.2c0 .58.47 1.049 1.049 1.049h1.808a1.05 1.05 0 0 0 1.049-1.049V8.976c0-.58-.47-1.049-1.05-1.049"/></svg>
                            <span>Informes</span>
                            <span className='text-xs text-gray-600 text-center'>
                                Esta sección le permite visualizar los informes generados por la aplicación
                            </span>
                            {/* <span>Informes</span>
                            <span className='h-24 mt-2 text-sm text-gray-600 text-center'>
                                Esta sección le permite visualizar los informes generados por la aplicación
                            </span> */}
                            <button className='btn-acc flex flex-row items-center justify-center w-full rounded-md p-1 mt-4 text-white'>Acceder <svg className='ml-2' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="m12.2 13l-.9.9q-.275.275-.275.7t.275.7t.7.275t.7-.275l2.6-2.6q.3-.3.3-.7t-.3-.7l-2.6-2.6q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l.9.9H9q-.425 0-.712.288T8 12t.288.713T9 13zm-.2 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg></button>
                        </div>

                    </div>
                </div>
                <div className="img-fom flex">
                    <img src={negocio} alt="" />
                </div>
            </div>
            <br />

        </div>
    )
}
