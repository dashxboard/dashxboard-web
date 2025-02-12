import path from "path";
import { promises as fs } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";

function getFrontmatter<Frontmatter>(rawMd: string): Frontmatter {
  return matter(rawMd).data as Frontmatter;
}

async function parseMDX<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
    },
  });
}

export type BaseFrontmatter = {
  title: string;
  description: string;
  date: string;
};

export type Author = {
  username: string;
  URL: string;
};

export type BlogFrontmatter = BaseFrontmatter & {
  author: Author;
};

export type GovernanceFrontmatter = BaseFrontmatter & {
  id: string;
  snapshotTime?: string;
  voteStart?: string;
  voteEnd?: string;
  resultsPublished?: string;
  result?: string;
  status?: string;
  statusDate?: string;
  link?: string;
  discussion?: string;
};

type MarkdownType = "blog" | "governance";

async function getPaths(type: "blog"): Promise<string[]>;
async function getPaths(type: "governance"): Promise<string[]>;
async function getPaths(type: MarkdownType): Promise<string[] | undefined> {
  try {
    const directory = path.join(process.cwd(), `/content/${type}/`);
    const response = await fs.readdir(directory);
    return response.map((file) => file.split(".")[0]);
  } catch (err) {
    console.log(err);
  }
}

async function getItems(
  type: "blog"
): Promise<(BlogFrontmatter & { slug: string })[]>;
async function getItems(
  type: "governance"
): Promise<(GovernanceFrontmatter & { slug: string })[]>;
async function getItems(
  type: MarkdownType
): Promise<((BlogFrontmatter | GovernanceFrontmatter) & { slug: string })[]> {
  const directory = path.join(process.cwd(), `/content/${type}/`);
  const files = await fs.readdir(directory);
  const posts = await Promise.all(
    files.map(async (file) => {
      if (!file.endsWith(".mdx")) return undefined;
      const filePath = path.join(process.cwd(), `/content/${type}/${file}`);
      const rawMDX = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(rawMDX);
      return {
        ...(type === "blog"
          ? (data as BlogFrontmatter)
          : (data as GovernanceFrontmatter)),
        slug: file.split(".")[0],
        content: content,
      };
    })
  );
  return posts.filter((iterator) => !!iterator) as (
    | (BlogFrontmatter & { slug: string })
    | (GovernanceFrontmatter & { slug: string })
  )[];
}

async function getItem(
  type: "blog",
  slug: string
): Promise<ReturnType<typeof parseMDX<BlogFrontmatter>> | undefined>;
async function getItem(
  type: "governance",
  slug: string
): Promise<ReturnType<typeof parseMDX<GovernanceFrontmatter>> | undefined>;
async function getItem(
  type: MarkdownType,
  slug: string
): Promise<
  | ReturnType<typeof parseMDX<BlogFrontmatter>>
  | ReturnType<typeof parseMDX<GovernanceFrontmatter>>
  | undefined
> {
  const file = path.join(process.cwd(), `/content/${type}/`, `${slug}.mdx`);
  try {
    const rawMDX = await fs.readFile(file, "utf-8");

    if (type === "blog") {
      return await parseMDX<BlogFrontmatter>(rawMDX);
    }
    return await parseMDX<GovernanceFrontmatter>(rawMDX);
  } catch {
    return undefined;
  }
}

export { getPaths, getItems, getItem };
