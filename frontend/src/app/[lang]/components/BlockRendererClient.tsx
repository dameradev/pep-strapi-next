"use client";
import Image from "next/image";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({
  content,
}: {
  readonly content: BlocksContent;
}) {
  if (!content) return null;

  // console.log(content, 'content')
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        // heading: ( heading ) => {
        //   console.log(heading, 'heading')
        //   if (heading.level === 1) {
        //     // @ts-ignore
        //     return <h2>{heading?.children?.[0].props.text}</h2>;
        //   } else if (heading.level === 2) {
        //     // @ts-ignore
        //     return <h2>{heading?.children?.[0].props.text}</h2>;
        //   } else if (heading.level === 3) {
        //     // @ts-ignore
        //     return <h3>{heading?.children?.[0].props.text}</h3>;
        //     } else if (heading.level === 4) {
        //     // @ts-ignore
        //     return <h4>{heading?.children?.[0].props.text}</h4>;
        //   } else if (heading.level === 5) {
        //     // @ts-ignore
        //     return <h5>{heading?.children?.[0].props.text}</h5>;
        //   } else if (heading.level === 6) {
        //     // @ts-ignore
        //     return <h6>{heading?.children?.[0].props.text}</h6>;
        //   }



        // },
        image: ({ image }) => {
          // console.log(image);
          return (
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alternativeText || ""}
            />
          );
        },
      }}
    />
  );
}