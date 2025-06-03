import React from 'react';
import '../../utils/tabs.css'

export default function Tabs({ activeTab, onTabChange, blockTypeCounts = {} }) {
    
    // Función para manejar cambios de tab
    const handleTabChange = (tabName) => {
        onTabChange(tabName);
    };

    return (
        <div className="tabs-container mt-4 border-b border-gray-200">
            <div className="flex flex-row flex-wrap w-auto">
                <button
                    className={`tab-item flex items-center py-2 px-4 font-medium text-sm ${activeTab === 'todos' ? 'active' : ''}`}
                    onClick={() => handleTabChange('todos')}
                >
                    Todos
                    {blockTypeCounts.todos !== undefined && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {blockTypeCounts.todos}
                        </span>
                    )}
                </button>

                <button
                    className={`tab-item flex items-center py-2 px-4 font-medium text-sm ${activeTab === 'textos' ? 'active' : ''}`}
                    onClick={() => handleTabChange('textos')}
                >
                    <svg className="tab-icon mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 4h7l5 5v11H6V4zm2 4h5v2H8V8zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />
                    </svg>
                    Textos
                    {blockTypeCounts.textos !== undefined && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {blockTypeCounts.textos}
                        </span>
                    )}
                </button>

                <button
                    className={`tab-item flex items-center py-2 px-4 font-medium text-sm ${activeTab === 'imagenes' ? 'active' : ''}`}
                    onClick={() => handleTabChange('imagenes')}
                >
                    <svg className="tab-icon mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5zm11 10l-3-3l-4 5h10l-3-2zm-9-1a2 2 0 1 0 0-4a2 2 0 0 0 0 4z" />
                    </svg>
                    Imágenes
                    {blockTypeCounts.imagenes !== undefined && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {blockTypeCounts.imagenes}
                        </span>
                    )}
                </button>

                <button
                    className={`tab-item flex items-center py-2 px-4 font-medium text-sm ${activeTab === 'videos' ? 'active' : ''}`}
                    onClick={() => handleTabChange('videos')}
                >
                    <svg className="tab-icon mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4zm6 3l5 3l-5 3V9z" />
                    </svg>
                    Videos
                    {blockTypeCounts.videos !== undefined && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {blockTypeCounts.videos}
                        </span>
                    )}
                </button>

                <button
                    className={`tab-item flex items-center py-2 px-4 font-medium text-sm ${activeTab === 'codigo' ? 'active' : ''}`}
                    onClick={() => handleTabChange('codigo')}
                >
                    <svg className="tab-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m17.09 7.974l.23.23c1.789 1.79 2.684 2.684 2.684 3.796s-.895 2.007-2.684 3.796l-.23.23M13.876 5l-3.751 14M6.91 7.974l-.23.23C4.892 9.994 3.997 10.888 3.997 12s.895 2.007 2.685 3.796l.23.23"/></svg>
                    Código
                    {blockTypeCounts.codigo !== undefined && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {blockTypeCounts.codigo}
                        </span>
                    )}
                </button>

                <button
                    className={`tab-item flex items-center py-2 px-4 font-medium text-sm ${activeTab === 'enlaces' ? 'active' : ''}`}
                    onClick={() => handleTabChange('enlaces')}
                >
                    <svg className="tab-icon mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                    </svg>
                    Enlaces
                    {blockTypeCounts.enlaces !== undefined && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {blockTypeCounts.enlaces}
                        </span>
                    )}
                </button>
            </div>
        </div>
    )
}