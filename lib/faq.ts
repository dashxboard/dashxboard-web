export type Item = {
  question: string;
  answer: string;
};

export type Section = {
  title: string;
  items: Item[];
};

export const Sections: Section[] = [
  {
    title: "Introduction",
    items: [
      {
        question: "What is Dashxboard?",
        answer:
          "Dashxboard is an unofficial platform designed for the [Stronghold (SHx)](https://stronghold.co) community. It serves as a hub for proposing, discussing, and tracking governance-related proposals within the Stronghold ecosystem. The platform integrates a Discord server, a customized bot, and a website that indexes discussions to improve accessibility and enhance the project's visibility through search engines.",
      },
      {
        question: "Who developed Dashxboard?",
        answer:
          "Dashxboard was created as an open-source project as part of a bounty from the SHx [Ecosystem Development Program (EDP)](https://docs.shx.stronghold.co/ecosystem/edp). Its goal is to promote transparency and community involvement by providing a space that support active participation and collective decision-making.",
      },
    ],
  },
  {
    title: "Discord community",
    items: [
      {
        question: "What does the Discord bot do?",
        answer:
          "The Dashxboard bot handles two key features: indexing forum discussions for display on the website and managing a reputation system. These features work together to create a more integrated and efficient ecosystem.",
      },
      {
        question: "How does the reputation system work?",
        answer:
          "The bot assigns reputation points to users based on their participation in community discussions within the forum channel. When users accumulate enough points to meet a set threshold, they are granted the **@Contributor** role. This role unlocks privileges such as creating community proposals, upvoting comments, and sponsoring other members through the vouching system, allowing them to gain access to the same benefits.",
      },
      {
        question: "How does the vouching system work?",
        answer:
          "**@Contributors** can temporarily 'sponsor' other users to become contributors for 6 (six) hours. This sponsorship requires the voucher to spend reputation points, emphasizing their responsibility for the vouched user. During this temporary role assignment, the vouched user gains the ability to post a community proposal. This system is designed to ensure fairness, allowing individuals with proposal ideas but without sufficient reputation to participate in the forum.",
      },
      {
        question: "What happens if reputation points are lost?",
        answer:
          "The bot may deduct reputation points if a user violates community rules or guidelines, including those for creating new proposals. If your reputation falls below the required threshold, you'll lose the associated role and privileges. To regain full participation, you'll need to earn back the necessary reputation points.",
      },
      {
        question: "Who moderates the community?",
        answer:
          "The community is designed to be self-maintained thanks to the features provided by the bot. However, human moderators are still responsible for ensuring the stability and maintaining a respectful environment. Members can report inappropriate behavior, and Discord's AutoMod along with other native features help enforce the rules.",
      },
    ],
  },
  {
    title: "Website",
    items: [
      {
        question: "What information is displayed on the website?",
        answer:
          "The website indexes discussions from a dedicated forum channel on the Discord server, allowing anyone to follow key conversations without needing to join. Additional channels can be indexed in the future if necessary.",
      },
      {
        question: "How does Dashxboard protect Discord users' privacy?",
        answer:
          "Discord community members can choose to opt-out of displaying their usernames and profile pictures. In such cases, a random username and the default Discord profile picture will be shown instead. These changes to public or non-public user information do not impact the reputation system or the indexed discussions.",
      },
      {
        question:
          "Is direct interaction with discussions available on the website?",
        answer:
          "Currently, direct interaction is only available on the Discord server. The website serves as a resource for browsing, sharing, and following discussions. However, this feature could be added in the future.",
      },
    ],
  },
  {
    title: "Proposals",
    items: [
      {
        question: "How can a proposal be submitted?",
        answer:
          "A proposal can be submitted by either earning enough reputation to unlock the special role or being *vouched* for by someone who already holds the role. Once access is granted, it's important to review the guidelines in the forum channel to ensure the proposal meets the requirements for discussion approval!",
      },
      {
        question: "What are 'Community' and 'Official' proposals?",
        answer:
          "The distinction lies in the origin of the proposal. 'Community' proposals are created by members of the Dashxboard community, while 'Official' proposals come from the Stronghold team. Official proposals are posted by moderators and remain open for discussion until the official voting period ends. Don't be discouraged by these categories—well-formulated and well-supported community proposals may still catch the attention of the Stronghold team and be considered for further action.",
      },
      {
        question: "What are the different stages of community proposals?",
        answer:
          "There are 3 (three) stages for community proposals in the Discord forum channel: 'Open', 'Locked' and 'Concluded'. On the website, only the 'Open' and 'Concluded' stages are displayed.\n\n→ **Open**: This stage represents an active, valid proposal. If the proposal meets the necessary criteria ('overview', 'justification', and 'structure', as explained in the Discord community), it is automatically indexed on the website.\n\n→ **Locked**: Proposals that fail to meet the required standards (e.g. unclear, ambiguous, inadequate, etc.) are locked by moderators, and they are removed from the website index.\n\n→ **Concluded**: To keep the forum well-organized, proposals are continuously monitored. A proposal enters this stage either when it remains inactive for over 7 days, placing it 'on hold', or when the community reaches a consensus and concludes the discussion, creating a clear record of the proposal.",
      },
      {
        question: "What happens when a community proposal concludes?",
        answer:
          "This will be determined based on the outcome of the vote for the official governance proposal 4. [Learn more here](https://docs.shx.stronghold.co/governance/proposals/4-adoption-of-proposed-shx-governance-rules).",
      },
    ],
  },
  {
    title: "Contributions",
    items: [
      {
        question: "How can I contribute to the project?",
        answer:
          "Dashxboard is an open-source project. You can visit the repository at [GitHub](https://github.com/dashxboard) to propose improvements, report bugs, or contribute new features. Additionally, suggestions and feedback are welcome in the dedicated channel on the Discord server.",
      },
      {
        question: "Are there plans for future features?",
        answer:
          "Definitely! The community is encouraged to propose and contribute to the development of new features, ensuring Dashxboard evolves to meet the needs of the Stronghold ecosystem, with a focus on SHx governance and beyond.",
      },
    ],
  },
];