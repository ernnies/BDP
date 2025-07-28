import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;