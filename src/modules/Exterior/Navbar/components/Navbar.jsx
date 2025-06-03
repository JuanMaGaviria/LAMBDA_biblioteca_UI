import React from 'react';
import logo from '../../../../assets/logo.png'; // Asegúrate de que la ruta sea correcta
import '../utils/Navbar.css';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-9 flex justify-between items-center navbar">
      <div className="flex space-x-4">
        <img src={logo} className="w-36 h-auto object-contain" alt="" />

        <div className="flex space-x-4 ml-2 items-center men">
          <a href="/" className="hover:text-yellow-300">Inicio</a>
          <div className="relative group inline-block">
            <a href="#" className="hover:text-yellow-300">Categorías</a>
            <div className="absolute hidden group-hover:block bg-gray-700 p-2 rounded shadow-lg z-10 menu">
              <a href="#" className="block hover:bg-gray-600 p-4">Historia</a>
              <a href="#" className="block hover:bg-gray-600 p-1">Ciencia</a>
              <a href="#" className="block hover:bg-gray-600 p-1">Tecnología</a>
              <a href="#" className="block hover:bg-gray-600 p-1">Arte</a>
            </div>
          </div>
          <a href="/articles" className="hover:text-yellow-300">Artículos</a>
          <a href="/guides" className="hover:text-yellow-300">Guías / Tutoriales</a>
          <a href="/contribute" className="hover:text-yellow-300">Contribuir</a>
        </div>
      </div>
      <div className="flex space-x-4 items-center">
        <div className="relative mr-10">
          <input
            type="text"
            placeholder="Buscar..."
            className="rounded bg-gray-700 text-white focus:outline-none input_busqueda"
          />
          <span className="absolute left-3 mr-6 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"/></svg>
          </span>
        </div>
        {/* <a href="/about" className="hover:text-yellow-300">Acerca de</a>
        <a href="/faq" className="hover:text-yellow-300">FAQ</a>
        <a href="/contact" className="hover:text-yellow-300">Contactar</a>
        <a href="/privacy" className="hover:text-yellow-300">Política de Privacidad</a> */}
        <div className="group relative inline-block">
          <button className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-300">
            Iniciar Sesión
          </button>
          <div className="absolute hidden group-hover:block bg-gray-700 p-2 rounded shadow-lg z-10 right-0">
            <a href="/login" className="block hover:bg-gray-600 p-1">Iniciar Sesión</a>
          </div>
        </div>
      </div>
    </nav>
  );
}