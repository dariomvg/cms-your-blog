"use client";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { EditorProvider } from "@tiptap/react";
import { usePosts } from "@/context/contextPosts";
import { useRouter } from "next/navigation";
import { NavEditor } from "@/components/NavEditor";
import "@/styles/editor.css";
import { useState } from "react";
import { SectionAI } from "@/components/SectionAI";

export default function Home() {
  const [show, setShow] = useState<boolean>(false);
  const { extensions } = useEditorConfig();
  const {
    submitPost,
    handleChange,
    changeIsPublic,
    post,
    html,
    setHtml,
    cancelForm,
    message,
    isPublic,
  } = usePosts();
  const router = useRouter();

  const handleSubmit = () => {
    submitPost();
    router.push("/dashboard");
  };

  const handleCancel = () => {
    cancelForm();
    router.push("/dashboard");
  };
  const showChatAi = () => {
    setShow(!show);
  };
  return (
    <main className="main-editor">
      <section className="section-metadates">
        <h1 className="title-form">Metadatos para el artículo</h1>
        <div className="container-input-metadates">
          <label htmlFor="title" className="label-metadates">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={post.title}
            onChange={handleChange}
            className="input-metadates"
            placeholder="Cómo mejorar el rendimiento en React..."
          />
        </div>
        <div className="container-input-metadates">
          <label htmlFor="description" className="label-metadates">
            Descripción
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="input-metadates"
            required
            value={post.description}
            onChange={handleChange}
            placeholder="En este artículo te explico 5 técnicas para optimizar aplicaciones React"
          />
        </div>
        <div className="container-input-metadates">
          <label htmlFor="keyboards" className="label-metadates">
            Claves(separadas por comas)
          </label>
          <input
            type="text"
            id="keyboards"
            name="keyboards"
            required
            value={post.keyboards}
            onChange={handleChange}
            className="input-metadates"
            placeholder="React, rendimiento, optimización, JavaScript"
          />
        </div>

        <div className="container-input-metadates check">
          <label htmlFor="is_public" className="label-metadates">
            {post.is_public !== null ? (
              <div className="check-label">
                <p>Actualmente {post.is_public ? "público" : "privado"}</p>
                <p>Cambiar a {isPublic ? "privado" : "público"}</p>
              </div>
            ) : (
              <p>Artículo {isPublic ? "público" : "privado"}</p>
            )}
          </label>
          <input
            type="checkbox"
            name="is_public"
            id="is_public"
            checked={isPublic}
            required
            onChange={changeIsPublic}
            title="Selecciona para privarlo"
          />
        </div>
      </section>
      <section className="section-editor">
        <EditorProvider
          slotBefore={<NavEditor />}
          extensions={extensions}
          content={html}
          onUpdate={({ editor }) => setHtml(editor.getHTML())}
        />
        <SectionAI show={show} showChatAi={showChatAi} />
        {/* <button className="toggle-chat-ai" onClick={showChatAi}>
          Pedir una recomendación con inteligencia artifical
        </button> */}
        <div className="container-buttons-form">
          <button className="button-form" onClick={handleSubmit}>
            {post.id ? "Actualizar" : "Agregar"}
          </button>

          <button className="button-form delete-form" onClick={handleCancel}>
            Cancelar
          </button>
          {message && <p className="message">{message}</p>}
        </div>
      </section>
    </main>
  );
}
