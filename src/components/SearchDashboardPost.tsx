"use client";
import { delete_post } from "@/services/delete_post";
import "@/styles/search-dashboard-post.css";
import { Post } from "@/types/types";
import Link from "next/link";
import { useState } from "react";

export const SearchDashboardPost = ({ posts }: { posts: Post[] }) => {
  const [search, setSearch] = useState<string>("");

  const removePost = async (id: number | null) => {
    if (id) await delete_post(id);
  };

  const filteredPosts = posts.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container-section-dashboard">
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
                <Link href={`preview/post/${post.id}`} className="link-post">
                  Ver artículo
                </Link>
              </div>
              <div className="container-links-posts">
                <Link
                  href={`/editor/post/${post.id}`}
                  className="link-post-update">
                  Editar
                </Link>
                <button
                  onClick={() => removePost(post.id)}
                  className="button-post delete">
                  Eliminar
                </button>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};
