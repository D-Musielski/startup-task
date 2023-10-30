import "./App.css";
import { AddNewTask } from "./components/AddNewTask";
import { StartupProgressProvider } from "./context/StartupProgressContext";
import TasksList from "./components/TasksList";

function App() {
  return (
    <StartupProgressProvider>
      <div className="App">
        <AddNewTask />
        <TasksList />
      </div>
    </StartupProgressProvider>
  );
}

export default App;
