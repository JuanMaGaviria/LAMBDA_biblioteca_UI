import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import useCambiarClave from '../hooks/useCambiarClave'; // Asegúrate de que el hook está en la ruta correcta

export default function CambiarClave() {
  const { token, newPassword, errors, setNewPassword, handleChangePassword } = useCambiarClave();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);  // Estado para la validación en tiempo real

  // Verifica en tiempo real si las contraseñas coinciden
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordsMatch(value === confirmPassword); // Comparar las contraseñas en tiempo real
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(newPassword === value); // Comparar las contraseñas en tiempo real
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!passwordsMatch) {
      alert('Las contraseñas no coinciden');
      return;
    }
    handleChangePassword(event);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center min-h-screen">
      <Toaster />

      <div className="flex min-h-screen w-1/2 cont">
        <img src="" className='fondo' alt="" />
      </div>

      <div className="flex flex-col z-10 justify-center w-1/2 min-h-screen bg-white">
        <div className="flex flex-col px-28">
          <div className="space-y-1 flex flex-col mb-4">
            <span className="justify-between font-bold text-2xl" style={{ color: '#1c1c1c' }}>
              Crear nueva contraseña
            </span>
            <span className="text-gray-500 text-sm mt-3">Ingrese su contraseña y confirmela a continuación para completar el proceso de restablecimiento</span>
          </div>

          <div className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-between w-full">
                <div className="space-y-2 mb-4 w-full">
                  {/* <label className='text-sm text-gray-500' htmlFor="newPassword">Nueva Contraseña</label> */}
                  <div className="relative w-full">
                    <input
                      id="newPassword"
                      style={{ marginTop: '-8px' }}
                      className="block mb-4 w-full rounded-md border-0 py-1.5 pl-3 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingrese su nueva contraseña"
                      value={newPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M3 13c3.6-8 14.4-8 18 0" /><path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" /></g></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="m10.12 10.827l4.026 4.027a.5.5 0 0 0 .708-.708l-13-13a.5.5 0 1 0-.708.708l3.23 3.23A6 6 0 0 0 3.2 6.182a6.7 6.7 0 0 0-1.117 1.982c-.021.061-.047.145-.047.145l-.018.062s-.076.497.355.611a.5.5 0 0 0 .611-.355l.001-.003l.008-.025l.035-.109a5.7 5.7 0 0 1 .945-1.674a5 5 0 0 1 1.124-1.014L6.675 7.38a2.5 2.5 0 1 0 3.446 3.446m-3.8-6.628l.854.854Q7.564 5 8 5c2.044 0 3.286.912 4.028 1.817a5.7 5.7 0 0 1 .945 1.674q.025.073.035.109l.008.025v.003l.001.001a.5.5 0 0 0 .966-.257v-.003l-.001-.004l-.004-.013a2 2 0 0 0-.06-.187a6.7 6.7 0 0 0-1.117-1.982C11.905 5.089 10.396 4 8.002 4c-.618 0-1.177.072-1.681.199" /></svg>}
                    </button>
                    
                  </div>
                  {errors.new_password && <div className="error-message">{errors.new_password.join(' ')}</div>}
                </div>
                {!passwordsMatch && 
                  <div className="error-message text-red-500 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>
                  </div>
                }
              </div>


              
              <div className="flex flex-row justify-between w-full">
                <div className="space-y-2 mb-4 w-full">
                  {/* <label className='text-sm text-gray-500' htmlFor="confirmPassword">Confirmar Contraseña</label> */}
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      style={{ marginTop: '-8px' }}
                      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirme su nueva contraseña"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange} // Llamada para la validación en tiempo real
                    />
                  </div>
                 
                </div>
                {!passwordsMatch && 
                  <div className="error-message text-red-500 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>
                  </div>
                }
              </div>

              
              {!passwordsMatch && <div className="error-message text-red-500" style={{marginTop: '-10px'}}>Las contraseñas no coinciden</div>}

              <button className="mt-5 w-full bg-primary-green sub" type="submit" disabled={!passwordsMatch}>Cambiar contraseña</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
