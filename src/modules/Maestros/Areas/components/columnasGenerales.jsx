import ActionButton from "../../../Core/ActionButton/components/ActionButton";

export const columnasGenerales = (handleDetails, handleEdit, handleToggleStatus, handleDelete) => [
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Descripción', accessor: 'descripcion' },
    { header: 'Última Fecha de Actualización', accessor: 'updated_at' },
    {
        header: 'Estado',
        accessor: 'estadoVisual',
        Cell: ({ row }) => (
            <span className={row.estadoVisual.style}>
                <svg className='indicador' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709" />
                </svg>
                {row.estadoVisual.text}
            </span>
        )
    },
    {
        header: 'Acciones',
        accessor: 'acciones',
        Cell: ({ row }) => (
            <div className="flex justify-center">
                <ActionButton
                    text=""
                    color="#2d68ac0"
                    textColor="#2d68ac"
                    size="small_icon"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" /></g></svg>}
                    onClick={() => handleEdit(row)}
                    customStyles={{ fontWeight: '400', marginRight: '10px' }}
                />
                <ActionButton
                    text=""
                    onClick={() => handleToggleStatus(row.id, row.is_active)}
                    color="#2dac860"
                    textColor="#2dac86"
                    size="small_icon"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-.425 0-.712-.288T11 11V3q0-.425.288-.712T12 2t.713.288T13 3v8q0 .425-.288.713T12 12m0 9q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 12q0-1.525.5-2.963T4.95 6.4q.275-.35.7-.337t.75.337q.275.275.25.675t-.275.75Q5.7 8.725 5.35 9.8T5 12q0 2.925 2.038 4.963T12 19t4.963-2.037T19 12q0-1.15-.337-2.238T17.6 7.775q-.25-.325-.275-.712t.25-.663q.3-.3.725-.312t.7.312q.975 1.2 1.488 2.625T21 12q0 1.875-.712 3.513t-1.925 2.85t-2.85 1.925T12 21" /></svg>}
                    customStyles={{ fontWeight: '400', marginRight: '10px' }}
                />
                <ActionButton
                    text=""
                    onClick={() => handleDelete(row.id)}
                    color="#ac2d2d0"
                    textColor="#ac2d2d"
                    size="small_icon"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1" /></svg>}
                    customStyles={{ fontWeight: '400' }}
                />
            </div>
        )
    },
];