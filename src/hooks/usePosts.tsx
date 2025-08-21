"use client";
import { update_post } from "@/services/update_post";
import { upload_post } from "@/services/upload_post";
import { Post, UsePostsProps } from "@/types/types";
import { obj_post } from "@/utils/post";
import { getSecondDate } from "format-all-dates";
import { marked } from "marked";
import { ChangeEvent, useEffect, useState } from "react";
import { useEditorConfig } from "./useEditorConfig";
import { useAuth } from "@/context/ContextAuth";
import { get_post } from "@/services/get_post";

export const usePosts = (idPost?: number): UsePostsProps => {
  const [post, setPost] = useState<Post>(obj_post);
  const [html, setHtml] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const { user } = useAuth();
  const { converterToMarkdown } = useEditorConfig();

  useEffect(() => {
    const getPostToUpdate = async () => {
      if (idPost) {
        try {
          const editPost = await get_post(idPost);
          const codeHtml = await marked(editPost[0].content);
          if (editPost[0]) {
            setHtml(codeHtml);
            setPost(editPost[0]);
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      }
    };
    getPostToUpdate();
  }, [idPost]);

  const submitPost = async () => {
    try {
      if (!user.user_id) return;
      const content = converterToMarkdown(html);
      if (post.id && content !== undefined) {
        const result = await update_post({
          ...post,
          is_public: isPublic,
          updated: getSecondDate(),
          content,
        });
        console.log("actualizado: ",result);
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
        console.log("Creado: ",result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setHtml("");
      setPost(obj_post);
    }
  };

  const changeEditor = (editor: any) => {
    setHtml(editor.getHTML());
  };

    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const changeIsPublic = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
  };

  return {
    submitPost,
    html,
    changeEditor,
    post,
    isPublic,
    changeInput,
    changeIsPublic,
    setHtml

  };
};
