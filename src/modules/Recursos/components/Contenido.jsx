import { useState, useEffect, useRef } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link, Code, FileText, Image, Video, Plus, X } from 'lucide-react';

import '../utils/contenido.css'
import BloqueTexto from './BloqueTexto';
import BloqueCodigo from './BloqueCodigo';

export default function Contenido({ onContentChange }) {
    const [content, setContent] = useState('');
    const [blocks, setBlocks] = useState([{ id: 1, type: 'text', content: '' }]);
    const [showBlockMenu, setShowBlockMenu] = useState(false);

    // Add this ref to track if the blocks have actually changed meaningfully
    const prevBlocksRef = useRef(blocks);

    // Effect to notify parent component when blocks change
    useEffect(() => {
        // Only call onContentChange if the blocks have actually changed in a meaningful way
        // This prevents infinite loops by avoiding unnecessary parent component updates
        if (onContentChange && JSON.stringify(blocks) !== JSON.stringify(prevBlocksRef.current)) {
            // Update our ref with the current value of blocks
            prevBlocksRef.current = blocks;

            // Convert blocks to the required format for JSON output
            const formattedBlocks = blocks.map((block, index) => ({
                posicion: index + 1,
                tipo_contenido: block.type,
                contenido_bloque: block.content || ''
            }));

            onContentChange(formattedBlocks);
        }
    }, [blocks, onContentChange]);

    const handleBold = () => {
        document.execCommand('bold', false, null);
    };

    const handleItalic = () => {
        document.execCommand('italic', false, null);
    };

    const handleUnderline = () => {
        document.execCommand('underline', false, null);
    };

    const handleBulletList = () => {
        document.execCommand('insertUnorderedList', false, null);
    };

    const handleNumberedList = () => {
        document.execCommand('insertOrderedList', false, null);
    };

    const handleLink = () => {
        const url = prompt('Ingresa la URL del enlace:', 'http://');
        if (url) {
            document.execCommand('createLink', false, url);
        }
    };

    const handleCode = () => {
        const selection = window.getSelection().toString();
        const code = `<code>${selection}</code>`;
        document.execCommand('insertHTML', false, code);
    };

    const toggleBlockMenu = () => {
        setShowBlockMenu(!showBlockMenu);
    };

    const addBlock = (type) => {
        const newBlock = {
            id: blocks.length + 1,
            type,
            content: '',
            // valores iniciales por tipo
            ...(type === 'image' && { imageInputType: 'url', fileName: '' }),
            ...(type === 'video' && { videoInputType: 'url' }),
        };
        setBlocks([...blocks, newBlock]);
        setShowBlockMenu(false);
    };

    const removeBlock = (id) => {
        if (blocks.length > 1) {
            setBlocks(blocks.filter(block => block.id !== id));
        }
    };

    const updateBlockContent = (id, newContent) => {
        setBlocks(blocks.map(block =>
            block.id === id ? { ...block, content: newContent } : block
        ));
    };

    const setLanguage = (id, lang) =>
        setBlocks(blocks.map(b => (b.id === id ? { ...b, language: lang } : b)));

    // ——— helpers fuera del componente ———
    const isYouTube = (url) =>
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/i.test(url) ||
        /^[A-Za-z0-9_-]{11}$/.test(url);

    const renderBlockContent = (block) => {
        switch (block.type) {
            case 'text':
                return (
                    <BloqueTexto
                        block={block}
                        update={updateBlockContent}   /* guarda en blur */
                    />
                );

            case 'code':
                return (
                    <BloqueCodigo
                        block={block}
                        update={updateBlockContent}   /* guarda en blur */
                        setLanguage={setLanguage}     /* cambia lenguaje */
                    />
                );
            case 'image': {
                // helpers
                const setInputType = (t) =>
                    setBlocks(blocks.map((b) =>
                        b.id === block.id ? { ...b, imageInputType: t } : b
                    ));

                const clearImage = () =>
                    setBlocks(blocks.map((b) =>
                        b.id === block.id ? { ...b, content: '', fileName: '' } : b
                    ));

                return (
                    <div className="flex flex-col p-4" style={{padding: '16px'}}>
                        {/* selector URL / Archivo */}
                        <div className="flex mb-2" style={{marginBottom: '8px'}}>
                            <button
                                className={`botones-archivo py-1 px-3 rounded-l ${block.imageInputType === 'url' ? 'boton-activo' : 'bg-gray-200'
                                    }`}
                                onClick={() => setInputType('url')}
                            >
                                URL
                            </button>
                            <button
                                className={`botones-archivo rounded-r ${block.imageInputType === 'file' ? 'boton-activo' : 'bg-gray-200'
                                    }`}
                                onClick={() => setInputType('file')}
                            >
                                Archivo
                            </button>
                        </div>

                        {/* === URL === */}
                        {block.imageInputType === 'url' && (
                            <input
                                type="text"
                                className="campo-enlace flex-1 border border-gray-300 rounded"
                                placeholder="https://ejemplo.com/imagen.jpg"
                                value={block.content}
                                onChange={(e) =>
                                    updateBlockContent(block.id, e.target.value)
                                }
                            />
                        )}

                        {/* === FILE === */}
                        {block.imageInputType === 'file' && (
                            <>
                                <input
                                    id={`image-upload-${block.id}`}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const url = URL.createObjectURL(file);           // blob URL
                                        setBlocks(blocks.map((b) =>
                                            b.id === block.id
                                                ? { ...b, content: url, fileName: file.name }
                                                : b
                                        ));
                                    }}
                                />

                                <label
                                    htmlFor={`image-upload-${block.id}`}
                                    className="cursor-pointer bg-gray-100 caja-imagen w-full flex flex-col items-center justify-center border border-dashed border-gray-300 rounded"
                                >
                                    <Image size={40} className="text-gray-400 mb-2" />
                                    <span className="text-gray-500 text-sm">Haz clic para seleccionar una imagen</span>
                                </label>

                                {block.fileName && (
                                    <div className="barra-imagen border rounded flex items-center bg-gray-50 mt-2">
                                        <span className="truncate flex-1 text-sm pl-2">{block.fileName}</span>
                                        <button
                                            className="bg-gray-200 text-zinc-600 p-1"
                                            onClick={clearImage}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* preview */}
                        {block.content && (
                            <div className="w-full border rounded overflow-hidden mt-4">
                                <img
                                    src={block.content}
                                    alt="Vista previa"
                                    className="w-full max-h-96 object-contain"   // ← tamaño estándar, ratio OK
                                    onError={(e) => {
                                        e.currentTarget.src = '/api/placeholder/400/300';
                                        e.currentTarget.alt = 'Error al cargar la imagen';
                                    }}
                                />
                            </div>
                        )}
                    </div>
                );
            }
            // ——— dentro de renderBlockContent ———
            case 'video': {
                // utilidades internas
                const setInputType = (t) =>
                    setBlocks(blocks.map(b =>
                        b.id === block.id ? { ...b, videoInputType: t, content: '' } : b
                    ));

                const clearVideo = () =>
                    setBlocks(blocks.map(b =>
                        b.id === block.id ? { ...b, content: '', fileName: '', mimeType: '' } : b
                    ));

                return (
                    <div className="flex flex-col" style={{padding: '16px'}}>
                        {/* selector URL / Archivo */}
                        <div className="flex mb-2" style={{marginBottom: '8px'}}>
                            <button
                                className={`botones-archivo rounded-l ${block.videoInputType === 'url' ? 'boton-activo' : 'bg-gray-200'}`}
                                onClick={() => setInputType('url')}
                            >
                                URL
                            </button>
                            <button
                                className={`botones-archivo rounded-r ${block.videoInputType === 'file' ? 'boton-activo' : 'bg-gray-200'}`}
                                onClick={() => setInputType('file')}
                            >
                                Archivo
                            </button>
                        </div>

                        {/* ——— URL ——— */}
                        {block.videoInputType === 'url' && (
                            <input
                                type="text"
                                className="campo-enlace flex-1 border border-gray-300 rounded"
                                placeholder="https://ejemplo.com/video.mp4  o  ID/URL de YouTube"
                                value={block.content || ''}
                                onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            />
                        )}

                        {/* ——— FILE ——— */}
                        {block.videoInputType === 'file' && (
                            <>
                                <input
                                    id={`video-upload-${block.id}`}
                                    type="file"
                                    accept="video/*"
                                    hidden
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const url = URL.createObjectURL(file);
                                        setBlocks(blocks.map(b =>
                                            b.id === block.id
                                                ? {
                                                    ...b,
                                                    content: url,
                                                    fileName: file.name,
                                                    mimeType: file.type || 'video/mp4',
                                                }
                                                : b
                                        ));
                                    }}
                                />

                                <label
                                    htmlFor={`video-upload-${block.id}`}
                                    className="cursor-pointer bg-gray-100 caja-imagen w-full flex flex-col items-center justify-center border border-dashed border-gray-300 rounded"
                                >
                                    <Video size={40} className="text-gray-400 mb-2" />
                                    <span className="text-gray-500 text-sm">Haz clic para seleccionar un video</span>
                                </label>

                                {block.fileName && (
                                    <div className="barra-imagen border rounded flex items-center bg-gray-50 mt-2">
                                        <span className="truncate flex-1 text-sm pl-2">{block.fileName}</span>
                                        <button className="bg-gray-200 text-zinc-600 p-1" onClick={clearVideo}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* ——— PREVIEW ——— */}
                        {block.content && (
                            isYouTube(block.content) ? (
                                <div className="w-full border rounded overflow-hidden bg-zinc-200 mt-4">
                                    <iframe
                                        title="YouTube preview"
                                        src={
                                            block.content.length === 11           // ID suelto
                                                ? `https://www.youtube.com/embed/${block.content}`
                                                : block.content.replace('watch?v=', 'embed/')
                                        }
                                        className="w-full aspect-video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <div className="w-full border rounded overflow-hidden bg-zinc-200 mt-4">
                                    <video
                                        controls
                                        className="w-full h-auto"
                                        onError={(e) => {
                                            e.currentTarget.outerHTML =
                                                '<div class="error-carga text-center p-4 text-red-600">Error al cargar el video</div>';
                                        }}
                                    >
                                        <source src={block.content} type={block.mimeType || 'video/mp4'} />
                                    </video>
                                </div>
                            )
                        )}
                    </div>
                );
            }

            case 'link':
                return (
                    <div className="flex items-center w-full" style={{ padding: '16px' }}>
                        <input
                            type="text"
                            className="campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-blue-600 border-gray-300 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
                            placeholder="https://ejemplo.com"
                            style={{ padding: '8px' }}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full mx-auto border border-gray-300 rounded-md" style={{ marginTop: '20px' }}>
            <div className="barra border-b border-gray-300 flex items-center space-x-1 bg-gray-50">
                <button onClick={handleBold} className="barra-item p-1 hover:bg-gray-200 rounded">
                    <Bold size={20} />
                </button>
                <button onClick={handleItalic} className="barra-item p-1 hover:bg-gray-200 rounded">
                    <Italic size={20} />
                </button>
                <button onClick={handleUnderline} className="barra-item p-1 hover:bg-gray-200 rounded">
                    <Underline size={20} />
                </button>
                <button onClick={handleBulletList} className="barra-item p-1 hover:bg-gray-200 rounded">
                    <List size={20} />
                </button>
                <button onClick={handleNumberedList} className="barra-item p-1 hover:bg-gray-200 rounded">
                    <ListOrdered size={20} />
                </button>
                <button onClick={handleLink} className="barra-item p-1 hover:bg-gray-200 rounded">
                    <Link size={20} />
                </button>
                <button onClick={handleCode} className="barra-item p-1 hover:bg-gray-200 rounded">
                    <Code size={20} />
                </button>
            </div>

            <div className="divide-y divide-gray-200">
                {blocks.map(block => (
                    <div key={block.id} className="relative group">
                        {renderBlockContent(block)}
                        <button
                            onClick={() => removeBlock(block.id)}
                            className="boton-remover cursor-pointer absolute top-2 right-2 p-1 rounded-full bg-gray-200 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="franja-boton border-t border-gray-300 relative">
                <button
                    onClick={toggleBlockMenu}
                    className="boton-agregar flex items-center gap-2 text-sm rounded hover:bg-gray-100 border border-gray-300"
                >
                    Añadir bloque
                </button>

                {showBlockMenu && (
                    <div className="menu-tipo absolute bottom-12 left-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <ul className='flex flex-col justify-start'>
                            <li
                                className="menu-tipo-item flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => addBlock('text')}
                            >
                                <div className="flex justify-start">
                                    <svg className='icono-tipo' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 1 1-2 0V6h-4v12h1a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2h1V6H7v1a1 1 0 0 1-2 0z" /></svg>
                                    <span className='texto-tipo'>Texto</span>
                                </div>
                            </li>
                            <li
                                className="menu-tipo-item flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => addBlock('image')}
                            >
                                <div className="flex justify-start">
                                    <svg className='icono-tipo' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M2 2h20v20H2zm2 18h13.586L9 11.414l-5 5zm16-.414V4H4v9.586l5-5zM15.547 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-3 1a3 3 0 1 1 6 0a3 3 0 0 1-6 0" /></svg>
                                    <span className='texto-tipo'>Imagen</span>
                                </div>
                            </li>
                            <li
                                className="menu-tipo-item flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => addBlock('video')}
                            >
                                <div className="flex justify-start">
                                    <svg className='icono-tipo' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14zM3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                                    <span className='texto-tipo'>Video</span>
                                </div>
                            </li>
                            <li
                                className="menu-tipo-item flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => addBlock('code')}
                            >
                                <div className="flex justify-start">
                                    <svg className='icono-tipo' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6z" /></svg>
                                    <span className='texto-tipo'>Código</span>
                                </div>
                            </li>
                            <li
                                className="menu-tipo-item flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => addBlock('link')}
                            >
                                <div className="flex justify-start">
                                    <svg className='icono-tipo' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11" /></svg>
                                    <span className='texto-tipo'>Enlace</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}