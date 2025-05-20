import "@/styles/section-ai.css";

export const SectionAI = ({
  show,
  showChatAi,
}: {
  show: boolean;
  showChatAi: () => void;
}) => {
  return (
    <section className={`section-ai ${show ? "show" : ""}`}>
      <button onClick={showChatAi} className="btn-close-chat">Cerrar chat</button>
      <div className="container-controls-chat">
        <input
          type="text"
          id=""
          name=""
          placeholder="Recomendaciones de títulos, subtítulos, descripciones..."
          className="input-chat"
        />
        <button className="btn-send-chat">Enviar</button>
      </div>
      <div className="container-chat"></div>
    </section>
  );
};
