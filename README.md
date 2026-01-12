# 🗺️ Plan My Outing

[Live Demo](https://siddhartha7207-ops.github.io/plan-my-outing/)

Plan My Outing is a modern, AI-powered travel itinerary planner designed to help you maximize your day out. Whether you're a local or a tourist, our application uses advanced AI to create a realistic, budget-conscious plan tailored to your preferences.

## ✨ Features

-   **🤖 AI-Powered Itineraries**: Leveraging Gemini AI via OpenRouter to generate contiguous, realistic timelines.
-   **💰 Budget Optimization**: Intelligently allocates your budget across transport, food, and activities.
-   **🚗 Transport Options**: Compares cheapest vs. fastest routes using local data (Buses, Cabs, etc.).
-   **📍 Local Discovery**: Recommends the best places to visit based on your starting location and city.
-   **📈 Real-time Validation**: Uses Hugging Face's Mistral model to verify and rate your plan for realism.
-   **✨ Premium UI**: Beautiful, responsive interface built with Framer Motion for smooth transitions.

## 🚀 Tech Stack

-   **Frontend**: React 19, Vite
-   **Styling**: Vanilla CSS, Lucide React (Icons)
-   **Animation**: Framer Motion
-   **AI Services**:
    -   OpenRouter (Gemini 1.5 Flash)
    -   Hugging Face (Mistral-7B-Instruct)
-   **Routing**: React Router DOM v7

## 🛠️ Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/siddhartha7207-ops/plan-my-outing.git
    cd plan-my-outing
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up API Keys**
    Create a `.env` file in the root directory and add:
    ```env
    VITE_OPENROUTE_API_KEY=your_openrouter_api_key
    ```

4.  **Launch the development server**
    ```bash
    npm run dev
    ```

## 📦 Project Structure

```text
src/
├── components/     # Reusable UI components
├── context/        # PlanContext for global state management
├── data/           # Static data for cities, transport, and restaurants
├── pages/          # Main application pages (Landing, Input, Summary, etc.)
├── services/       # AI service integrations (Gemini, HF, OpenRouter)
├── utils/          # Helper functions for ranking and optimization
└── App.jsx         # Main application component & routing
```

## 📜 Available Scripts

-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Builds the application for production.
-   `npm run preview`: Locally preview the production build.
-   `npm run deploy`: Deploys the application to GitHub Pages.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
Built with ❤️ by [Siddhartha7207-ops](https://github.com/siddhartha7207-ops) for better travel experiences.
