import React from 'react';
// Librerías de terceros
import { TableContainer, TablePagination, TableSortLabel, Paper } from '@mui/material';

export default function TablaDinamica({ 
    columnas, 
    datos, 
    totalCount, 
    rowsPerPage, 
    page, 
    handleSearchChange, 
    valueToOrderBy,
    handleChangePage,
    handleChangeRowsPerPage,
    createSortHandler, 
    orderDirection, 
    handleDetails, 
    handleEdit, 
    handleToggleStatus, 
    handleDelete, 
    customStyles = {}
}) {

    // Verifica si la columna 'Acciones' existe en las columnas
    const columnasConAcciones = columnas(handleDetails, handleEdit, handleToggleStatus, handleDelete);

    // Estilo personalizado para la columna 'Acciones'
    const customActionsStyle = {
        textAlign: 'center',
        ...customStyles?.acciones // Si ya hay un estilo personalizado, lo mantendrá
    };

    return (
        <div style={customStyles.container}>
            <TableContainer 
                component={Paper} 
                className='shadow-none' 
                style={customStyles.tableContainer}
            >
                <table 
                    className='w-full tabla-principal shadow-none' 
                    style={customStyles.table}
                >
                    <thead 
                        className='text-sm bg-neutral-100 text-neutral-500' 
                        style={customStyles.thead}
                    >
                        <tr className='text-neutral-500'>
                            {columnasConAcciones.map((columna, index) => (
                                <th 
                                    className={`p-3 ${index === columnasConAcciones.length - 1 ? 'th-style' : ''}`}
                                    key={columna.accessor} 
                                    style={customStyles.th}
                                >
                                    <TableSortLabel
                                        active={valueToOrderBy === columna.accessor}
                                        direction={valueToOrderBy === columna.accessor ? orderDirection : 'asc'}
                                        onClick={() => createSortHandler(columna.accessor)}
                                    >
                                        {columna.header}
                                    </TableSortLabel>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody 
                        className='text-sm text-center' 
                        style={customStyles.tbody}
                    >
                        {datos.map((fila, index) => (
                            <tr 
                                className='text-neutral-700 border-b-2 border-gray-200' 
                                key={index} 
                                style={customStyles.tr}
                            >
                                {columnasConAcciones.map((columna) => (
                                    <td 
                                        className='p-4 ' 
                                        key={columna.accessor} 
                                        style={columna.header === 'Acciones' ? customActionsStyle : customStyles.td}
                                    >
                                        {columna.Cell ? columna.Cell({ row: fila }) : fila[columna.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => handleChangePage(newPage)}
                onRowsPerPageChange={(e) => handleChangeRowsPerPage(parseInt(e.target.value, 10))}
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                }
                style={customStyles.pagination} 
            />
            <br />
        </div>
    );
};
