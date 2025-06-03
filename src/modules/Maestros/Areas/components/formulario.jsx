// FormularioEmpresa.jsx
import React, { useState, useEffect } from 'react';
import { useValidation } from '../../../Core/Validation/hooks/useValidation.jsx';

const Formulario = ({ formData, setFormData, modalData, validate, errors }) => {
    const validations = {
        nombre: (value) => {
            if (!value) return 'El nombre es obligatorio.';
            if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
            return null;
        },
        descripcion: (value) => {
            if (!value) return 'La descripción es obligatorio.';
            if (value.length < 5) return 'La descripción debe tener al menos 5 caracteres.';
            return null;
        }
    };

    const { validate: validateField } = useValidation(validations);

    return (
        <>

            <div className="flex flex-col w-full" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <label className='text-zinc-800 text-sm mt-7' htmlFor="">Nombre del área <span className='font-bold text-red-700'>*</span></label>
                <input
                    type="text"
                    placeholder="Ingrese el nombre de la área"
                    className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.nombre ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                    value={formData.nombre}
                    onChange={(e) => {
                        setFormData({ ...formData, nombre: e.target.value });
                        validate('nombre', e.target.value);
                    }}
                    onBlur={() => validate('nombre', formData.nombre)}
                />
                {errors.nombre && <small className="text-red-500">{errors.nombre}</small>}
            </div>
            <div className="flex flex-col w-full">
                <label className='text-zinc-800 text-sm mt-7' htmlFor="">Descripción <span className='font-bold text-red-700'>*</span></label>
                <textarea
                    placeholder="Describa el área..."
                    className={`tarea block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.descripcion ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                    value={formData.descripcion}
                    onChange={(e) => {
                        setFormData({ ...formData, descripcion: e.target.value });
                        validate('descripcion', e.target.value); // Valida campo individual
                    }}
                    onBlur={() => validate('descripcion', formData.descripcion)} // Valida al perder foco
                    style={{ resize: 'none' }}
                />
                {errors.descripcion && <small className="text-red-500">{errors.descripcion}</small>}
            </div>
        </>
    );
};

export default Formulario;
