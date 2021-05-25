import React, { useState, useEffect } from "react";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";
import ContactList from "./ContactList";

const initContacts = [
  {
    id: 1,
    title: "Neeraj Singh",
    email: "neeraj@bigbinary.com",
    department: "Engineering",
    contact: "(555)-390-102",
  },
  {
    id: 2,
    title: "Vinay Chandran",
    email: "vinay@bigbinary.com",
    department: "Engineering",
    contact: "(555)-390-102",
  },
];

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const fetchContacts = () => {
    setContacts(initContacts);
    setLoading(false);
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
              onClick: () => null,
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
    </>
  );
};

export default Contacts;
