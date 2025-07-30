# My React App

A modern React application built with TypeScript, Vite, and comprehensive testing setup.

## Features

- ⚛️ **React 19** - Latest React version with modern features
- 🔷 **TypeScript** - Full type safety and better developer experience
- ⚡ **Vite** - Lightning fast build tool and HMR
- 🛣️ **React Router** - Client-side routing with multiple pages
- 🎨 **Modern CSS** - Clean and responsive design
- ✅ **Comprehensive Testing** - Unit tests (Jest) + E2E tests (Cypress)
- 🚀 **CI/CD Ready** - GitHub Actions workflow included

## Pages

- **Home** (`/`) - Welcome page with interactive counter
- **About** (`/about`) - Information about the app and tech stack
- **Contact** (`/contact`) - Contact form with validation
- **404** - Custom 404 page for unknown routes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Testing
- `npm run test` - Run unit tests
- `npm run test:watch` - Run unit tests in watch mode
- `npm run test:coverage` - Run unit tests with coverage report
- `npm run test:e2e` - Run E2E tests (headless)
- `npm run test:e2e:open` - Open Cypress Test Runner
- `npm run test:all` - Run both unit and E2E tests

## Testing

### Unit Tests (Jest + React Testing Library)
- **Coverage**: 90.62% (35/35 tests passing)
- **Location**: `src/__tests__/`
- **Features**: Component testing, user interaction testing, routing tests

### E2E Tests (Cypress)
- **Location**: `cypress/e2e/`
- **Features**: Full user journey testing, form submission, navigation, accessibility
- **Test Files**:
  - `home.cy.ts` - Home page functionality
  - `navigation.cy.ts` - Routing and navigation
  - `about.cy.ts` - About page content
  - `contact.cy.ts` - Contact form testing
  - `user-journey.cy.ts` - Complete user workflows

## Tech Stack

- **Frontend**: React 19, TypeScript 5.8
- **Build Tool**: Vite 7.0
- **Routing**: React Router 7.7
- **Testing**: Jest 30.0, React Testing Library 16.3, Cypress
- **Linting**: ESLint with TypeScript rules
- **CI/CD**: GitHub Actions

## Project Structure

```
src/
├── __tests__/          # Unit tests
├── pages/              # React components for each page
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── NotFound.tsx
├── App.tsx             # Main app component with routing
└── main.tsx           # Entry point

cypress/
├── e2e/               # End-to-end tests
├── fixtures/          # Test data
└── support/           # Cypress configuration
```

## CI/CD

GitHub Actions workflow included that:
- Runs on Node.js 18.x and 20.x
- Executes type checking, linting, unit tests, and E2E tests
- Uploads test coverage and Cypress artifacts
- Builds production bundle

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests as needed
5. Ensure all tests pass: `npm run test:all`
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

