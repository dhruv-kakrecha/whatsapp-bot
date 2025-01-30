import { Form, Input, Modal } from 'antd'
import { isValidPhoneNumber } from 'libphonenumber-js';
import React from 'react'
import PhoneInput from 'react-phone-input-2';

const AddContacts = ({
  open,
  handleCloseModal,
  handleAddContact
}) => {

  const [form] = Form.useForm();

  const handleOk = () => {
    const formData = form.getFieldsValue()
    handleAddContact(formData);
    handleCloseModal();
  }

  return (
    <Modal
      title="Add Contact"
      centered
      open={open}
      onOk={handleOk}
      onCancel={handleCloseModal}
      okText="Add"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name={"contactNumber"}
          rules={[
            {
              required: true,
              message: "",
            },
            () => ({
              validator(rule, value) {
                const valueToCheck = value?.includes("+")
                  ? value
                  : "+" + value;
                const isValid = isValidPhoneNumber(valueToCheck);
                if (value && isValid) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Please enter valid phone number"
                );
              },
            }),
          ]}
        >
          <PhoneInput
            country={"in"}
            inputStyle={{ width: "100%" }}
            name="phone"
            placeholder="Enter Phone Number"
            inputProps={{
              size: "large",
              maxLength: 15,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddContacts
