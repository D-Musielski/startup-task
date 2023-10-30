import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStartupProgressContext } from "../context/StartupProgressContext";

export const AddNewTask = () => {
  const { startupProgress, setStartupProgress } = useStartupProgressContext();
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("");
  const [newPhaseName, setNewPhaseName] = useState("");

  function addNewTask() {
    if (selectedPhase) {
      // Add task to an existing phase
      const phaseIndex = startupProgress.phases.findIndex(
        (phase) => phase.id === selectedPhase
      );
      if (phaseIndex !== -1) {
        const newTask = {
          id: uuidv4(),
          description: newTaskDescription,
          completed: false,
        };
        const updatedProgress = { ...startupProgress };
        updatedProgress.phases[phaseIndex].tasks.push(newTask);
        setStartupProgress(updatedProgress);
      }
    } else if (newPhaseName) {
      // Create a new phase and add the task
      const newPhase = {
        id: uuidv4(),
        name: newPhaseName,
        completed: false,
        tasks: [
          {
            id: uuidv4(),
            description: newTaskDescription,
            completed: false,
          },
        ],
      };
      const updatedProgress = { ...startupProgress };
      updatedProgress.phases.push(newPhase);
      setStartupProgress(updatedProgress);
    }

    setNewTaskDescription("");
    setSelectedPhase("");
    setNewPhaseName("");
  }

  return (
    <div className="addNewTaskForm">
      <div>
        <label htmlFor="description">New Task Description: </label>
        <input
          id="description"
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Add to Existing Phase: </label>
        <select
          value={selectedPhase}
          onChange={(e) => setSelectedPhase(e.target.value)}
        >
          <option value="">Create New Phase</option>
          {startupProgress.phases.map((phase) => (
            <option key={phase.id} value={phase.id}>
              {phase.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedPhase === "" && (
          <>
            <label htmlFor="phase">New Phase Name: </label>
            <input
              id="phase"
              type="text"
              value={newPhaseName}
              onChange={(e) => setNewPhaseName(e.target.value)}
            />
          </>
        )}
      </div>
      <button onClick={addNewTask}>Add Task</button>
    </div>
  );
};
