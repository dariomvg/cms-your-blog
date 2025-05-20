"use client"
import ReactMarkdown from "react-markdown";
import { useGetPosts } from "@/hooks/useGetPosts";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/tokyo-night-dark.css";
import "@/styles/post.css";
import { useParams } from "next/navigation";

export default function Post() {
  const { id } = useParams<{id: string | undefined}>();
  if (!id) return;
  const { post } = useGetPosts(null, parseInt(id));

  return (
    <main className="page-post">
      <div className="markdown-dark">
        {post.content && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        )}
      </div>
    </main>
  );
}
