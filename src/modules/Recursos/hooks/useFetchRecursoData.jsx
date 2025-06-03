// useFetchRecursoData.js
import { useState, useEffect } from 'react';
import api from '../../../services/api';

const useFetchRecursoData = (id) => {
    const [recurso, setRecurso] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecurso = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(`recursos/${id}`);
              
                setRecurso(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecurso();
    }, [id]);

    return { recurso, setRecurso, isLoading, error };
};

export default useFetchRecursoData;
