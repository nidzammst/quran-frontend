// components/swipe-navigator.tsx
"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { useSingleSuratStore } from "@/lib/stores/store";

interface SwipeNavigatorProps {
  children: React.ReactNode;
  routes: string[];
  threshold?: number;
}

export function SwipeNavigator({
  children,
  routes,
  threshold = 50,
}: SwipeNavigatorProps) {
  const { horizontalSwipe, setHorizontalSwipe } = useSingleSuratStore();

  const router = useRouter();
  const pathname = usePathname();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  console.log();

  const currentIndex = routes.indexOf(pathname.split("/")[3]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);

    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe && currentIndex < routes.length - 1) {
      if (horizontalSwipe) {
        router.push(routes[currentIndex + 1]);

        toast("Horizontal Swipe", {
          description: "Surat berganti saat menggeser secara Horizontal",
          action: {
            label: "Nonaktifkan",
            onClick: () => setHorizontalSwipe(),
          },
          duration: 1500,
        });
      } else {
        toast("Surat tidak berganti saat menggeser secara Horizontal", {
          description: "Surat tidak berganti saat menggeser secara Horizontal",
          action: {
            label: "Aktifkan",
            onClick: () => setHorizontalSwipe(),
          },
          duration: 1500,
        });
      }
    }

    if (isRightSwipe && currentIndex > 0) {
      if (horizontalSwipe) {
        router.push(routes[currentIndex - 1]);

        toast("Horizontal Swipe", {
          description: "Surat berganti saat menggeser secara Horizontal",
          action: {
            label: "Nonaktifkan",
            onClick: () => setHorizontalSwipe(),
          },
          duration: 1500,
        });
      } else {
        toast("Horizontal Swipe", {
          description: "Surat tidak berganti saat menggeser secara Horizontal",
          action: {
            label: "Aktifkan",
            onClick: () => setHorizontalSwipe(),
          },
          duration: 1500,
        });
      }
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div
      className="h-screen w-screen"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="h-full w-full transition-transform duration-300">
        {children}
      </div>
    </div>
  );
}
