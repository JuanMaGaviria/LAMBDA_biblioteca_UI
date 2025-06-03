// TextBlock.jsx
import { useRef, useEffect } from 'react';

export default function BloqueTexto({ block, update }) {
  const ref = useRef(null);

  // sincroniza cuando venga contenido externo
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (block.content || '')) {
      ref.current.innerHTML = block.content || '';
    }
  }, [block.content]);

  return (
    <div
      ref={ref}
      className="caja-texto min-h-24 outline-none"
      contentEditable
      placeholder="Escribe algo…"
      suppressContentEditableWarning
      onBlur={(e) => update(block.id, e.currentTarget.innerHTML)}
    />
  );
}
