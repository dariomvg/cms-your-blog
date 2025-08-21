import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/tokyo-night-dark.css";
import "@/styles/post.css";
import { get_post } from "@/services/get_post";

interface PropsParamsPost {
  params: Promise<{id: string}>
}

export default async function Post({params}: PropsParamsPost) {
  const {id} = await params
  const post = await get_post(parseInt(id));

  return (
    <main className="page-post">
      <div className="markdown-dark">
        {post && post[0].content && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}>
            {post[0].content}
          </ReactMarkdown>
        )}
      </div>
    </main>
  );
}
