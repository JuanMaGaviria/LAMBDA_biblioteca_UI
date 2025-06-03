import React, { useState, useMemo } from 'react';
import '../utils/downloadPanel.css';
import { useDownloadExcel } from '../hooks/useDownloadExcel';

export default function DownloadPanel({ datos }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const { downloadData, isDownloading, downloadError } = useDownloadExcel();

    const estadosPermitidos = {
        2: { name: "Booking", color: "indicativo-b" },
        3: { name: "Shipping", color: "indicativo-s" }, 
        4: { name: "Nacionalización", color: "indicativo-n" },
    };

    const conteoEstados = useMemo(() => {
        return datos.reduce((acc, item) => {
            acc["Total"] = (acc["Total"] || 0) + 1;

            if (estadosPermitidos[item.estado]) {
                acc[item.estado] = (acc[item.estado] || 0) + 1;
            }
            return acc;
        }, {});
    }, [datos]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectAndDownload = (estadoId) => {
        setSelectedOption(estadoId === "todos" ? "Todo" : `Estado ${estadoId}`);
        setIsOpen(false);
        downloadData(estadoId);
    };

    return (
        <div className="download-panel">
            <div className="dropdown-container">
                <button className="dropdown-btn" onClick={toggleDropdown}>
                    <svg className="icon-arrow-down" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16.004V17a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M12 4.5v11m3.5-3.5L12 15.5L8.5 12" />
                    </svg>
                </button>
                {isOpen && (
                    <ul className="dropdown-list">
                        <li className="dropdown-item" onClick={() => handleSelectAndDownload("todos")}>
                            <div className="flex w-full justify-between items-center">
                                <span className="flex text-sm text-gray-700">
                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16.004V17a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M12 4.5v11m3.5-3.5L12 15.5L8.5 12" />
                                    </svg>
                                    Todo
                                </span>
                                <span className="indicativo-total text-xs">{conteoEstados["Total"] || 0}</span>
                            </div>
                        </li>

                        {Object.entries(estadosPermitidos).map(([estadoId, { name, color }]) => (
                            conteoEstados[estadoId] && (
                                <li key={estadoId} className="dropdown-item" onClick={() => handleSelectAndDownload(Number(estadoId))}>
                                    <div className="flex w-full justify-between items-center">
                                        <span className="flex text-sm text-gray-700">
                                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16.004V17a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M12 4.5v11m3.5-3.5L12 15.5L8.5 12" />
                                            </svg>
                                            {name}
                                        </span>
                                        <span className={`indicativo-b text-xs ${color}`}>{conteoEstados[estadoId]}</span>
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>
                )}
            </div>
            {downloadError && <p className="text-red-500 text-xs mt-2">{downloadError}</p>}
        </div>
    );
}
