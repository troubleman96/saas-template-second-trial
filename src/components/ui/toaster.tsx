"use client";

import dynamic from "next/dynamic";

const Sonner = dynamic(() => import("sonner").then((mod) => mod.Toaster), {
  ssr: false,
});

export function Toaster() {
  return <Sonner theme="system" richColors closeButton position="top-right" />;
}
