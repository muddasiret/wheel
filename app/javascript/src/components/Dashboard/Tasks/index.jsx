import React, { useState, useEffect } from "react";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";
import TaskList from "./TaskList";

const initTasks = [
  {
    id: 1,
    title: "Change support email",
    desc: "forward all internal mails...",
    tag: "Internal",
    due_date: "Apr 10, 2021",
    date_created: "Apr 10, 2021",
    contact: "N S",
  },
  {
    id: 2,
    title: "Feedback",
    desc: "Feedback V1.0",
    tag: "Agile Workflow",
    due_date: "Apr 10, 2021",
    date_created: "Apr 10, 2021",
    contact: "M A",
  },
  {
    id: 3,
    title: "Feedback Hover",
    desc: "Feedback V2.0......",
    tag: "Bug",
    due_date: "",
    date_created: "Apr 10, 2021",
    contact: "N S",
  },
];

const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  const fetchTasks = () => {
    setTasks(initTasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Tasks"
        actionBlock={
          <Button
            onClick={() => null}
            label="Add New Task"
            icon="ri-add-line"
          />
        }
      />
      {tasks.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
          />
          <TaskList
            selectedTaskIds={selectedTaskIds}
            setSelectedTaskIds={setSelectedTaskIds}
            tasks={tasks}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any tasks!"
          subtitle=""
          primaryAction={() => null}
          primaryActionLabel="Add New Task"
        />
      )}
    </>
  );
};

export default Tasks;
