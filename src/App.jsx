import "./App.css";

// Component imports
import Topbar from "./components/topbar/Topbar";

function App() {
  return (
    <div className="App">
      <Topbar />
      <div className="content"></div>
    </div>
  );
}

export default App;
