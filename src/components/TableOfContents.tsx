"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const TableOfContents = ({
  headings,
}: {
  headings: { id: string; text: string; level: number }[];
}) => {
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings, pathname]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-20 max-h-[calc(100vh-160px)] overflow-y-auto">
      <h2 className="mb-4 text-lg font-semibold">Daftar Isi</h2>
      <ul className="space-y-2 border-l-2 border-gray-200 pl-4 text-sm">
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            className={`hover:border-l-2 hover:border-primary hover:pl-3 hover:text-primary
              ${
                activeId === id
                  ? "border-l-2 border-primary pl-3 text-primary"
                  : ""
              }
              ${level === 3 ? "pl-4" : level > 3 ? "pl-8" : ""}`}
          >
            <button
              onClick={() => scrollToHeading(id)}
              className="text-left hover:underline"
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
