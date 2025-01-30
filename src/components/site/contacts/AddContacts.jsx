import { Form, Input, Modal } from "antd";
import { isValidPhoneNumber } from "libphonenumber-js";
import React, { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import styles for PhoneInput

const AddContacts = ({ open, handleCloseModal, handleSubmit, isEdit, index, singleData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit && singleData) {
      form.setFieldsValue({
        name: singleData.name,
        contactNumber: singleData.contactNumber,
      });
    }
  }, [isEdit, singleData, form]);

  const handleOk = async () => {
    try {
      const formData = await form.validateFields();
      handleSubmit(isEdit ? index : null, formData);
      handleCloseModal();
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Add Contact"
      centered
      open={open}
      onOk={handleOk}
      onCancel={handleCloseModal}
      okText={isEdit ? "Update" : "Add"}
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter a name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            {
              required: true,
              message: "Please enter a valid phone number",
            },
            () => ({
              validator(_, value) {
                if (!value || typeof value !== "string") {
                  return Promise.reject("Invalid phone number format");
                }

                const valueToCheck = value.includes("+") ? value : "+" + value;
                return isValidPhoneNumber(valueToCheck)
                  ? Promise.resolve()
                  : Promise.reject("Please enter a valid phone number");
              },
            }),
          ]}
        >
          <PhoneInput
            country={"in"}
            inputStyle={{ width: "100%" }}
            placeholder="Enter Phone Number"
            onChange={(phone) => form.setFieldsValue({ contactNumber: phone })} 
          />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default AddContacts;
