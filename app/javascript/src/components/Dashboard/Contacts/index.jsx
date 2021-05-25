import React, { useState, useEffect } from "react";
import { Button, PageLoader, Toastr } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";
import ContactList from "./ContactList";
import DeleteAlert from "components/Common/DeleteAlert";

const initContacts = [
  {
    id: 1,
    title: "Neeraj Singh",
    email: "neeraj@bigbinary.com",
    department: "Engineering",
    contact: "(555)-390-102",
    add_to_basecamp: true,
  },
  {
    id: 2,
    title: "Vinay Chandran",
    email: "vinay@bigbinary.com",
    department: "Engineering",
    contact: "(555)-390-102",
    add_to_basecamp: false,
  },
];

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const fetchContacts = () => {
    setContacts(initContacts);
    setLoading(false);
  };

  const deleteTasks = () => {
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
            onClick={() => null}
            label="Add New Contact"
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
                { value: "Tag", label: "Tag" },
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
        />
      )}
      {showDeleteAlert && (
        <DeleteAlert
          selectedIds={selectedContactIds}
          onClose={() => setShowDeleteAlert(false)}
          deleteIds={deleteTasks}
          title="contacts"
        />
      )}
    </>
  );
};

export default Contacts;
