# Dashxboard — @dashxboard/web

From ideas to actions. The **unofficial** platform designed for the **Stronghold (SHx)** community.

**[Website](https://dashxboard.com)** • **[Discord](https://discord.gg/dashxboard)** • **[GitHub](https://github.com/dashxboard)**

## Overview

**@dashxboard/web** is the web interface for the **Dashxboard** platform. Its features include:

- **Proposal Index**: Displays and categorizes community and official proposals.
- **Search Engine Optimization**: Makes discussions discoverable through search engines.
- **Responsive Design**: Modern UI that works across all devices.
- **Privacy-First**: Respects user privacy settings from Discord.

## Getting Started

### Prerequisites

- **Node.js** 18 or higher.
- **GitHub PAT** with `read:packages` scope.
- **PostgreSQL** database.
- Environment variables (see `.env.example`).

### Installation

1. Clone the repository:

```sh
git clone https://github.com/dashxboard/dashxboard-web.git
```

2. Install dependencies:

```sh
cd dashxboard-web

npm install
```

3. Set up environment variables:

```sh
cp .env
# Fill in your environment variables
```

## Scripts

- `npm run build` — Compiles the package.
- `npm run dev` — Runs the development server.

## Contributing

Dashxboard is open-source, and contributions are welcome! You can help by:

- Submitting pull requests.
- Reporting bugs or suggesting features.
- Enhancing the documentation.
- Engaging with the community on Discord.

See the [Contributing Guidelines](https://github.com/dashxboard/dashxboard-web/blob/main/CONTRIBUTING.md) for technical details of contributing to the Dashxboard.

## License

This project is licensed under the [MIT license](https://github.com/dashxboard/dashxboard-web/blob/main/LICENSE).
