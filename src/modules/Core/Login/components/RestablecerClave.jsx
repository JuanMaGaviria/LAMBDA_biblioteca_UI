import React from 'react';
import { Toaster } from 'react-hot-toast';
import useReset from '../hooks/useReset';

import '../utils/Restablecer.css'


const RestablecerClave = ({ setIsLogin }) => {
  const { correo, setCorreo, errors, handleReset, success } = useReset();

  if (success) {
    return (
      <div className="flex flex-row justify-center items-center min-h-screen">
        <div className="flex flex-col bg-white h-72 p-4">
          <div className="flex flex-col items-center">
            <div className="flex">
              <img src="" className='mb-4 absolute plane' alt="" />
              <img src="" className='mb-4 w-40 corrimg' alt="" />
            </div>
            <span className="font-semibold text-xl text-gray-800">Correo enviado</span>
            <span className="text-gray-500 text-sm mt-3 text-center">Se ha enviado un correo con las instrucciones para restablecer tu contraseña.</span>

            <button type="button" onClick={() => setIsLogin(true)} className="bg-primary-green px-6 py-2 text-white rounded-md text-sm mt-3">Volver al login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center items-center min-h-screen">
      <Toaster />
      <div className="flex flex-col bg-white h-72 p-4">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center w-8 h-8 bg-green-50 mb-3">
            <svg className="text-primary-green" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
                <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0-2 0m-3-5V7a4 4 0 1 1 8 0v4" />
              </g>
            </svg>
          </div>
          <span className="font-semibold text-lg text-gray-800">Restablecer contraseña</span>
          <span className="text-gray-500 text-xs mb-6 text-center">Ingrese el correo asociado con su cuenta y se le enviará un correo con las instrucciones para restablecer su contraseña</span>
        </div>
        <form onSubmit={handleReset}>
          <div>
            <input
              type="email"
              id="correor"
              name="correor"
              autoComplete="off"
              className={`block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.correo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
              placeholder="Ingrese su correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            {errors.correo && <p className="error text-red-700 text-sm">{errors.correo.join(' ')}</p>}
          </div>
          <div className="flex justify-between mt-3">
            <button type="button" onClick={() => setIsLogin(true)} className="text-primary-green text-sm">Volver al login</button>
            <button type="submit" className="bg-primary-green p-2 text-white rounded-md text-sm">Enviar instrucciones</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestablecerClave;
