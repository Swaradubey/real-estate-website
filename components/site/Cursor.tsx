"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      dot.style.left  = e.clientX + "px";
      dot.style.top   = e.clientY + "px";
      ring.style.left = e.clientX + "px";
      ring.style.top  = e.clientY + "px";
    };

    const over  = () => document.body.classList.add("cursor-hover");
    const out   = () => document.body.classList.remove("cursor-hover");

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  );
}
