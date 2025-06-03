import { useState } from 'react';
import api from '../../../../services/api';
import Swal from 'sweetalert2';
export function useCreateData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createData = async (categoria) => {
        setIsLoading(true);
        setError(null);
        try {
            // Agregamos await para esperar correctamente la respuesta del servidor
            const response = await api.post('/categorias/crear/', {
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
                is_active: 1,
            });
            if (response.status !== 201) {
                throw new Error('Error al registrar la data');
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
                // text: 'El tipo de lista ha sido creado.',
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
