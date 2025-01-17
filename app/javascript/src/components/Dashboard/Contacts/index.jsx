import React, { useState, useEffect } from "react";
import { Button, PageLoader, Toastr, Alert } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";
import ContactList from "./ContactList";
import NewContactPane from "./NewContactPane";
import { initContacts } from "../constants";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showNewContactPane, setShowNewContactPane] = useState(false);

  const fetchContacts = () => {
    setContacts(initContacts);
    setLoading(false);
  };

  const addContacts = newContactValues => {
    let newContact = {
      id: contacts.length + 1,
      name: newContactValues.name,
      email: newContactValues.email,
      department: newContactValues.department.value,
      contact: newContactValues.contact,
      add_to_basecamp: newContactValues.add_to_basecamp,
    };
    const newContactList = [...contacts, newContact];
    setContacts(newContactList);
    Toastr.success("Task has been successfully added");
  };

  const deleteContacts = () => {
    let tempContactList = [...contacts];
    const taskSelected = selectedContactIds;
    taskSelected.forEach(contactId => {
      var index = tempContactList.findIndex(contact => {
        return contact.id === contactId;
      });
      if (index !== -1) tempContactList.splice(index, 1);
    });
    setContacts(tempContactList);
    setShowDeleteAlert(false);
    setSelectedContactIds([]);
    Toastr.success("Contact was deleted successfully");
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Contacts"
        actionBlock={
          <Button
            onClick={() => setShowNewContactPane(true)}
            label="New Contact"
            icon="ri-add-line"
          />
        }
      />
      {contacts.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedContactIds.length,
            }}
            paginationProps={{ pageNo: 1, pageSize: 50, count: 241 }}
            sortProps={{
              options: [
                { value: "Name", label: "Name" },
                { value: "Department", label: "Department" },
              ],
              onClick: () => "",
            }}
            toggleFilter
          />
          <ContactList
            selectedContactIds={selectedContactIds}
            setSelectedContactIds={setSelectedContactIds}
            contacts={contacts}
            setShowDeleteAlert={setShowDeleteAlert}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any Contacts!"
          subtitle=""
          primaryActionLabel="Add New Contact"
          primaryAction={() => setShowNewContactPane(true)}
        />
      )}
      <NewContactPane
        showPane={showNewContactPane}
        setShowPane={setShowNewContactPane}
        addContacts={addContacts}
      />
      <Alert
        title="Delete Contacts?"
        message={`Are you sure you want to delete ${selectedContactIds.length} contacts? All of your data will be permanently removed from our database forever. This action cannot be undone.`}
        hideConfirmation
        isOpen={showDeleteAlert}
        submitButtonProps={{
          onClick: deleteContacts,
        }}
        cancelButtonProps={{
          onClick: () => setShowDeleteAlert(false),
        }}
      />
    </>
  );
};

export default Contacts;
