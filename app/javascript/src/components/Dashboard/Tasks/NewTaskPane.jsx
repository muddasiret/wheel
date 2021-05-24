import React from "react";
import { Pane } from "neetoui";
import NewTaskForm from "./NewTaskForm";

export default function NewTaskPane({ fetchTasks, showPane, setShowPane }) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Create a New Task" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <NewTaskForm onClose={onClose} refetch={fetchTasks} />
      </div>
    </Pane>
  );
}
