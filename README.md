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

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.io
- **Styling**: CSS with utility classes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

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

## Usage

1. **Teacher**: Navigate to the root URL to access the teacher dashboard
2. **Create Questions**: Use the form to create different types of questions
3. **Activate Questions**: Click "Activate" on a question to make it live for students
4. **Share Link**: Copy the room link and share with students
5. **Students**: Join using the provided link or by entering the room ID
6. **View Results**: See real-time updates as students submit their answers

## Project Structure

```
teachy-interactive-platform/
├── public/
├── src/
│   ├── components/
│   │   ├── questions/
│   │   │   ├── MultipleChoiceQuestion.tsx
│   │   │   ├── WordCloudQuestion.tsx
│   │   │   ├── OpenTextQuestion.tsx
│   │   │   └── QuestionDisplay.tsx
│   │   ├── CreateQuestionForm.tsx
│   │   └── Header.tsx
│   ├── context/
│   │   └── SocketContext.tsx
│   ├── hooks/
│   ├── pages/
│   │   ├── TeacherDashboard.tsx
│   │   ├── StudentJoin.tsx
│   │   └── StudentInterface.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── server.js
├── package.json
├── tsconfig.json
└── vite.config.ts
```