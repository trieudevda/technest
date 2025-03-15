// app/components/NavigationTracker.tsx
"use client"; // Vì usePathname chỉ hoạt động trong Client Component
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "../context/loading-context";

export default function NavigationTracker() {
  const pathname = usePathname();
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(true)
  }, [pathname]);

  return null; // Không cần hiển thị UI
}
