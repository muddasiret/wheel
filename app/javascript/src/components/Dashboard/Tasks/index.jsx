import React, { useState, useEffect } from "react";
import { Button, PageLoader, Toastr, Alert } from "neetoui";
import dayjs from "dayjs";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";
import TaskList from "./taskList";
import NewTaskPane from "./NewTaskPane";
import { initTasks } from "../constants";

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
        ? dayjs(newTaskValues.dueDate).format("MMM-DD-YYYY")
        : "",
      date_created: dayjs(new Date()).format("MMM-DD-YYYY"),
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
      <Alert
        title="Delete Tasks?"
        message={`Are you sure you want to delete ${selectedTaskIds.length} tasks? All of your data will be permanently removed from our database forever. This action cannot be undone.`}
        hideConfirmation
        isOpen={showDeleteAlert}
        submitButtonProps={{
          onClick: deleteTasks,
        }}
        cancelButtonProps={{
          onClick: () => setShowDeleteAlert(false),
        }}
      />
    </>
  );
};

export default Tasks;
