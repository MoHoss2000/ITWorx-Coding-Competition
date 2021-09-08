import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import DescriptionCard from './Components/General/CycleDescriptionCard';
import Leaderboard from './Components/Admin/leaderboard';
import PracticeLeaderboard from './Components/Admin/PracticeLeaderboard';
import DepartmentLeaderboard from './Components/Admin/DepartmentLeaderboard'
import Badges from './Pages/Badges'
import LoginForm from './Components/General/LoginForm'
import PersonalInfo from './Components/Home/PersonalInfo'


function App() {
  return (
    <div className="App">
      <NavBar/>
    </div>
  );
}

export default App;
