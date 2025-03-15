import { Mark, mergeAttributes } from "@tiptap/core";

export const CustomHeading = Mark.create({
  name: "customHeading",

  addAttributes() {
    return {
      level: {
        default: 1,
        parseHTML: (element) => Number(element.getAttribute("data-level")) || 1,
        renderHTML: (attributes) => ({
          "data-level": attributes.level,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-level]" }];
  },

  renderHTML({ mark, HTMLAttributes }) {
    const level = mark.attrs.level || 1;
    return [
      "span",
      mergeAttributes(HTMLAttributes, { 
        style: `font-size: ${24 - level * 2}px; font-weight: bold;`,
        "data-level": level
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleCustomHeading:
        (level: number) =>
        ({ chain }) => {
          return chain().toggleMark("customHeading", { level }).run();
        },
    };
  },

  content: "inline*", // Cho phép Mark bọc nội dung bên trong
});
