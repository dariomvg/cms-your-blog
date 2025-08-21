"use client";
import "@/styles/dashboard.css";
import { RequireAuth } from "@/components/RequireAuth";
import { AsideUserPost } from "@/components/AsideUserPost";
import { SearchDashboardPost } from "@/components/SearchDashboardPost";
import { useAuth } from "@/context/ContextAuth";
import { useEffect, useState } from "react";
import { Post } from "@/types/types";
import { get_posts } from "@/services/get_posts";

export default function DashboardConfig() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const getPosts = async () => {
      if (!user.user_id) return;
      const results = await get_posts(user.user_id);
      if (results && results.length > 0) {
        setPosts(results);
      }
    };
    getPosts();
  }, [posts]);

  return (
    <RequireAuth>
      <main className="dashboard-config">
        <AsideUserPost user={user} />
        <section className="section-dashboard">
          <section className="section-details-dashboard">
            <div className="container-detail-dashboard">
              <h4 className="title-detail">Total artículos</h4>
              <p className="number-detail">{posts.length}</p>
            </div>
          </section>
          <SearchDashboardPost posts={posts} />
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
      </main>
    </RequireAuth>
  );
}
