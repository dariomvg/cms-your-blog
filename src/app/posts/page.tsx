"use client"
import { usePosts } from "@/context/contextPosts";
import { useGetPosts } from "@/hooks/useGetPosts";
import "@/styles/posts.css";
import { Post } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Posts() {
  const { posts } = useGetPosts("posts", null);
  const { editPost, removePost } = usePosts();
  const router = useRouter();

  const handleEditPost = (post: Post) => {
    editPost(post);
    router.push("/");
  };

  const handleDeletePost = (id: number | null) => {
    if (id === null) return;
    removePost(id);
  };

  return (
    <main className="page-posts">
 
      {posts.length > 0 ? (
        <>
          <h1 className="title-page-posts">Tus artículos</h1>
          <ul className="list-posts">
            {posts.map((post) => (
              <li key={post.id} className="card-post">
                <div className="container-details">
                  <strong className="date-card">{post.created_at}</strong>
                  <h3 className="title-card">{post.title}</h3>
                  <p className="description-card">{post.description}</p>
                  <div className="container-buttons-card">
                    <button
                      className="btn-card edit"
                      onClick={() => handleEditPost(post)}>
                      Editar
                    </button>
                    <button
                      className="btn-card delete"
                      onClick={() => handleDeletePost(post?.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>

                <Link href={`posts/preview/post/${post.id}`} className="link-card">
                  Vista previa
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <section className="section-without-posts">
          <h3 className="title-without-posts">Sin artículos creados</h3>
          <Link href="/" className="link-without-post">
            Crea uno
          </Link>
        </section>
      )}
    </main>
  );
}
