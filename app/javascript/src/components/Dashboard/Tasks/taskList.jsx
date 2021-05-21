import React from "react";
import { Checkbox, Badge, Avatar, Tooltip } from "neetoui";
import deleteBtn from "images/DeleteButton";

export default function TaskList({
  selectedTaskIds,
  setSelectedTaskIds,
  setShowDeleteAlert,
  tasks = [],
}) {
  const handleDelete = taskIds => {
    setSelectedTaskIds([taskIds]);
    setShowDeleteAlert(true);
  };

  const deleteButton = taskid => {
    return (
      <Tooltip content="Delete Task" position="bottom">
        <div className="mx-1" onClick={() => handleDelete(taskid)}>
          <img src={deleteBtn} alt="deletebutton" />
        </div>
      </Tooltip>
    );
  };

  return (
    <div className="w-full px-14">
      <table className="nui-table nui-table--actions">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedTaskIds.length === tasks.map(task => task.id).length
                }
                onClick={() => {
                  const taskIds = tasks.map(task => task.id);
                  if (selectedTaskIds.length === taskIds.length) {
                    setSelectedTaskIds([]);
                  } else {
                    setSelectedTaskIds(taskIds);
                  }
                }}
              />
            </th>
            <th className="text-left text-gray-300">Title</th>
            <th className="text-left text-gray-300">Description</th>
            <th className="text-center text-gray-300">Tags</th>
            <th className="text-center text-gray-300">Created Date</th>
            <th className="text-center text-gray-300">Due Date</th>
            <th className="text-center text-gray-300">Contact</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr
              key={task.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedTaskIds.includes(task.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedTaskIds.indexOf(task.id);

                    if (index > -1) {
                      setSelectedTaskIds([
                        ...selectedTaskIds.slice(0, index),
                        ...selectedTaskIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedTaskIds([...selectedTaskIds, task.id]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex text-purple-500 flex-row items-center justify-start text-gray-900">
                  {task.title}
                </div>
              </td>
              <td>{task.desc}</td>
              <td className="text-center">
                <Badge color="red">{task.tag}</Badge>
              </td>
              <td className="text-center">{task.date_created}</td>
              <td className="text-center">
                {task.due_date ? task.due_date : "--"}
              </td>
              <td className="flex flex-row items-center justify-center">
                <Avatar size={36} contact={{ name: task.contact }} />
              </td>
              <td>
                <div className="flex">{deleteButton(task.id)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
