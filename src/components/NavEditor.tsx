"use client"
import { useCurrentEditor } from "@tiptap/react";
import { useEditorConfig } from "../hooks/useEditorConfig";
import iconBack from "../assets/icons-buttons/icon-back.svg";
import iconDelete from "../assets/icons-buttons/icon-delete.svg";
import iconImage from "../assets/icons-buttons/icon-image.svg";
import iconLink from "../assets/icons-buttons/icon-link.svg";
import iconListOrder from "../assets/icons-buttons/icon-list-order.svg";
import iconList from "../assets/icons-buttons/icon-list.svg";
import iconNext from "../assets/icons-buttons/icon-next.svg";
import iconNotes from "../assets/icons-buttons/icon-notes.svg";
import iconTable from "../assets/icons-buttons/icon-table.svg";
import iconCode from "../assets/icons-buttons/icon-code.svg";
import "@/styles/nav-editor.css";

export const NavEditor = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;
  const { addImage, addLink } = useEditorConfig();

  return (
    <div className="control-group">
      <section className="section-elements space">
        <div className="container-elements">
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}>
            Párrafo
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }>
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }>
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }>
            H3
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }>
            H4
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }>
            H5
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              editor.isActive("heading", { level: 6 }) ? "is-active" : ""
            }>
            H6
          </button>
        </div>
        <div className="container-elements">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}>
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}>
            Cursiva
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}>
            Strike
          </button>
        </div>
        <div className="container-elements">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}>
            Lista
            <img src={iconList.src} alt="link" width={22} height={22} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}>
            Lista ordenada
            <img src={iconListOrder.src} alt="link" width={22} height={22} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}>
            Notas
            <img src={iconNotes.src} alt="link" width={22} height={22} />
          </button>
        </div>
      </section>
      <section className="section-elements">
        <div className="container-elements">
        <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            Código
            <img src={iconCode.src} alt="link" width={22} height={22} />
          </button>
          <button onClick={addImage}>
            Imagen
            <img src={iconImage.src} alt="link" width={22} height={22} />
          </button>
          <button
            onClick={addLink}
            className={editor.isActive("link") ? "is-active" : ""}>
            Enlace
            <img src={iconLink.src} alt="link" width={22} height={22} />
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}>
            Remover enlace
            <img src={iconDelete.src} alt="link" width={22} height={22} />
          </button>
        </div>
      </section>

      <section className="section-elements space">
        <div className="container-elements">
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
                .run()
            }>
            Insert table
            <img src={iconTable.src} alt="link" width={22} height={22} />
          </button>
          <button
            onClick={() => editor.chain().focus().addColumnBefore().run()}>
            1 columna antes
          </button>
          <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
            1 columna despues
          </button>

          <button onClick={() => editor.chain().focus().addRowBefore().run()}>
            1 fila antes
          </button>
          <button onClick={() => editor.chain().focus().addRowAfter().run()}>
            1 fila despues
          </button>
          <button onClick={() => editor.chain().focus().mergeCells().run()}>
            Unir celdas
          </button>
          <button onClick={() => editor.chain().focus().splitCell().run()}>
            Separar celdas
          </button>
        </div>
        <div className="container-elements">
          <button onClick={() => editor.chain().focus().deleteColumn().run()}>
            Eliminar columna
            <img src={iconDelete.src} alt="link" width={22} height={22} />
          </button>
          <button onClick={() => editor.chain().focus().deleteRow().run()}>
            Eliminar fila
            <img src={iconDelete.src} alt="link" width={22} height={22} />
          </button>
          <button onClick={() => editor.chain().focus().deleteTable().run()}>
            Eliminar tabla
            <img src={iconDelete.src} alt="link" width={22} height={22} />
          </button>
        </div>
      </section>

      <section className="section-elements space">
        <div className="container-elements">
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            Línea horizontal
          </button>
          <button onClick={() => editor.chain().focus().setHardBreak().run()}>
            Espacio
          </button>
          <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            Remover estilos
            <img src={iconDelete.src} alt="link" width={22} height={22} />
          </button>
        </div>
        <div className="container-elements">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}>
            <img src={iconBack.src} alt="link" width={22} height={22} />
            Volver
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}>
            Siguiente
            <img src={iconNext.src} alt="link" width={22} height={22} />
          </button>
        </div>
      </section>
    </div>
  );
};
