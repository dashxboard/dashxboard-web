export type GovernanceCard = {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: string;
  link: string;
  discussion?: string;
};

export const governanceCard: GovernanceCard[] = [
  {
    id: "PROP-001",
    title: "MCA Origination Fee Burn",
    description:
      "This proposal asks whether a portion of the origination fee should be burned instead of paid to contributors.",
    date: new Date("2023-11-27"),
    status: "Completed",
    link: "https://docs.shx.stronghold.co/governance/proposals/1-mca-origination-fee-burn",
  },
  {
    id: "PROP-002",
    title: "Establishing a Public Governance Venue and Voting Proxy",
    description:
      "This proposal asks whether a public venue be established for the submission and discussion of SHx governance proposals by SHx holders.",
    date: new Date("2024-04-21"),
    status: "Implementation",
    link: "https://docs.shx.stronghold.co/governance/proposals/2-establishing-a-public-governance-venue-and-voting-proxy",
  },
  {
    id: "PROP-003",
    title: "Opening Access to StrongholdNET",
    description:
      "This proposal asks which set of APIs should be prioritized for development and release in the StrongholdNET open-access developer console.",
    date: new Date("2024-09-08"),
    status: "Implementation",
    link: "https://docs.shx.stronghold.co/governance/proposals/3-opening-access-to-strongholdnet",
  },
  {
    id: "PROP-004",
    title: "Adoption of Proposed SHx Governance Rules",
    description:
      "This proposal asks if the proposed SHX Governance Rules be adopted as the foundational rules for how SHx governance is conducted.",
    date: new Date("2024-12-11"),
    status: "Implementation",
    link: "https://docs.shx.stronghold.co/governance/proposals/4-adoption-of-proposed-shx-governance-rules",
    discussion: "https://www.dashxboard.com/proposal/PROP-004",
  },
];
