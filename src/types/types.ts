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
  updated: string | null;
}

export interface UsePostsProps {
  submitPost: () => void;
  html: string;
  changeEditor: (editor: any) => void; 
  post: Post;
  isPublic: boolean; 
  changeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  changeIsPublic: (e: ChangeEvent<HTMLInputElement>) => void; 
  setHtml: Dispatch<SetStateAction<string>>
}

export interface UseEditorConfig {
  extensions: (Extension<ColorOptions, any> | Extension<StarterKitOptions, any> | Mark<LinkOptions, any> | Node)[];
  addImage: () => void; 
  addLink: () => void; 
  converterToMarkdown: (codeHtml: string) => void;
}

export interface UseGetPosts {
  posts: Post[]
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


