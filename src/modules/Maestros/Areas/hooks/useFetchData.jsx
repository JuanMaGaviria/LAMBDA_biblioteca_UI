import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import api from '../../../../services/api';

const useFetchData = () => {
    const [areas, setAreas] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estados para paginación, búsqueda y ordenamiento
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderDirection, setOrderDirection] = useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState('nombre');

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get('areas/');
          
            // Accede correctamente a los usuarios en la propiedad "results"
            const data = response.data.map((item) => ({
                ...item,
                created_at: format(new Date(item.created_at || new Date()), "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: es }),
                updated_at: format(new Date(item.updated_at || new Date()), "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: es }),
                estadoVisual: getVisualEstado(item.is_active),
            }));
            setAreas(data);
            
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message || 'Error al obtener los datos');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para transformar el estado en un estilo visual
    const getVisualEstado = (estado) => ({
        text: estado ? "Activo" : "Inactivo",
        style: estado ? "estado-label activo" : "estado-label inactivo",
    });

    useEffect(() => {
        setAreas((prevData) =>
            [...prevData].sort((a, b) => {
                if (a[valueToOrderBy] < b[valueToOrderBy]) {
                    return orderDirection === 'asc' ? -1 : 1;
                }
                if (a[valueToOrderBy] > b[valueToOrderBy]) {
                    return orderDirection === 'asc' ? 1 : -1;
                }
                return 0;
            })
        );
        fetchData()
    }, [valueToOrderBy, orderDirection]);

    // Función de búsqueda
    const handleSearchChange = (query) => {
        setSearchQuery(query.toLowerCase());
        setPage(0); // Reinicia la paginación al buscar
    };

    // Función de cambio de página
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    // Función de cambio de filas por página
    const handleChangeRowsPerPage = (rows) => {
        setRowsPerPage(rows);
        setPage(0); // Reinicia a la primera página
    };

    // Función de ordenamiento
    const createSortHandler = (property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setOrderDirection(isAscending ? 'desc' : 'asc');
        setValueToOrderBy(property);
    
        // Actualiza los datos ordenados inmediatamente
        setAreas((prevData) =>
            [...prevData].sort((a, b) => {
                if (a[property] < b[property]) {
                    return isAscending ? 1 : -1;
                }
                if (a[property] > b[property]) {
                    return isAscending ? -1 : 1;
                }
                return 0;
            })
        );
    };

    // Filtrar, ordenar y paginar los datos
    const filteredData = areas.filter((empresa) => 
        empresa.nombre.toLowerCase().includes(searchQuery) ||
        empresa.nit.toLowerCase().includes(searchQuery)
    );

    const sortedData = filteredData.sort((a, b) => {
        if (a[valueToOrderBy] < b[valueToOrderBy]) {
            return orderDirection === 'asc' ? -1 : 1;
        }
        if (a[valueToOrderBy] > b[valueToOrderBy]) {
            return orderDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return {
        areas: paginatedData,
        setAreas,
        isLoading,
        error,
        totalCount: sortedData.length,
        page,
        rowsPerPage,
        orderDirection,
        valueToOrderBy,
        handleSearchChange,
        handleChangePage,
        handleChangeRowsPerPage,
        createSortHandler,
        refetch: fetchData,
    };
};

export default useFetchData;
