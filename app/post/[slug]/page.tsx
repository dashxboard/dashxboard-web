import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/blog/blog-typography";
import { ScrollUp } from "@/components/ui/scrollup-button";
import { ProgressBar } from "@/components/ui/progess-bar";
import { ShareButton } from "@/components/ui/share-button";
import { getItem, getPaths } from "@/lib/markdown-config";
import { getBaseURL, timeFormats } from "@/lib/utils";

type PostsParams = Promise<{ slug: string }>;

type PostsProps = {
  params: PostsParams;
};

export const generateMetadata = async (props: PostsProps) => {
  const params = await props.params;
  const { slug } = params;

  const response = await getItem("blog", slug);
  if (!response) return notFound();

  const { frontmatter } = response;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical: `${getBaseURL()}/blog/${slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${getBaseURL()}/blog/${slug}`,
      type: "article",
      images: [{ url: `${getBaseURL()}/og-image.png` }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [`${getBaseURL()}/og-image.png`],
    },
  };
};

export async function generateStaticParams() {
  const paths = await getPaths("blog");
  if (!paths) return [];
  return paths.map((path) => ({ slug: path }));
}

export default async function BlogPostPage(props: PostsProps) {
  const params = await props.params;
  const { slug } = params;

  const response = await getItem("blog", slug);
  if (!response) notFound();

  const frontmatter = response.frontmatter as BlogFrontmatter;
  const { dateOnly } = timeFormats(new Date(frontmatter.date));

  return (
    <>
      <ProgressBar />
      <div className="w-full mx-auto flex flex-col gap-1 sm:min-h-[91vh] min-h-[88vh] pt-2">
        <div>
          <Button
            variant="link"
            asChild
            className="!mx-0 !px-0 mb-7 !-ml-1 mt-7 text-foreground/80 hover:text-foreground"
          >
            <Link href="/blog">
              <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to blog
            </Link>
          </Button>
          <h1 className="mb-4 font-semibold text-3xl text-foreground">
            {frontmatter.title}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground/80">
                Published by{" "}
                <span className="font-semibold hover:underline text-foreground/90">
                  <Link href={frontmatter.author.URL}>
                    {frontmatter.author.username}
                  </Link>
                </span>{" "}
                on {dateOnly}
              </span>
            </div>
            <div className="flex w-full sm:w-auto items-center gap-2">
              <div className="flex-1 sm:flex-initial w-full">
                <ShareButton className="w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="!w-full mt-4 p-4 space-y-2 border rounded-md border-border">
          <Typography>{response.content}</Typography>
        </div>
        <ScrollUp />
      </div>
    </>
  );
}

interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: {
    username: string;
    URL: string;
  };
}
