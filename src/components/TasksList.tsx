import { useStartupProgressContext } from "../context/StartupProgressContext";
import { StartupProgress } from "../types/dataTypes";

const TasksList = () => {
  const { startupProgress, setStartupProgress } = useStartupProgressContext();

  const toggleTaskCompletion = (phaseId: string, taskId: string) => {
    setStartupProgress((prevProgress: StartupProgress) => {
      const updatedProgress = { ...prevProgress };
      const phaseIndex = updatedProgress.phases.findIndex(
        (phase) => phase.id === phaseId
      );
      const taskIndex = updatedProgress.phases[phaseIndex].tasks.findIndex(
        (task) => task.id === taskId
      );

      updatedProgress.phases[phaseIndex].tasks[taskIndex].completed =
        !updatedProgress.phases[phaseIndex].tasks[taskIndex].completed;

      // Check if all tasks in the phase are completed
      if (
        updatedProgress.phases[phaseIndex].tasks.every((task) => task.completed)
      ) {
        updatedProgress.phases[phaseIndex].completed = true;
      } else {
        updatedProgress.phases[phaseIndex].completed = false;
      }

      return updatedProgress;
    });
  };

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
    <div>
      {startupProgress.phases.map((phase, phaseIndex) => (
        <div key={phase.id}>
          <h2 className={phase.completed ? "completed" : ""}>
            <span className="phase">{phaseIndex + 1}</span>
            {phase.name}
          </h2>
          <ul>
            {phase.tasks.map((task) => (
              <li key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(phase.id, task.id)}
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
};

export default TasksList;
