import { remark } from "remark";
import { visit } from "unist-util-visit";

export const getHeadings = async (content: string) => {
  const headings: { id: string; text: string; level: number }[] = [];

  const pipeline = remark().use(() => (tree) => {
    const text = node.children
      .filter((child: any) => child.type === "text")
      .map((child: any) => child.value)
      .join(" ");
  });

  await pipeline.process(content);
  return headings;
};
