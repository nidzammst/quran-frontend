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
            <div className="max-md:hidden sticky flex flex-col top-40 pl-20 pr-4 max-sm:pl-7 pt-1 w-full mr-2 md:w-full max-sm:-ml-7">
              <h3 className="md:block text-3xl md:text-5xl font-extrabold text-neutral-500 dark:text-neutral-500 rounded-full border border-zinc-900 shadow-sm shadow-neutral-800 h-16 w-16 pl-5 pt-3">
                {item.title}
              </h3>

              <span>{item.content}</span>

              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex flex-col items-center justify-center max-sm:-ml-7">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
            </div>

            <div className="md:hidden flex flex-col gap-1 relative pl-20 pr-4 max-sm:pl-7 pt-1 md:pl-4 w-full mr-2">
              <h3 className="block text-2xl mb-4 text-left font-extrabold text-neutral-500 dark:text-neutral-500 rounded-full mt-2 p-3 border border-zinc-900 shadow-sm shadow-neutral-800 h-12 w-12 pl-4">
                {item.title}
              </h3>

              <span>{item.content}</span>
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
