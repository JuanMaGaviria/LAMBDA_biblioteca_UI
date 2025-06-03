import React, { useState, useEffect } from 'react';
import { useValidation } from '../../Core/Validation/hooks/useValidation.jsx';
import useFetchRoles from '../hooks/useFetchRoleData.jsx'; // Asegúrate de importar el hook


const Formulario = ({ formData, setFormData, modalData }) => {
  const validations = {
    nombre_completo: (value) => {
      if (!value) return 'El nombre es obligatorio.';
      if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
      return null;
    },
    correo: (value) => {
      if (!value) return 'El correo es obligatorio.';
      if (value.length < 3) return 'El correo debe tener al menos 3 caracteres.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'El formato del correo no es válido.';
      return null;
    },
    password: (value) => {
      if (!modalData && !value) return 'La contraseña es obligatoria.';
      if (value && value.length < 4) return 'La contraseña debe tener al menos 4 caracteres.';
      return null;
    },
    role: (value) => {
      if (!value) return 'El rol es obligatorio.';
      return null;
    },
  };

  const { errors, validate, validateAll, clearError } = useValidation(validations);

  // Lista de roles disponibles
  const { roles, isLoading, error } = useFetchRoles();

  return (
    <>
      <div className="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
        <div className="flex flex-col w-full" style={{ marginRight: '10px' }}>
          <label className="text-zinc-800 text-sm mt-7" htmlFor="nombre_completo">
            Nombre completo <span className="font-bold text-red-700">*</span>
          </label>
          <input
            type="text"
            id="nombre_completo"
            placeholder="Ingrese el nombre completo"
            className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.nombre_completo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
              }`}
            value={formData.nombre_completo}
            onChange={(e) => {
              setFormData({ ...formData, nombre_completo: e.target.value });
              validate('nombre_completo', e.target.value);
            }}
            onBlur={() => validate('nombre_completo', formData.nombre_completo)}
          />
          {errors.nombre_completo && <small className="text-red-500">{errors.nombre_completo}</small>}
        </div>
      </div>

      <div className="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
        <div className="flex flex-col w-full" style={{ marginRight: '10px' }}>
          <label className="text-zinc-800 text-sm mt-7" htmlFor="correo">
            Correo <span className="font-bold text-red-700">*</span>
          </label>
          <input
            type="text"
            id="correo"
            placeholder="Ingrese el correo"
            className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.correo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
              }`}
            value={formData.correo}
            onChange={(e) => {
              setFormData({ ...formData, correo: e.target.value });
              validate('correo', e.target.value);
            }}
            onBlur={() => validate('correo', formData.correo)}
          />
          {errors.correo && <small className="text-red-500">{errors.correo}</small>}
        </div>

        {!modalData && (
          <div className="flex flex-col w-full">
            <label className="text-zinc-800 text-sm mt-7" htmlFor="password">
              Contraseña <span className="font-bold text-red-700">*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese la contraseña"
              className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                }`}
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                validate('password', e.target.value);
              }}
              onBlur={() => validate('password', formData.password)}
            />
            {errors.password && <small className="text-red-500">{errors.password}</small>}
          </div>
        )}
      </div>

      <div className="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
        <div className="flex flex-col w-full">
          <label className="text-zinc-800 text-sm mt-7" htmlFor="role">
            Rol <span className="font-bold text-red-700">*</span>
          </label>
          <select
            id="role"
            value={formData.role || ''}
            onChange={(e) => {
              setFormData({ ...formData, role: Number(e.target.value) }); // Asegúrate de convertirlo a número
              validate('role', e.target.value);
            }}
            onBlur={() => validate('role', formData.role)}
            className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.role ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
              }`}
          >
            <option value="" disabled>
              Seleccione un rol
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role && <small className="text-red-500">{errors.role}</small>}
        </div>
      </div>
    </>
  );
};

export default Formulario;