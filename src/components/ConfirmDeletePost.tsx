import "@/styles/confirm-delete-post.css";

export const ConfirmDeletePost = ({
  confirmDelete,
  openModal,
}: {
  confirmDelete: (confirm: boolean) => void;
  openModal: boolean;
}) => {
  return (
    <section className={`section-confirm ${openModal ? "show-modal" : ""}`}>
      <div className="container-confirm">
        <h2 className="title-confirm">
          ¿Estás seguro de eliminar este artículo?
        </h2>
        <div className="container-buttons-confirm">
          <button
            className="button-confirm yes"
            onClick={() => confirmDelete(true)}>
            Sí, eliminar
          </button>
          <button
            className="button-confirm no"
            onClick={() => confirmDelete(false)}>
            No, cancelar
          </button>
        </div>
      </div>
    </section>
  );
};
