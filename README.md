# Business Nexus

A modern business management web application built with React, TypeScript, and Vite, featuring a full calendar interface for scheduling and task management.

## Features

- 📅 Interactive calendar interface with drag-and-drop functionality
- 🎨 Modern UI built with Tailwind CSS
- ⚡ Fast development experience with Vite
- 🚀 Optimized for production builds
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with `tailwind-merge` for dynamic class composition
- **Build Tool**: Vite
- **State Management**: React Context API
- **Calendar**: FullCalendar
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/business-nexus.git
   cd business-nexus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Project Structure

```
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── data/            # Application data and mocks
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing development experience
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [FullCalendar](https://fullcalendar.io/) for the powerful calendar component
