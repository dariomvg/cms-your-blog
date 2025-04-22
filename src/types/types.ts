import { ColorOptions } from "@tiptap/extension-color";
import { LinkOptions } from "@tiptap/extension-link";
import { StarterKitOptions } from "@tiptap/starter-kit";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {Extension, Node, Mark} from "@tiptap/react"

export interface Post {
  id: number | null;
  user_id: string;
  created_at: string | null;
  title: string;
  description: string;
  keyboards: string;
  content: string;
  is_public: boolean | null;
}

export interface ContextPostsProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  submitPost: () => void;
  removePost: (id: number) => void;
  editPost: (newPost: Post) => void;
  setHtml: Dispatch<SetStateAction<string>>;
  post: Post;
  html: string
  cancelForm: () => void; 
  message: string; 
  changeIsPublic: (e: ChangeEvent<HTMLInputElement>) => void;
  isPublic: boolean;
}

export interface UseEditorConfig {
  extensions: (Extension<ColorOptions, any> | Extension<StarterKitOptions, any> | Mark<LinkOptions, any> | Node)[];
  addImage: () => void; 
  addLink: () => void; 
  converterToMarkdown: (codeHtml: string) => void;
}

export interface UseGetPosts {
  posts: Post[],
  post: Post
}

export interface User {
  user_id: string | null,
  email: string,
  picture: string,
  name: string
}

export interface UseAuth {
  user: User;
  login: () => void;
  logout: () => void;
}


