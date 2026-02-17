# SWAPI Explorer (React + TypeScript)

A React app featuring [SWAPI](https://swapi.dev/) API, to browse or search for Star Wars related data.

![Weeeee](src/assets/weeeee.gif)

## Some of the features

- **Search:** Real-time search functionality with debounce (200ms) to optimize API calls.
- **Detail Views:** Comprehensive detail pages for each resource with cross-linking (e.g., view all films a character appeared in).
- **Accessibility:** Integrated `axe-core` for development-time accessibility checks.

## Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Package Manager:** pnpm
- **Testing:** Vitest

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm

### Installation

1. Clone the repository

2. Install dependencies:

   ```bash
   cd swapi-react-app
   ```

   ```bash
   pnpm install
   ```

### Development

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Build

Create a production build:

```bash
pnpm build
```

The output will be in the `dist` directory.

### Test

Run the test suite:

```bash
pnpm test
```

## Future Improvements

Due to time constraints, the focus was on core functionality first.

- Add more test coverage for list/detail pages.
- Improve debounce/search test reliability.
- Optimize data fetching.
- Accessibility and WCAG improvements.
- Add some images from another API, like [starwars-api](https://akabab.github.io/starwars-api/)

## License & Credits

- **API:** [SWAPI](https://swapi.dev/)
