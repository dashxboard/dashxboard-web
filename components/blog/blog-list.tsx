import { Balancer } from "react-wrap-balancer";
import { FrownIcon } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { getItems } from "@/lib/markdown-config";

export async function BlogList() {
  const posts = (await getItems("blog")).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (posts.length === 0) {
    return (
      <div className="flex flex-col space-y-2 items-center justify-center min-h-[50vh]">
        <FrownIcon size={48} className="opacity-75" />
        <div className="text-xl text-center w-full opacity-80">
          <Balancer>
            Currently, no blog posts have been published. Check back later!
          </Balancer>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4 mb-5">
        {posts.map((blog) => (
          <BlogCard {...blog} slug={blog.slug} key={blog.slug} />
        ))}
      </div>
    </>
  );
}
