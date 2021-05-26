import React from "react";
import { Checkbox, Avatar, Tooltip } from "neetoui";
import deleteBtn from "images/DeleteButton";
import editBtn from "images/EditButton";

export default function ContactList({
  selectedContactIds,
  setSelectedContactIds,
  setShowDeleteAlert,
  contacts = [],
}) {
  const handleDelete = contactIds => {
    setSelectedContactIds([contactIds]);
    setShowDeleteAlert(true);
  };

  const deleteButton = contactId => {
    return (
      <Tooltip content="Delete Contact" position="bottom">
        <div onClick={() => handleDelete(contactId)}>
          <img src={deleteBtn} alt="deletebutton" />
        </div>
      </Tooltip>
    );
  };

  const editButton = () => {
    return (
      <Tooltip className="mx-2" content="Edit Contact" position="bottom">
        <div>
          <img src={editBtn} alt="edit button" />
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
                  selectedContactIds.length ===
                  contacts.map(contact => contact.id).length
                }
                onClick={() => {
                  const contactIds = contacts.map(contact => contact.id);
                  if (selectedContactIds.length === contactIds.length) {
                    setSelectedContactIds([]);
                  } else {
                    setSelectedContactIds(contactIds);
                  }
                }}
              />
            </th>
            <th className="text-left text-gray-300">Name</th>
            <th className="text-left text-gray-300">Email</th>
            <th className="text-left text-gray-300">Department</th>
            <th className="text-left text-gray-300">Contact number</th>
            <th className="text-left text-gray-300 pr-0">Add to basecamp</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr
              key={contact.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedContactIds.includes(contact.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedContactIds.indexOf(contact.id);

                    if (index > -1) {
                      setSelectedContactIds([
                        ...selectedContactIds.slice(0, index),
                        ...selectedContactIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedContactIds([
                        ...selectedContactIds,
                        contact.id,
                      ]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex flex-row items-center justify-start text-gray-900">
                  <Avatar
                    color="green"
                    className="mr-3"
                    size={36}
                    contact={{ name: contact.name }}
                  />
                  {contact.name}
                </div>
              </td>
              <td>{contact.email}</td>
              <td>{contact.department}</td>
              <td>{contact.contact}</td>
              <td>
                <div className="flex flex-row items-center justify-center text-gray-900">
                  <Checkbox
                    name="basecamp_added"
                    checked={contact.add_to_basecamp}
                  />
                </div>
              </td>
              <td>
                <div className="flex">
                  {editButton()}
                  {deleteButton(contact.id)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}