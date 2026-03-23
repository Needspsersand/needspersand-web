"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** 메인 페이지 로드 시 URL 해시(#about 등)에 해당하는 섹션으로 스크롤 */
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash?.slice(1);
    if (!hash) return;

    const scroll = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    requestAnimationFrame(() => requestAnimationFrame(scroll));
  }, [pathname]);

  return null;
}
