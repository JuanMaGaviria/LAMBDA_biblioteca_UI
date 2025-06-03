import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import api from "../../../services/api";

const useFetchRecursosData = () => {
    const [recursos, setRecursos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estados para paginación, búsqueda y ordenamiento
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [cardsPerPage] = useState(9); // Máximo 9 tarjetas por página
    const [orderDirection, setOrderDirection] = useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState('titulo');

    // Nuevo estado para filtrar por tipo de bloque
    const [filterByBlockType, setFilterByBlockType] = useState('todos');

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get('recursos/');
           
            const data = response.data.map((item) => ({
                ...item,
                created_at: format(new Date(item.created_at || new Date()), "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: es }),
                updated_at: format(new Date(item.updated_at || new Date()), "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: es }),
            }));
        
            setRecursos(data);
        }
        catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message || 'Error al obtener los datos');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    // Función de búsqueda
    const handleSearchChange = (query) => {
        setSearchQuery(query.toLowerCase());
        setPage(0); // Reinicia la paginación al buscar
    };

    // Nueva función para manejar el filtro por tipo de bloque
    const handleFilterChange = (filterType) => {
        setFilterByBlockType(filterType);
        setPage(0); // Reinicia la paginación al filtrar
    };

    // Función de cambio de página
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    // Función de ordenamiento
    const createSortHandler = (property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setOrderDirection(isAscending ? 'desc' : 'asc');
        setValueToOrderBy(property);
        setPage(0); // Reinicia a la primera página al ordenar
    };

    // Función helper para verificar si un recurso tiene un tipo de bloque específico
    const hasBlockType = (recurso, blockType) => {
        if (!recurso.contenido || recurso.contenido.length === 0) return false;
        
        return recurso.contenido.some(bloque => {
            switch (blockType) {
                case 'text':
                    return bloque.tipo_contenido === 'text';
                case 'image':
                    return bloque.tipo_contenido === 'image';
                case 'video':
                    return bloque.tipo_contenido === 'video';
                case 'code':
                    return bloque.tipo_contenido === 'code';
                case 'link':
                    return bloque.tipo_contenido === 'link';
                default:
                    return false;
            }
        });
    };

    // Filtrar los datos basado en la búsqueda
    const filteredData = recursos.filter((recurso) => 
        recurso.titulo.toLowerCase().includes(searchQuery)
    );

    // Filtrar por tipo de bloque
    const typeFilteredData = filteredData.filter((recurso) => {
        if (filterByBlockType === 'todos') return true;
        
        // Mapear los nombres de los tabs a los tipos de contenido
        const blockTypeMap = {
            'textos': 'text',
            'imagenes': 'image', 
            'videos': 'video',
            'codigo': 'code',
            'enlaces': 'link'
        };
        
        const blockType = blockTypeMap[filterByBlockType];
        return blockType ? hasBlockType(recurso, blockType) : true;
    });

    // Ordenar los datos filtrados
    const sortedData = [...filteredData].sort((a, b) => {
        if (a[valueToOrderBy] < b[valueToOrderBy]) {
            return orderDirection === 'asc' ? -1 : 1;
        }
        if (a[valueToOrderBy] > b[valueToOrderBy]) {
            return orderDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Paginar los datos (máximo 9 tarjetas por página)
    const paginatedData = sortedData.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);

    // Calcular información de paginación
    const totalCards = sortedData.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const hasNextPage = page < totalPages - 1;
    const hasPreviousPage = page > 0;


    // Función para obtener contadores por tipo de bloque
    const getBlockTypeCounts = () => {
        const counts = {
            todos: recursos.length,
            textos: 0,
            imagenes: 0,
            videos: 0,
            codigo: 0,
            enlaces: 0
        };

        recursos.forEach(recurso => {
            if (hasBlockType(recurso, 'text')) counts.textos++;
            if (hasBlockType(recurso, 'image')) counts.imagenes++;
            if (hasBlockType(recurso, 'video')) counts.videos++;
            if (hasBlockType(recurso, 'code')) counts.codigo++;
            if (hasBlockType(recurso, 'link')) counts.enlaces++;
        });

        return counts;
    };

    return {
        recursos: paginatedData,
        setRecursos,
        isLoading,
        error,
        // Información de paginación
        totalCards,
        totalPages,
        currentPage: page,
        cardsPerPage,
        hasNextPage,
        hasPreviousPage,
        // Funciones de control
        handleSearchChange,
        handleChangePage,
        createSortHandler,
        refetch: fetchData,
        // Estados de ordenamiento y búsqueda
        orderDirection,
        valueToOrderBy,
        searchQuery,
        // Nuevas funciones y estados para filtrado
        filterByBlockType,
        handleFilterChange,
        getBlockTypeCounts,
        // Funciones de navegación
        goToFirstPage: () => setPage(0),
        goToLastPage: () => setPage(totalPages - 1),
        goToNextPage: () => hasNextPage && setPage(page + 1),
        goToPreviousPage: () => hasPreviousPage && setPage(page - 1),
    };
}

export default useFetchRecursosData;