import { useState, useEffect } from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';

// Hook personalizado para manejar la votación de recursos
export const useResourceVoting = (recursos, setRecursos) => {
    const [userVotes, setUserVotes] = useState({}); // { recursoId: 'like' | 'dislike' | 'mejora' }
    const [loadingVotes, setLoadingVotes] = useState({});
    const [error, setError] = useState(null);

    // Cargar votos del usuario al inicializar
    useEffect(() => {
        if (recursos.length > 0) {
            fetchUserVotes();
        }
    }, [recursos.length]);

    // Función para obtener los votos actuales del usuario
    const fetchUserVotes = async () => {
        try {
            setError(null);
            const response = await api.get('/recursos/mis-votos/');
            
            if (response.status === 200) {
                // Convertir array a objeto para fácil acceso
                const votesMap = {};
                response.data.votos.forEach(vote => {
                    votesMap[vote.recurso] = vote.tipo_voto;
                });
                setUserVotes(votesMap);
            }
        } catch (err) {
            let errorMessage = 'Error al cargar votos del usuario';
            
            if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
            console.error('Error al cargar votos del usuario:', err);
        }
    };

    // Función para votar
    const handleVote = async (recursoId, tipoVoto) => {
        const currentVote = userVotes[recursoId];
        
        // Si ya votó lo mismo, remover el voto
        if (currentVote === tipoVoto) {
            await removeVote(recursoId);
            return;
        }

        setLoadingVotes(prev => ({ ...prev, [recursoId]: true }));
        setError(null);

        try {
            const response = await api.post('/recursos/votar/', {
                recurso_id: recursoId,
                tipo_voto: tipoVoto
            });

            if (response.status === 200) {
                // Actualizar el estado local de votos
                setUserVotes(prev => ({
                    ...prev,
                    [recursoId]: tipoVoto
                }));

                // Actualizar los contadores en el estado de recursos
                setRecursos(prev => prev.map(recurso => {
                    if (recurso.id === recursoId) {
                        return {
                            ...recurso,
                            numero_likes: response.data.numero_likes,
                            numero_dislikes: response.data.numero_dislikes,
                            numero_mejora: response.data.numero_mejora
                        };
                    }
                    return recurso;
                }));

                // Toast de éxito
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                
                Toast.fire({
                    icon: "success",
                    title: "Voto registrado correctamente",
                });

            } else {
                throw new Error('Error al procesar el voto');
            }
        } catch (err) {
            let errorMessage = 'Error al procesar el voto';
            
            if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err.response?.data?.errors) {
                const errors = err.response.data.errors.map(error => error.error).join(', ');
                errorMessage = errors;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
            
            // Toast de error
            const ErrorToast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            
            ErrorToast.fire({
                icon: "error",
                title: errorMessage,
            });
            
            console.error('Error al votar:', err);
        } finally {
            setLoadingVotes(prev => ({ ...prev, [recursoId]: false }));
        }
    };

    // Función para remover un voto
    const removeVote = async (recursoId) => {
        setLoadingVotes(prev => ({ ...prev, [recursoId]: true }));
        setError(null);

        try {
            const response = await api.post('/recursos/remover-voto/', {
                recurso_id: recursoId
            });

            if (response.status === 200) {
                // Remover del estado local de votos
                setUserVotes(prev => {
                    const newVotes = { ...prev };
                    delete newVotes[recursoId];
                    return newVotes;
                });

                // Actualizar los contadores en el estado de recursos
                setRecursos(prev => prev.map(recurso => {
                    if (recurso.id === recursoId) {
                        return {
                            ...recurso,
                            numero_likes: response.data.numero_likes,
                            numero_dislikes: response.data.numero_dislikes,
                            numero_mejora: response.data.numero_mejora
                        };
                    }
                    return recurso;
                }));

                // Toast de éxito
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                
                Toast.fire({
                    icon: "info",
                    title: "Voto removido",
                });

            } else {
                throw new Error('Error al remover el voto');
            }
        } catch (err) {
            let errorMessage = 'Error al remover el voto';
            
            if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err.response?.data?.errors) {
                const errors = err.response.data.errors.map(error => error.error).join(', ');
                errorMessage = errors;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
            
            // Toast de error
            const ErrorToast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            
            ErrorToast.fire({
                icon: "error",
                title: errorMessage,
            });
            
            console.error('Error al remover voto:', err);
        } finally {
            setLoadingVotes(prev => ({ ...prev, [recursoId]: false }));
        }
    };

    return {
        userVotes,
        loadingVotes,
        error,
        handleVote,
        fetchUserVotes
    };
};