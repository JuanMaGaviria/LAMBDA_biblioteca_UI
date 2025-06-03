import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../../services/api';

export const useUpdateData = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const updateData = async (id, data, callback) => {
        setIsUpdating(true);
        setUpdateError(null);
        console.log('Data to update:', data); // Verifica los datos que se van a enviar
        try {
            await api.patch(`usuarios/actualizar/${id}/`, data);

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
                title: "Datos actualizados correctamente",
            });
            if (callback) callback();
        } catch (err) {
            setUpdateError(err.message || 'Error al actualizar el registro');
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateData, isUpdating, updateError };
};
