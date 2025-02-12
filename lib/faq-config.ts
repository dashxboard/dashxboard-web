export type Item = {
  question: string;
  answer: string;
};

export type FAQSection = {
  title: string;
  items: Item[];
};

export const FAQSections: FAQSection[] = [
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
          "Dashxboard was created as an open-source project as part of a bounty from the SHx [Ecosystem Development Program (EDP)](https://docs.shx.stronghold.co/ecosystem/edp). Its goal is to promote transparency and community involvement by providing a space that supports active participation and collective decision-making.",
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
          "There are 4 (four) stages for community proposals in the Discord forum channel: 'Open', 'Locked', 'Paused' and 'Concluded'. On the website, only the 'Open' and 'Concluded' stages are displayed.\n\n→ **Open**: This stage represents an active, valid proposal. If the proposal meets the necessary criteria ('overview', 'justification', and 'structure', as explained in the Discord community), it is automatically indexed on the website.\n\n→ **Locked**: Proposals that fail to meet the required standards (e.g. unclear, ambiguous, inadequate, etc.) are locked by moderators, and they are removed from the website index.\n\n→ **Paused**: To keep the forum well-organized, proposals are continuously monitored. A proposal enters this stage when it remains inactive for over 5 days.\n\n→ **Concluded**: Once the community achieves consensus and the discussion is finalized, a definitive record of the proposal is established. The proposal may then progress to a *Preliminary Vote*, as explained next.",
      },
      {
        question: "What happens when a community proposal concludes?",
        answer:
          "When a community proposal reaches the **Concluded** stage, what happens next depends on whether it progressed through the governance process:\n\n→ If the proposal remains a discussion without advancing to a vote, it serves as a reference for the community but does not lead to any binding action.\n\n→ If the proposal moves to a **Preliminary Vote** but fails to meet the endorsement threshold (50% + 1 of the Quorum requirement), it does not proceed to governance voting.\n\n→ If the proposal passes the **Preliminary Vote**, it advances to the **Governance Vote** and is uploaded into the [SHx Voting Tool](https://vote.stronghold.co) for an official, binding decision on the Stellar Network. The results of this vote determine the final action taken on the proposal.\n\n Regardless of the outcome, concluded proposals remain part of the historical governance record and may shape future discussions and decisions.",
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
