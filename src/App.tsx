import "./App.css";
import { AddNewTask } from "./components/AddNewTask";
import { StartupProgressProvider } from "./context/StartupProgressContext";
import TasksList from "./components/TasksList";

// PR TEST

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
