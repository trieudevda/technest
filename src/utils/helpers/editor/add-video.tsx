import { Node } from "@tiptap/core";
const Video = Node.create({
  name: "video",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: "640" },
      height: { default: "360" },
      controls: { default: true },
      autoplay: { default: false },
      muted: { default: false },
      playsinline: { default: true },
    };
  },

  parseHTML() {
    return [{ tag: "video" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      {
        ...HTMLAttributes,
        style: "pointer-events: auto; display: block; max-width: 100%;", // Cho phép click vào video
      },
    ];
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
          ({ commands }) => {
            const url = options.src;

            // ❌ Chặn link YouTube
            if (url.includes("youtube.com") || url.includes("youtu.be")) {
              alert("Không thể nhập link YouTube vào đây! Hãy dùng nút Nhúng YouTube.");
              return false;
            }

            // ✅ Chỉ chấp nhận định dạng MP4, WebM, Ogg
            if (!url.endsWith(".mp4") && !url.endsWith(".webm") && !url.endsWith(".ogg")) {
              alert("Chỉ hỗ trợ video định dạng MP4, WebM hoặc Ogg!");
              return false;
            }

            return commands.insertContent(
              `<video src="${url}" width="640" height="360" controls style="pointer-events: auto; display: block; max-width: 100%;"></video>`
            );
          },
    };
  },
});
export default Video