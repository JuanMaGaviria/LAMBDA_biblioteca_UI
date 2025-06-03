import { useState } from 'react';
import api from '../../../../services/api';

export const useDownloadExcel = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState(null);

    const downloadData = async (estadoSeleccionado) => {
        setIsDownloading(true);
        setDownloadError(null);

        try {
            // Si el usuario selecciona "Todo", enviamos "todos" como parámetro
            const estadoParam = estadoSeleccionado === "Todo" ? "todos" : estadoSeleccionado;

            // Petición GET a la API de descarga
            const response = await api.get(`procesos-embarque/descargar-excel/?estado=${estadoParam}`, {
                responseType: 'blob', // Para manejar archivos binarios
            });
            console.log(response)

            // Crear un objeto URL para el archivo descargado
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `procesos_embarque_${estadoParam}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            setDownloadError(err.response?.data?.error || 'Error al descargar los datos');
        } finally {
            setIsDownloading(false);
        }
    };

    return { downloadData, isDownloading, downloadError };
};
