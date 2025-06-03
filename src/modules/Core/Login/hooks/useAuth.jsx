import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../../../services/api';
import { useUser } from '../../../../context/userContext';

const useAuth = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrors({});
    toast.promise(
      api.post('/usuarios/login/', { correo, password }),
      {
        loading: 'Iniciando sesión...',
        success: (response) => {
          localStorage.setItem('access_token', response.data.access_token);

          if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);

            // Redirigir según el rol
            const role = response.data.user.role;
            if (role === 'Colaborador') {
              navigate('/muro');
            } else if (role === 'Administrador' || role === 'Moderador') {
              const from = location.state?.from?.pathname || '/app/inicio';
              navigate(from);
            } else {
              console.warn('Rol desconocido:', role);
              navigate('/app/inicio'); // Fallback
            }
          } else {
            console.warn('No se recibió un usuario válido en la respuesta');
            navigate('/app/inicio'); // Fallback
          }

          return '¡Sesión iniciada exitosamente!';
        },
        error: (error) => {
          if ("error" in error.response.data) {
            return error.response.data.error || 'Error al iniciar sesión.';
          } else {
            setErrors(error.response.data);
            return 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
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
    correo,
    password,
    errors,
    setCorreo,
    setPassword,
    handleLogin,
  };
};

export default useAuth;