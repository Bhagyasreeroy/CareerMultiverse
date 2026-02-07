# Career Multiverse Explorer - Technical Overview

This document explains the architecture, technology stack, and implementation details of the key features in the Career Multiverse Explorer.

## 1. Technology Stack

*   **Frontend Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) - fast build tool and modern dev server.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) - strict typing for robust data models (`CareerReality`, `Skill`, etc.).
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - utility-first styling with custom configurations for the "Stranger Things" theme.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) - complex transitions, layout animations, and glass morphism effects.
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - accessible, customizable components (buttons, dialogs, tabs).
*   **Icons**: [Lucide React](https://lucide.dev/) - consistent iconography.
*   **Charts**: [Recharts](https://recharts.org/) - data visualization for skill gaps and comparisons.
*   **State Management**: React `Context` (`CareerContext`) combined with local storage persistence (`CareerManager` service).

## 2. Core Architecture: The Multiverse Model

The application revolves around the concept of **"Career Realities"**.

### Data Model (`src/types/career.ts`)
Each career path is a `CareerReality` object containing:
*   `id`: unique identifier.
*   `parentId`: reference to the reality it was forked from (creating a tree structure).
*   `skills`: array of skills with proficiency levels.
*   `roadmap`: list of learning resources (books, courses, projects).
*   `history`: chronological snapshots of the reality's state.
*   `resumeData`: tailored resume content for this specific path.

### Career Manager Service (`src/services/CareerManager.ts`)
This static service acts as the backend logic (currently running client-side):
*   **Persistence**: Saves the entire user profile to `localStorage`.
*   **Forking**: Creates a deep copy of a reality, assigns a new ID, and links it to the parent.
*   **Merging**: Combines skills and roadmap items from two different realities into a new one.
*   **Snapshotting**: Before every update (skill change, roadmap edit), a snapshot of the current state is pushed to the `history` array. This enables the "Time Travel" rollback feature.

## 3. Feature Implementation Details

### A. Reality Tree & Management
*   **Visualizing Branches**: The `RealityTree` component renders the hierarchy. Beziers or simple lines connect forked paths (conceptually).
*   **Templates**: Access Pre-defined templates (Full Stack, Data Scientist) via `CareerManager.getTemplates()`. This instantiates a new reality with preset skills and descriptions.

### B. Smart Roadmap (AI Integration)
*   **Mock AI**: The `AIComparisonService` and `CareerManager.generateSmartRoadmap` simulate an AI backend.
*   **Logic**: Based on the `targetRole` of a reality, it generates relevant `LearningResource` items (e.g., "Complete Guide to Python" for a Data Scientist path).
*   **Dynamic Updates**: Toggling an item's status updates the reality's progress metrics.

### C. Version History (Time Travel)
*   **Snapshots**: Every significant action (update, add skill) triggers `CareerManager.updateReality`, which first saves the *current* state to `history`.
*   **Rollback**: The "Restore" button finds a specific snapshot by ID and overwrites the current reality's state with the snapshot's state, effectively traveling back in time.

### D. Resume Studio
*   **Scoped Data**: Resume data is nested *inside* each reality. This means your "Full Stack" resume is completely separate from your "Product Manager" resume.
*   **Auto-Flow**: Skills added in the "Skill Matrix" are automatically available to be dropped into the resume.

### E. Theme & UI (Stranger Things)
*   **CSS Variables**: Defined in `index.css` (e.g., `--neon-red`, `--neon-blue`).
*   **Animations**: Custom keyframes for `flicker` and `glitch` effects.
*   **Glassmorphism**: The `GlassCard` component uses strictly defined `backdrop-filter` and border translucency to achieve the 80s sci-fi aesthetic.

## 4. Deployment

The app is a static SPA (Single Page Application).
*   **Build Command**: `npm run build` generates a `dist` folder.
*   **Hosting**: This folder can be served by any static host (Vercel, Netlify, GitHub Pages, AWS S3).
