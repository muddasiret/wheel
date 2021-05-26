import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Textarea, Select } from "neetoui/formik";
import { Button, Switch, DateInput } from "neetoui";
import { contacts, tagValues } from "../constants";

export default function NewTaskForm({ onClose, addTasks }) {
  const handleSubmit = async values => {
    addTasks(values);
    onClose();
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        showDueDateField: false,
        tag: { value: "Internal", label: "Internal", color: "blue" },
        assignedContact: { value: "Karthik Menon", label: "Karthik Menon" },
        dueDate: new Date(),
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        tag: yup.object().required("Tag is required"),
        dueDate: yup.date().required("Date is required"),
      })}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className="pb-10">
          <Input label="Title" name="title" className="mb-6" />
          <Select
            className="mb-6"
            label="Tags"
            placeholder="Select a tag"
            isDisabled={false}
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
            placeholder="Select a contact"
            isDisabled={false}
            isSearchable={true}
            name="assignedContact"
            options={contacts}
            className="mb-6"
          />
          <div className="flex justify-between items-center mb-3">
            <p>Add Due Date to Note</p>
            <Switch
              checked={values.showDueDateField}
              onChange={() =>
                setFieldValue("showDueDateField", !values.showDueDateField)
              }
              name="showDueDateField"
            />
          </div>
          {values.showDueDateField && (
            <DateInput
              label="Due Date"
              name="dueDate"
              className="mb-10"
              minDate={new Date()}
              defaultValue={new Date()}
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
