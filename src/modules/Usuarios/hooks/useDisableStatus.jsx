import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../../services/api';

export const useDisableStatus = (setUsuarios) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const toggleStatus = async (id, currentStatus) => {
        setIsUpdating(true);
        setUpdateError(null);
        try {
            // SweetAlert para confirmar la acción
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "¡El registro cambiará su estado!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e2ff02",
                
                cancelButtonColor: "#1e2f3c",
                confirmButtonText: "Sí, cambiar estado",
                cancelButtonText: "Cancelar",
                customClass: {
                    confirmButton: 'custom-confirm-button' // Clase personalizada para el botón
                }
            });

            if (result.isConfirmed) {
                // Llamada al API para cambiar el estado
                const response = await api.patch(`usuarios/${id}/estado/`); 
                const newStatus = response.data.data.is_active;

                // Actualizar el estado local con la nueva data
                setUsuarios((prev) =>
                    prev.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                is_active: newStatus,
                                estadoVisual: {
                                    text: newStatus ? "Activo" : "Inactivo",
                                    style: newStatus ? "estado-label activo" : "estado-label inactivo",
                                },
                            }
                            : item
                    )
                );

                // SweetAlert de éxito
                Swal.fire({
                    icon: "success",
                    title: "Estado actualizado",
                    text: `El estado se ha cambiado a ${newStatus ? "Activo" : "Inactivo"}.`,
                    timer: 3000,
                    showConfirmButton: false,
                    toast: true,
                    position: "top-right",
                });
            }
        } catch (err) {
            setUpdateError(err.message || 'Error al actualizar el estado');

            // SweetAlert de error
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `No se pudo actualizar el estado: ${err.message}`,
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: "top-right",
            });

            throw err;
        } finally {
            setIsUpdating(false);
        }
        // try {
        //     const response = await api.patch(`usuarios/${id}/estado/`); // Endpoint para cambiar estado
        //     return response.data.data.is_active; // Devuelve el nuevo estado desde la respuesta
        // } catch (err) {
        //     setUpdateError(err.message || 'Error al actualizar el estado');
        //     throw err; // Lanza el error para manejarlo en el componente
        // } finally {
        //     setIsUpdating(false);
        // }
    };

    return { toggleStatus, isUpdating, updateError };
};
