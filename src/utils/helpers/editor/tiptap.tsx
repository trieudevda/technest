"use client"; // Nếu dùng App Router trong Next.js 13+

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Iframe from "./add-iframe";
import Video from "./add-video";
import { ArrowDropDownOutlined, FormatAlignCenterOutlined, FormatAlignLeftOutlined, FormatAlignRightOutlined, FormatBoldOutlined, FormatItalicOutlined, FormatListBulletedOutlined, FormatListNumberedOutlined, FormatQuote, FormatUnderlinedOutlined, ImageOutlined, SmartDisplayOutlined, SubscriptionsOutlined } from "@mui/icons-material";
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import { CustomHeading } from "./add-heading";

export default function Editor({ setvalueEditorTip }: { setvalueEditorTip: (value: string) => void }) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElText, setAnchorElText] = React.useState<null | HTMLElement>(null);
  const [selected, setSelected] = React.useState("Paragraph");
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleClickMenuText = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElText(event.currentTarget);
  };
  const handleCloseMenuText = () => {
    setAnchorElText(null);
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomHeading,
      Image,
      Iframe,
      Video,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Nhập nội dung..." }),
      Link.configure({ openOnClick: true }),
      Underline
    ],
    immediatelyRender: false,
    content: " ",
  });
  const addVideo = () => {
    const url = prompt("Nhập URL video (MP4/WebM/Ogg):");
    if (!url) return;

    editor?.chain().focus().setVideo({ src: url }).run();
  };
  const addYoutubeIframe = () => {
    const iframeCode = prompt("Nhập mã nhúng (iframe) của YouTube:");
    if (!iframeCode) return;
    if (iframeCode.includes("youtube.com/watch") || iframeCode.includes("youtu.be") || !iframeCode.includes("https://www.youtube")) {
      alert("Vui lòng nhập MÃ NHÚNG (iframe), không phải link YouTube!");
      return;
    }
    editor?.chain().focus().setIframe({ src: iframeCode }).run();
  };
  const AddImage = () => {
    const url = prompt("Nhập URL hình ảnh:");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
    handleCloseMenu();
  };
  const setBlockedText = (type: "paragraph" | "heading", level?: number) => {
    if (!editor) return;

    const { state } = editor;
    const { from, to } = state.selection;

    editor.chain().focus().deleteRange({ from, to }).run();

    if (type === "paragraph") {
      editor.commands.insertContentAt(from, `<p>${state.doc.textBetween(from, to, "\n")}</p>`);
      setSelected(type);
      handleCloseMenuText();
    } else if (type === "heading" && level) {
      editor.commands.insertContentAt(from, `<h${level}>${state.doc.textBetween(from, to, "\n")}</h${level}>`);
      setSelected('h' + level);
      handleCloseMenuText();
    }
  };
  const getCurrentBlockType = () => {
    if (!editor) return "Paragraph";

    const { $from } = editor.state.selection;
    const node = $from.node(); // Lấy node tại vị trí con trỏ

    if (node.type.name === "heading") {
      return `H${node.attrs.level}`;
    }

    return "Paragraph";
  };
  if (isMounted == false) { return <p>Đang tải trình soạn thảo...</p>; }
  return (
    <div className="all-tiptap">
      <div className="btn-event flex space-x-2 border rounded-t-lg bg-color6 p-1">
        <Tooltip title="Định dạng Heading">
          <Button variant="outlined" onClick={handleClickMenuText} endIcon={<ArrowDropDownOutlined />}>
            {selected}
          </Button>
        </Tooltip>
        <Menu anchorEl={anchorElText} open={Boolean(anchorElText)} onClose={() => setAnchorElText(null)}>
          <MenuItem key={"paragraph"} onClick={() => setBlockedText("paragraph")}>
            Paragraph
          </MenuItem>
          {[1, 2, 3, 4, 5, 6].map((level) => (
            // <MenuItem key={level} onClick={() => editor?.chain().focus().toggleCustomHeading(level).run()}>
            <MenuItem key={level} onClick={() => setBlockedText("heading", level)}>
              H{level}
            </MenuItem>
          ))}
        </Menu>
        <Tooltip title="In đậm">
          <button onClick={() => editor?.chain().focus().toggleBold().run()} className="p-1">
            <FormatBoldOutlined />
          </button>
        </Tooltip>
        <Tooltip title="In nghiêng">
          <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="p-1">
            <FormatItalicOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Gạch chân">
          <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className="p-1">
            <FormatUnderlinedOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Căn lề trái">
          <button onClick={() => editor?.chain().focus().setTextAlign("left").run()} className="p-1">
            <FormatAlignLeftOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Căn giữa">
          <button onClick={() => editor?.chain().focus().setTextAlign("center").run()} className="p-1">
            <FormatAlignCenterOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Căn lề phải">
          <button onClick={() => editor?.chain().focus().setTextAlign("right").run()} className="p-1">
            <FormatAlignRightOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Thêm ảnh" className="p-1">
          <button onClick={handleOpenMenu}>
            <ImageOutlined />
          </button>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={AddImage}>Thêm ảnh từ URL</MenuItem>
        </Menu>
        <Tooltip title="Thêm danh sách chấm" className="p-1">
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            color={editor?.isActive("bulletList") ? "primary" : "default"}
            className="p-1"
          >
            <FormatListBulletedOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Thêm danh sách số">
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            color={editor?.isActive("orderedList") ? "primary" : "default"}
          >
            <FormatListNumberedOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Thêm video mp4">
          <button onClick={addVideo} className="p-1">
            <SmartDisplayOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Thêm iframe youtube">
          <button onClick={addYoutubeIframe} className="p-1">
            <SubscriptionsOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Xóa">
          <button
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            className="p-1"
          >
            <FormatQuote />
          </button>
        </Tooltip>
      </div>
      <div className="editor-container">
        <EditorContent name="editor-data" editor={editor} className="editor-textarea flex"
          onClick={() => {
            setSelected(getCurrentBlockType());
            setvalueEditorTip(editor?.getHTML() ?? "");
            console.log(editor?.getHTML());
          }
          } />
      </div>
    </div>
  );
}