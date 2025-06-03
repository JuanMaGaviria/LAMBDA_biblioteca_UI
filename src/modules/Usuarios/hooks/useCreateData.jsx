import { useState } from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';

export function useCreateData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createData = async (usuario) => {
        setIsLoading(true);
        setError(null);
        try {
            // Agregamos await para esperar correctamente la respuesta del servidor
            const response = await api.post('/usuarios/crear/', {
                nombre_completo: usuario.nombre_completo,
                correo: usuario.correo,
                password: usuario.password,
                role: usuario.role,
            });
            if (response.status !== 201) {
                throw new Error('Error al crear el usuario');
            }
            const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Datos registrados correctamente",
            });
            return response.data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { createData, isLoading, error };
}
