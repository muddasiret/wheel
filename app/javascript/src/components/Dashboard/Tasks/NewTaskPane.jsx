import React from "react";
import { Pane } from "neetoui";
import NewTaskForm from "./NewTaskForm";

export default function NewTaskPane({ addTasks, showPane, setShowPane }) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Create a New Task" isOpen={showPane} onClose={onClose}>
      <div className="px-6 pb-10">
        <NewTaskForm addTasks={addTasks} onClose={onClose} />
      </div>
    </Pane>
  );
}
