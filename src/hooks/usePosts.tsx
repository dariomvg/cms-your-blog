"use client";
import { Post, UsePostsProps } from "@/types/types";
import { obj_post } from "@/utils/post";
import { getSecondDate } from "format-all-dates";
import { ChangeEvent, useEffect, useState } from "react";
import { useEditorConfig } from "./useEditorConfig";
import { useAuth } from "@/context/ContextAuth";
import { marked } from "marked";
import { get_post } from "@/services/get_post";
import { update_post } from "@/services/update_post";
import { upload_post } from "@/services/upload_post";

export const usePosts = (idPost?: number): UsePostsProps => {
  const [post, setPost] = useState<Post>(obj_post);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<string | null>(null);
  const { converterToMarkdown } = useEditorConfig();
  const { user } = useAuth();

  useEffect(() => {
    const getPostToUpdate = async () => {
      try {
        if (idPost) {
          setLoading(true);
          const editPost = await get_post(idPost);
          if (editPost) {
            const data = await marked.parse(editPost.content);
            setPost(editPost);
            setHtml(data);
          }
        }
      } catch (error) {
        console.error("Error al cargar el post:", error);
      } finally {
        setLoading(false);
      }
    };

    getPostToUpdate();
  }, [idPost]);

  const submitPost = async () => {
    try {
      if (!user.user_id) return;
      if (!html) return;
      const content = converterToMarkdown(html);
      if (post.id && content !== undefined) {
        const results = await update_post({
          ...post,
          is_public: isPublic,
          updated: getSecondDate(),
          content,
        });
        console.log(results);
      }

      if (!post.id && content !== undefined) {
        const results = await upload_post({
          title: post.title,
          user_id: user.user_id,
          description: post.description,
          keyboards: post.keyboards,
          is_public: isPublic,
          created_at: getSecondDate(),
          content,
        });
        console.log(results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPost(obj_post);
      setHtml(null);
    }
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const changeIsPublic = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
  };

  const changeEditor = (editor: any) => {
    setHtml(editor.getHTML());
  };

  return {
    submitPost,
    post,
    isPublic,
    changeInput,
    changeIsPublic,
    html,
    changeEditor,
    loading,
  };
};
