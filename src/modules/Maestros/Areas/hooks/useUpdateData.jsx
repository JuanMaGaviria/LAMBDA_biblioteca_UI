import { useState } from 'react';
import api from '../../../../services/api';
import Swal from 'sweetalert2';
export const useUpdateData = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const updateData = async (id, data) => {
        setIsUpdating(true);
        setUpdateError(null);
        try {
            await api.put(`areas/editar/${id}/`, data);
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
        } catch (err) {
            setUpdateError(err.message || 'Error al actualizar el registro');
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateData, isUpdating, updateError };
};
