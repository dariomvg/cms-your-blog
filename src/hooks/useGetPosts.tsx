"use client";
import { useEffect, useState } from "react";
import { get_posts } from "@/services/get_posts";
import { Post, UseGetPosts } from "@/types/types";
import { get_post } from "@/services/get_post";
import { obj_post } from "@/utils/post";

export const useGetPosts = (
  allPosts: string | null,
  idPost: number | null
): UseGetPosts => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>(obj_post);

  useEffect(() => {
    if (allPosts !== null) {
      const getPosts = async () => {
        const results = await get_posts();
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
