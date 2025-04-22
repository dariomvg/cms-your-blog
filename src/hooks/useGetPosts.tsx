"use client";
import { useEffect, useState } from "react";
import { get_posts } from "@/services/get_posts";
import { Post, UseGetPosts } from "@/types/types";
import { get_post } from "@/services/get_post";
import { obj_post } from "@/utils/post";
import { useAuth } from "@/context/ContextAuth";

export const useGetPosts = (
  allPosts: string | null,
  idPost: number | null
): UseGetPosts => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>(obj_post);
  const { user } = useAuth();

  useEffect(() => {
    if (allPosts !== null) {
      const getPosts = async () => {
        if (!user.user_id) return;
        const results = await get_posts(user.user_id);
        if (results !== null) {
          setPosts(results);
        }
      };
      getPosts();
    }
  }, [allPosts, posts]);

  useEffect(() => {
    if (idPost !== null) {
      const getPost = async () => {
        const result = await get_post(idPost);
        if (result !== null) {
          setPost(result[0]);
        }
      };
      getPost();
    }
  }, [idPost]);

  return { posts, post };
};
