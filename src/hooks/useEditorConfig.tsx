"use client"
import { useCurrentEditor } from "@tiptap/react";
import { useCallback, useMemo } from "react";
import { createLowlight, common } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TurndownService from "turndown";
import "highlight.js/styles/tokyo-night-dark.css";
import { UseEditorConfig } from "@/types/types";

export const useEditorConfig = (): UseEditorConfig => {
  const { editor } = useCurrentEditor();
  const lowlight = createLowlight(common);

  const extensions = useMemo(
    () => [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      StarterKit.configure({
        codeBlock: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Table.configure({
        resizable: true,
        lastColumnResizable: true,
        handleWidth: 100,
        allowTableNodeSelection: true,
        cellMinWidth: 100,
      }),
      TableRow,
      TableHeader,
      TableCell,

    ],
    []
  );

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const getHref = editor?.getAttributes("link").href;
    const url = prompt("URL", getHref);

    if (!url || url === null) return null;

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const converterToMarkdown = (codeHtml: string) => {
    const turndown = new TurndownService();
    const markdown = turndown.turndown(codeHtml);
    if (!markdown) return;
    return markdown;
  };



  return { extensions, addImage, addLink, converterToMarkdown };
};
