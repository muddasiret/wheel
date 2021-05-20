import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Textarea, Select } from "neetoui/formik";
import { Button } from "neetoui";

const tagValues = [
  { value: "Internal", label: "Internal" },
  { value: "Agile Workflow", label: "Agile Workflow" },
  { value: "Bug", label: "Bug" },
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
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        tag: yup.object().required("Tag is required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input label="Title" name="title" className="mb-6" />
          <Textarea
            label="Description"
            name="description"
            rows={8}
            className="mb-6"
          />
          <Select
            label="Tags"
            defaultValue={null}
            placeholder="Select a tag"
            isDisabled={false}
            isClearable={true}
            isSearchable={true}
            name="tag"
            options={tagValues}
          />
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
