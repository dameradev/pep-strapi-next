import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    content: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="rich-text container mx-auto  py-6  ">
      <Markdown children={data.content} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
