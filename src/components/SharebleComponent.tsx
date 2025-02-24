"use client";

import { useEffect } from "react";

interface ScrollComponentProps {
  id: string;
  children?: React.ReactNode;
}

const SharebleComponent = ({ id, children }: ScrollComponentProps) => {
  useEffect(() => {
    const scrollToHash = () => {
      const { hash } = window.location;
      if (hash === `#${id}`) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Update URL tanpa trigger reload
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    };

    // Scroll awal saat komponen dimount
    scrollToHash();

    // Handle perubahan hash saat navigasi dalam halaman
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [id]);

  return (
    <div
      id={id}
      className="flex justify-start max-sm:justify-end pt-10 md:pt-40 md:gap-10 max-md:mb-8 font-arabic"
    >
      {children}
    </div>
  );
};

export default SharebleComponent;
