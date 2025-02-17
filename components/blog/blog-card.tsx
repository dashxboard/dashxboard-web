import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BlogFrontmatter } from "@/lib/markdown-config";
import { timeFormats } from "@/lib/utils";

export const BlogCard = ({
  date,
  title,
  description,
  slug,
  author,
}: BlogFrontmatter & { slug: string }) => {
  const dateObject = new Date(date);
  const at = timeFormats(dateObject);

  return (
    <Card className="flex flex-col h-full transition-colors duration-300 hover:border-muted-foreground/30 border-border">
      <Link href={`/post/${slug}`} className="no-underline">
        <CardHeader>
          <h1 className="text-md font-semibold pr-7 text-foreground">
            {title}
          </h1>
          <div className="w-full border-t border-border/80 my-2" />
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-auto pt-0">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] text-muted-foreground">
              Published on <time dateTime={at.iso}>{at.dateOnly}</time>
            </p>
            <p className="text-[13px] text-muted-foreground">
              by {author.username}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
