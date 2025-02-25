"use client";
import { convertArabicToLatin } from "@/lib/latinToArabic";
import {
  // useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import SharebleComponent from "../SharebleComponent";
import { Bookmark } from "lucide-react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

type CustomData = {
  title: string;
  description: string;
};

export const Timeline = ({
  data,
  customData,
}: {
  data: TimelineEntry[];
  customData: CustomData;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20">
        <h2 className="text-6xl text-center font-extrabold mb-4 text-black dark:text-white max-sm:text-4xl">
          {customData.title}
        </h2>
        <p className="text-neutral-700 text-center font-semibold text-lg dark:text-neutral-300">
          {customData.description}
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <SharebleComponent key={index} id={convertArabicToLatin(item.title)}>
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full max-sm:-ml-7">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center max-sm:-ml-7">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-extrabold text-neutral-500 dark:text-neutral-500 rounded-full p-2 mt-2 pr-3 border border-zinc-900 shadow-sm shadow-neutral-800">
                {item.title}
              </h3>
            </div>

            <div className="flex flex-row gap-4 relative pl-20 pr-4 max-sm:pl-7 pt-1 md:pl-4 w-full">
              <Bookmark className="text-white" />
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>

              <div>{item.content}</div>
            </div>
          </SharebleComponent>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] max-sm:-ml-7"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
