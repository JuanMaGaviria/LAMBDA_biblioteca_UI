import { useState, useEffect } from 'react';

const useFetchData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data...");  // Para depurar
                const response = await fetch('/estructura.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log("Data fetched:", jsonData);  // Ver los datos que se reciben
                setData(jsonData);  // Actualiza el estado con los datos
            } catch (error) {
                console.error("Error fetching data:", error);  // Para depurar errores
                setError(error);
            } finally {
                setLoading(false);  // Asegúrate de que siempre se desactive el estado de carga
            }
        };

        fetchData();
    }, []);  // Dependencia vacía para que se ejecute solo una vez

    return { data, loading, error };
};

export default useFetchData;