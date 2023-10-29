export interface Task {
    id: string;
    description: string;
    completed: boolean;
  }
  
  export interface Phase {
    id: string;
    name: string;
    tasks: Task[];
    completed: boolean;
  }
  
  export interface StartupProgress {
    phases: Phase[];
  }