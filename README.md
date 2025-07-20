# Teachy Interactive Platform

A real-time interactive question platform inspired by Mentimeter, where teachers can create and launch questions during presentations or classes, and students can join and answer in real time from their devices.

## Features

- **Teacher Interface**: Create, select, and display questions in real-time
- **Student Interface**: Join via room code and submit answers
- **Real-time Updates**: See results update live on the teacher's view
- **Multiple Question Types**:
  - Multiple Choice Questions
  - Word Cloud
  - Open Text Answers
- **Internationalization**: Support for multiple languages (currently English and Portuguese)
- **Dark Mode**: Toggle between light and dark themes for better user experience

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.io
- **Styling**: Tailwind CSS
- **Internationalization**: i18next with language detection
- **Theme Management**: Context API with localStorage persistence

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To run both the client and server concurrently:

```
npm start
```

To run the client only:

```
npm run dev
```

To run the server only:

```
npm run server
```

### Building for Production

```
npm run build
```

## Internationalization

The application supports multiple languages:

- English (default)
- Portuguese

Language detection is automatic based on the user's browser settings, but can be manually changed using the language selector in the header. Language preferences are stored in the browser's localStorage.

To add a new language:

1. Create a new folder in `src/locales/` with the language code (e.g., `fr` for French)
2. Add a `translation.json` file with the translated strings
3. Update the `i18n.ts` file to include the new language

## Theme Support

The application supports both light and dark themes:

- Light theme (default)
- Dark theme

Theme detection is automatic based on the user's system preferences, but can be manually toggled using the theme switch in the header. Theme preferences are stored in the browser's localStorage.

The theme implementation uses:

- React Context API for state management
- CSS variables for consistent theming
- Tailwind CSS for dark mode utility classes

## Usage

1. **Teacher**: Navigate to the root URL to access the teacher dashboard
2. **Create Questions**: Use the form to create different types of questions
3. **Activate Questions**: Click "Activate" on a question to make it live for students
4. **Share Link**: Copy the room link and share with students
5. **Students**: Join using the provided link or by entering the room ID
6. **View Results**: See real-time updates as students submit their answers
7. **Language Selection**: Switch between available languages using the language selector in the header
8. **Theme Toggle**: Switch between light and dark themes using the theme toggle button in the header

## Project Structure

```
teachy-interactive-platform/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── questions/
│   │   │   ├── MultipleChoiceQuestion.tsx
│   │   │   ├── WordCloudQuestion.tsx
│   │   │   ├── OpenTextQuestion.tsx
│   │   │   └── QuestionDisplay.tsx
│   │   ├── CreateQuestionForm.tsx
│   │   ├── Header.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── ThemeToggle.tsx
│   ├── context/
│   │   ├── SocketContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/
│   ├── locales/
│   │   ├── en/
│   │   │   └── translation.json
│   │   └── pt/
│   │       └── translation.json
│   ├── pages/
│   │   ├── TeacherDashboard.tsx
│   │   ├── StudentJoin.tsx
│   │   └── StudentInterface.tsx
│   ├── types/
│   │   ├── index.ts
│   │   ├── i18n.d.ts
│   │   └── svg.d.ts
│   ├── App.tsx
│   ├── i18n.ts
│   ├── index.css
│   └── main.tsx
├── .vscode/
│   ├── settings.json
│   └── extensions.json
├── server.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```
