import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../../services/api';

export const useDeleteData = (setUsuarios) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const deleteData = async (id) => {
        setIsDeleting(true);
        setDeleteError(null);
        try {
            // SweetAlert para confirmar la acción
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará el registro permanentemente.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });
            if (result.isConfirmed) {
                try {
                    const response = await api.delete(`usuarios/eliminar/${id}/`);  // Endpoint para eliminar tipo de lista
                    setUsuarios((prev) => prev.filter((item) => item.id !== id));
                    Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
                    return response.data; // Devuelve la respuesta en caso de éxito
                } catch (err) {
                    setDeleteError(err.message || 'Error al eliminar el usuario');
                    throw err; // Lanza el error para manejarlo en el componente
                } finally {
                    setIsDeleting(false);
                }

            };


        } catch (err) {
            setDeleteError(err.message || 'Error al eliminar el registro');

            // SweetAlert de error
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `No se pudo eliminar el registro: ${err.message}`,
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: "top-right",
            });

            throw err;
        } finally {
            setIsDeleting(false);
        };
       
    };

    return { deleteData, isDeleting, deleteError };
};
