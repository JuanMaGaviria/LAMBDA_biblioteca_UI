import { useState, useEffect } from 'react';
import api from '../../../../services/api';
import { toast } from 'react-hot-toast';

const Muro = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [contenido, setContenido] = useState('');

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await api.get('/publicaciones/');
        setPublicaciones(response.data);
      } catch (error) {
        toast.error('Error al cargar publicaciones');
        console.error(error);
      }
    };
    fetchPublicaciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contenido.trim()) {
      toast.error('El contenido no puede estar vacío');
      return;
    }

    try {
      const response = await api.post('/publicaciones/', { contenido });
      setPublicaciones([response.data, ...publicaciones]);
      setContenido('');
      toast.success('Publicación creada exitosamente');
    } catch (error) {
      toast.error('Error al crear publicación');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Muro de Publicaciones</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="¿Qué quieres compartir?"
          className="w-full p-2 border rounded-md"
          rows="4"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Publicar
        </button>
      </form>
      <div>
        {publicaciones.length === 0 ? (
          <p>No hay publicaciones aún.</p>
        ) : (
          publicaciones.map((pub) => (
            <div key={pub.id} className="border p-4 mb-2 rounded-md">
              <p className="font-semibold">{pub.autor_nombre}</p>
              <p>{pub.contenido}</p>
              <p className="text-sm text-gray-500">
                {new Date(pub.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Muro;