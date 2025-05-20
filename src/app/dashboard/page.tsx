"use client";
import "@/styles/dashboard.css";
import Link from "next/link";
import { useAuth } from "@/context/ContextAuth";
import { useGetPosts } from "@/hooks/useGetPosts";
import { usePosts } from "@/context/contextPosts";
import { useRouter } from "next/navigation";
import { Post } from "@/types/types";
import { useState } from "react";

export default function DashboardConfig() {
  const router = useRouter();
  const { user } = useAuth();
  const { posts } = useGetPosts("posts", null);
  const { editPost, removePost } = usePosts();
  const [search, setSearch] = useState<string>("");
  const handleEditPost = (post: Post) => {
    editPost(post);
    router.push("/editor/post");
  };

  const handleDeletePost = (id: number | null) => {
    if (id === null) return;
    removePost(id);
  };

  const filteredPosts = posts.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-config">
      {user.user_id ? (
        <>
          <aside className="aside-user">
            <div className="container-aside">
              <img
                src={user.picture}
                alt={`picture ${user.name}`}
                className="image-aside-user"
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
          <section className="section-dashboard">
            <section className="section-details-dashboard">
              <div className="container-detail-dashboard">
                <h4 className="title-detail">Total artículos</h4>
                <p className="number-detail">{posts.length}</p>
              </div>
            </section>
         
            <section className="container-seccion-dashboard">
              <h3 className="title-section-dashboard">Tus artículos</h3>
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Busca por el título..."
                className="input-search"
              />
              <ul className="list-posts">
                {filteredPosts.length > 0 &&
                  filteredPosts.map((post) => (
                    <li className="post" key={post.id}>
                      <div className="container-post">
                        <h4>{post.title}</h4>
                        <p>{post.created_at}</p>
                        <Link
                          href={`preview/post/${post.id}`}
                          className="link-post">
                          Ver artículo
                        </Link>
                      </div>
                      <div className="container-links-posts">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="button-post update">
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="button-post delete">
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
            <hr />
            <section className="container-seccion-dashboard">
              <h3 className="title-section-dashboard">Historial</h3>
              <ul className="list-history">
                {posts.length > 0 &&
                  posts.map(({ id, created_at, title, updated }) => (
                    <li className="history" key={id}>
                      <h4>{title}</h4>
                      <div className="container-history">
                        <p>Creado: {created_at}</p>
                        {updated && <p>Editado: {updated}</p>}
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
          </section>
        </>
      ) : (
        <h1 className="title-not-user">No has iniciado sesión</h1>
      )}
    </main>
  );
}
