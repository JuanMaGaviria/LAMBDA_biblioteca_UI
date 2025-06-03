import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ActionButton from '../../Core/ActionButton/components/ActionButton';
import { useResourceVoting } from '../hooks/useVoting';
import useFetchRecursoData from '../hooks/useFetchRecursoData';
import BloqueCodigo from './BloqueCodigo'; // Importa tu componente mejorado
import '../utils/recurso.css'

export default function RecursoDetalle() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("ID del recurso:", id);

    // Usamos el hook para obtener la data del recurso
    const { recurso, setRecurso, isLoading, error } = useFetchRecursoData(id);

    const { userVotes, loadingVotes, handleVote } = useResourceVoting(
        recurso ? [recurso] : [],
        (recursos) => {
            // Verificamos que recursos tenga elementos antes de actualizar
            if (recursos && recursos.length > 0) {
                setRecurso(recursos[0]);
            }
        }
    );

    // Función para obtener estilos de botones de voto
    const getVoteButtonStyles = (voteType, isActive) => {
        const baseStyles = "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium";

        if (isActive) {
            switch (voteType) {
                case 'like':
                    return `${baseStyles} bg-green-100 text-green-600 border border-green-300`;
                case 'mejora':
                    return `${baseStyles} bg-orange-100 text-orange-600 border border-orange-300`;
                case 'dislike':
                    return `${baseStyles} bg-red-100 text-red-600 border border-red-300`;
                default:
                    return `${baseStyles} bg-blue-100 text-blue-600 border border-blue-300`;
            }
        } else {
            switch (voteType) {
                case 'like':
                    return `${baseStyles} text-gray-600 hover:text-green-600 hover:bg-green-50 border border-gray-200 hover:border-green-200`;
                case 'mejora':
                    return `${baseStyles} text-gray-600 hover:text-orange-600 hover:bg-orange-50 border border-gray-200 hover:border-orange-200`;
                case 'dislike':
                    return `${baseStyles} text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200`;
                default:
                    return `${baseStyles} text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 hover:border-blue-200`;
            }
        }
    };

    // Detecta si el texto pegado es un enlace o un ID de YouTube
    const isYouTube = (url) =>
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/i.test(url) ||  // URL completa
        /^[A-Za-z0-9_-]{11}$/.test(url);

    // Componente para renderizar cada tipo de bloque
    const renderBloque = (bloque) => {
        switch (bloque.tipo_contenido) {
            case 'text':
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200" style={{ padding: '20px' }}>
                        {bloque.titulo && (
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{bloque.titulo}</h3>
                        )}
                        <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: bloque.contenido_bloque }} />
                        </div>
                    </div>
                );

            case 'code':
                // Usar el nuevo componente BloqueCodigo mejorado
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        {bloque.titulo && (
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800">{bloque.titulo}</h3>
                            </div>
                        )}

                        {/* Componente de código mejorado - solo lectura para visualización */}
                        <BloqueCodigo
                            block={{
                                id: bloque.id,
                                content: bloque.contenido_bloque || '',
                                language: bloque.lenguaje || 'javascript'
                            }}
                            // Funciones vacías ya que es solo lectura
                            update={() => { }}
                            setLanguage={() => { }}
                            readOnly={true} // Prop adicional para modo lectura
                        />
                    </div>
                );

            case 'image':
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            <img
                                src={bloque.contenido_bloque}
                                alt={bloque.titulo || 'Imagen del recurso'}
                                className="w-full max-h-96 object-contain"
                            />
                        </div>
                    </div>
                );

            case 'video':
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        {/* ——— Título opcional ——— */}
                        {bloque.titulo && (
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800">{bloque.titulo}</h3>
                            </div>
                        )}

                        {/* ——— Player ——— */}
                        <div className="p-6">
                            {isYouTube(bloque.contenido_bloque) ? (
                                /* YouTube embebido */
                                <iframe
                                    title="YouTube player"
                                    className="w-full aspect-video rounded border border-gray-200"
                                    src={
                                        bloque.contenido_bloque.length === 11               // ID suelto
                                            ? `https://www.youtube.com/embed/${bloque.contenido_bloque}`
                                            : bloque.contenido_bloque.replace('watch?v=', 'embed/')
                                    }
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                /* Archivo o URL directa (mp4, hls, etc.) */
                                <video
                                    className="w-full h-auto rounded border border-gray-200 bg-zinc-200"
                                    controls
                                    onError={(e) => {
                                        e.currentTarget.outerHTML =
                                            '<div class="text-red-600 text-center p-4">Error al cargar el video</div>';
                                    }}
                                >
                                    {/* Usa video/mp4 por defecto si el backend no envía MIME */}
                                    <source src={bloque.contenido_bloque} type={bloque.mimeType || 'video/mp4'} />
                                </video>
                            )}
                        </div>
                    </div>
                );

            case 'link':
                return (
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-start space-x-4">
                            <div className="flex-1" style={{ padding: '15px' }}>
                                <input
                                    type="text"
                                    disabled
                                    className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 border-gray-300 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6`}
                                    value={bloque.contenido_bloque}
                                />
                                <a
                                    href={bloque.contenido_bloque}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <span className="mr-2 enlace">Visitar enlace</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                        <p className="text-gray-600">Tipo de bloque no reconocido: {bloque.tipo_contenido}</p>
                    </div>
                );
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state o recurso no encontrado
    if (error || !recurso) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="text-center py-8">
                        <p className="text-red-500">Error: {error || 'Recurso no encontrado'}</p>
                        <button
                            onClick={() => navigate('/app/recursos')}
                            className="mt-4 text-blue-600 hover:text-blue-800"
                        >
                            Volver a recursos
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <br />

            <div className="w-full flex flex-col justify-center rounded-md p-5">
                {/* Breadcrumb */}
                <span className='breadcrum'>
                    <svg style={{ cursor: 'pointer' }} onClick={() => navigate('/app/inicio')} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" fillOpacity=".25" d="M5 14.059c0-1.01 0-1.514.222-1.945c.221-.43.632-.724 1.453-1.31l4.163-2.974c.56-.4.842-.601 1.162-.601c.32 0 .601.2 1.162.601l4.163 2.973c.821.587 1.232.88 1.453 1.311c.222.43.222.935.222 1.944V19c0 .943 0 1.414-.293 1.707C18.414 21 17.943 21 17 21H7c-.943 0-1.414 0-1.707-.293C5 20.414 5 19.943 5 19z" />
                        <path fill="currentColor" d="M3 12.387c0 .266 0 .4.084.441c.084.041.19-.04.4-.205l7.288-5.668c.59-.459.885-.688 1.228-.688c.343 0 .638.23 1.228.688l7.288 5.668c.21.164.316.246.4.205c.084-.041.084-.175.084-.441v-.409c0-.48 0-.72-.102-.928c-.101-.208-.291-.356-.67-.65l-7-5.445c-.59-.459-.885-.688-1.228-.688c-.343 0-.638.23-1.228.688l-7 5.445c-.379.294-.569.442-.67.65c-.102.208-.102.448-.102.928zM12.5 15h-1a2 2 0 0 0-2 2v3.85c0 .083.067.15.15.15h4.7a.15.15 0 0 0 .15-.15V17a2 2 0 0 0-2-2" />
                        <rect width="2" height="4" x="16" y="5" fill="currentColor" rx=".5" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887z" />
                    </svg>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate('/app/recursos')}>Recursos</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887z" />
                    </svg>
                    <span className="text-gray-800 font-medium">{recurso?.titulo || 'Cargando...'}</span>
                </span>

                {/* Header del recurso */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="regresar">
                        <button
                            onClick={() => navigate('/app/recursos')}
                            className="boton-reg inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="mr-2">
                                <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                            </svg>
                            Volver a recursos
                        </button>
                    </div>

                    {/* Encabezado */}
                    <div className="flex items-start justify-between mb-6 barra">
                        <div className="capsula">
                            {recurso?.categoria_nombre || 'Sin categoría'}
                        </div>
                        <ActionButton
                            text="Editar"
                            onClick={() => navigate(`/app/recursos/editar/${recurso?.id}`)}
                            color="#e2ff02"
                            textColor="#1e2f3c"
                            size="small"
                            className='boton-editar'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83l3.75 3.75z" />
                                </svg>
                            }
                            customStyles={{ fontWeight: '400', height: '35px', borderRadius: '7px', marginLeft: '10px' }}
                        />
                    </div>

                    <div className='seccion-texto'>
                        <h1 className="text-3xl font-bold text-zinc-900 mt-1">
                            {recurso?.titulo || 'Título no disponible'}
                        </h1>
                        {recurso?.subtitulo && (
                            <p className="text-xl text-zinc-500 mb-6">{recurso.subtitulo}</p>
                        )}
                    </div>

                    <div className="flex deta">
                        <div className="flex items-center">
                            <svg className='icono-deta' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="m15 16l-2.414-2.414A2 2 0 0 1 12 12.172V6" />
                                </g>
                            </svg>
                            <span>
                                {recurso?.created_at
                                    ? format(new Date(recurso.created_at), "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: es })
                                    : 'Fecha no disponible'
                                }
                            </span>
                        </div>
                        <div className="h-7 mb-3 flex items-center" style={{ marginLeft: '10px' }}>
                            <div className="info_bloques text-xs text-gray-800 border border-gray-300 rounded-3xl px-3 py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                        <path d="M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0" />
                                        <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592-5.592a2.41 2.41 0 0 0 0-3.408l-7.71-7.71A2 2 0 0 0 11.172 3H6a3 3 0 0 0-3 3" />
                                    </g>
                                </svg>
                                <span className='contador'>{recurso?.contenido?.length || 0} bloques</span>
                            </div>
                        </div>
                    </div>

                    {/* Barra de reacciones */}
                    <div className="reacciones flex items-center space-x-4 pt-6 border-t border-gray-200">
                        <button
                            onClick={() => handleVote(recurso?.id, 'like')}
                            disabled={loadingVotes[recurso?.id] || !recurso?.id}
                            className={getVoteButtonStyles('like', userVotes[recurso?.id] === 'like')}
                        >
                            {loadingVotes[recurso?.id] ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2M4 10h2v9H4zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7z" />
                                </svg>
                            )}
                            <span>{recurso?.numero_likes || 0}</span>
                        </button>

                        <button
                            onClick={() => handleVote(recurso?.id, 'mejora')}
                            disabled={loadingVotes[recurso?.id] || !recurso?.id}
                            className={getVoteButtonStyles('mejora', userVotes[recurso?.id] === 'mejora')}
                        >
                            {loadingVotes[recurso?.id] ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                        <path d="M8 15h8M9 9h.01M15 9h.01" />
                                        <circle cx="12" cy="12" r="10" />
                                    </g>
                                </svg>
                            )}
                            <span>{recurso?.numero_mejora || 0}</span>
                        </button>

                        <button
                            onClick={() => handleVote(recurso?.id, 'dislike')}
                            disabled={loadingVotes[recurso?.id] || !recurso?.id}
                            className={getVoteButtonStyles('dislike', userVotes[recurso?.id] === 'dislike')}
                        >
                            {loadingVotes[recurso?.id] ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2 2 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2m-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638zM18 14V5h2l.001 9z" />
                                </svg>
                            )}
                            <span>{recurso?.numero_dislikes || 0}</span>
                        </button>
                    </div>
                </div>

                {/* Contenido del recurso organizado por bloques */}
                <div className="space-y-8">
                    {recurso?.contenido && recurso.contenido.length > 0 ? (
                        recurso.contenido
                            .sort((a, b) => a.posicion - b.posicion)
                            .map((bloque, index) => {
                                return (
                                    <div key={bloque.id} className="relative">
                                        {renderBloque(bloque)}
                                    </div>
                                );
                            })
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No hay contenido disponible para este recurso.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}