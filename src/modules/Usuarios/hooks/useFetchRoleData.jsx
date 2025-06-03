import { useState, useEffect } from 'react';
import api from '../../../services/api';

const useFetchRoleData = () => {
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await api.get('/roles/'); // Asegúrate de que el endpoint sea el correcto
                console.log(response.data)
                setRoles(response.data); // Asumiendo que la respuesta tiene la estructura [{ id, name }]
            } catch (err) {
                console.error('Error al cargar los roles:', err);
                setError('Error al cargar los roles');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoles();
    }, []);

    return { roles, isLoading, error };
};

export default useFetchRoleData;
