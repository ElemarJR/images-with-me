# Images with Me

## Overview

Images with Me is a web application built with Next.js, React, and TypeScript. It generates photos of Elemar JR using a specially trained model for this purpose. The application leverages OpenAI's GPT-4o model to optimize prompts and uses Replicate for generating images based on these prompts.

## Features

- **Prompt Optimization**: Enhances user-provided prompts to create professional-quality images of Elemar JR.
- **Image Generation**: Utilizes a specially trained model on Replicate to generate images.
- **Responsive Design**: Built with Tailwind CSS for a responsive and modern UI.
- **Interactive UI Components**: Includes custom UI components like cards, alerts, and tooltips.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- An OpenAI API key and a Replicate API token.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/images-with-me.git
   cd images-with-me
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your API keys:
   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   REPLICATE_API_TOKEN=your_replicate_api_token
   ```

### Running the Application

- Start the development server:
  ```bash
  npm run dev
  ```

- Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- **`src/app`**: Contains the main application logic and API routes.
- **`src/components`**: Includes reusable UI components.
- **`src/lib`**: Utility functions.
- **`src/types`**: TypeScript type definitions.
- **`public`**: Static assets.

## Key Files

- **`src/app/api/optimize/route.ts`**: Handles prompt optimization using OpenAI.
- **`src/app/api/predictions/route.ts`**: Manages image generation requests to Replicate.
- **`src/app/page.tsx`**: Main page component with prompt input and image gallery.

## Customization

- **Tailwind CSS**: Customize styles in `src/app/globals.css` and `tailwind.config.ts`.
- **UI Components**: Modify or extend components in `src/components/ui`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com).
