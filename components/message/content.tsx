import Image from "next/image";
import { parseMessage } from "@/lib/markdown";
import { isVideo } from "@/lib/utils";

export type Attachment = {
  id: string;
  url: string;
  name: string;
  content: string;
};

type ContentProps = {
  content: string;
  attachments: Attachment[];
};

export const Content = async ({ content, attachments }: ContentProps) => {
  const htmlContent = await parseMessage(content);

  return (
    <>
      <div
        className="opacity-90 break-words"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <div className="grid gap-4 w-full max-w-full sm:max-w-[700px]">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex max-h-[350px] rounded-lg overflow-hidden"
          >
            {isVideo(attachment.url) ? (
              <video
                src={attachment.url}
                className="max-w-full h-auto object-cover"
                controls
              ></video>
            ) : (
              <Image
                src={attachment.url}
                alt={attachment.name}
                width={700}
                height={400}
                className="max-w-full h-auto object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
