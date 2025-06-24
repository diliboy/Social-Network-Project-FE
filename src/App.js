import './App.css';
import './index.css';
import 'mdb-ui-kit/css/mdb.min.css';
import Registration from './Components/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import RouterPage from './Components/RouterPage';
import UserHeader from './Components/UserHeader';

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router> */}
      <RouterPage/>
      
    </div>
  );
}

export default App;
