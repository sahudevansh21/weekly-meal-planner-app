# Weekly Meal Planner

A simple, interactive web application to help you plan your weekly meals and generate a shopping list, built with Next.js 14 App Router.

## Project Overview

This application addresses the common struggle of consistent meal planning by providing an intuitive, client-side solution. Users can input meals for each day of the week on an interactive calendar. The app then automatically compiles a customizable shopping list based on the plan, which can be edited, saved, and printed. All meal plans and shopping lists are stored directly in the user's browser (client-side), ensuring privacy and no reliance on external databases.

## Features

*   **Meal Plan Editor:** An interactive calendar interface to easily input meals for each day and meal type (Breakfast, Lunch, Dinner, Snacks).
*   **Shopping List Generator:** Automatically generates a shopping list by parsing your planned meals. The list is fully editable, allowing you to add, remove, or modify items.
*   **Saved Plans:** Save your favorite weekly meal plans and load them anytime. This is perfect for rotating meal schedules or seasonal plans.
*   **Client-Side Storage:** All data (meal plans, shopping lists, saved plans) is stored locally in your browser's `localStorage`, meaning no accounts or cloud services are needed.
*   **Stunning Design:** A dark, glassmorphic UI with vibrant gradient accents, smooth transitions, and a responsive layout for an enjoyable user experience.

## Technologies Used

*   **Next.js 14:** For the application framework, utilizing the App Router.
*   **React:** For building interactive user interfaces.
*   **Client-Side Local Storage:** For persistent data storage without a backend.
*   **Pure CSS:** For all styling, including responsive design, glassmorphism, and gradient effects (no Tailwind, no CSS modules).

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed on your machine.

*   Node.js (v18 or higher recommended)
*   npm (v9 or higher recommended)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd weekly-meal-planner
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or yarn dev
# or pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To build the application for production deployment:

```bash
npm run build
# or yarn build
# or pnpm build
```

This will create an optimized build of your application in the `.next` directory.

### Starting the Production Server

To start the production server after building:

```bash
npm run start
# or yarn start
# or pnpm start
```

This will run the compiled Next.js application.

## Project Structure

```
weekly-meal-planner/
├── app/
│   ├── layout.js         # Root layout for the application
│   ├── page.js           # Home/dashboard page
│   ├── globals.css       # Global styles
│   ├── meal-plan-editor/ # Meal Plan Editor page
│   │   └── page.js
│   ├── shopping-list-generator/ # Shopping List Generator page
│   │   └── page.js
│   └── saved-plans/      # Saved Plans page
│       └── page.js
├── components/
│   └── Navbar.js         # Navigation bar component
├── lib/
│   └── storage.js        # Client-side local storage utilities
├── public/
│   └── favicon.ico       # Application favicon
├── package.json          # Project dependencies and scripts
├── next.config.js        # Next.js configuration
└── README.md             # Project documentation
```
