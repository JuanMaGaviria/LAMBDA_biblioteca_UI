import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import ActionButton from '../../Core/ActionButton/components/ActionButton';
import { useValidation } from '../../Core/Validation/hooks/useValidation';
import useFetchCategoriaData from '../../Maestros/Categorias/hooks/useFetchData';
import useFetchArea from '../../Maestros/Areas/hooks/useFetchData';
import { useCreateData } from '../hooks/useCreateData.jsx';
import Contenido from './Contenido';
import '../utils/recursosForm.css';

// Modificado para inicializar formData dentro del componente
export default function RecursosForm({ formData: externalFormData, setFormData: externalSetFormData }) {
    // Crear estado local si no se pasan props externas
    const [localFormData, setLocalFormData] = useState({
        titulo: '',
        subtitulo: '',
        categoria: '',
        area: '',
        descripcion: ''
    });
    const { createData, isLoading: isCreating, error: createError } = useCreateData();
    // Decidir qué formData y setFormData usar
    const formData = externalFormData || localFormData;
    const setFormData = externalSetFormData || setLocalFormData;
    
    // Estado para los bloques de contenido
    const [contentBlocks, setContentBlocks] = useState([]);

    const navigate = useNavigate();
    const validations = {
        titulo: (value) => {
            if (!value) return 'El título es obligatorio.';
            if (value.length < 3) return 'El título debe tener al menos 3 caracteres.';
            return null;
        },
        categoria: (value) => {
            if (!value) return 'La categoria es obligatoria.';
            return null;
        },
        area: (value) => {
            if (!value) return 'El área es obligatoria.';
            return null;
        }
    };

    const { errors, validate, validateAll, clearError } = useValidation(validations);

    // Lista de categorías
    const { categorias, isLoading, error } = useFetchCategoriaData();
    const { areas } = useFetchArea();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Manejador para cambios en los bloques de contenido
    const handleContentChange = (blocks) => {
        setContentBlocks(blocks);
    };

    const handleSave = async () => {
        // Validar todos los campos antes de guardar
        const allValid = validateAll(formData);
        if (!allValid) {
            return;
        }

        // Validar que haya al menos un bloque de contenido
        if (!contentBlocks || contentBlocks.length === 0) {
            // Mostrar SweetAlert en lugar de alert
            Swal.fire({
                icon: 'warning',
                title: 'Contenido requerido',
                text: 'Debe agregar al menos un bloque de contenido.',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        // Crear objeto final con datos del formulario y los bloques de contenido
        const finalData = {
            ...formData,
            contenido: contentBlocks
        };
        
        console.log("Datos a enviar:", finalData);
        
        try {
            const result = await createData(finalData);
            console.log('Recurso creado:', result);
            
            navigate('/app/recursos');
           
            
        } catch (err) {
            console.error('Error al crear recurso:', err);
            // El error ya se maneja en el hook con SweetAlert
        }
    };

    return (
        <div>
            <br />
            <div className="w-full flex flex-col justify-center rounded-md p-5">
                <span className='breadcrum'>
                    <svg style={{ cursor: 'pointer' }} onClick={() => navigate('/app/inicio')} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fillOpacity=".25" d="M5 14.059c0-1.01 0-1.514.222-1.945c.221-.43.632-.724 1.453-1.31l4.163-2.974c.56-.4.842-.601 1.162-.601c.32 0 .601.2 1.162.601l4.163 2.973c.821.587 1.232.88 1.453 1.311c.222.43.222.935.222 1.944V19c0 .943 0 1.414-.293 1.707C18.414 21 17.943 21 17 21H7c-.943 0-1.414 0-1.707-.293C5 20.414 5 19.943 5 19z" /><path fill="currentColor" d="M3 12.387c0 .266 0 .4.084.441c.084.041.19-.04.4-.205l7.288-5.668c.59-.459.885-.688 1.228-.688c.343 0 .638.23 1.228.688l7.288 5.668c.21.164.316.246.4.205c.084-.041.084-.175.084-.441v-.409c0-.48 0-.72-.102-.928c-.101-.208-.291-.356-.67-.65l-7-5.445c-.59-.459-.885-.688-1.228-.688c-.343 0-.638.23-1.228.688l-7 5.445c-.379.294-.569.442-.67.65c-.102.208-.102.448-.102.928zM12.5 15h-1a2 2 0 0 0-2 2v3.85c0 .083.067.15.15.15h4.7a.15.15 0 0 0 .15-.15V17a2 2 0 0 0-2-2" /><rect width="2" height="4" x="16" y="5" fill="currentColor" rx=".5" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887z" /></svg>
                    <span className='cursor-pointer' onClick={() => navigate('/app/recursos')}>Recursos</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887z" /></svg>
                    <span>Crear</span>
                </span>
            </div>

            <div className="container">
                <div className="formulario">
                    <span>Nuevo recurso</span>

                    <div className="flex caja">
                        <div className="flex flex-col w-full">
                            <label className="text-zinc-800 text-sm mt-7" htmlFor="titulo">
                                Título <span className="font-bold text-red-700">*</span>
                            </label>
                            <input
                                type="text"
                                id="titulo"
                                autoComplete='off'
                                placeholder="Título del recurso"
                                className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.titulo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                                    }`}
                                value={formData.titulo || ''}
                                onChange={(e) => {
                                    setFormData({ ...formData, titulo: e.target.value });
                                    validate('titulo', e.target.value);
                                }}
                                onBlur={() => validate('titulo', formData.titulo)}

                            />
                            {errors.titulo && <small className="text-red-500">{errors.titulo}</small>}
                        </div>
                        <div className="flex flex-col w-full" style={{ marginLeft: '30px' }}>
                            <label className="text-zinc-800 text-sm mt-7" htmlFor="subtitulo">
                                Subtítulo (opcional)
                            </label>
                            <input
                                type="text"
                                id="subtitulo"
                                value={formData.subtitulo || ''}
                                onChange={handleInputChange}
                                placeholder="Subtítulo del recurso"
                                className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 border-gray-300 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6`}
                            />
                        </div>
                    </div>
                    <div className="flex caja">
                        <div className="flex flex-col w-full">
                            <label className="text-zinc-800 text-sm mt-7" htmlFor="categoria">
                                Categoría <span className="font-bold text-red-700">*</span>
                            </label>
                            <select
                                id="categoria"
                                value={formData.categoria || ''}
                                onChange={(e) => {
                                    setFormData({ ...formData, categoria: Number(e.target.value) });
                                    validate('categoria', e.target.value);
                                }}
                                onBlur={() => validate('categoria', formData.categoria)}
                                className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.categoria ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                            >
                                <option value="" disabled>
                                    -- Seleccione una categoría --
                                </option>
                                {categorias && categorias.length > 0 && categorias.filter((categoria) => categoria.is_active).map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.categoria && <small className="text-red-500">{errors.categoria}</small>}
                        </div>
                        <div className="flex flex-col w-full" style={{ marginLeft: '30px' }}>
                            <label className="text-zinc-800 text-sm mt-7" htmlFor="area">
                                Área <span className="font-bold text-red-700">*</span>
                            </label>
                            <select
                                id="area"
                                value={formData.area || ''}
                                onChange={(e) => {
                                    setFormData({ ...formData, area: Number(e.target.value) });
                                    validate('area', e.target.value);
                                }}
                                onBlur={() => validate('area', formData.area)}
                                className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.area ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                            >
                                <option value="" disabled>
                                    -- Seleccione una área --
                                </option>
                                {areas && areas.length > 0 && areas.filter((area) => area.is_active).map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.area && <small className="text-red-500">{errors.area}</small>}
                        </div>
                    </div>
                    <br />
                    <div className="flex flex-col w-full">
                        <label className='text-zinc-800 text-sm mt-7' htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            value={formData.descripcion || ''}
                            onChange={handleInputChange}
                            placeholder="Describe el recurso..."
                            className={`tarea block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 border-gray-300`}
                        />
                    </div>
                    <br />

                    {/* Componente Contenido con prop para recibir los bloques */}
                    <div className="flex flex-col w-full">
                        <label className='text-zinc-800 text-sm mt-7' htmlFor="contenido">Contenido</label>
                        <Contenido onContentChange={handleContentChange} />
                    </div>
                    
                    <br />
                    <div className="flex">
                        <ActionButton
                            text="Guardar"
                            onClick={handleSave}
                            color="#e2ff02"
                            textColor="#1e2f3c"
                            size="small"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7" /></g></svg>}
                            customStyles={{ fontWeight: '400', height: '35px', borderRadius: '7px' }}
                        />
                        <ActionButton
                            text="Cancelar"
                            onClick={() => navigate('/app/recursos')}
                            color="#f1f5f9"
                            textColor="#1e2f3c"
                            size="small"
                            customStyles={{ fontWeight: '400', height: '35px', borderRadius: '7px', marginLeft: '10px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}