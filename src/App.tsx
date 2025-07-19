import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import StudentInterface from './pages/StudentInterface'
import StudentJoin from './pages/StudentJoin'
import TeacherDashboard from './pages/TeacherDashboard'

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
  )
}

export default App
