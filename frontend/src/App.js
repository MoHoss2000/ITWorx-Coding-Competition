import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import DescriptionCard from './Components/General/CycleDescriptionCard';
import Leaderboard from './Components/Admin/leaderboard';
import PracticeLeaderboard from './Components/Admin/PracticeLeaderboard';
import DepartmentLeaderboard from './Components/Admin/DepartmentLeaderboard'
import Badges from './Pages/Badges'


function App() {
  return (
    <div className="App">
      <DepartmentLeaderboard/>
    </div>
  );
}

export default App;
