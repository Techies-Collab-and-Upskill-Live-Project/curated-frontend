"use client";
import { useToast } from "@/components/Toast";

export default function MyPage() {
  const toast = useToast();

  return (
    <button onClick={() => toast.warning("Hello Next.js!")}>Show Toast</button>
  );
}
