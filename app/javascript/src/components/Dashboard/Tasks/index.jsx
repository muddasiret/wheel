import React, { useState, useEffect } from "react";
import { Button, PageLoader, Toastr } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";
import TaskList from "./taskList";
import NewTaskPane from "./NewTaskPane";
import moment from "moment";
import DeleteAlert from "components/Common/DeleteAlert";

const initTasks = [
  {
    id: 1,
    title: "Change support email",
    desc: "forward all internal mails...",
    tag: "Internal",
    tagColor: "blue",
    due_date: "Apr 10, 2021",
    date_created: "Apr 10, 2021",
    contact: "N S",
  },
  {
    id: 2,
    title: "Feedback",
    desc: "Feedback V1.0",
    tag: "Agile Workflow",
    tagColor: "green",
    due_date: "Apr 10, 2021",
    date_created: "Apr 10, 2021",
    contact: "M A",
  },
  {
    id: 3,
    title: "Feedback Hover",
    desc: "Feedback V2.0......",
    tag: "Bug",
    tagColor: "red",
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
  const [showNewTaskPane, setShowNewTaskPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const fetchTasks = () => {
    setTasks(initTasks);
    setLoading(false);
  };

  const addTasks = newTaskValues => {
    let newTask = {
      id: tasks.length + 1,
      title: newTaskValues.title,
      desc: newTaskValues.description,
      tag: newTaskValues.tag.value,
      tagColor: newTaskValues.tag.color,
      due_date: newTaskValues.showDueDateField
        ? moment(newTaskValues.dueDate).format("MMM-DD-YYYY")
        : "",
      date_created: moment(new Date()).format("MMM-DD-YYYY"),
      contact: newTaskValues.assignedContact.value,
    };
    const newTaskList = [...tasks, newTask];
    setTasks(newTaskList);
    Toastr.success("Task has been successfully added");
  };

  const deleteTasks = () => {
    let tempTaskList = [...tasks];
    const taskSelected = selectedTaskIds;
    taskSelected.forEach(taskId => {
      var index = tempTaskList.findIndex(task => {
        return task.id === taskId;
      });
      if (index !== -1) tempTaskList.splice(index, 1);
    });
    setTasks(tempTaskList);
    setShowDeleteAlert(false);
    setSelectedTaskIds([]);
    Toastr.success("Task was deleted successfully");
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
            onClick={() => setShowNewTaskPane(true)}
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
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedTaskIds.length,
            }}
            paginationProps={{ pageNo: 1, pageSize: 50, count: 241 }}
            sortProps={{
              options: [
                { value: "Name", label: "Name" },
                { value: "Tag", label: "Tag" },
              ],
              onClick: () => "",
            }}
            toggleFilter
          />
          <TaskList
            selectedTaskIds={selectedTaskIds}
            setSelectedTaskIds={setSelectedTaskIds}
            tasks={tasks}
            setShowDeleteAlert={setShowDeleteAlert}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any tasks!"
          subtitle=""
          primaryAction={() => setShowNewTaskPane(true)}
          primaryActionLabel="Add New Task"
        />
      )}
      <NewTaskPane
        showPane={showNewTaskPane}
        setShowPane={setShowNewTaskPane}
        fetchTasks={fetchTasks}
        addTasks={addTasks}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedIds={selectedTaskIds}
          onClose={() => setShowDeleteAlert(false)}
          deleteIds={deleteTasks}
          title="tasks"
        />
      )}
    </>
  );
};

export default Tasks;
