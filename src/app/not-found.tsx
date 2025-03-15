// app/not-found.tsx
import { redirect } from "next/navigation";

export default function NotFoundPage() {
  redirect("/admin/dashboard"); // Chuyển hướng về trang chủ hoặc trang mong muốn
  return null; // Tránh hiển thị UI không cần thiết
}
