import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from './ui/tabs'
import ActionButton from '../../Core/ActionButton/components/ActionButton'
import '../utils/recursos.css'

// Hooks de funcionalidades
import useFetchRecursosData from '../hooks/useFetchRecursosData';
import { useResourceVoting } from '../hooks/useVoting'; // Importar el nuevo hook

export default function Recursos() {
    const navigate = useNavigate();
    const {
        recursos,
        setRecursos,
        isLoading,
        error,
        totalCards,
        totalPages,
        currentPage,
        cardsPerPage,
        hasNextPage,
        hasPreviousPage,
        handleSearchChange,
        handleChangePage,
        goToFirstPage,
        goToLastPage,
        goToNextPage,
        goToPreviousPage,

        filterByBlockType,
        handleFilterChange,
        getBlockTypeCounts,
    } = useFetchRecursosData();

    // Hook para manejar votación
    const { userVotes, loadingVotes, handleVote } = useResourceVoting(recursos, setRecursos);

    // Función para devolver el SVG según el tipo de bloque
    const getBlockTypeIcon = (tipo) => {
        console.log(tipo)
        switch (tipo) {
            case 'text':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 2h14v14H5zm2 2v2h10V7zm0 4v2h10v-2zm0 4v2h7v-2z" /></svg>
                );
            case 'code':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 8l-4 4l4 4m10-8l4 4l-4 4M14 4l-4 16" /></svg>
                );
            case 'image':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v6.5a1 1 0 0 1-.032.25A1 1 0 0 1 22 12v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-3a1 1 0 0 1 .032-.25A1 1 0 0 1 2 15.5zm2.994 9.83q-.522.01-.994.046V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6.016c-4.297.139-7.4 1.174-9.58 2.623c.826.293 1.75.71 2.656 1.256c1.399.84 2.821 2.02 3.778 3.583a1 1 0 1 1-1.706 1.044c-.736-1.203-1.878-2.178-3.102-2.913c-1.222-.734-2.465-1.192-3.327-1.392a15.5 15.5 0 0 0-3.703-.386h-.022zm1.984-8.342A2.67 2.67 0 0 1 8.5 6c.41 0 1.003.115 1.522.488c.57.41.978 1.086.978 2.012s-.408 1.601-.978 2.011A2.67 2.67 0 0 1 8.5 11c-.41 0-1.003-.115-1.522-.489C6.408 10.101 6 9.427 6 8.5c0-.926.408-1.601.978-2.012" clipRule="evenodd" /></svg>
                );
            case 'video':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m16 13l5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect width="14" height="12" x="2" y="6" rx="2" /></g></svg>
                );
            case 'link':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.98 2.98 0 0 0 0-4.24a2.98 2.98 0 0 0-4.24 0l-3.53 3.53a2.98 2.98 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.98 2.98 0 0 0 0 4.24a2.98 2.98 0 0 0 4.24 0l3.53-3.53a2.98 2.98 0 0 0 0-4.24a.973.973 0 0 1 0-1.42" /></svg>
                );
            default:
                // Icono genérico para cualquier otro tipo
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="text-gray-500">
                        <path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                );
        }
    };

    // Función para navegar al detalle del recurso
    const handleCardClick = (recursoId) => {
        navigate(`/app/recursos/detalle/${recursoId}`);
    };

    // Función para obtener el icono según la categoría (permanece igual que antes)
    const getCategoryIcon = (categoria) => {
        switch (categoria) {
            case 'documento':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" /></svg>;
            case 'video':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" /></svg>;
            case 'imagen':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" /></svg>;
            case 'link':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" /></svg>;
            default:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>;
        }
    };

    // Función para obtener los estilos según el tipo de voto (permanece igual)
    const getVoteButtonStyles = (voteType, isActive) => {
        const baseStyles = "item-reaccion flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-200";

        if (isActive) {
            switch (voteType) {
                case 'like':
                    return `${baseStyles} bg-green-100 text-green-400 border border-green-300 shadow-sm voto-activo`;
                case 'mejora':
                    return `${baseStyles} bg-orange-100 text-orange-600 border border-orange-300 shadow-sm voto-activo`;
                case 'dislike':
                    return `${baseStyles} bg-red-100 text-red-600 border border-red-300 shadow-sm voto-activo`;
                default:
                    return `${baseStyles} bg-blue-100 text-blue-600 border border-blue-300 shadow-sm voto-activo`;
            }
        } else {
            switch (voteType) {
                case 'like':
                    return `${baseStyles} text-gray-500 hover:text-green-600 hover:bg-green-50 hover:border-green-200 border border-transparent voto`;
                case 'mejora':
                    return `${baseStyles} text-gray-500 hover:text-orange-600 hover:bg-orange-50 hover:border-orange-200 border border-transparent voto`;
                case 'dislike':
                    return `${baseStyles} text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 border border-transparent voto`;
                default:
                    return `${baseStyles} text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 border border-transparent voto`;
            }
        }
    };

    // Componente para botón de voto
    const VoteButton = ({ recursoId, voteType, count, icon, isActive, isLoading }) => {
        const handleClick = (e) => {
            e.stopPropagation(); // Prevenir que se dispare el click de la tarjeta
            if (!isLoading) {
                handleVote(recursoId, voteType);
            }
        };

        return (
            <button
                onClick={handleClick}
                disabled={isLoading}
                className={`${getVoteButtonStyles(voteType, isActive)} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : (
                    icon
                )}
                <span className="text-sm font-medium">{count}</span>
            </button>
        );
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <br />
            <div className="w-full flex flex-col justify-center rounded-md p-5">
                <span className='breadcrum'>
                    <svg style={{ cursor: 'pointer' }} onClick={() => navigate('/app/inicio')} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fillOpacity=".25" d="M5 14.059c0-1.01 0-1.514.222-1.945c.221-.43.632-.724 1.453-1.31l4.163-2.974c.56-.4.842-.601 1.162-.601c.32 0 .601.2 1.162.601l4.163 2.973c.821.587 1.232.88 1.453 1.311c.222.43.222.935.222 1.944V19c0 .943 0 1.414-.293 1.707C18.414 21 17.943 21 17 21H7c-.943 0-1.414 0-1.707-.293C5 20.414 5 19.943 5 19z" /><path fill="currentColor" d="M3 12.387c0 .266 0 .4.084.441c.084.041.19-.04.4-.205l7.288-5.668c.59-.459.885-.688 1.228-.688c.343 0 .638.23 1.228.688l7.288 5.668c.21.164.316.246.4.205c.084-.041.084-.175.084-.441v-.409c0-.48 0-.72-.102-.928c-.101-.208-.291-.356-.67-.65l-7-5.445c-.59-.459-.885-.688-1.228-.688c-.343 0-.638.23-1.228.688l-7 5.445c-.379.294-.569.442-.67.65c-.102.208-.102.448-.102.928zM12.5 15h-1a2 2 0 0 0-2 2v3.85c0 .083.067.15.15.15h4.7a.15.15 0 0 0 .15-.15V17a2 2 0 0 0-2-2" /><rect width="2" height="4" x="16" y="5" fill="currentColor" rx=".5" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887z" /></svg>
                    <span>Recursos</span>
                </span>
                <div className="encabezado-recursos">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <h1 className="ml-1 justify-between items-center font-semibold text-2xl" style={{ color: '#1c1c1c' }}>
                                <span style={{ color: '#b4bc00' }}>R</span>ecursos
                            </h1>
                            <span className='text-xs ml-1 text-gray-600 mt-2'>
                                Biblioteca centralizada para compartir recursos de diferentes tipos
                            </span>
                        </div>
                        <div className="flex">
                            <div className="buscador rounded-md">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 pr-2" style={{ marginTop: '-15px', paddingLeft: '8px' }}>
                                    <span className="text-gray-500 sm:text-sm mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M10.77 18.3a7.53 7.53 0 1 1 7.53-7.53a7.53 7.53 0 0 1-7.53 7.53m0-13.55a6 6 0 1 0 6 6a6 6 0 0 0-6-6" /><path fill="currentColor" d="M20 20.75a.74.74 0 0 1-.53-.22l-4.13-4.13a.75.75 0 0 1 1.06-1.06l4.13 4.13a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.22" /></svg>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="busca_campo block w-72 rounded-md border-0 py-1.5 pl-8 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    placeholder="Buscar recurso..."
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                />
                            </div>
                            <ActionButton
                                text="Nuevo recurso"
                                onClick={() => navigate('/app/recursos/crear')}
                                color="#e2ff02"
                                textColor="#1e2f3c"
                                size="small"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16" /><path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 0 0 0-2h-4z" /></g></svg>}
                                customStyles={{ fontWeight: '400', height: '35px', borderRadius: '7px', marginLeft: '10px' }}
                            />
                        </div>
                    </div>
                    <Tabs
                        activeTab={filterByBlockType}
                        onTabChange={handleFilterChange}
                        blockTypeCounts={getBlockTypeCounts()}
                    />
                </div>
            </div>
            <br />

            {/* Grid de tarjetas de recursos */}
            <div className="container px-5" id='contenido-tarjetas' style={{display: 'flex', flexDirection: 'column'}}>
                {/* <div className="flex flex-col" style={{ marginBottom: '25px', marginTop: '5px' }}>
                    <span className='text-xl text-zinc-800 font-semibold'>Contenido reciente</span>
                    <span className='text-zinc-600 text-sm'>Descubre los artículos más nuevos de nuestra comunidad</span>
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recursos.map((recurso) => {
                        // Contamos cuántas veces aparece cada tipo en todo el array
                        const conteoTipos = {};
                        recurso.contenido.forEach((bloque) => {
                            const tipoBloque = bloque.tipo_contenido;
                            conteoTipos[tipoBloque] = (conteoTipos[tipoBloque] || 0) + 1;
                        });

                        // Obtenemos los tipos únicos ordenados por frecuencia (opcional)
                        const tiposOrdenados = Object.entries(conteoTipos)
                            .sort(([, a], [, b]) => b - a) // Ordenar por cantidad descendente
                            .map(([tipo]) => tipo);

                        return (
                            <div
                                key={recurso.id}
                                className="tarjeta bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                                onClick={() => handleCardClick(recurso.id)}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            {/* Aquí podrías añadir el ícono de categoría si lo necesitas */}
                                        </div>
                                    </div>

                                    {/* ---------- TITULO: UNA SOLA LÍNEA CON ELLIPSIS ---------- */}
                                    <h3 className="titulo text-lg font-semibold text-[#1c1c1c] mb-2 h-7 truncate">
                                        {recurso.titulo}
                                    </h3>
                                    {/* -------------------------------------------------------- */}

                                    {/* Subtítulo (si no existe, sección invisible que reserva espacio) */}
                                    <p
                                        className="text-sm text-gray-600 mb-3 line-clamp-1 h-5"
                                        style={{ visibility: recurso.subtitulo ? 'visible' : 'hidden' }}
                                    >
                                        {recurso.subtitulo}
                                    </p>

                                    {/* Cápsula con número de bloques */}
                                    <div className="flex items-center justify-between mb-2" style={{ marginTop: '8px' }}>
                                        <span className="info_bloques text-xs text-gray-800 border border-gray-300 rounded-3xl px-3 py-1">
                                            {recurso.contenido.length} bloques
                                        </span>

                                        {/* ---------- AQUÍ: TODOS los tipos de bloque con sus contadores ---------- */}
                                        <div className="contenedor-tipos flex items-center space-x-3 ml-4 flex-wrap">
                                            {tiposOrdenados.map((tipo) => (
                                                <div key={tipo} className="item-tipo flex items-center space-x-1">
                                                    {getBlockTypeIcon(tipo)}
                                                    <span className="text-sm text-gray-600 font-medium contador">
                                                        {conteoTipos[tipo]}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        {/* ------------------------------------------------------- */}
                                    </div>

                                    <div className="infor_footer flex items-center justify-between text-xs text-gray-400 mb-4">
                                        <span>{recurso.created_at}</span>
                                    </div>

                                    <div className="barra-reacciones flex space-x-2">
                                        <VoteButton
                                            recursoId={recurso.id}
                                            voteType="like"
                                            count={recurso.numero_likes}
                                            isActive={userVotes[recurso.id] === 'like'}
                                            isLoading={loadingVotes[recurso.id]}
                                            className="voto"
                                            icon={
                                                <svg className='voto-icono' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2M4 10h2v9H4zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7z" />
                                                </svg>
                                            }
                                        />

                                        <VoteButton
                                            recursoId={recurso.id}
                                            voteType="mejora"
                                            count={recurso.numero_mejora}
                                            isActive={userVotes[recurso.id] === 'mejora'}
                                            isLoading={loadingVotes[recurso.id]}
                                            icon={
                                                <svg className='voto-icono' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                        <path d="M8 15h8M9 9h.01M15 9h.01" />
                                                        <circle cx="12" cy="12" r="10" />
                                                    </g>
                                                </svg>
                                            }
                                        />

                                        <VoteButton
                                            recursoId={recurso.id}
                                            voteType="dislike"
                                            count={recurso.numero_dislikes}
                                            isActive={userVotes[recurso.id] === 'dislike'}
                                            isLoading={loadingVotes[recurso.id]}
                                            className="texto-voto"
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2 2 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2m-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638zM18 14V5h2l.001 9z" /></svg>
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className="flex w-full justify-center">
                        <div className="contenido-paginacion flex items-center justify-between bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center text-sm text-gray-700">
                                <span>
                                    Mostrando {currentPage * cardsPerPage + 1} - {Math.min((currentPage + 1) * cardsPerPage, totalCards)} de {totalCards} recursos
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={goToFirstPage}
                                    disabled={!hasPreviousPage}
                                    className="boton-pagi text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Primera
                                </button>

                                <button
                                    onClick={goToPreviousPage}
                                    disabled={!hasPreviousPage}
                                    className="boton-pagi text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                                    </svg>
                                </button>

                                <span className="boton-pagi text-sm text-gray-700">
                                    Página {currentPage + 1} de {totalPages}
                                </span>

                                <button
                                    onClick={goToNextPage}
                                    disabled={!hasNextPage}
                                    className="boton-pagi text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                    </svg>
                                </button>

                                <button
                                    onClick={goToLastPage}
                                    disabled={!hasNextPage}
                                    className="boton-pagi text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Última
                                </button>
                            </div>
                        </div>
                    </div>

                )}

                {/* Mensaje cuando no hay recursos */}
                {recursos.length === 0 && !isLoading && (
                    <div className="flex w-full justify-center items-center" style={{ marginTop: '20px' }}>
                        <div className="flex flex-col text-center items-center py-12 justify-center">
                            <div className="text-gray-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay recursos disponibles</h3>
                            <p className="text-gray-500 mb-4">Comienza creando tu primer recurso para la biblioteca.</p>
                            <ActionButton
                                text="Crear primer recurso"
                                onClick={() => navigate('/app/recursos/crear')}
                                color="#e2ff02"

                                textColor="#1e2f3c"
                                size="small"
                                className='w-1/2 flex justify-center boton-sin'
                            />
                        </div>
                    </div>

                )}
            </div>
        </div>
    )
}
