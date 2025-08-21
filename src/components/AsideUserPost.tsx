import "@/styles/aside-user-post.css";

export const AsideUserPost = ({
  user,
}: {
  user: { name: string; picture: string; email: string };
}) => {
  return (
    <aside className="aside-user">
      <div className="container-aside">
        <img
          src={user.picture}
          alt={`picture ${user.name}`}
          className="image-aside-user"
          loading="lazy"
          width={100}
          height={100}
        />
      </div>
      <div className="container-aside">
        <h4>Nombre de usuario</h4>
        <p className="title-container-aside">{user.name}</p>
      </div>
      <div className="container-aside">
        <h4>Email</h4>
        <p className="title-container-aside">{user.email}</p>
      </div>
    </aside>
  );
};
