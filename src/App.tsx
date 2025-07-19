import { Routes, Route } from 'react-router-dom';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentJoin from './pages/StudentJoin';
import StudentInterface from './pages/StudentInterface';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<TeacherDashboard />} />
          <Route path="/join" element={<StudentJoin />} />
          <Route path="/student/:roomId" element={<StudentInterface />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;