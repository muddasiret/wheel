import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Select } from "neetoui/formik";
import { Button, Switch } from "neetoui";
import { departmentValues } from "../constants";

export default function NewContactForm({ onClose, addContacts }) {
  const handleSubmit = async values => {
    addContacts(values);
    onClose();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        contact: "",
        add_to_basecamp: false,
        department: { value: "Engineering", label: "Engineering" },
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        name: yup.string().required("Title is required"),
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
        contact: yup.string().required("Contact is required"),
      })}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className="pb-10">
          <Input label="Name" name="name" className="mb-6" />
          <Input label="Email" name="email" className="mb-6" />
          <Input label="Contact Number" name="contact" className="mb-6" />
          <Select
            className="mb-6"
            label="Tags"
            placeholder="Select a department"
            isSearchable
            name="department"
            options={departmentValues}
          />
          <div className="flex justify-between items-center mb-3">
            <p>Add to Basecamp</p>
            <Switch
              checked={values.add_to_basecamp}
              onChange={() =>
                setFieldValue("add_to_basecamp", !values.add_to_basecamp)
              }
              name="add_to_basecamp"
            />
          </div>
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
