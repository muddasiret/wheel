import React, { useState, useEffect } from "react";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";

const initTasks = [
  {
    title: "Change support email",
    desc: "forward all internal mails...",
    tag: "Internal",
    date_created: "Apr 10, 2021",
    contact: "NS",
  },
  {
    title: "Feedback",
    desc: "Feedback V1.0",
    tag: "Agile Workflow",
    date_created: "Apr 10, 2021",
    contact: "MA",
  },
  {
    title: "Feedback Hover",
    desc: "Feedback V2.0......",
    tag: "Bug",
    date_created: "Apr 10, 2021",
    contact: "NS",
  },
];

const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState([]);

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
