import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Textarea, Select } from "neetoui/formik";
import { Button, Switch } from "neetoui";

const tagValues = [
  { value: "Internal", label: "Internal" },
  { value: "Agile Workflow", label: "Agile Workflow" },
  { value: "Bug", label: "Bug" },
];

const contacts = [
  { value: "Karthik Menon", label: "Karthik Menon" },
  { value: "MS Dhoni", label: "MS Dhoni" },
];

export default function NewTaskForm({ onClose }) {
  const handleSubmit = () => {
    alert("form submitted");
  };
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        showDueDateField: true,
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        tag: yup.object().required("Tag is required"),
      })}
    >
      {({ isSubmitting, values }) => (
        <Form className="pb-10">
          <Input label="Title" name="title" className="mb-6" />
          <Select
            className="mb-6"
            label="Tags"
            defaultValue={null}
            placeholder="Select a tag"
            isDisabled={false}
            isClearable={true}
            isSearchable={true}
            name="tag"
            options={tagValues}
          />
          <Textarea
            label="Description"
            name="description"
            rows={8}
            className="mb-6"
          />
          <Select
            label="Assigned Contact"
            defaultValue={null}
            placeholder="Select a contact"
            isDisabled={false}
            isClearable={true}
            isSearchable={true}
            name="assigned_contact"
            options={contacts}
            className="mb-6"
          />
          <div className="flex justify-between items-center mb-3">
            <p>Add Due Date to Note</p>
            <Switch name="showDueDateField" />
          </div>
          {values.showDueDateField && (
            <Input
              type="date"
              label="Due Date"
              name="due_date"
              className="mb-10"
            />
          )}
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />

            <Button
              type="submit"
              label="Submit"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
