import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import DescriptionCard from './Components/General/CycleDescriptionCard';
import Leaderboard from './Components/Admin/leaderboard';
import PracticeLeaderboard from './Components/Admin/PracticeLeaderboard';
import DepartmentLeaderboard from './Components/Admin/DepartmentLeaderboard'
import Badges from './Components/Admin/Badges'
import CreateBadge from './Components/Admin/CreateBadge';


function App() {
  return (
    <div className="App">
      <CreateBadge/>
    </div>
  );
}

export default App;
