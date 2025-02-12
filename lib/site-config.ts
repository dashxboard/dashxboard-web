export const site = {
  name: "Dashxboard",
  url: "https://dashxboard.com",
  description:
    "The unofficial platform designed for the Stronghold (SHx) community.",
  links: {
    discord: "https://discord.gg/dashxboard",
    edp: "https://docs.shx.stronghold.co/ecosystem/edp",
    github: "https://github.com/dashxboard",
    governance: "https://docs.shx.stronghold.co/",
    vote: "https://vote.stronghold.co/",
    blog: "https://github.com/dashxboard/dashxboard-web/blob/main/content/blog/README.md",
  },
};

interface NavbarItem {
  title: string;
  href?: string;
}

export interface NavbarItems {
  items: NavbarItem[];
}

export const routes: NavbarItems = {
  items: [
    {
      title: "Proposals",
      href: "/",
    },
    {
      title: "Governance",
      href: "/governance",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
  ],
};
