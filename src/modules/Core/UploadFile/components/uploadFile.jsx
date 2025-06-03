import React, { useState } from 'react';
import '../utils/uploadFile.css'

export default function UploadFile({ onFileUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
        } else {
            alert('Por favor selecciona un archivo primero.');
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        document.getElementById("file-upload").value = null;
    };

    return (
        <div className="flex flex-col items-center">
            {!selectedFile && (
                <label
                    htmlFor="file-upload"
                    className="archi"
                >
                    <div className="flex icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512"><path d="M398.1 233.2c0-1.2.2-2.4.2-3.6 0-65-51.8-117.6-115.7-117.6-46.1 0-85.7 27.4-104.3 67-8.1-4.1-17.2-6.5-26.8-6.5-29.5 0-54.1 21.9-58.8 50.5C57.3 235.2 32 269.1 32 309c0 50.2 40.1 91 89.5 91H224v-80h-48.2l80.2-83.7 80.2 83.6H288v80h110.3c45.2 0 81.7-37.5 81.7-83.4 0-45.9-36.7-83.2-81.9-83.3z" fill="currentColor" /></svg>
                    </div>
                    <span className='text-neutral-500 text-sm font-light'>Seleccionar archivo</span>
                </label>
            )}
            <input
                id="file-upload"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="hidden"
            />
            {selectedFile && (
                <div className="w-full h-10 mt-3 flex flex-row items-center p-2 justify-between filer">
                    <div className="flex">
                        <svg className='text-gray-500' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="4"><path stroke-linejoin="round" d="M8 15V6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-9" /><path d="M31 15h3m-6 8h6m-6 8h6" /><path stroke-linejoin="round" d="M4 15h18v18H4zm6 6l6 6m0-6l-6 6" /></g></svg>
                        <p className="ml-2 text-sm text-gray-500">{selectedFile.name}</p>
                    </div>
                    <div className="flex">
                        <span className='text-red-700 cursor-pointer' onClick={handleRemoveFile}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12" /></svg>
                        </span>
                    </div>
                </div>
            )}
            <button
                onClick={handleUploadClick}
                className="w-full mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
            >
                Subir archivo
            </button>
        </div>
    );
}
