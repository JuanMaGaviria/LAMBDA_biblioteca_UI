// Importaciones de react
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
// Librerias de terceros
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
// Importaciones componentes locales
import TablaDinamica from '../../../Core/Tabla/components/TablaDinamica.jsx';
import { columnasGenerales } from './columnasGenerales.jsx';
import ActionButton from '../../../Core/ActionButton/components/ActionButton.jsx';
import ModalForm from '../../../Core/ModalForm/components/ModalForm.jsx';
import Loader from '../../../Core/Loader/components/Loader.jsx';
// Importacion de hooks
import useFetchData from '../hooks/useFetchData.jsx';
import { useCreateData } from '../hooks/useCreateData.jsx';
import { useValidation } from '../../../Core/Validation/hooks/useValidation.jsx';
import { useActionButton } from '../../../Core/ActionButton/hooks/useActionButton.jsx';
import { useUpdateData } from '../hooks/useUpdateData.jsx';
import { useDisableStatus } from '../hooks/useDisableStatus.jsx';
import { useDeleteData } from '../hooks/useDeleteData.jsx';
import Formulario from './formulario.jsx';  // Importa el nuevo formulario

export default function Areas() {
    const navigate = useNavigate();

    // Validaciones del formulario
    const validations = {
        nombre: (value) => {
            if (!value) return 'El nombre es obligatorio.';
            if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
            return null;
        },
        descripcion: (value) => {
            if (!value) return 'La descripción es obligatorio.';
            if (value.length < 3) return 'La descripción debe tener al menos 3 caracteres.';
            return null;
        }
    };
    // Obtener data
    const {
        areas,
        setAreas,
        isLoading,
        error,
        totalCount,
        page,
        rowsPerPage,
        orderDirection,
        valueToOrderBy,
        handleSearchChange,
        handleChangePage,
        handleChangeRowsPerPage,
        createSortHandler
    } = useFetchData();

    // Funciones de los hooks
    const { createData, isLoading: isCreating, error: createError } = useCreateData();
    const { updateData } = useUpdateData();
    const { toggleStatus, isUpdating } = useDisableStatus(setAreas);
    const { deleteData, isDeleting, deleteError } = useDeleteData(setAreas);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
    const { errors, validate, validateAll, clearError } = useValidation(validations);

    // Manejo de modales
    const handleOpenModal = (data = null) => {
        // Limpiar todos los errores cuando se abre un nuevo modal
        Object.keys(validations).forEach((field) => {
            clearError(field);  // Limpia todos los campos de errores
        });

        setModalData(data);
        setFormData(data ? {
            nombre: data.nombre,
            descripcion: data.descripcion,
        } : {
            nombre: '',
            descripcion: '',
        });

        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalData(null);
        setFormData({
            nombre: '',
            descripcion: ''
        });
        clearError('nombre', 'descripcion');  // Limpia los errores existentes
    };
    // Función de creación
    const handleCreate = async () => {
        // if (!validateAll(formData)) return;
        try {
            const newRecord = await createData(formData);
            // Formatea el registro para que coincida con el formato existente
            const formattedRecord = {
                ...newRecord,
                created_at: format(new Date(), "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: es }),
                updated_at: format(new Date(), "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: es }),
                estadoVisual: { text: 'Activo', style: 'estado-label activo' },
            };
            setAreas((prev) => [...prev, formattedRecord]);
            handleCloseModal();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `No se pudo crear: ${error.message}`,
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: 'top-right',
            });
        }
    };
    // Función de actualización
    const handleSave = async () => {
    
        if (!validateAll(formData)) return; // Si hay errores, no continúa
        try {
            if (modalData && modalData.id) {
                await updateData(modalData.id, formData);
                // Actualiza el registro en el estado local
                setAreas((prev) =>
                    prev.map((item) =>
                        item.id === modalData.id
                            ? { ...item, ...formData }
                            : item
                    )
                );
            } else {
                await handleCreate();
            }
            handleCloseModal();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `No se pudo completar la operación: ${error.message}`,
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: 'top-right',
            });
        }
    };
    // Función para desplegar modal de edición
    const handleEdit = (row) => {
        handleOpenModal(row);
    };
    const handleToggleStatus = (id, currentStatus) => {
        toggleStatus(id, currentStatus);
    };
    const handleDelete = (id) => {
        deleteData(id);
    };
    if (isLoading) return <Loader />;

    return (
        <>
            <br />
            <div>
                <span className='breadcrum'>
                    <svg style={{ cursor: 'pointer' }} onClick={() => navigate('/app/inicio')} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fillOpacity=".25" d="M5 14.059c0-1.01 0-1.514.222-1.945c.221-.43.632-.724 1.453-1.31l4.163-2.974c.56-.4.842-.601 1.162-.601c.32 0 .601.2 1.162.601l4.163 2.973c.821.587 1.232.88 1.453 1.311c.222.43.222.935.222 1.944V19c0 .943 0 1.414-.293 1.707C18.414 21 17.943 21 17 21H7c-.943 0-1.414 0-1.707-.293C5 20.414 5 19.943 5 19z" /><path fill="currentColor" d="M3 12.387c0 .266 0 .4.084.441c.084.041.19-.04.4-.205l7.288-5.668c.59-.459.885-.688 1.228-.688c.343 0 .638.23 1.228.688l7.288 5.668c.21.164.316.246.4.205c.084-.041.084-.175.084-.441v-.409c0-.48 0-.72-.102-.928c-.101-.208-.291-.356-.67-.65l-7-5.445c-.59-.459-.885-.688-1.228-.688c-.343 0-.638.23-1.228.688l-7 5.445c-.379.294-.569.442-.67.65c-.102.208-.102.448-.102.928zM12.5 15h-1a2 2 0 0 0-2 2v3.85c0 .083.067.15.15.15h4.7a.15.15 0 0 0 .15-.15V17a2 2 0 0 0-2-2" /><rect width="2" height="4" x="16" y="5" fill="currentColor" rx=".5" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887z" /></svg>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate('/app/principal')}>Maestros</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887z" /></svg>
                    <span>Áreas</span>
                </span>

                <div className="bg-white cont_principal">
                    <h1 className="ml-1 justify-between items-center font-semibold text-2xl" style={{ color: '#1c1c1c' }}>Gestión de <span style={{ color: '#b4bc00' }}>Áreas</span></h1>
                    <span className='text-sm ml-1 text-gray-600 mt-2'>Sección para gestionar la información de las áreas de la compañía</span>
                    <div className="contenedor-tabla">
                        <div className="flex flex-row justify-between" style={{ marginBottom: '16px' }}>
                            <div className="buscador relative rounded-md">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 pr-2" style={{ marginTop: '-7px', paddingLeft: '8px' }}>
                                    <span className="text-gray-500 sm:text-sm mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M10.77 18.3a7.53 7.53 0 1 1 7.53-7.53a7.53 7.53 0 0 1-7.53 7.53m0-13.55a6 6 0 1 0 6 6a6 6 0 0 0-6-6" /><path fill="currentColor" d="M20 20.75a.74.74 0 0 1-.53-.22l-4.13-4.13a.75.75 0 0 1 1.06-1.06l4.13 4.13a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.22" /></svg>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="busca_campo"
                                    placeholder="Buscar área..."
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                />
                            </div>
                            <div>
                                <ActionButton
                                    text="Nuevo registro"
                                    onClick={() => handleOpenModal()}
                                    color="#e2ff02"
                                    textColor="#1e2f3c"
                                    size="small"
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16" /><path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z" /></g></svg>}
                                    customStyles={{ fontWeight: '400', height: '35px', borderRadius: '7px' }}
                                />
                            </div>
                        </div>
                        <TablaDinamica
                            columnas={columnasGenerales}
                            datos={areas || []}
                            totalCount={totalCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            handleSearchChange={handleSearchChange}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            createSortHandler={createSortHandler}
                            handleEdit={handleEdit}
                            handleToggleStatus={handleToggleStatus}
                            handleDelete={handleDelete}
                            customStyles={{
                                container: {
                                    margin: '0 auto',
                                },
                                table: {
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                },
                                thead: {
                                    backgroundColor: '#f5f5f5',
                                    fontSize: '12px'
                                },
                                th: {
                                    textAlign: 'left',
                                    padding: '10px',
                                },
                                tbody: {
                                    backgroundColor: '#ffffff',
                                },
                                td: {
                                    padding: '10px',
                                    textAlign: 'left',
                                }
                            }}
                        />
                        <ModalForm
                            open={isModalOpen}
                            onClose={handleCloseModal}
                            title={modalData ? 'Editar área' : 'Nueva área'}
                            onSubmit={handleSave}  // Este es el onSubmit que se pasa al ModalForm
                            actionButtonProps={{
                                text: modalData ? 'Actualizar' : 'Guardar',
                                color: '#e2ff02',
                                textColor: '#1e2f3c',
                                size: 'small'
                            }}
                        >
                            <Formulario
                                formData={formData}
                                setFormData={setFormData}
                                modalData={modalData}
                                validate={validate}
                                errors={errors}
                            />
                        </ModalForm>
                    </div>
                </div>

            </div>
        </>
    );
}