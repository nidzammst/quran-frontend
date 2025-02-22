"use client";

import { useCallback, useEffect, useState } from "react";
// import { SearchComboBox } from "../SearchComboBox";

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // Scroll ke bawah
        setShowHeader(false);
      } else {
        // Scroll ke atas
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);

      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
  }, [controlHeader]);

  return (
    <header
      className={`z-10 fixed top-0 left-0 w-full bg-black border border-zinc-800 shadow-md transition-transform duration-300 ${
        showHeader ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-xl font-bold">Al-Qur&apos;anul Karim</h1>
      </div>
      {/* <SearchComboBox /> */}
    </header>
  );
};

export default Header;
