// BloqueCodigo.jsx
import { useRef, useEffect } from 'react';
import hljs from 'highlight.js/lib/core';

// Importa los lenguajes que necesites
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import css from 'highlight.js/lib/languages/css';
import php from 'highlight.js/lib/languages/php';
import java from 'highlight.js/lib/languages/java';

// Registra todos los lenguajes
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('css', css);
hljs.registerLanguage('php', php);
hljs.registerLanguage('java', java);

export default function BloqueCodigo({ block, update, setLanguage }) {
  const codeRef = useRef(null);
  const textareaRef = useRef(null);

  /** Función para aplicar el resaltado */
  const applyHighlight = () => {
    if (codeRef.current && block.content) {
      // Limpia el contenido anterior
      codeRef.current.innerHTML = '';
      codeRef.current.textContent = block.content;
      
      // Aplica el resaltado
      try {
        hljs.highlightElement(codeRef.current);
      } catch (error) {
        console.warn('Error highlighting code:', error);
        // Si falla el resaltado, al menos muestra el código sin formato
        codeRef.current.textContent = block.content;
      }
    }
  };

  /** Resalta cada vez que cambia el código o el lenguaje */
  useEffect(() => {
    applyHighlight();
  }, [block.content, block.language]);

  /** Maneja los cambios en el textarea */
  const handleChange = (e) => {
    const value = e.target.value;
    update(block.id, value);
  };

  /** Sincroniza el scroll entre textarea y código */
  const handleScroll = (e) => {
    if (codeRef.current && codeRef.current.parentElement) {
      codeRef.current.parentElement.scrollTop = e.target.scrollTop;
      codeRef.current.parentElement.scrollLeft = e.target.scrollLeft;
    }
  };

  /** Maneja el Tab para insertar espacios */
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = 
        block.content.substring(0, start) + 
        '  ' + // 2 espacios
        block.content.substring(end);
      
      update(block.id, newValue);
      
      // Restaura la posición del cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="p-4">
      {/* ───── Barra superior ───── */}
      <div className="flex items-center bg-[#252526] border border-b-0 border-[#1e1e1e] rounded-t-md">
        <select
          className="m-2 bg-[#1e1e1e] text-white border border-[#3e3e3e] rounded text-sm focus:outline-none"
          value={block.language || 'javascript'}
          onChange={(e) => setLanguage(block.id, e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="css">CSS</option>
          <option value="php">PHP</option>
          <option value="java">Java</option>
        </select>
        <div className="flex-1" />
        {block.content && (
          <button
            className="mr-2 px-2 py-1 text-xs text-white bg-[#3e3e3e] rounded hover:bg-[#4e4e4e] transition-colors"
            onClick={() => navigator.clipboard.writeText(block.content)}
          >
            Copiar
          </button>
        )}
      </div>

      {/* ───── Código + capa editable ───── */}
      <div className="relative bg-[#1e1e1e] rounded-b-md">
        {/* Código resaltado (fondo) */}
        <pre className="p-4 text-sm overflow-hidden min-h-32 whitespace-pre-wrap break-words" style={{padding: '16px'}}>
          <code
            ref={codeRef}
            className={`language-${block.language || 'javascript'}`}
          >
            {block.content || '// Escribe tu código aquí...'}
          </code>
        </pre>

        {/* Textarea editable (primer plano transparente) */}
        <textarea
          ref={textareaRef}
          value={block.content || ''}
          onChange={handleChange}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder="// Escribe tu código aquí..."
          className="absolute inset-0 w-full h-full font-mono text-sm leading-relaxed
                     bg-transparent text-transparent caret-white resize-none outline-none
                     whitespace-pre-wrap break-words overflow-auto"
          style={{
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            lineHeight: '1.5',
            tabSize: 2,
            padding: '16px'
          }}
        />
      </div>

      {/* Agrega los estilos CSS para highlight.js */}
      <style jsx>{`
        /* Tema oscuro personalizado para highlight.js */
        .hljs {
          background: #1e1e1e !important;
          color: #d4d4d4;
        }
        .hljs-keyword { color: #569cd6; }
        .hljs-string { color: #ce9178; }
        .hljs-number { color: #b5cea8; }
        .hljs-comment { color: #6a9955; font-style: italic; }
        .hljs-function { color: #dcdcaa; }
        .hljs-variable { color: #9cdcfe; }
        .hljs-title { color: #dcdcaa; }
        .hljs-params { color: #d4d4d4; }
        .hljs-built_in { color: #4ec9b0; }
        .hljs-literal { color: #569cd6; }
        .hljs-attr { color: #92c5f8; }
        .hljs-tag { color: #569cd6; }
        .hljs-name { color: #4fc1ff; }
      `}</style>
    </div>
  );
}