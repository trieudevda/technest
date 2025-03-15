import { Node } from "@tiptap/core";
// 📌 Tạo Extension hỗ trợ nhúng YouTube/Vimeo bằng iframe
 const Iframe = Node.create({
  name: "iframe",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: "560" },
      height: { default: "315" },
      frameborder: { default: "0" },
      allow: { default: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" },
      allowfullscreen: { default: true },
      referrerpolicy:"strict-origin-when-cross-origin"
    };
  }, 

  parseHTML() {
    return [{ tag: "iframe" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["iframe", { ...HTMLAttributes, style: "pointer-events: auto; display: block; max-width: 100%;" }];
  },

  addCommands() {
    return {
      setIframe:
        (options) =>
        ({ commands }) => {
          const iframeCode = options.src;

          // ❌ Chặn nhập link YouTube trực tiếp
          if (iframeCode.includes("youtube.com/watch") || iframeCode.includes("youtu.be")) {
            alert("Vui lòng nhập MÃ NHÚNG (iframe) chứ không phải link YouTube!");
            return false;
          }

          return commands.insertContent(iframeCode);
        },
    };
  },
});
export default Iframe