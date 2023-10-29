import { useEffect, useState } from "react";
import "./App.css";
import mockData from "./mock.json";
import { StartupProgress } from "./types/dataTypes";

function App() {
  const [startupProgress, setStartupProgress] = useState<StartupProgress>(
    () => {
      const storedData = localStorage.getItem("startupProgress");
      return storedData ? JSON.parse(storedData) : mockData.startupProgress;
    }
  );

  useEffect(() => {
    localStorage.setItem("startupProgress", JSON.stringify(startupProgress));
  }, [startupProgress]);

  function markTaskAsCompleted(phaseId: string, taskId: string) {
    setStartupProgress((prevProgress) => {
      const updatedProgress = { ...prevProgress };
      const phaseIndex = updatedProgress.phases.findIndex(
        (phase) => phase.id === phaseId
      );
      const taskIndex = updatedProgress.phases[phaseIndex].tasks.findIndex(
        (task) => task.id === taskId
      );
      updatedProgress.phases[phaseIndex].tasks[taskIndex].completed = true;

      // Check if all tasks in the phase are completed
      if (
        updatedProgress.phases[phaseIndex].tasks.every((task) => task.completed)
      ) {
        updatedProgress.phases[phaseIndex].completed = true;
      }

      return updatedProgress;
    });
  }

  function isTaskEnabled(phaseIndex: number) {
    if (phaseIndex === 0) {
      return true; // All tasks in phase 1 are enabled
    }

    const previousPhase = startupProgress.phases[phaseIndex - 1];
    if (!previousPhase.completed) {
      return false; // If the previous phase is not completed, disable the task
    }

    return true; // Enable the task by default
  }

  return (
    <div className="App">
      {startupProgress.phases.map((phase, phaseIndex) => (
        <div key={phase.id}>
          <h2>{phase.name}</h2>
          <ul>
            {phase.tasks.map((task, taskIndex) => (
              <li key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => markTaskAsCompleted(phase.id, task.id)}
                    disabled={!isTaskEnabled(phaseIndex)}
                  />
                  {task.description}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
