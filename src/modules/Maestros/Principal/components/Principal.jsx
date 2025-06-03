import React, { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../../../Core/Loader/components/Loader.jsx'
import '../utils/Maestros.css'
import parse from 'html-react-parser';
import area from '../../../../assets/area.png'

export default function Principal() {
    const navigate = useNavigate();
    const [hasPermission, setHasPermission] = useState(false);

    const { data, loading, error } = useFetchData();

    if (loading) return <Loader />;

    return (
        <div>
            <br />
            <div className="w-full flex flex-col justify-center rounded-md p-5">
                <span className='breadcrum'>
                    <svg style={{ cursor: 'pointer' }} onClick={() => navigate('/app/inicio')} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fillOpacity=".25" d="M5 14.059c0-1.01 0-1.514.222-1.945c.221-.43.632-.724 1.453-1.31l4.163-2.974c.56-.4.842-.601 1.162-.601c.32 0 .601.2 1.162.601l4.163 2.973c.821.587 1.232.88 1.453 1.311c.222.43.222.935.222 1.944V19c0 .943 0 1.414-.293 1.707C18.414 21 17.943 21 17 21H7c-.943 0-1.414 0-1.707-.293C5 20.414 5 19.943 5 19z" /><path fill="currentColor" d="M3 12.387c0 .266 0 .4.084.441c.084.041.19-.04.4-.205l7.288-5.668c.59-.459.885-.688 1.228-.688c.343 0 .638.23 1.228.688l7.288 5.668c.21.164.316.246.4.205c.084-.041.084-.175.084-.441v-.409c0-.48 0-.72-.102-.928c-.101-.208-.291-.356-.67-.65l-7-5.445c-.59-.459-.885-.688-1.228-.688c-.343 0-.638.23-1.228.688l-7 5.445c-.379.294-.569.442-.67.65c-.102.208-.102.448-.102.928zM12.5 15h-1a2 2 0 0 0-2 2v3.85c0 .083.067.15.15.15h4.7a.15.15 0 0 0 .15-.15V17a2 2 0 0 0-2-2" /><rect width="2" height="4" x="16" y="5" fill="currentColor" rx=".5" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887z" /></svg>
                    <span>Maestros</span>
                </span>
                <h1 className="ml-1 justify-between items-center font-semibold text-2xl" style={{ color: '#1c1c1c' }}>Listas <span style={{ color: '#b4bc00' }}>Maestras </span></h1>
                <span className='text-sm ml-1 text-gray-600 mt-2'>Gestiona los datos maestros para la parametrización del sistema</span>
            </div>
            <br />
            <div className="container">
                {data.map((item, index) => (
                    <div key={item.id} className="carda" onClick={() => navigate('/app' + item.enlace)} style={{ backgroundColor: item.color }}>
                        <div className="flex flex-row items-center">
                            {/* <div className="circulo" style={{ backgroundColor: item.secondary }}>
                                {parse(item.icono)}
                            </div> */}
                            <div className="flex ico_sec">
                                <div className="flex ico_cir">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M2 20.5v-8h8v8zm2-2h4v-4H4zM5.5 10L11 1l5.5 9zm3.55-2h3.9L11 4.85zm12.525 14.95l-2.65-2.65q-.525.35-1.137.525T16.5 21q-1.875 0-3.187-1.312T12 16.5t1.313-3.187T16.5 12t3.188 1.313T21 16.5q0 .65-.175 1.263t-.5 1.137l2.65 2.65zM16.5 19q1.05 0 1.775-.725T19 16.5t-.725-1.775T16.5 14t-1.775.725T14 16.5t.725 1.775T16.5 19M11 8"/></svg>
                                </div>
                            </div>
                            <div className="tex">
                                <span className='nombre'>{item.name}</span>
                                <span className='text-gray-600 descripcion'>{item.descripcion}</span>
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}
