"use client";
import { createContext, ReactNode, useContext } from "react";
import { ChangeEvent, useState } from "react";
import { update_post } from "../services/update_post";
import { ContextPostsProps, Post } from "../types/types";
import { obj_post } from "../utils/post";
import { delete_post } from "../services/delete_post";
import { upload_post } from "../services/upload_post";
import { useEditorConfig } from "../hooks/useEditorConfig";
import { marked } from "marked";
import { useAuth } from "./ContextAuth";
import { getSecondDate } from "format-all-dates";

const ContextPosts = createContext<ContextPostsProps | null>(null);

export const usePosts = (): ContextPostsProps => {
  const context = useContext(ContextPosts);
  if (!context) throw new Error("context problem");
  return context;
};

export default function ProviderPosts({ children }: { children: ReactNode }) {
  const [post, setPost] = useState<Post>(obj_post);
  const [html, setHtml] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();
  const { converterToMarkdown } = useEditorConfig();

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const cancelForm = () => {
    setPost(obj_post);
    setHtml("");
  };

  const removePost = async (id: number) => {
    const result = await delete_post(id);
    console.log(result);
  };

  const editPost = async (post: Post) => {
    const codeHtml = await marked(post.content);
    if (codeHtml) {
      setHtml(codeHtml);
      setPost(post);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const changeIsPublic = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
  };

  const submitPost = async () => {
    try {
      if (!post) return;
      if (!user.user_id) {
        showMessage("Inicia sesión para empezar a crear");
        return;
      }

      const content = converterToMarkdown(html);
      if (post.id && content !== undefined) {
        const result = await update_post({
          ...post,
          is_public: isPublic,
          updated: getSecondDate(),
          content,
        });
        console.log(result);
      }

      if (!post.id && content !== undefined) {
        const result = await upload_post({
          title: post.title,
          user_id: user.user_id,
          description: post.description,
          keyboards: post.keyboards,
          is_public: isPublic,
          created_at: getSecondDate(),
          content,
        });
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setHtml("");
      setPost(obj_post);
    }
  };

  return (
    <ContextPosts.Provider
      value={{
        handleChange,
        submitPost,
        removePost,
        editPost,
        setHtml,
        post,
        html,
        cancelForm,
        message,
        changeIsPublic,
        isPublic,
      }}>
      {children}
    </ContextPosts.Provider>
  );
}
