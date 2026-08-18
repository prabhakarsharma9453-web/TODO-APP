import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding.jsx';
import Home from './pages/Home.jsx';
import NewTask from './pages/NewTask.jsx';
import TaskList from './pages/TaskList.jsx';

function App() {
  return (
    <div className="h-[100dvh] w-screen bg-gray-100 flex justify-center overflow-hidden">
      <div className="w-full max-w-screen-2xl bg-white h-full relative overflow-hidden flex flex-col shadow-2xl">
        <Router>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/new" element={<><Home /><NewTask /></>} />
            <Route path="/tasks" element={<TaskList />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
