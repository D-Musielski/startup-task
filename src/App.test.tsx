import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("Task completion can be toggled", () => {
  render(<App />);

  const taskDescription = "Setup virtual office";
  const checkbox = screen.getByLabelText(taskDescription);

  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);

  expect(checkbox).not.toBeChecked();
});

test("Adding a new task", () => {
  render(<App />);

  const addTaskInput = screen.getByLabelText("New Task Description:");
  const addTaskButton = screen.getByText("Add Task");
  const addPhaseInput = screen.getByLabelText("New Phase Name:");

  fireEvent.change(addPhaseInput, { target: { value: "Test" } });
  fireEvent.change(addTaskInput, { target: { value: "New Task Example" } });
  fireEvent.click(addTaskButton);

  expect(screen.getByText("New Task Example")).toBeInTheDocument();
});
