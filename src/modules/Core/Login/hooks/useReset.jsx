import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../../../services/api';

const useReset = () => {
  const [correo, setCorreo] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false); // Estado para el éxito
  const navigate = useNavigate();
  const location = useLocation();

  const handleReset = async (event) => {
    event.preventDefault();
    setErrors({});
    toast.promise(
      api.post('/usuarios/rest-password-request/', { correo }),
      {
        loading: 'Iniciando sesión...',
        success: (response) => {
          setSuccess(true); // Marcar como exitoso
          return response.message || 'Correo enviado con éxito'; // Asegúrate de que la respuesta sea una cadena
        },
        error: (error) => {
          const errorMessage = error.response?.data?.error || 'Error al recuperar la contraseña. Por favor, verifica el correo ingresado.';
          setErrors(error.response?.data || {});
          return errorMessage;
        },
      },
      {
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
        duration: 4000,
      }
    );
  };

  return {
    correo,
    errors,
    setCorreo,
    handleReset,
    success,
  };
};

export default useReset;
