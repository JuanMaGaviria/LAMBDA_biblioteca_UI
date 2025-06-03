import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../../../services/api';

const useCambiarClave = () => {
  const { token } = useParams();  // Obtiene el token de la URL
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Verifica si el token existe en la URL
  useEffect(() => {
    if (!token) {
      toast.error('El token es necesario para cambiar la contraseña.');
      navigate('/'); // Redirige a login si no hay token
    }
  }, [token, navigate]);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setErrors({});
    toast.promise(
      api.post('/usuarios/rest-password/', { token, new_password: newPassword }),
      {
        loading: 'Cambiando contraseña...',
        success: () => {
          navigate('/');
          return '¡Contraseña cambiada exitosamente!';
        },
        error: (error) => {
          if ("error" in error.response.data) {
            return error.response.data.error || 'Error al cambiar la contraseña.';
          } else {
            setErrors(error.response.data);
            return 'Error al cambiar la contraseña. Verifique el token o la nueva contraseña.';
          }
        },
      },
      {
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
        duration: 4000,
      }
    );
  };

  return {
    token,
    newPassword,
    errors,
    setNewPassword,
    handleChangePassword,
  };
};

export default useCambiarClave;
