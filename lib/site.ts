export const site = {
  name: "Dashxboard",
  url: "https://dashxboard.com",
  description: "Stronghold (SHx) Community Dashboard",
  links: {
    discord: "https://discord.gg/eJhzDbKbdj",
    edp: "https://docs.shx.stronghold.co/ecosystem/edp",
    github: "https://github.com/dashxboard",
    governance: "https://docs.shx.stronghold.co/",
    vote: "https://vote.stronghold.co/",
  },
};

// Site routes
interface Item {
  title: string;
  href?: string;
}

export interface Navbar {
  items: Item[];
}

export const navbar: Navbar = {
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
      title: "FAQ",
      href: "/faq",
    },
  ],
};