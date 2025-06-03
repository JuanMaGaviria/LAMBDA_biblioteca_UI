import { useState } from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';

export function useCreateData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createData = async (recurso) => {
        setIsLoading(true);
        setError(null);
        try {
            // Agregamos await para esperar correctamente la respuesta del servidor
            const response = await api.post('/recursos/crear/', recurso);
            
            if (response.status !== 201) {
                throw new Error('Error al crear el recurso');
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
                title: "Recurso creado correctamente",
            });
            
            return response.data;
        } catch (err) {
            // Manejo específico de errores del backend
            let errorMessage = 'Error al crear el recurso';
            
            if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err.response?.data?.errors) {
                // Para casos de múltiples errores
                const errors = err.response.data.errors.map(error => error.error).join(', ');
                errorMessage = errors;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
            
            // Mostrar toast de error
            const ErrorToast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            
            ErrorToast.fire({
                icon: "error",
                title: errorMessage,
            });
            
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Función adicional para crear múltiples recursos si es necesario
    const createMultipleRecursos = async (recursosArray) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post('/recursos/crear/', recursosArray);
            
            if (response.status !== 201) {
                throw new Error('Error al crear los recursos');
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
                title: `${response.data.created_resources?.length || recursosArray.length} recursos creados correctamente`,
            });
            
            return response.data;
        } catch (err) {
            let errorMessage = 'Error al crear los recursos';
            
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors.map(error => error.error).join(', ');
                errorMessage = errors;
            } else if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
            
            const ErrorToast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            
            ErrorToast.fire({
                icon: "error",
                title: errorMessage,
            });
            
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { createData, createMultipleRecursos, isLoading, error };
}

export default useCreateData;